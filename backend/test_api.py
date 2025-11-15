"""
Test script for GitIngest API
Run this after starting the API server to test endpoints
"""

import requests
import json
from typing import List, Dict

# Configuration
BASE_URL = "http://localhost:8000"
TEST_USERNAME = "octocat"  # GitHub's mascot account with public repos


def print_section(title: str):
    """Print a formatted section header"""
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60 + "\n")


def test_health_check():
    """Test the health check endpoint"""
    print_section("Testing Health Check Endpoint")
    
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def test_get_repositories(username: str = TEST_USERNAME):
    """Test getting user repositories"""
    print_section(f"Testing Get Repositories for '{username}'")
    
    try:
        response = requests.get(f"{BASE_URL}/repos/{username}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            repos = response.json()
            print(f"✅ Found {len(repos)} repositories\n")
            
            # Display first 3 repos
            for i, repo in enumerate(repos[:3], 1):
                print(f"{i}. {repo['name']}")
                print(f"   Full Name: {repo['full_name']}")
                print(f"   Description: {repo['description']}")
                print(f"   Language: {repo['language']}")
                print(f"   Stars: {repo['stars']}")
                print(f"   URL: {repo['html_url']}\n")
            
            if len(repos) > 3:
                print(f"... and {len(repos) - 3} more repositories")
            
            return repos
        else:
            print(f"❌ Error: {response.text}")
            return []
    except Exception as e:
        print(f"❌ Error: {e}")
        return []


def test_gitingest_single(owner: str = TEST_USERNAME, repo: str = "Hello-World"):
    """Test getting GitIngest extract for a single repository"""
    print_section(f"Testing Single GitIngest Extract for '{owner}/{repo}'")
    
    try:
        response = requests.get(f"{BASE_URL}/gitingest/{owner}/{repo}")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            if result['success']:
                summary_length = len(result['summary']) if result['summary'] else 0
                tree_length = len(result['tree']) if result['tree'] else 0
                content_length = len(result['content']) if result['content'] else 0
                print(f"✅ Successfully fetched GitIngest extract")
                print(f"   Repository: {result['repository']}")
                print(f"   Summary Length: {summary_length} characters")
                print(f"   Tree Length: {tree_length} characters")
                print(f"   Content Length: {content_length} characters")
                
                # Show preview of summary
                if result['summary']:
                    print(f"\n   Summary Preview:")
                    print(f"   {'-' * 50}")
                    print(f"   {result['summary'][:300]}...")
                    print(f"   {'-' * 50}")
                
                return result
            else:
                print(f"❌ Failed: {result['error']}")
                return None
        else:
            print(f"❌ Error: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None


def test_gitingest_batch(repositories: List[str]):
    """Test getting GitIngest extracts for multiple repositories"""
    print_section("Testing Batch GitIngest Extracts")
    
    print(f"Repositories to process: {', '.join(repositories)}\n")
    
    try:
        payload = {"repositories": repositories}
        response = requests.post(
            f"{BASE_URL}/gitingest",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Batch Request Completed")
            print(f"   Total Requested: {result['total_requested']}")
            print(f"   Successful: {result['successful']}")
            print(f"   Failed: {result['failed']}\n")
            
            # Display results for each repository
            for i, res in enumerate(result['results'], 1):
                print(f"{i}. {res['repository']}")
                if res['success']:
                    summary_len = len(res['summary']) if res['summary'] else 0
                    tree_len = len(res['tree']) if res['tree'] else 0
                    content_len = len(res['content']) if res['content'] else 0
                    print(f"   ✅ Success")
                    print(f"      Summary: {summary_len} chars | Tree: {tree_len} chars | Content: {content_len} chars")
                else:
                    print(f"   ❌ Failed - Error: {res['error']}")
                print()
            
            return result
        else:
            print(f"❌ Error: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None


def test_root_endpoint():
    """Test the root endpoint"""
    print_section("Testing Root Endpoint")
    
    try:
        response = requests.get(BASE_URL)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        return response.status_code == 200
    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def main():
    """Run all tests"""
    print("\n" + "🚀" * 30)
    print("  GitIngest API Test Suite")
    print("🚀" * 30)
    
    # Check if API is running
    print("\n📡 Checking if API server is running...")
    try:
        response = requests.get(BASE_URL, timeout=2)
        print("✅ API server is running!\n")
    except Exception as e:
        print(f"❌ Cannot connect to API server at {BASE_URL}")
        print(f"   Error: {e}")
        print("\n💡 Make sure the server is running:")
        print("   python main.py")
        return
    
    # Run tests
    test_root_endpoint()
    test_health_check()
    
    # Get repositories
    repos = test_get_repositories()
    
    # Test single GitIngest
    test_gitingest_single("octocat", "Hello-World")
    
    # Test batch GitIngest
    if repos and len(repos) >= 2:
        # Use the first 2 repos from the user's list
        repo_names = [repo['full_name'] for repo in repos[:2]]
        test_gitingest_batch(repo_names)
    else:
        # Use default test repos
        test_gitingest_batch([
            "octocat/Hello-World",
            "octocat/Spoon-Knife"
        ])
    
    print_section("Test Suite Completed")
    print("✅ All tests finished!")
    print("\n📚 Next steps:")
    print("   - Check the API documentation: http://localhost:8000/docs")
    print("   - Try with your own GitHub username")
    print("   - Add your GitHub token to .env for higher rate limits\n")


if __name__ == "__main__":
    main()

