"""
GitIngest API - Python FastAPI application for managing GitHub repositories
and extracting codebase information using GitIngest service.
"""

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import requests
import os
from dotenv import load_dotenv
from gitingest import ingest  # GitIngest Python package - official integration
import asyncio
from functools import partial

# Load environment variables
load_dotenv()

app = FastAPI(
    title="GitIngest API",
    description="API for gathering GitHub repositories and extracting codebase information using GitIngest",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
GITHUB_API_BASE = "https://api.github.com"
DEFAULT_GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")


# Pydantic Models
class Repository(BaseModel):
    """Model for repository information"""
    name: str
    full_name: str
    description: Optional[str]
    html_url: str
    private: bool
    fork: bool
    stars: int = Field(alias="stargazers_count")
    language: Optional[str]
    updated_at: str
    
    class Config:
        populate_by_name = True


class RepoSelectRequest(BaseModel):
    """Request model for selecting repositories for gitingest"""
    repositories: List[str] = Field(
        ...,
        description="List of repository names (format: 'owner/repo')",
        example=["octocat/Hello-World", "octocat/Spoon-Knife"]
    )


class GitIngestResponse(BaseModel):
    """Response model for gitingest data"""
    repository: str
    success: bool
    summary: Optional[str] = None
    tree: Optional[str] = None
    content: Optional[str] = None  # Only included if include_content=true
    error: Optional[str] = None


class GitIngestBatchResponse(BaseModel):
    """Batch response for multiple gitingest requests"""
    results: List[GitIngestResponse]
    total_requested: int
    successful: int
    failed: int


# Helper Functions
def get_github_headers(token: Optional[str] = None) -> Dict[str, str]:
    """Generate headers for GitHub API requests"""
    headers = {
        "Accept": "application/vnd.github.v3+json",
        "User-Agent": "GitIngest-API"
    }
    
    if token:
        headers["Authorization"] = f"token {token}"
    elif DEFAULT_GITHUB_TOKEN:
        headers["Authorization"] = f"token {DEFAULT_GITHUB_TOKEN}"
    
    return headers


async def fetch_github_repos(
    username: str,
    repo_type: str = "all",
    sort: str = "updated",
    per_page: int = 100,
    token: Optional[str] = None
) -> List[Dict[str, Any]]:
    """Fetch repositories from GitHub API"""
    headers = get_github_headers(token)
    all_repos = []
    page = 1
    
    while True:
        url = f"{GITHUB_API_BASE}/users/{username}/repos"
        params = {
            "type": repo_type,
            "sort": sort,
            "per_page": per_page,
            "page": page
        }
        
        try:
            response = requests.get(url, headers=headers, params=params, timeout=10)
            response.raise_for_status()
            
            repos = response.json()
            if not repos:
                break
                
            all_repos.extend(repos)
            
            # Check if there are more pages
            if len(repos) < per_page:
                break
                
            page += 1
            
        except requests.RequestException as e:
            raise HTTPException(
                status_code=response.status_code if hasattr(response, 'status_code') else 500,
                detail=f"Failed to fetch repositories from GitHub: {str(e)}"
            )
    
    return all_repos


def generate_detailed_summary(content: str, tree: str, summary: str) -> str:
    """
    Generate a detailed summary by analyzing all files in the repository.
    This reduces tokens significantly compared to returning full code content.
    Includes actual content from markdown/documentation files.
    """
    lines = content.split('\n')
    
    # Parse file sections
    files_info = []
    current_file = None
    current_content = []
    
    for line in lines:
        if line.startswith('=' * 40):
            continue
        elif line.startswith('FILE: '):
            if current_file:
                files_info.append({
                    'path': current_file,
                    'content': '\n'.join(current_content),
                    'lines': len(current_content)
                })
            current_file = line.replace('FILE: ', '').strip()
            current_content = []
        else:
            current_content.append(line)
    
    # Add last file
    if current_file:
        files_info.append({
            'path': current_file,
            'content': '\n'.join(current_content),
            'lines': len(current_content)
        })
    
    # Analyze files
    file_categories = {
        'Documentation': [],
        'Configuration': [],
        'Python Code': [],
        'JavaScript/TypeScript': [],
        'HTML/CSS': [],
        'Docker': [],
        'Other': []
    }
    
    technologies = set()
    dependencies = []
    markdown_files = []  # Store markdown files with content
    
    for file_info in files_info:
        path = file_info['path']
        content = file_info['content']
        
        # Categorize files
        if path.endswith(('.md', '.txt', '.rst')):
            file_categories['Documentation'].append(path)
            # Store markdown content for summary
            if path.endswith('.md'):
                markdown_files.append({
                    'path': path,
                    'content': content,
                    'lines': file_info['lines']
                })
        elif path.endswith(('.json', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.env', 'Dockerfile', 'docker-compose.yml')):
            file_categories['Configuration'].append(path)
            if 'Dockerfile' in path:
                file_categories['Docker'].append(path)
        elif path.endswith('.py'):
            file_categories['Python Code'].append(path)
            # Extract imports
            for line in content.split('\n')[:50]:
                if line.startswith('import ') or line.startswith('from '):
                    technologies.add(line.split()[1].split('.')[0])
        elif path.endswith(('.js', '.jsx', '.ts', '.tsx')):
            file_categories['JavaScript/TypeScript'].append(path)
        elif path.endswith(('.html', '.css', '.scss')):
            file_categories['HTML/CSS'].append(path)
        else:
            file_categories['Other'].append(path)
        
        # Extract dependencies from package files
        if 'requirements.txt' in path or 'package.json' in path:
            dependencies.append(f"{path}: {file_info['lines']} dependencies")
    
    # Build detailed summary
    detailed_summary = []
    detailed_summary.append("=" * 80)
    detailed_summary.append("DETAILED REPOSITORY SUMMARY")
    detailed_summary.append("=" * 80)
    detailed_summary.append("")
    detailed_summary.append(summary)
    detailed_summary.append("")
    
    detailed_summary.append("=" * 80)
    detailed_summary.append("FILE ANALYSIS")
    detailed_summary.append("=" * 80)
    
    total_files = len(files_info)
    total_lines = sum(f['lines'] for f in files_info)
    
    detailed_summary.append(f"Total Files: {total_files}")
    detailed_summary.append(f"Total Lines of Code: {total_lines:,}")
    detailed_summary.append("")
    
    for category, files in file_categories.items():
        if files:
            detailed_summary.append(f"\n{category} ({len(files)} files):")
            for f in files[:10]:  # Show first 10 of each category
                detailed_summary.append(f"  • {f}")
            if len(files) > 10:
                detailed_summary.append(f"  ... and {len(files) - 10} more")
    
    detailed_summary.append("")
    detailed_summary.append("=" * 80)
    detailed_summary.append("TECHNOLOGIES DETECTED")
    detailed_summary.append("=" * 80)
    for tech in sorted(technologies)[:20]:
        detailed_summary.append(f"  • {tech}")
    
    detailed_summary.append("")
    detailed_summary.append("=" * 80)
    detailed_summary.append("PROJECT STRUCTURE")
    detailed_summary.append("=" * 80)
    detailed_summary.append(tree)
    
    detailed_summary.append("")
    detailed_summary.append("=" * 80)
    detailed_summary.append("KEY INSIGHTS")
    detailed_summary.append("=" * 80)
    detailed_summary.append(f"  • Repository contains {total_files} files with {total_lines:,} lines")
    detailed_summary.append(f"  • Main language: {'Python' if len(file_categories['Python Code']) > len(file_categories['JavaScript/TypeScript']) else 'JavaScript/TypeScript'}")
    detailed_summary.append(f"  • Has Docker support: {'Yes' if file_categories['Docker'] else 'No'}")
    detailed_summary.append(f"  • Documentation files: {len(file_categories['Documentation'])}")
    detailed_summary.append("=" * 80)
    
    # Add markdown file contents
    if markdown_files:
        detailed_summary.append("")
        detailed_summary.append("=" * 80)
        detailed_summary.append("DOCUMENTATION CONTENT (ALL MARKDOWN FILES)")
        detailed_summary.append("=" * 80)
        detailed_summary.append(f"Found {len(markdown_files)} markdown files with documentation")
        detailed_summary.append("")
        
        # Sort markdown files: main README first, then by path
        markdown_files_sorted = sorted(markdown_files, key=lambda x: (
            0 if x['path'] == 'README.md' else 1,
            x['path']
        ))
        
        for md_file in markdown_files_sorted:
            detailed_summary.append("")
            detailed_summary.append("-" * 80)
            detailed_summary.append(f"FILE: {md_file['path']} ({md_file['lines']} lines)")
            detailed_summary.append("-" * 80)
            detailed_summary.append(md_file['content'])
            detailed_summary.append("")
        
        detailed_summary.append("=" * 80)
        detailed_summary.append("END OF DOCUMENTATION CONTENT")
        detailed_summary.append("=" * 80)
    
    return '\n'.join(detailed_summary)


async def fetch_gitingest(
    repo_full_name: str, 
    token: Optional[str] = None,
    include_content: bool = False
) -> Dict[str, Any]:
    """
    Fetch gitingest data using the official GitIngest Python package.
    
    Args:
        repo_full_name: Repository name in format "owner/repo"
        token: Optional GitHub token for private repos authentication
        include_content: If True, returns full code content; if False, returns detailed summary
    
    Returns:
        Dict with repository, success, summary, tree, content/detailed_summary, and error
    """
    github_url = f"https://github.com/{repo_full_name}"
    
    try:
        use_token = token or DEFAULT_GITHUB_TOKEN or None
        
        # Call GitIngest to get all data
        loop = asyncio.get_event_loop()
        ingest_func = partial(ingest, github_url, token=use_token if use_token else None)
        summary, tree, content = await loop.run_in_executor(None, ingest_func)
        
        if include_content:
            # Return full code content (large, high tokens)
            return_content = content
        else:
            # Generate detailed summary instead of full code (saves tokens!)
            return_content = generate_detailed_summary(content, tree, summary)
        
        return {
            "repository": repo_full_name,
            "success": True,
            "summary": summary,
            "tree": tree,
            "content": return_content,
            "error": None
        }
    except Exception as e:
        return {
            "repository": repo_full_name,
            "success": False,
            "summary": None,
            "tree": None,
            "content": None,
            "error": f"Failed to process with GitIngest: {str(e)}"
        }


# API Endpoints
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to GitIngest API",
        "version": "1.0.0",
        "endpoints": {
            "GET /repos/{username}": "Get all repositories for a user",
            "POST /gitingest": "Get GitIngest extracts for selected repositories",
            "GET /health": "Health check endpoint"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "GitIngest API"}


@app.get("/repos/{username}", response_model=List[Repository])
async def get_user_repositories(
    username: str,
    repo_type: str = "all",
    sort: str = "updated",
    per_page: int = 100,
    authorization: Optional[str] = Header(None)
):
    """
    Get all repositories for a GitHub user.
    
    Parameters:
    - **username**: GitHub username
    - **repo_type**: Type of repositories (all, owner, member) - default: all
    - **sort**: Sort by (created, updated, pushed, full_name) - default: updated
    - **per_page**: Results per page (max 100) - default: 100
    - **authorization**: Optional GitHub token in header (format: "token YOUR_TOKEN")
    
    Returns:
    - List of repositories with detailed information
    """
    # Extract token from authorization header if provided
    token = None
    if authorization and authorization.startswith("token "):
        token = authorization.split("token ")[1]
    
    repos = await fetch_github_repos(username, repo_type, sort, per_page, token)
    
    # Transform repos to match our model
    transformed_repos = []
    for repo in repos:
        try:
            transformed_repos.append(Repository(**repo))
        except Exception as e:
            # Skip repos that don't match the model
            continue
    
    return transformed_repos


@app.post("/gitingest", response_model=GitIngestBatchResponse)
async def get_gitingest_extracts(
    request: RepoSelectRequest,
    include_content: bool = False,
    authorization: Optional[str] = Header(None)
):
    """
    Get GitIngest extracts for selected repositories.
    
    Parameters:
    - **repositories**: List of repository names in format "owner/repo"
    - **include_content**: Set to true to include full code content (default: false - returns detailed summary)
    - **authorization**: Optional GitHub token in header (format: "token YOUR_TOKEN")
    
    Returns:
    - Batch response with GitIngest data for each repository including:
      - summary: Basic statistics (file count, tokens, commit)
      - tree: Directory structure visualization
      - content: **DEFAULT (false)**: Detailed analysis summary (file categories, technologies, insights)
               **WITH include_content=true**: Full codebase with all source code (~100x larger)
    
    Example request body:
    ```json
    {
        "repositories": ["octocat/Hello-World", "torvalds/linux"]
    }
    ```
    
    💡 Token Savings:
    - Default (detailed summary): ~5-10KB response, perfect for repo understanding
    - With include_content=true: Full code digest (~1MB+), for complete code analysis
    """
    if not request.repositories:
        raise HTTPException(
            status_code=400,
            detail="At least one repository must be specified"
        )
    
    # Extract token from authorization header if provided
    token = None
    if authorization and authorization.startswith("token "):
        token = authorization.split("token ")[1]
    
    results = []
    
    for repo_name in request.repositories:
        # Validate repo name format
        if "/" not in repo_name:
            results.append({
                "repository": repo_name,
                "success": False,
                "summary": None,
                "tree": None,
                "content": None,
                "error": "Invalid repository format. Use 'owner/repo'"
            })
            continue
        
        result = await fetch_gitingest(repo_name, token, include_content)
        results.append(result)
    
    successful = sum(1 for r in results if r["success"])
    failed = len(results) - successful
    
    return GitIngestBatchResponse(
        results=results,
        total_requested=len(request.repositories),
        successful=successful,
        failed=failed
    )


@app.get("/gitingest/{owner}/{repo}")
async def get_single_gitingest(
    owner: str,
    repo: str,
    include_content: bool = False,
    authorization: Optional[str] = Header(None)
):
    """
    Get GitIngest extract for a single repository.
    
    Parameters:
    - **owner**: Repository owner/organization
    - **repo**: Repository name
    - **include_content**: Set to true for full code (default: false - returns detailed summary)
    - **authorization**: Optional GitHub token in header (format: "token YOUR_TOKEN")
    
    Returns:
    - GitIngest extract data including:
      - summary: Basic repo statistics (file count, tokens, commit hash)
      - tree: Complete directory structure
      - content: **DEFAULT**: Intelligent summary (file analysis, technologies, categories)
                **WITH ?include_content=true**: Full source code of all files
    
    Examples:
    - Detailed summary (default): GET /gitingest/octocat/Hello-World
    - Full code content: GET /gitingest/octocat/Hello-World?include_content=true
    
    💡 The detailed summary analyzes all files but returns insights instead of code,
       saving ~100x in tokens while providing comprehensive repository understanding.
    """
    # Extract token from authorization header if provided
    token = None
    if authorization and authorization.startswith("token "):
        token = authorization.split("token ")[1]
    
    repo_full_name = f"{owner}/{repo}"
    result = await fetch_gitingest(repo_full_name, token, include_content)
    
    if not result["success"]:
        raise HTTPException(
            status_code=500,
            detail=result["error"]
        )
    
    return result


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

