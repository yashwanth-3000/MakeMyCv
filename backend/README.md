# MakeMyCv API - Backend

FastAPI service for GitHub repository analysis, GitIngest integration, and social media scraping (LinkedIn & Twitter).

---

## 🚀 Features

### 1. GitHub Repository Management
- Fetch all repositories for any GitHub user
- Support for public and private repos (with token)
- Repository metadata (name, description, stars, language, etc.)

### 2. GitIngest Integration
- **Detailed Summary Mode** (Default): 98.8% token savings
  - File categorization, technology detection, directory tree
  - 83.3x smaller than full content (~12KB vs 1MB)
- **Full Content Mode**: Complete source code extraction
  - Use `?include_content=true` when you need actual code

### 3. Social Media Scraping (Agent.ai)
- **LinkedIn Profile**: Comprehensive profile data extraction
- **LinkedIn Posts**: Past 50 posts with engagement metrics
- **Twitter Posts**: Past 50 tweets (retweets filtered by default)

---

## 📦 Setup

### 1. Create Virtual Environment
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env and add your tokens:
# - GITHUB_TOKEN (for private repos & higher rate limits)
# - LINKEDIN_PROFILE_WEBHOOK_URL (Agent.ai webhook)
# - LINKEDIN_POSTS_WEBHOOK_URL (Agent.ai webhook)
# - TWITTER_POSTS_WEBHOOK_URL (Agent.ai webhook)
```

### 4. Run Server
```bash
python main.py
```
Server: `http://localhost:8000`  
Docs: `http://localhost:8000/docs`

---

## 🔌 API Endpoints

### Health Check
```http
GET /health
```
**Returns**: Enhanced health status with system info, configuration, endpoints, and features.

**Response Example**:
```json
{
  "status": "healthy",
  "service": "MakeMyCv API",
  "version": "1.0.0",
  "timestamp": "2025-11-15T06:47:09Z",
  "endpoints": { "total": 8, "available": [...] },
  "configuration": {
    "github_token": "configured",
    "linkedin_profile_webhook": "configured",
    "linkedin_posts_webhook": "configured",
    "twitter_posts_webhook": "configured"
  },
  "system": {
    "python_version": "3.13.5",
    "platform": "Darwin",
    "architecture": "arm64"
  },
  "features": {
    "github_repos": true,
    "gitingest": true,
    "linkedin_scraping": true,
    "twitter_scraping": true,
    "retweet_filtering": true
  }
}
```

---

### GitHub Repositories
```http
GET /repos/{username}
```
**Parameters**:
- `username` (path): GitHub username
- `repo_type` (query): `all` | `owner` | `member` (default: `all`)
- `sort` (query): `updated` | `created` | `pushed` | `full_name` (default: `updated`)
- `per_page` (query): Results per page, max 100 (default: `100`)
- `authorization` (header): `token YOUR_GITHUB_TOKEN` (optional)

**Response**: Array of repository objects with name, description, stars, language, updated_at, etc.

**Example**:
```bash
curl http://localhost:8000/repos/yashwanth-3000
```

---

### GitIngest - Single Repository
```http
GET /gitingest/{owner}/{repo}
```
**Parameters**:
- `owner` (path): Repository owner
- `repo` (path): Repository name
- `include_content` (query): `true` | `false` (default: `false`)

**Modes**:
- `include_content=false` (Default): Detailed summary (~12KB, ~3k tokens)
  - File categories, technologies, directory tree, statistics
  - **98.8% token savings** vs full content
- `include_content=true`: Full source code (~1MB, ~270k tokens)
  - Complete file contents from entire repository

**Response**:
```json
{
  "repository": "owner/repo",
  "success": true,
  "summary": "Repository stats and info",
  "tree": "Directory structure",
  "content": "Detailed summary or full code (based on flag)"
}
```

**Examples**:
```bash
# Detailed summary (recommended)
curl http://localhost:8000/gitingest/yashwanth-3000/kisan

# Full content
curl "http://localhost:8000/gitingest/yashwanth-3000/kisan?include_content=true"
```

---

### GitIngest - Batch Analysis
```http
POST /gitingest
```
**Body**:
```json
{
  "repositories": ["owner/repo1", "owner/repo2"]
}
```
**Query Parameters**:
- `include_content` (query): `true` | `false` (default: `false`)

**Response**:
```json
{
  "results": [
    {
      "repository": "owner/repo1",
      "success": true,
      "summary": "...",
      "tree": "...",
      "content": "..."
    }
  ],
  "total_requested": 2,
  "successful": 2,
  "failed": 0
}
```

**Example**:
```bash
curl -X POST http://localhost:8000/gitingest \
  -H "Content-Type: application/json" \
  -d '{"repositories": ["owner/repo1", "owner/repo2"]}'
```

---

### LinkedIn Profile Scraping
```http
POST /linkedin-profile
```
**Body**:
```json
{
  "user_input": "https://www.linkedin.com/in/username"
}
```
**Query Parameters**:
- `max_wait` (query): Max seconds to wait for results (default: `60`, range: `10-120`)

**Returns**: Comprehensive LinkedIn profile data including:
- Personal info (name, title, location, summary)
- Work experience (position_groups)
- Education (schools, degrees)
- Skills, certifications, projects
- Industry, profile picture, background image

**Processing Time**: 10-60 seconds (async operation with polling)

**Example**:
```bash
curl -X POST http://localhost:8000/linkedin-profile \
  -H "Content-Type: application/json" \
  -d '{"user_input": "https://www.linkedin.com/in/pyashwanthkrishna"}'
```

---

### LinkedIn Posts Scraping
```http
POST /linkedin-posts
```
**Body**:
```json
{
  "user_input": "https://www.linkedin.com/in/username"
}
```
**Query Parameters**:
- `max_wait` (query): Max seconds to wait for results (default: `60`, range: `10-120`)

**Returns**: Past 50 LinkedIn posts with:
- Post text content
- Engagement metrics (reactions, comments, shares)
- Post timestamps
- Attachments and media
- Author information

**Processing Time**: 10-60 seconds

**Example**:
```bash
curl -X POST http://localhost:8000/linkedin-posts \
  -H "Content-Type: application/json" \
  -d '{"user_input": "https://www.linkedin.com/in/pyashwanthkrishna"}'
```

---

### Twitter Posts Scraping
```http
POST /twitter-posts
```
**Body**:
```json
{
  "user_input": "pyashwanth3000"
}
```
**Query Parameters**:
- `max_wait` (query): Max seconds to wait (default: `60`, range: `10-120`)
- `include_retweets` (query): Include retweets (default: `false`)

**Returns**: Past 50 tweets (original tweets only by default) with:
- Tweet text content
- Engagement metrics (retweets, replies, likes, quotes, impressions)
- Tweet timestamps
- Edit history
- Filtering statistics (when retweets filtered)

**Retweet Filtering**:
- **Default behavior**: Filters out retweets (tweets starting with "RT @")
- Returns only original user tweets
- Provides stats: `total_fetched`, `original_count`, `retweets_filtered`
- Use `?include_retweets=true` to include all tweets

**Response Example**:
```json
{
  "success": true,
  "tweets": [
    {
      "id": "1960432525534171432",
      "text": "My original tweet...",
      "created_at": "2025-08-26T20:01:51.000Z",
      "public_metrics": {
        "retweet_count": 10,
        "reply_count": 5,
        "like_count": 50,
        "quote_count": 2,
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

**Examples**:
```bash
# Original tweets only (default)
curl -X POST http://localhost:8000/twitter-posts \
  -H "Content-Type: application/json" \
  -d '{"user_input": "pyashwanth3000"}'

# Include retweets
curl -X POST "http://localhost:8000/twitter-posts?include_retweets=true" \
  -H "Content-Type: application/json" \
  -d '{"user_input": "pyashwanth3000"}'
```

---

## 📊 Token Savings Analysis

### GitIngest Modes Comparison

| Metric | Detailed Summary | Full Content | Savings |
|--------|------------------|--------------|---------|
| **Size** | 12.6 KB | 1.02 MB | **83.3x smaller** |
| **Tokens** | ~3,200 | ~270,000 | **98.8% saved** |
| **Processing** | 4s | 3s | Same speed |
| **Use Case** | Understanding | Code analysis | Perfect balance |

**Why same processing time?**  
GitIngest always processes the full repository internally. The `include_content` flag only affects the response payload size, not processing time.

### Use Cases

**✅ Use Detailed Summary (Default) For:**
- Repository discovery and exploration
- Technology stack identification
- Project structure understanding
- File organization insights
- Cost-effective LLM analysis

**⚠️ Use Full Content For:**
- Actual code review and analysis
- Security vulnerability scanning
- Detailed implementation study
- When you need source code

---

## 🏗️ Architecture

### Tech Stack
- **FastAPI**: Async web framework
- **GitIngest**: Official Python package for repo analysis
- **Pydantic**: Data validation
- **Requests**: HTTP client for Agent.ai webhooks
- **Asyncio**: Concurrent processing
- **CORS**: Enabled for all origins

### Key Components

#### 1. GitHub Integration
- Fetches repos via GitHub API
- Supports pagination (100 repos/page)
- Token-based auth for private repos

#### 2. GitIngest Processing
- Uses official `gitingest` package
- Thread executor for async compatibility
- Dual mode: summary vs full content
- Smart summary generation with file categorization

#### 3. Social Media Scraping
- Agent.ai webhook integration
- Two-step process: start agent → poll results
- Async polling with exponential backoff
- Automatic retweet filtering for Twitter

---

## 🧪 Testing

### Web Interface
Open `../website/index.html` in browser for interactive testing with:
- Detailed console logs
- Response visualization
- Stats display
- Tabbed interface for large responses

### Manual Testing
```bash
# Health check
curl http://localhost:8000/health

# GitHub repos
curl http://localhost:8000/repos/yashwanth-3000

# GitIngest summary
curl http://localhost:8000/gitingest/yashwanth-3000/kisan

# LinkedIn profile (requires webhook)
curl -X POST http://localhost:8000/linkedin-profile \
  -H "Content-Type: application/json" \
  -d '{"user_input": "https://www.linkedin.com/in/username"}'

# Twitter posts (filtered)
curl -X POST http://localhost:8000/twitter-posts \
  -H "Content-Type: application/json" \
  -d '{"user_input": "pyashwanth3000"}'
```

---

## 🔐 Environment Variables

```bash
# GitHub API (optional but recommended)
GITHUB_TOKEN=your_github_personal_access_token

# Agent.ai Webhooks for social media scraping
LINKEDIN_PROFILE_WEBHOOK_URL=https://api.agent.ai/v1/agent/.../webhook/...
LINKEDIN_POSTS_WEBHOOK_URL=https://api.agent.ai/v1/agent/.../webhook/...
TWITTER_POSTS_WEBHOOK_URL=https://api.agent.ai/v1/agent/.../webhook/...
```

**Benefits of GitHub Token:**
- Access to private repositories
- Higher rate limits (5000/hour vs 60/hour)
- More reliable API responses

---

## 📈 Performance Characteristics

### GitIngest Processing Time
- Small repos (<50 files): 2-3 seconds
- Medium repos (50-200 files): 3-5 seconds
- Large repos (200+ files): 5-15 seconds

### Social Media Scraping Time
- LinkedIn Profile: 10-60 seconds (avg: 20-30s)
- LinkedIn Posts: 10-60 seconds (avg: 20-30s)
- Twitter Posts: 10-60 seconds (avg: 20-30s)

*Times depend on Agent.ai processing and network conditions*

### Response Sizes

| Repository Size | Detailed Summary | Full Content | Ratio |
|----------------|------------------|--------------|-------|
| Small (20 files) | 3-5 KB | 100-200 KB | 40-60x |
| Medium (100 files) | 8-12 KB | 500KB-1MB | 60-80x |
| Large (200+ files) | 12-20 KB | 1-3 MB | 80-120x |

---

## 🔄 Project Evolution

### V1: GitHub + GitIngest Basic
- GitHub repo listing
- GitIngest integration (official package)
- Health check endpoint

### V2: Token Optimization
- Smart summary generation
- 98.8% token savings achieved
- Detailed file categorization and insights

### V3: Social Media Integration
- LinkedIn profile scraping (Agent.ai)
- LinkedIn posts scraping (past 50 posts)
- Twitter posts scraping (past 50 tweets)
- Retweet filtering for Twitter

### V4: Enhanced Features
- Enhanced health endpoint with system info
- Retweet detection and filtering
- Filtering statistics in responses
- Optimized comments and code

---

## 📝 API Response Models

### Repository Object
```json
{
  "name": "repo-name",
  "full_name": "owner/repo-name",
  "description": "Repo description",
  "html_url": "https://github.com/owner/repo",
  "private": false,
  "fork": false,
  "stars": 100,
  "language": "Python",
  "updated_at": "2025-11-15T00:00:00Z"
}
```

### GitIngest Response
```json
{
  "repository": "owner/repo",
  "success": true,
  "summary": "Repo stats",
  "tree": "Directory structure",
  "content": "Detailed summary or full code",
  "error": null
}
```

### LinkedIn Profile Response
```json
{
  "profile_id": "username",
  "first_name": "John",
  "last_name": "Doe",
  "sub_title": "Software Engineer",
  "location": {"default": "San Francisco, CA"},
  "summary": "Bio text...",
  "position_groups": [...],
  "education": [...],
  "skills": [...]
}
```

### Twitter Posts Response
```json
{
  "success": true,
  "tweets": [
    {
      "id": "...",
      "text": "Tweet text",
      "public_metrics": {
        "retweet_count": 10,
        "reply_count": 5,
        "like_count": 50
      }
    }
  ],
  "stats": {
    "total_fetched": 50,
    "original_count": 30,
    "retweets_filtered": 20
  }
}
```

---

## 🎯 Key Features Summary

✅ **GitHub Integration**: Fetch repos with full metadata  
✅ **GitIngest Analysis**: 98.8% token savings with detailed summaries  
✅ **LinkedIn Scraping**: Profile + Posts extraction  
✅ **Twitter Scraping**: Tweets with automatic retweet filtering  
✅ **Smart Filtering**: Separate original tweets from retweets  
✅ **Async Processing**: Non-blocking operations with polling  
✅ **Enhanced Health**: Comprehensive system status  
✅ **CORS Enabled**: Works with web frontends  
✅ **Error Handling**: Graceful failures with detailed messages  
✅ **Type Safety**: Pydantic models for all data  

---

## 📚 Additional Resources

- **Interactive API Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc
- **Web Test Interface**: `../website/index.html`
- **GitIngest Package**: https://github.com/coderamp-labs/gitingest
- **Agent.ai Documentation**: https://agent.ai/docs

---

## 🚀 Quick Start Commands

```bash
# Setup
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your tokens

# Run
python main.py

# Test
curl http://localhost:8000/health
curl http://localhost:8000/repos/octocat
curl http://localhost:8000/gitingest/octocat/Hello-World
```

---

## 💡 Tips

1. **Always use detailed summary mode** unless you need actual code
2. **Set GitHub token** for better rate limits and private repo access
3. **Configure Agent.ai webhooks** for social media scraping features
4. **Use web interface** for easy testing and visualization
5. **Check health endpoint** to verify configuration status
6. **Monitor response sizes** to optimize token usage
7. **Filter retweets** (default) for cleaner Twitter data analysis

---

## ✨ Bottom Line

**MakeMyCv API delivers:**
- 🎯 100% repository insights with only 1.2% of the tokens
- 🚀 Fast social media data extraction via Agent.ai
- 🔍 Smart filtering for cleaner data analysis
- 💰 Cost-effective LLM integration
- 🛠️ Production-ready with comprehensive error handling

Perfect for code discovery, tech stack analysis, and professional profile aggregation!
