"""MakeMyCv API - FastAPI app for GitHub repos, GitIngest, and social media scraping"""

from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import requests
import os
from dotenv import load_dotenv
from gitingest import ingest  # Official GitIngest package
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

# Agent.ai webhook URLs for social media scraping
LINKEDIN_PROFILE_WEBHOOK_URL = os.getenv(
    "LINKEDIN_PROFILE_WEBHOOK_URL", 
    "https://api.agent.ai/v1/agent/26q8jefoy5cu92k8/webhook/2ba10d43"
)
LINKEDIN_POSTS_WEBHOOK_URL = os.getenv(
    "LINKEDIN_POSTS_WEBHOOK_URL",
    "https://api.agent.ai/v1/agent/p4hl6dhlhp9txrg7/webhook/a55a1a47"
)
TWITTER_POSTS_WEBHOOK_URL = os.getenv(
    "TWITTER_POSTS_WEBHOOK_URL",
    "https://api.agent.ai/v1/agent/6kot83v18302uybr/webhook/11629701"
)


# Helper Functions
def parse_github_url(url: str) -> Dict[str, str]:
    """Parse GitHub URL to extract username/owner and repo name"""
    import re
    
    # Remove trailing slashes and .git
    url = url.rstrip('/').replace('.git', '')
    
    # Pattern for GitHub URLs
    # Matches: github.com/username or github.com/owner/repo
    pattern = r'github\.com/([^/]+)(?:/([^/]+))?'
    match = re.search(pattern, url)
    
    if not match:
        raise ValueError("Invalid GitHub URL format")
    
    username = match.group(1)
    repo = match.group(2) if match.group(2) else None
    
    return {"username": username, "repo": repo}


# Pydantic Models
class GitHubURLRequest(BaseModel):
    """GitHub URL request model"""
    url: str = Field(
        ...,
        description="GitHub profile or repository URL",
        example="https://github.com/yashwanth-3000/kisan"
    )


class Repository(BaseModel):
    """GitHub repository data model"""
    name: str
    full_name: str
    description: Optional[str] = None
    html_url: str
    private: bool
    fork: bool
    stars: int = Field(default=0, alias="stargazers_count")
    language: Optional[str] = None
    updated_at: str
    
    class Config:
        populate_by_name = True
        allow_population_by_field_name = True


class RepoSelectRequest(BaseModel):
    """GitIngest repository selection request"""
    repositories: List[str] = Field(
        ...,
        description="List of repository names (format: 'owner/repo')",
        example=["octocat/Hello-World", "octocat/Spoon-Knife"]
    )


class GitIngestResponse(BaseModel):
    """GitIngest single repo response"""
    repository: str
    success: bool
    summary: Optional[str] = None
    tree: Optional[str] = None
    content: Optional[str] = None  # Included if include_content=true
    error: Optional[str] = None


class GitIngestBatchResponse(BaseModel):
    """GitIngest batch response"""
    results: List[GitIngestResponse]
    total_requested: int
    successful: int
    failed: int


class ProfileRequest(BaseModel):
    """LinkedIn profile scraping request"""
    user_input: str = Field(
        ...,
        description="LinkedIn profile URL or identifier",
        example="https://www.linkedin.com/in/username"
    )


class PostsRequest(BaseModel):
    """LinkedIn posts scraping request"""
    user_input: str = Field(
        ...,
        description="LinkedIn profile URL or identifier to fetch posts from",
        example="https://www.linkedin.com/in/pyashwanthkrishna"
    )


class TwitterPostsRequest(BaseModel):
    """Twitter posts scraping request"""
    user_input: str = Field(
        ...,
        description="Twitter username (without @) to fetch tweets from",
        example="pyashwanth3000"
    )


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
        print(f"📦 Starting GitIngest for: {github_url}")
        loop = asyncio.get_event_loop()
        ingest_func = partial(ingest, github_url, token=use_token if use_token else None)
        summary, tree, content = await loop.run_in_executor(None, ingest_func)
        print(f"✅ GitIngest completed for: {repo_full_name}")
        
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
        print(f"❌ GitIngest error for {repo_full_name}: {type(e).__name__}: {str(e)}")
        import traceback
        traceback.print_exc()
        return {
            "repository": repo_full_name,
            "success": False,
            "summary": None,
            "tree": None,
            "content": None,
            "error": f"Failed to process with GitIngest: {str(e)}"
        }


async def fetch_linkedin_profile(user_input: str, max_wait_seconds: int = 60) -> Dict[str, Any]:
    """
    Fetch LinkedIn profile data using Agent.ai webhook for LinkedIn profile scraping
    
    This is a two-step process:
    1. POST to start the LinkedIn profile scraping agent
    2. Poll GET endpoint for results
    
    Args:
        user_input: LinkedIn profile URL or username
        max_wait_seconds: Maximum time to wait for profile data
        
    Returns:
        Dict with success status, profile data, and optional error message
    """
    import time
    
    try:
        # Step 1: Start the LinkedIn profile scraping agent
        start_url = f"{LINKEDIN_PROFILE_WEBHOOK_URL}/async"
        payload = {"user_input": user_input}
        
        print(f"Starting agent for profile: {user_input}")
        response = requests.post(
            start_url,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        response.raise_for_status()
        
        data = response.json()
        run_id = data.get("run_id")
        
        if not run_id:
            return {
                "success": False,
                "data": None,
                "error": "Failed to start agent: No run_id received"
            }
        
        print(f"LinkedIn profile scraping agent started with run_id: {run_id}")
        
        # Step 2: Poll for LinkedIn profile results
        status_url = f"{LINKEDIN_PROFILE_WEBHOOK_URL}/status/{run_id}"
        start_time = time.time()
        poll_interval = 2  # Start with 2 seconds
        
        while time.time() - start_time < max_wait_seconds:
            print(f"Polling status... (elapsed: {int(time.time() - start_time)}s)")
            
            try:
                status_response = requests.get(status_url, timeout=10)
                
                # Status 200 means we have results
                if status_response.status_code == 200:
                    result_data = status_response.json()
                    profile_data = result_data.get("response")
                    
                    if profile_data:
                        print("✅ Profile data received!")
                        return {
                            "success": True,
                            "data": profile_data,
                            "error": None,
                            "run_id": run_id
                        }
                
                # Status 204 means still processing
                elif status_response.status_code == 204:
                    print("⏳ Still processing...")
                    await asyncio.sleep(poll_interval)
                    # Gradually increase poll interval up to 5 seconds
                    poll_interval = min(poll_interval + 0.5, 5)
                    continue
                
                else:
                    return {
                        "success": False,
                        "data": None,
                        "error": f"Unexpected status code: {status_response.status_code}",
                        "run_id": run_id
                    }
                    
            except requests.RequestException as e:
                print(f"Error polling status: {str(e)}")
                await asyncio.sleep(poll_interval)
                continue
        
        # Timeout
        return {
            "success": False,
            "data": None,
            "error": f"Timeout after {max_wait_seconds} seconds. Profile may still be processing.",
            "run_id": run_id
        }
        
    except requests.RequestException as e:
        return {
            "success": False,
            "data": None,
            "error": f"Failed to start agent: {str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "data": None,
            "error": f"Unexpected error: {str(e)}"
        }


async def fetch_linkedin_posts(user_input: str, max_wait_seconds: int = 60) -> Dict[str, Any]:
    """
    Fetch LinkedIn posts data using Agent.ai webhook for LinkedIn posts scraping
    
    This is a two-step process:
    1. POST to start the LinkedIn posts scraping agent
    2. Poll GET endpoint for results
    
    Args:
        user_input: LinkedIn profile URL or username
        max_wait_seconds: Maximum time to wait for posts data
        
    Returns:
        Dict with success status, posts data, and optional error message
    """
    import time
    
    try:
        # Step 1: Start the LinkedIn posts scraping agent
        start_url = f"{LINKEDIN_POSTS_WEBHOOK_URL}/async"
        payload = {"user_input": user_input}
        
        print(f"Starting LinkedIn posts scraping agent for: {user_input}")
        response = requests.post(
            start_url,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        response.raise_for_status()
        
        data = response.json()
        run_id = data.get("run_id")
        
        if not run_id:
            return {
                "success": False,
                "data": None,
                "error": "Failed to start agent: No run_id received"
            }
        
        print(f"LinkedIn posts scraping agent started with run_id: {run_id}")
        
        # Step 2: Poll for LinkedIn posts results
        status_url = f"{LINKEDIN_POSTS_WEBHOOK_URL}/status/{run_id}"
        start_time = time.time()
        poll_interval = 2  # Start with 2 seconds
        
        while time.time() - start_time < max_wait_seconds:
            print(f"Polling posts status... (elapsed: {int(time.time() - start_time)}s)")
            
            try:
                status_response = requests.get(status_url, timeout=10)
                
                # Status 200 means we have results
                if status_response.status_code == 200:
                    result_data = status_response.json()
                    posts_data = result_data.get("response")
                    
                    if posts_data:
                        print("✅ LinkedIn posts data received!")
                        return {
                            "success": True,
                            "data": posts_data,
                            "error": None,
                            "run_id": run_id
                        }
                
                # Status 204 means still processing
                elif status_response.status_code == 204:
                    print("⏳ Still processing posts...")
                    await asyncio.sleep(poll_interval)
                    # Gradually increase poll interval up to 5 seconds
                    poll_interval = min(poll_interval + 0.5, 5)
                    continue
                
                else:
                    return {
                        "success": False,
                        "data": None,
                        "error": f"Unexpected status code: {status_response.status_code}",
                        "run_id": run_id
                    }
                    
            except requests.RequestException as e:
                print(f"Error polling posts status: {str(e)}")
                await asyncio.sleep(poll_interval)
                continue
        
        # Timeout
        return {
            "success": False,
            "data": None,
            "error": f"Timeout after {max_wait_seconds} seconds. Posts may still be processing.",
            "run_id": run_id
        }
        
    except requests.RequestException as e:
        return {
            "success": False,
            "data": None,
            "error": f"Failed to start agent: {str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "data": None,
            "error": f"Unexpected error: {str(e)}"
        }


def is_retweet(tweet: Dict[str, Any]) -> bool:
    """Check if tweet text starts with 'RT @' (retweet indicator)"""
    text = tweet.get("text", "")
    return text.startswith("RT @")


def filter_original_tweets(tweets_data: Any) -> Dict[str, Any]:
    """Filter retweets, return original tweets with stats (total, original, filtered counts)"""
    if not isinstance(tweets_data, list):
        return {
            "original_tweets": tweets_data,
            "total_fetched": 0,
            "original_count": 0,
            "retweets_filtered": 0
        }
    
    original_tweets = [tweet for tweet in tweets_data if not is_retweet(tweet)]
    total_fetched = len(tweets_data)
    original_count = len(original_tweets)
    retweets_filtered = total_fetched - original_count
    
    print(f"📊 Filtered: {total_fetched} total → {original_count} original ({retweets_filtered} retweets removed)")
    
    return {
        "original_tweets": original_tweets,
        "total_fetched": total_fetched,
        "original_count": original_count,
        "retweets_filtered": retweets_filtered
    }


async def fetch_twitter_posts(user_input: str, max_wait_seconds: int = 60, include_retweets: bool = False) -> Dict[str, Any]:
    """
    Fetch Twitter posts via Agent.ai webhook (2-step: start agent, poll results, filter retweets by default)
    Returns: {success, data, error, run_id, stats (if filtered)}
    """
    import time
    
    try:
        # Start agent
        start_url = f"{TWITTER_POSTS_WEBHOOK_URL}/async"
        payload = {"user_input": user_input}
        
        print(f"🐦 Starting Twitter scrape for: {user_input}")
        response = requests.post(start_url, json=payload, headers={"Content-Type": "application/json"}, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        run_id = data.get("run_id")
        
        if not run_id:
            return {"success": False, "data": None, "error": "No run_id received"}
        
        print(f"✅ Agent started: {run_id}")
        
        # Poll for results
        status_url = f"{TWITTER_POSTS_WEBHOOK_URL}/status/{run_id}"
        start_time = time.time()
        poll_interval = 2
        
        while time.time() - start_time < max_wait_seconds:
            print(f"⏳ Polling... ({int(time.time() - start_time)}s)")
            
            try:
                status_response = requests.get(status_url, timeout=10)
                
                if status_response.status_code == 200:
                    result_data = status_response.json()
                    tweets_data = result_data.get("response")
                    
                    if tweets_data:
                        print("✅ Tweets received!")
                        
                        # Filter retweets if requested
                        if not include_retweets:
                            filter_result = filter_original_tweets(tweets_data)
                            return {
                                "success": True,
                                "data": filter_result["original_tweets"],
                                "error": None,
                                "run_id": run_id,
                                "stats": {
                                    "total_fetched": filter_result["total_fetched"],
                                    "original_count": filter_result["original_count"],
                                    "retweets_filtered": filter_result["retweets_filtered"]
                                }
                            }
                        else:
                            return {"success": True, "data": tweets_data, "error": None, "run_id": run_id}
                
                elif status_response.status_code == 204:
                    await asyncio.sleep(poll_interval)
                    poll_interval = min(poll_interval + 0.5, 5)
                    continue
                
                else:
                    return {"success": False, "data": None, "error": f"Status: {status_response.status_code}", "run_id": run_id}
                    
            except requests.RequestException as e:
                print(f"❌ Poll error: {str(e)}")
                await asyncio.sleep(poll_interval)
                continue
        
        return {"success": False, "data": None, "error": f"Timeout after {max_wait_seconds}s", "run_id": run_id}
        
    except requests.RequestException as e:
        return {"success": False, "data": None, "error": f"Agent start failed: {str(e)}"}
    except Exception as e:
        return {"success": False, "data": None, "error": f"Unexpected: {str(e)}"}


# API Endpoints
@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Welcome to MakeMyCv API",
        "version": "1.0.0",
        "description": "API for GitHub repository analysis, LinkedIn & Twitter data scraping",
        "endpoints": {
            "POST /get-repos": "Get GitHub repositories by profile URL",
            "POST /analyze-repo": "Analyze single repository by URL",
            "POST /analyze-repos-batch": "Batch analyze multiple repositories",
            "POST /linkedin-profile": {
                "description": "Get LinkedIn profile details (scrapes LinkedIn profile data)",
                "input": "Requires full LinkedIn profile URL",
                "note": "Retrieves comprehensive profile information"
            },
            "POST /linkedin-posts": {
                "description": "Get LinkedIn posts from a profile",
                "input": "Requires full LinkedIn profile URL",
                "retrieves": "Past 50 posts from the profile",
                "note": "Includes engagement metrics, attachments, and author info"
            },
            "POST /twitter-posts": {
                "description": "Get Twitter posts from a user (filters out retweets by default)",
                "input": "Requires Twitter username (without @)",
                "retrieves": "Past 50 recent tweets from the user (original tweets only)",
                "filtering": "Automatically removes retweets (tweets starting with 'RT @')",
                "note": "Includes engagement metrics, timestamps, and media. Use ?include_retweets=true to include retweets."
            },
            "GET /health": "Health check endpoint"
        },
        "webhooks": {
            "linkedin_profile": "Agent.ai webhook for LinkedIn profile scraping",
            "linkedin_posts": "Agent.ai webhook for LinkedIn posts scraping (past 50 posts)",
            "twitter_posts": "Agent.ai webhook for Twitter posts scraping (past 50 tweets)"
        }
    }


@app.get("/health")
async def health_check():
    """Enhanced health check with system status and configuration info"""
    import platform
    import sys
    from datetime import datetime
    
    return {
        "status": "healthy",
        "service": "MakeMyCv API",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "endpoints": {
            "total": 8,
            "available": ["GET /", "GET /health", "POST /get-repos", "POST /analyze-repo",
                         "POST /analyze-repos-batch", "POST /linkedin-profile", "POST /linkedin-posts", 
                         "POST /twitter-posts"]
        },
        "configuration": {
            "github_token": "configured" if DEFAULT_GITHUB_TOKEN else "not_configured",
            "linkedin_profile_webhook": "configured" if LINKEDIN_PROFILE_WEBHOOK_URL else "not_configured",
            "linkedin_posts_webhook": "configured" if LINKEDIN_POSTS_WEBHOOK_URL else "not_configured",
            "twitter_posts_webhook": "configured" if TWITTER_POSTS_WEBHOOK_URL else "not_configured",
            "cors": "enabled"
        },
        "system": {
            "python_version": f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}",
            "platform": platform.system(),
            "architecture": platform.machine()
        },
        "features": {
            "github_repos": True,
            "gitingest": True,
            "linkedin_scraping": True,
            "twitter_scraping": True,
            "retweet_filtering": True
        }
    }


@app.post("/get-repos", response_model=List[Repository])
async def get_repos_by_url(
    request: GitHubURLRequest,
    repo_type: str = "all",
    sort: str = "updated",
    per_page: int = 100,
    authorization: Optional[str] = Header(None)
):
    """
    Get all repositories for a GitHub user by profile URL.
    
    Parameters:
    - **url**: GitHub profile URL (e.g., https://github.com/username)
    - **repo_type**: Type of repositories (all, owner, member) - default: all
    - **sort**: Sort by (created, updated, pushed, full_name) - default: updated
    - **per_page**: Results per page (max 100) - default: 100
    - **authorization**: Optional GitHub token in header (format: "token YOUR_TOKEN")
    
    Returns:
    - List of repositories with detailed information
    
    Example request body:
    ```json
    {
        "url": "https://github.com/yashwanth-3000"
    }
    ```
    """
    try:
        # Parse GitHub URL to extract username
        parsed = parse_github_url(request.url)
        username = parsed["username"]
        
        # Extract token from authorization header if provided
        token = None
        if authorization and authorization.startswith("token "):
            token = authorization.split("token ")[1]
        
        repos = await fetch_github_repos(username, repo_type, sort, per_page, token)
        
        # Transform repos to match our model
        transformed_repos = []
        for repo in repos:
            try:
                repo_data = {
                    "name": repo.get("name"),
                    "full_name": repo.get("full_name"),
                    "description": repo.get("description"),
                    "html_url": repo.get("html_url"),
                    "private": repo.get("private", False),
                    "fork": repo.get("fork", False),
                    "stars": repo.get("stargazers_count", 0),
                    "language": repo.get("language"),
                    "updated_at": repo.get("updated_at"),
                }
                transformed_repos.append(Repository(**repo_data))
            except Exception as e:
                print(f"Error parsing repo {repo.get('name', 'unknown')}: {str(e)}")
                continue
        
        return transformed_repos
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_repos_by_url: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch repositories: {str(e)}")


@app.post("/analyze-repos-batch", response_model=GitIngestBatchResponse)
async def analyze_repos_batch(
    request: RepoSelectRequest,
    include_content: bool = False,
    authorization: Optional[str] = Header(None)
):
    """
    Get GitIngest extracts for selected repositories.
    
    Parameters:
    - **repositories**: List of GitHub repository URLs or "owner/repo" format
    - **include_content**: Set to true to include full code content (default: false - returns detailed summary)
    - **authorization**: Optional GitHub token in header (format: "token YOUR_TOKEN")
    
    Returns:
    - Batch response with GitIngest data for each repository including:
      - summary: Basic statistics (file count, tokens, commit)
      - tree: Directory structure visualization
      - content: **DEFAULT (false)**: Detailed analysis summary (file categories, technologies, insights)
               **WITH include_content=true**: Full codebase with all source code (~100x larger)
    
    Example request body (URLs):
    ```json
    {
        "repositories": [
            "https://github.com/octocat/Hello-World",
            "https://github.com/torvalds/linux"
        ]
    }
    ```
    
    Or owner/repo format:
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
    
    for repo_input in request.repositories:
        try:
            # Check if input is a URL or owner/repo format
            if repo_input.startswith("http://") or repo_input.startswith("https://"):
                # Parse URL to extract owner/repo
                parsed = parse_github_url(repo_input)
                username = parsed["username"]
                repo = parsed.get("repo")
                
                if not repo:
                    results.append({
                        "repository": repo_input,
                        "success": False,
                        "summary": None,
                        "tree": None,
                        "content": None,
                        "error": "Invalid repository URL. Must include repository name (e.g., github.com/owner/repo)"
                    })
                    continue
                
                repo_name = f"{username}/{repo}"
            else:
                # Assume owner/repo format
                if "/" not in repo_input:
                    results.append({
                        "repository": repo_input,
                        "success": False,
                        "summary": None,
                        "tree": None,
                        "content": None,
                        "error": "Invalid repository format. Use 'owner/repo' or full GitHub URL"
                    })
                    continue
                repo_name = repo_input
            
            result = await fetch_gitingest(repo_name, token, include_content)
            results.append(result)
            
        except ValueError as e:
            results.append({
                "repository": repo_input,
                "success": False,
                "summary": None,
                "tree": None,
                "content": None,
                "error": f"Failed to parse repository: {str(e)}"
            })
        except Exception as e:
            results.append({
                "repository": repo_input,
                "success": False,
                "summary": None,
                "tree": None,
                "content": None,
                "error": f"Unexpected error: {str(e)}"
            })
    
    successful = sum(1 for r in results if r["success"])
    failed = len(results) - successful
    
    return GitIngestBatchResponse(
        results=results,
        total_requested=len(request.repositories),
        successful=successful,
        failed=failed
    )


@app.post("/analyze-repo")
async def analyze_repo_by_url(
    request: GitHubURLRequest,
    include_content: bool = False,
    authorization: Optional[str] = Header(None)
):
    """
    Get GitIngest extract for a repository by URL.
    
    Parameters:
    - **url**: GitHub repository URL (e.g., https://github.com/owner/repo)
    - **include_content**: Set to true for full code (default: false - returns detailed summary)
    - **authorization**: Optional GitHub token in header (format: "token YOUR_TOKEN")
    
    Returns:
    - GitIngest extract data including:
      - summary: Basic repo statistics (file count, tokens, commit hash)
      - tree: Complete directory structure
      - content: **DEFAULT**: Intelligent summary (file analysis, technologies, categories)
                **WITH ?include_content=true**: Full source code of all files
    
    Example request body:
    ```json
    {
        "url": "https://github.com/yashwanth-3000/kisan"
    }
    ```
    
    💡 The detailed summary analyzes all files but returns insights instead of code,
       saving ~100x in tokens while providing comprehensive repository understanding.
    """
    try:
        # Parse GitHub URL to extract owner and repo
        parsed = parse_github_url(request.url)
        username = parsed["username"]
        repo = parsed.get("repo")
        
        if not repo:
            raise HTTPException(
                status_code=400,
                detail="Invalid repository URL. Must include repository name (e.g., github.com/owner/repo)"
            )
        
        # Extract token from authorization header if provided
        token = None
        if authorization and authorization.startswith("token "):
            token = authorization.split("token ")[1]
        
        repo_full_name = f"{username}/{repo}"
        result = await fetch_gitingest(repo_full_name, token, include_content)
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])
        
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error in get_gitingest_by_url: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to process repository: {str(e)}")


@app.post("/linkedin-profile")
async def get_linkedin_profile(
    request: ProfileRequest,
    max_wait: int = 60
):
    """
    Get LinkedIn profile details using Agent.ai webhook for LinkedIn profile scraping.
    
    This endpoint scrapes and fetches comprehensive LinkedIn profile data including:
    - Basic information (name, title, location, profile picture, background image)
    - Education history (schools, degrees, dates)
    - Work experience (companies, positions, descriptions)
    - Skills and endorsements
    - Certifications and licenses
    - Projects and publications
    - Awards and achievements
    - Languages and more
    
    Parameters:
    - **user_input**: LinkedIn profile URL or identifier 
      Examples: 
        - "https://www.linkedin.com/in/username"
        - "https://www.linkedin.com/in/pyashwanthkrishna"
        - "username"
    - **max_wait**: Maximum seconds to wait for profile data (default: 60, range: 10-120)
    
    Returns:
    - Comprehensive LinkedIn profile data in JSON format with the following structure:
      - success: Boolean indicating if the operation was successful
      - profile: Complete LinkedIn profile data object
      - run_id: Agent.ai run identifier for tracking
    
    Example request body:
    ```json
    {
        "user_input": "https://www.linkedin.com/in/pyashwanthkrishna"
    }
    ```
    
    Note: This is an async operation that may take 10-60 seconds depending on the profile complexity.
    The endpoint will poll the LinkedIn profile scraping agent until results are ready or timeout is reached.
    """
    result = await fetch_linkedin_profile(request.user_input, max_wait)
    
    if not result["success"]:
        raise HTTPException(
            status_code=500 if "Timeout" not in result["error"] else 408,
            detail=result["error"]
        )
    
    return {
        "success": True,
        "profile": result["data"],
        "run_id": result.get("run_id")
    }


@app.post("/linkedin-posts")
async def get_linkedin_posts(
    request: PostsRequest,
    max_wait: int = 60
):
    """
    Get LinkedIn posts from a profile using Agent.ai webhook for LinkedIn posts scraping.
    
    This endpoint scrapes and fetches LinkedIn posts data including:
    - Post content and commentary
    - Engagement metrics (likes, comments, shares, reactions breakdown)
    - Post attachments (videos, images, documents)
    - Author information
    - Post timestamps and URLs
    - Reshared activity details
    
    Parameters:
    - **user_input**: LinkedIn profile URL or identifier to fetch posts from
      Examples: 
        - "https://www.linkedin.com/in/username"
        - "https://www.linkedin.com/in/pyashwanthkrishna"
        - "username" or "pyashwanthkrishna"
    - **max_wait**: Maximum seconds to wait for posts data (default: 60, range: 10-120)
    
    Returns:
    - LinkedIn posts data in JSON format with the following structure:
      - success: Boolean indicating if the operation was successful
      - posts: Dictionary containing posts array with detailed post information
      - run_id: Agent.ai run identifier for tracking
    
    Example request body:
    ```json
    {
        "user_input": "https://www.linkedin.com/in/pyashwanthkrishna"
    }
    ```
    
    Example response structure:
    ```json
    {
        "success": true,
        "posts": {
            "pyashwanthkrishna": {
                "posts": [
                    {
                        "activity_id": "...",
                        "commentary": "...",
                        "num_comments": 11,
                        "num_reactions": 74,
                        "reaction_breakdown": {"like": 69, "praise": 3},
                        "li_url": "...",
                        "attachments": [...]
                    }
                ],
                "post_count": 19
            }
        },
        "run_id": "run-..."
    }
    ```
    
    Note: This is an async operation that may take 10-60 seconds depending on the number of posts.
    The endpoint will poll the LinkedIn posts scraping agent until results are ready or timeout is reached.
    """
    result = await fetch_linkedin_posts(request.user_input, max_wait)
    
    if not result["success"]:
        raise HTTPException(
            status_code=500 if "Timeout" not in result["error"] else 408,
            detail=result["error"]
        )
    
    return {
        "success": True,
        "posts": result["data"],
        "run_id": result.get("run_id")
    }


@app.post("/twitter-posts")
async def get_twitter_posts(
    request: TwitterPostsRequest,
    max_wait: int = 60,
    include_retweets: bool = False
):
    """
    Get Twitter posts from a user using Agent.ai webhook for Twitter posts scraping.
    
    **By default, this endpoint filters out retweets and only returns original tweets.**
    Retweets are identified by checking if the tweet text starts with "RT @".
    
    This endpoint scrapes and fetches Twitter posts (tweets) data including:
    - Tweet text content
    - Engagement metrics (retweets, replies, likes, quotes, bookmarks, impressions)
    - Tweet timestamps and creation dates
    - Edit history
    - Tweet IDs for direct linking
    
    Parameters:
    - **user_input**: Twitter username (without @) to fetch tweets from
      Examples: 
        - "pyashwanth3000"
        - "elonmusk"
        - "OpenAI"
    - **max_wait**: Maximum seconds to wait for tweets data (default: 60, range: 10-120)
    - **include_retweets**: If False (default), filters out retweets. If True, includes all tweets.
    
    Returns:
    - Twitter posts data in JSON format with the following structure:
      - success: Boolean indicating if the operation was successful
      - tweets: Array containing tweet objects (ONLY original tweets by default)
      - run_id: Agent.ai run identifier for tracking
      - stats: Filtering statistics (only when include_retweets=False)
        - total_fetched: Total number of tweets fetched from API
        - original_count: Number of original tweets (filtered)
        - retweets_filtered: Number of retweets that were filtered out
    
    Example request body:
    ```json
    {
        "user_input": "pyashwanth3000"
    }
    ```
    
    Example response structure (with filtering):
    ```json
    {
        "success": true,
        "tweets": [
            {
                "id": "1960432525534171432",
                "text": "My original tweet here...",
                "created_at": "2025-08-26T20:01:51.000Z",
                "public_metrics": {
                    "retweet_count": 10,
                    "reply_count": 5,
                    "like_count": 50,
                    "quote_count": 2,
                    "bookmark_count": 3,
                    "impression_count": 1000
                }
            }
        ],
        "run_id": "run-...",
        "stats": {
            "total_fetched": 50,
            "original_count": 30,
            "retweets_filtered": 20
        }
    }
    ```
    
    Note: 
    - This is an async operation that may take 10-60 seconds.
    - The endpoint will poll the Twitter posts scraping agent until results are ready.
    - By default, retweets (tweets starting with "RT @") are filtered out.
    - Use ?include_retweets=true to get all tweets including retweets.
    """
    result = await fetch_twitter_posts(request.user_input, max_wait, include_retweets)
    
    if not result["success"]:
        raise HTTPException(
            status_code=500 if "Timeout" not in result["error"] else 408,
            detail=result["error"]
        )
    
    response = {
        "success": True,
        "tweets": result["data"],
        "run_id": result.get("run_id")
    }
    
    # Add filtering stats if available
    if "stats" in result:
        response["stats"] = result["stats"]
    
    return response


if __name__ == "__main__":
    import uvicorn
    import os
    
    port = int(os.getenv("PORT", 8000))  # Railway provides PORT env var
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=False,  # Disabled for GitIngest stability with long-running git operations
        log_level="info"
    )

