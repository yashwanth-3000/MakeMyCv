# Website - API Testing Interface

Simple HTML interface to test the MakeMyCv API endpoints.

## Usage

1. **Start the backend server** (in another terminal):
```bash
cd ../backend
source venv/bin/activate
python main.py
```

2. **Open the HTML file**:
   - Simply open `index.html` in your web browser
   - Or use a local server:
   ```bash
   # Python
   python3 -m http.server 3000
   
   # Node.js (if you have it)
   npx serve
   ```

3. **Test the API**:
   - The interface provides forms for all API endpoints
   - Enter GitHub usernames and repository names
   - Toggle options to include/exclude full code content
   - View formatted responses with statistics

## Features

- ✅ Health check endpoint
- ✅ Fetch user repositories
- ✅ Analyze single repository
- ✅ Batch repository analysis
- ✅ Response time tracking
- ✅ Response size calculation
- ✅ Beautiful UI with statistics

## Notes

- Backend must be running on `http://localhost:8000`
- The API uses CORS, so it works from any origin
- Detailed summaries include markdown documentation content
- Full code content responses can be 1+ MB in size


