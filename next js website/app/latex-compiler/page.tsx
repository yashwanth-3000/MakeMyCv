"use client"

import * as React from "react"
import { useState } from "react"
import { FileText, Loader2, AlertCircle, Download, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"

interface CompilationError {
  message: string
  stdout?: string
  stderr?: string
  suggestions?: string[]
}

export default function LatexCompilerPage() {
  const [latexCode, setLatexCode] = useState("")
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [compiling, setCompiling] = useState(false)
  const [compilationError, setCompilationError] = useState<CompilationError | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [autoFixMessage, setAutoFixMessage] = useState<string[]>([])
  const [showAutoFix, setShowAutoFix] = useState(false)
  const [hasCompiledOnce, setHasCompiledOnce] = useState(false)

  // Sample LaTeX template
  const sampleTemplate = `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{a4paper, margin=1in}

\\title{Sample Document}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
This is a sample LaTeX document. You can modify this template or write your own LaTeX code.

\\section{Features}
\\begin{itemize}
    \\item Easy to use
    \\item Real-time PDF preview
    \\item Helpful error messages
\\end{itemize}

\\section{Mathematics}
Here's an example of a mathematical equation:
\\[ E = mc^2 \\]

\\end{document}`

  const loadSampleTemplate = () => {
    setLatexCode(sampleTemplate)
    setCompilationError(null)
    setPdfUrl(null)
    setHasCompiledOnce(false)
  }

  // Handle code changes - clear PDF if editing after successful compilation
  const handleCodeChange = (newCode: string) => {
    setLatexCode(newCode)
    
    // If user edits after a successful compilation, clear the old PDF and errors
    if (hasCompiledOnce && pdfUrl) {
      // Revoke the old blob URL to free memory
      window.URL.revokeObjectURL(pdfUrl)
      setPdfUrl(null)
      setCompilationError(null)
      setHasCompiledOnce(false)
    }
  }

  // Auto-fix missing basic LaTeX structure
  const autoFixLatexCode = (code: string): { fixed: string; fixes: string[] } => {
    let fixedCode = code.trim()
    const fixes: string[] = []

    // Check and add \documentclass if missing
    if (!fixedCode.includes('\\documentclass')) {
      fixedCode = '\\documentclass{article}\n\n' + fixedCode
      fixes.push('Added \\documentclass{article}')
    }

    // Check and add \begin{document} if missing
    if (!fixedCode.includes('\\begin{document}')) {
      // Find where to insert it (after \documentclass and any preamble)
      const docClassMatch = fixedCode.match(/\\documentclass.*?\n/)
      if (docClassMatch) {
        const insertIndex = docClassMatch.index! + docClassMatch[0].length
        // Check if there's already content that looks like preamble
        const beforeContent = fixedCode.substring(0, insertIndex)
        const afterContent = fixedCode.substring(insertIndex)
        
        // Add some spacing and begin document
        fixedCode = beforeContent + '\n\\begin{document}\n\n' + afterContent
        fixes.push('Added \\begin{document}')
      } else {
        fixedCode = '\\begin{document}\n\n' + fixedCode
        fixes.push('Added \\begin{document}')
      }
    }

    // Check and add \end{document} if missing
    if (!fixedCode.includes('\\end{document}')) {
      fixedCode = fixedCode + '\n\n\\end{document}'
      fixes.push('Added \\end{document}')
    }

    return { fixed: fixedCode, fixes }
  }

  // Handle paste event with auto-fix
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    const pastedText = e.clipboardData.getData('text')
    
    // If the textarea is empty, auto-fix the pasted code
    // If there's existing content, insert as-is
    const currentCode = latexCode

    if (currentCode === '') {
      const { fixed, fixes } = autoFixLatexCode(pastedText)
      setLatexCode(fixed)
      
      // Show auto-fix notification if fixes were applied
      if (fixes.length > 0) {
        setAutoFixMessage(fixes)
        setShowAutoFix(true)
        setTimeout(() => setShowAutoFix(false), 5000)
      }
    } else {
      // Insert at cursor position without auto-fixing
      const textarea = e.currentTarget
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newCode = currentCode.substring(0, start) + pastedText + currentCode.substring(end)
      setLatexCode(newCode)
    }
  }

  // Auto-fix button handler
  const handleAutoFix = () => {
    const { fixed, fixes } = autoFixLatexCode(latexCode)
    
    if (fixes.length > 0) {
      setLatexCode(fixed)
      setAutoFixMessage(fixes)
      setShowAutoFix(true)
      setTimeout(() => setShowAutoFix(false), 5000)
      setCompilationError(null)
    } else {
      // Show message that no fixes needed
      setAutoFixMessage(['No fixes needed - LaTeX structure is complete!'])
      setShowAutoFix(true)
      setTimeout(() => setShowAutoFix(false), 3000)
    }
  }

  // Validate LaTeX code before compilation
  const validateLatexCode = (code: string): CompilationError | null => {
    const trimmedCode = code.trim()

    // Check if code is empty
    if (!trimmedCode) {
      return {
        message: "LaTeX code cannot be empty",
        suggestions: ["Add some LaTeX code to compile"]
      }
    }

    // Check for \documentclass
    if (!trimmedCode.includes('\\documentclass')) {
      return {
        message: "Missing \\documentclass declaration",
        suggestions: [
          "Add \\documentclass{article} at the beginning",
          "Common document classes: article, report, book, letter"
        ]
      }
    }

    // Check for \begin{document}
    if (!trimmedCode.includes('\\begin{document}')) {
      return {
        message: "Missing \\begin{document}",
        suggestions: [
          "Add \\begin{document} after \\documentclass",
          "All content must be inside \\begin{document} ... \\end{document}"
        ]
      }
    }

    // Check for \end{document}
    if (!trimmedCode.includes('\\end{document}')) {
      return {
        message: "Missing \\end{document}",
        suggestions: [
          "Add \\end{document} at the end of your LaTeX code",
          "Every \\begin{document} must have a matching \\end{document}"
        ]
      }
    }

    // Check for matching begin/end pairs (basic check)
    const beginCount = (trimmedCode.match(/\\begin\{/g) || []).length
    const endCount = (trimmedCode.match(/\\end\{/g) || []).length
    if (beginCount !== endCount) {
      return {
        message: "Unmatched \\begin{} and \\end{} commands",
        suggestions: [
          `Found ${beginCount} \\begin{} but ${endCount} \\end{}`,
          "Make sure every \\begin{environment} has a matching \\end{environment}"
        ]
      }
    }

    return null
  }

  // Parse error response and extract useful information
  const parseErrorResponse = (errorMessage: string): CompilationError => {
    const error: CompilationError = {
      message: "Compilation failed",
      suggestions: []
    }

    // Try to extract structured error info
    if (errorMessage.includes("STDOUT:") && errorMessage.includes("STDERR:")) {
      const stdoutMatch = errorMessage.match(/STDOUT:\s*([\s\S]*?)\s*STDERR:/i)
      const stderrMatch = errorMessage.match(/STDERR:\s*([\s\S]*?)$/i)
      
      if (stdoutMatch) error.stdout = stdoutMatch[1].trim()
      if (stderrMatch) error.stderr = stderrMatch[1].trim()
    }

    // Common error patterns and suggestions
    if (errorMessage.includes("no legal \\end found")) {
      error.message = "Missing \\end{document} or unmatched environment"
      error.suggestions = [
        "Make sure your document ends with \\end{document}",
        "Check that all \\begin{environment} have matching \\end{environment}",
        "Verify all braces { } are properly closed"
      ]
    } else if (errorMessage.includes("Fontconfig error")) {
      error.message = "Font configuration issue (backend)"
      error.suggestions = [
        "This is a server-side font configuration issue",
        "Try using basic LaTeX commands without special fonts",
        "The compilation may still work despite this warning"
      ]
    } else if (errorMessage.includes("Emergency stop")) {
      error.message = "LaTeX encountered a critical error"
      error.suggestions = [
        "Check for missing } or ] brackets",
        "Verify all \\begin{} have matching \\end{}",
        "Look for undefined commands or typos"
      ]
    } else if (errorMessage.includes("Undefined control sequence")) {
      error.message = "Unknown LaTeX command"
      error.suggestions = [
        "Check for typos in command names (e.g., \\textbf not \\textbold)",
        "Make sure required packages are included with \\usepackage{}",
        "Verify command syntax is correct"
      ]
    } else if (errorMessage.includes("Missing $ inserted")) {
      error.message = "Math mode error"
      error.suggestions = [
        "Wrap mathematical expressions with $ ... $ or \\[ ... \\]",
        "Check for unescaped special characters like _, ^, %",
        "Use \\_ to display underscores in text"
      ]
    } else {
      error.message = errorMessage.includes("Compilation error:") 
        ? errorMessage.split("Compilation error:")[1].split("at")[0].trim()
        : errorMessage
    }

    return error
  }

  const handleCompile = async () => {
    // Validate LaTeX code before sending
    const validationError = validateLatexCode(latexCode)
    if (validationError) {
      setCompilationError(validationError)
      return
    }

    setCompiling(true)
    setCompilationError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/compile-latex`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex_code: latexCode }),
      })

      if (!response.ok) {
        const error = await response.json()
        const errorMessage = error.detail || 'Compilation failed'
        const parsedError = parseErrorResponse(errorMessage)
        throw parsedError
      }

      // Create blob URL for preview
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // Clean up old URL if exists
      if (pdfUrl) {
        window.URL.revokeObjectURL(pdfUrl)
      }
      
      setPdfUrl(url)
      setShowSuccess(true)
      setHasCompiledOnce(true)
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000)
    } catch (error) {
      console.error('Compilation error:', error)
      if (error && typeof error === 'object' && 'message' in error) {
        setCompilationError(error as CompilationError)
      } else {
        setCompilationError({
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          suggestions: ["Check your LaTeX syntax", "Verify all commands are spelled correctly"]
        })
      }
      setPdfUrl(null)
    } finally {
      setCompiling(false)
    }
  }

  const handleDownloadPDF = async () => {
    // Validate LaTeX code before sending
    const validationError = validateLatexCode(latexCode)
    if (validationError) {
      setCompilationError(validationError)
      return
    }

    setCompiling(true)
    setCompilationError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/compile-latex`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex_code: latexCode }),
      })

      if (!response.ok) {
        const error = await response.json()
        const errorMessage = error.detail || 'Compilation failed'
        const parsedError = parseErrorResponse(errorMessage)
        throw parsedError
      }

      // Download the PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'document.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Compilation error:', error)
      if (error && typeof error === 'object' && 'message' in error) {
        setCompilationError(error as CompilationError)
      } else {
        setCompilationError({
          message: error instanceof Error ? error.message : 'Unknown error occurred',
          suggestions: ["Check your LaTeX syntax", "Verify all commands are spelled correctly"]
        })
      }
    } finally {
      setCompiling(false)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">LaTeX Compiler</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Paste your LaTeX code and compile to PDF
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={loadSampleTemplate}
                  disabled={compiling}
                  className="gap-2"
                  size="sm"
                >
                  Load Sample
                </Button>
                <Button
                  variant="outline"
                  onClick={handleAutoFix}
                  disabled={compiling || !latexCode.trim()}
                  className="gap-2"
                  size="sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  Auto-Fix
                </Button>
                <Button
                  onClick={handleCompile}
                  disabled={compiling || !latexCode.trim()}
                  className="gap-2"
                >
                  {compiling ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Compiling...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      Compile LaTeX
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadPDF}
                  disabled={compiling || !latexCode.trim()}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <p className="text-xs text-blue-700 flex items-center gap-2">
                <FileText className="h-3 w-3" />
                <span>
                  <span className="font-semibold">Tectonic LaTeX Engine</span> • Automatically
                  optimizes commands for compilation
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Auto-Fix Notification */}
        {showAutoFix && (
          <div className="max-w-7xl mx-auto px-6 pt-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-1">Auto-Fix Applied!</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {autoFixMessage.map((msg, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-500">✓</span>
                      <span>{msg}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => setShowAutoFix(false)}
                className="text-blue-600 hover:text-blue-800 transition-colors text-xl leading-none"
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="max-w-7xl mx-auto px-6 pt-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-900">Compilation Successful!</h3>
                <p className="text-sm text-green-700">Your PDF has been generated and is ready to view</p>
              </div>
              <button
                onClick={() => setShowSuccess(false)}
                className="text-green-600 hover:text-green-800 transition-colors text-xl leading-none"
                aria-label="Close success message"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {compilationError && (
          <div className="max-w-7xl mx-auto px-6 pt-4">
            <div className="bg-red-50 border border-red-200 rounded-lg overflow-hidden">
              {/* Error Header */}
              <div className="flex items-start gap-3 p-4 border-b border-red-200">
                <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-red-900 mb-1">Compilation Failed</h3>
                  <p className="text-sm text-red-700">{compilationError.message}</p>
                </div>
                <button
                  onClick={() => setCompilationError(null)}
                  className="text-red-600 hover:text-red-800 transition-colors text-xl leading-none"
                  aria-label="Close error"
                >
                  ×
                </button>
              </div>

              {/* Suggestions */}
              {compilationError.suggestions && compilationError.suggestions.length > 0 && (
                <div className="p-4 bg-amber-50 border-b border-red-200">
                  <h4 className="text-sm font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    Suggestions
                  </h4>
                  <ul className="space-y-1 text-sm text-amber-800">
                    {compilationError.suggestions.map((suggestion, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 mt-0.5">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Details (Collapsible) */}
              {(compilationError.stdout || compilationError.stderr) && (
                <details className="group">
                  <summary className="cursor-pointer p-4 hover:bg-red-100 transition-colors text-sm font-medium text-red-900 flex items-center gap-2">
                    <svg
                      className="h-4 w-4 transition-transform group-open:rotate-90"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    View Technical Details
                  </summary>
                  <div className="p-4 pt-0 space-y-3">
                    {compilationError.stdout && (
                      <div>
                        <h5 className="text-xs font-semibold text-gray-700 mb-1 uppercase">
                          Standard Output
                        </h5>
                        <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-x-auto font-mono">
                          {compilationError.stdout}
                        </pre>
                      </div>
                    )}
                    {compilationError.stderr && (
                      <div>
                        <h5 className="text-xs font-semibold text-gray-700 mb-1 uppercase">
                          Standard Error
                        </h5>
                        <pre className="bg-gray-900 text-red-400 p-3 rounded text-xs overflow-x-auto font-mono">
                          {compilationError.stderr}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ height: 'calc(100vh - 280px)' }}>
            {/* LaTeX Input */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b bg-gray-50 flex items-center justify-between">
                <h2 className="text-sm font-medium text-foreground">LaTeX Code</h2>
                <p className="text-xs text-muted-foreground">
                  Paste code • Auto-fixes structure automatically
                </p>
              </div>
              <div className="flex-1 overflow-hidden">
                <Textarea
                  value={latexCode}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  onPaste={handlePaste}
                  className="h-full w-full resize-none border-0 rounded-none font-mono text-sm p-4 focus-visible:ring-0"
                  placeholder="Paste your LaTeX code here...

Example:
\documentclass{article}
\begin{document}
Hello World!
\end{document}"
                  spellCheck={false}
                />
              </div>
            </div>

            {/* PDF Preview */}
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b bg-gray-50">
                <h2 className="text-sm font-medium text-foreground">PDF Preview</h2>
              </div>
              <div className="flex-1 overflow-hidden bg-gray-100 flex items-center justify-center">
                {pdfUrl ? (
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full border-0"
                    title="PDF Preview"
                  />
                ) : (
                  <div className="text-center p-8">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">No Preview Yet</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Enter LaTeX code and click &ldquo;Compile LaTeX&rdquo; to see the PDF
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

