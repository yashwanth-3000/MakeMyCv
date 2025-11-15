# Backend API

FastAPI backend for GitHub repository analysis using GitIngest.

## Setup

1. **Create virtual environment** (if not already created):
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**:
```bash
pip install -r requirements.txt
```

3. **Configure environment variables**:
```bash
cp .env.example .env
# Edit .env and add your GitHub token
```

4. **Run the server**:
```bash
python main.py
```

Server will start on `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## Endpoints

- `GET /health` - Health check
- `GET /repos/{username}` - Get user repositories
- `GET /gitingest/{owner}/{repo}` - Analyze single repository
- `POST /gitingest` - Batch analyze repositories

## Testing

Run the test script:
```bash
python test_api.py
```

Or use the web interface in `../website/index.html`


