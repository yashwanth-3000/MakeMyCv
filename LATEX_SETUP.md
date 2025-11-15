# LaTeX PDF Compilation Setup Guide

This guide explains how to set up the LaTeX compilation feature for the MakeMyCv application.

## Overview

The application includes a LaTeX CV editor with PDF compilation functionality. Users can:
- Edit LaTeX code in real-time
- See a live preview of their CV
- Compile LaTeX to PDF with all hyperlinks intact
- Download the compiled PDF

## System Requirements

### For Backend Server

The backend needs a LaTeX distribution installed to compile documents. Choose one based on your operating system:

#### macOS
```bash
# Install MacTeX (Full distribution ~4GB)
brew install --cask mactex

# Or install BasicTeX (Minimal distribution ~100MB)
brew install --cask basictex

# After BasicTeX, install required packages:
sudo tlmgr update --self
sudo tlmgr install fontawesome5 latexsym titlesec marvosym enumitem hyperref fancyhdr babel tabularx glyphtounicode lato
```

#### Ubuntu/Debian Linux
```bash
# Install TeX Live
sudo apt-get update
sudo apt-get install texlive-full

# Or for a minimal installation:
sudo apt-get install texlive-latex-base texlive-latex-extra texlive-fonts-recommended
```

#### Windows
1. Download and install [MiKTeX](https://miktex.org/download)
2. Or download [TeX Live](https://tug.org/texlive/windows.html)
3. Add the installation bin directory to your system PATH

### Verify Installation

After installation, verify that `pdflatex` is available:

```bash
pdflatex --version
```

You should see output like:
```
pdfTeX 3.141592653-2.6-1.40.24 (TeX Live 2022)
...
```

## Running the Application

### 1. Start the Backend API

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

The backend will run on `http://localhost:8000`

### 2. Start the Frontend

```bash
cd "next js website"
npm install
npm run dev
```

The frontend will run on `http://localhost:3000`

### 3. Configure API URL

Create or update `.env.local` in the Next.js project:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

For production, update this to your backend server URL.

## API Endpoint

### POST /api/compile-latex

Compiles LaTeX code to PDF.

**Request Body:**
```json
{
  "latex_code": "\\documentclass{article}\\begin{document}Hello World\\end{document}"
}
```

**Response:**
- Success: Returns PDF file with `Content-Type: application/pdf`
- Error: Returns JSON with error details

**Example using curl:**
```bash
curl -X POST http://localhost:8000/api/compile-latex \
  -H "Content-Type: application/json" \
  -d '{"latex_code": "\\documentclass{article}\\begin{document}Hello World\\end{document}"}' \
  --output test.pdf
```

## Troubleshooting

### "pdflatex not found" Error

This means the LaTeX distribution is not installed or not in the system PATH.

**Solution:**
1. Install a LaTeX distribution (see System Requirements above)
2. Verify installation: `pdflatex --version`
3. On Windows, make sure to add the installation bin directory to PATH
4. Restart your terminal/IDE after installation

### Compilation Timeout

If compilation takes too long (>30 seconds), the request will timeout.

**Solution:**
- Check if the LaTeX code has infinite loops
- Simplify complex documents
- Increase timeout in `backend/main.py` if needed

### Missing LaTeX Packages

If you see errors about missing packages:

**macOS/Linux:**
```bash
sudo tlmgr install <package-name>
```

**Windows (MiKTeX):**
- MiKTeX will prompt to install missing packages automatically
- Or use MiKTeX Package Manager (GUI)

### Hyperlinks Not Working

Make sure your LaTeX document includes:
```latex
\usepackage[hidelinks]{hyperref}
```

And use proper link commands:
```latex
\href{https://example.com}{Link Text}
\url{https://example.com}
```

## Production Deployment

### Railway/Heroku

Add a buildpack for TeX Live:

1. Create a `.tex-live-packages` file listing required packages
2. Add the following to your deployment configuration:

**Railway:**
```toml
[build]
  builder = "NIXPACKS"

[deploy]
  startCommand = "python main.py"
```

**Heroku:**
```bash
heroku buildpacks:add https://github.com/Thermondo/heroku-buildpack-tex
```

### Docker

Create a `Dockerfile` for the backend:

```dockerfile
FROM python:3.11-slim

# Install TeX Live
RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-fonts-extra \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["python", "main.py"]
```

Build and run:
```bash
docker build -t makemycv-backend .
docker run -p 8000:8000 makemycv-backend
```

## Security Considerations

1. **Resource Limits**: LaTeX compilation can be resource-intensive. Consider:
   - Rate limiting the endpoint
   - Setting memory/CPU limits
   - Implementing user quotas

2. **Input Validation**: The current implementation accepts any LaTeX code. Consider:
   - Sanitizing input to prevent malicious code
   - Blocking shell escape sequences
   - Using a sandboxed LaTeX environment

3. **File Cleanup**: Temporary files are automatically cleaned up, but monitor disk usage in production.

## Features

### Supported LaTeX Features

The CV editor supports:
- ✅ Custom fonts (Lato, etc.)
- ✅ Hyperlinks (internal and external)
- ✅ Icons (FontAwesome5)
- ✅ Custom colors
- ✅ Tables and lists
- ✅ Custom commands and macros
- ✅ Multiple compilation passes for references

### Generated PDF

The compiled PDF includes:
- All hyperlinks are clickable
- Professional formatting
- ATS-friendly structure
- Proper font embedding
- Optimized file size

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify system requirements are met
3. Check backend logs for detailed error messages
4. Test LaTeX compilation manually: `pdflatex test.tex`

## License

MIT License - See main project LICENSE file

