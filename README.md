# MakeMyCv - GitHub Repository Analysis API

A FastAPI-based service that integrates with GitHub and GitIngest to provide intelligent repository analysis with **massive token savings** (98.8% reduction) by returning detailed summaries instead of full code.

## 🎯 Key Features

- **GitHub Integration**: Fetch all repositories for any GitHub user
- **Intelligent Analysis**: Extract comprehensive insights without full code
- **Token Optimization**: 83.9% smaller responses while including all markdown docs
- **Batch Processing**: Analyze multiple repositories concurrently
- **Web Interface**: Beautiful HTML UI to test all endpoints

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your GitHub token to .env
python main.py
```

Server starts on `http://localhost:8000`

### 2. Open Web Interface

```bash
cd website
# Open index.html in your browser
# Or start a local server:
python3 -m http.server 3000
```

Visit `http://localhost:3000` and start testing!

## 📁 Project Structure

```
MakeMyCv/
├── backend/                    # FastAPI backend
│   ├── main.py                # Main API application
│   ├── requirements.txt       # Python dependencies
│   ├── .env.example          # Environment variables template
│   ├── test_api.py           # API testing script
│   ├── venv/                 # Virtual environment
│   └── README.md             # Backend documentation
│
├── website/                   # Web interface
│   ├── index.html            # API testing UI
│   └── README.md             # Website documentation
│
├── README.md                  # This file
├── API_SUMMARY.md            # Complete API documentation
├── comparison_results.txt     # Sample output with all markdown docs
└── .gitignore                # Git ignore rules
```

## 💡 What Makes This Special?

### Traditional Approach (gitingest full content):
- **Size**: 1.02 MB
- **Tokens**: ~270,000
- **Use case**: When you need actual source code

### Smart Summary Approach (default):
- **Size**: 169.4 KB (6.2x smaller)
- **Tokens**: ~43,000 (83.9% reduction)
- **Includes**:
  - File categorization (Python, JS, Config, etc.)
  - Technology detection
  - Complete directory tree
  - **ALL markdown documentation content** (15+ files)
  - Key repository insights
- **Use case**: Repository understanding without code bloat

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/repos/{username}` | GET | List user repositories |
| `/gitingest/{owner}/{repo}` | GET | Analyze single repository |
| `/gitingest` | POST | Batch analyze repositories |

**Query Parameters:**
- `include_content=false` (default): Returns detailed summary with all markdown docs
- `include_content=true`: Returns full source code content

## 📊 Example Output

The detailed summary includes:

1. **Basic Statistics**: File count, lines of code, commit hash
2. **File Categories**: Python (79 files), JavaScript (38 files), etc.
3. **Technology Stack**: Detected imports and frameworks
4. **Complete Directory Tree**: Full project structure
5. **All Markdown Files**: Full content from README.md, DOCUMENTATION.md, etc.
6. **Key Insights**: Language, Docker support, documentation count

## 🛠️ Tech Stack

- **FastAPI**: Async web framework
- **GitIngest**: Repository content extraction
- **httpx**: GitHub API client
- **Pydantic**: Data validation
- **HTML/CSS/JavaScript**: Web interface

## 📖 Documentation

- `backend/README.md` - Backend setup and API docs
- `website/README.md` - Web interface usage
- `API_SUMMARY.md` - Complete technical documentation
- `comparison_results.txt` - Sample output with full markdown content

## 🎨 Web Interface Features

- ✨ Beautiful gradient UI
- 📊 Real-time statistics (response time, size)
- 🔄 Test all endpoints interactively
- 📝 Pre-filled examples
- 🎯 Response formatting with syntax highlighting

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [GitIngest](https://github.com/coderamp-labs/gitingest) - Amazing tool for repository digests
- GitHub API - For repository data
- FastAPI - Excellent Python framework

---

**Made with ❤️ for efficient repository analysis**


