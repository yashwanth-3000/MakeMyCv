"use client"

import * as React from "react"
import { useState } from "react"
import { Download, FileText, Copy, Check, Eye, Code, Mail, Linkedin, Github, Loader2, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const defaultLatexTemplate = ``

export default function CVEditorPage() {
  const [latexCode, setLatexCode] = useState(defaultLatexTemplate)
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [compiling, setCompiling] = useState(false)
  const [compilationError, setCompilationError] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isCompilingPreview, setIsCompilingPreview] = useState(false)
  const [showLoadedBanner, setShowLoadedBanner] = useState(false)

  // Load LaTeX code from localStorage (if coming from Opus workflow)
  React.useEffect(() => {
    const savedLatex = localStorage.getItem('cvLatexCode')
    if (savedLatex) {
      setLatexCode(savedLatex)
      localStorage.removeItem('cvLatexCode') // Clean up after loading
      // Show banner to prompt user to compile
      setShowLoadedBanner(true)
      // Auto-hide banner after 10 seconds
      setTimeout(() => {
        setShowLoadedBanner(false)
      }, 10000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(latexCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownloadTex = () => {
    const blob = new Blob([latexCode], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume.tex'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCompilePreview = async () => {
    setIsCompilingPreview(true)
    setCompilationError(null)
    setShowLoadedBanner(false) // Hide the banner when user compiles

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
        throw new Error(error.detail || 'Compilation failed')
      }

      // Create blob URL for preview
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      
      // Clean up old URL if exists
      if (pdfUrl) {
        window.URL.revokeObjectURL(pdfUrl)
      }
      
      setPdfUrl(url)
    } catch (error) {
      console.error('Compilation error:', error)
      setCompilationError(error instanceof Error ? error.message : 'Unknown error occurred')
      setPdfUrl(null)
    } finally {
      setIsCompilingPreview(false)
    }
  }

  const handleDownloadPDF = async () => {
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
        throw new Error(error.detail || 'Compilation failed')
      }

      // Download the PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'resume.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Compilation error:', error)
      setCompilationError(error instanceof Error ? error.message : 'Unknown error occurred')
    } finally {
      setCompiling(false)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header and Toolbar */}
        <div className="bg-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">LaTeX CV Editor</h1>
                <p className="text-sm text-muted-foreground mt-1">Edit your resume with real-time preview</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="gap-2 lg:hidden"
                >
                  {showPreview ? <Code className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showPreview ? "Code" : "Preview"}
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTex}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  .tex
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={handleCompilePreview}
                  disabled={isCompilingPreview}
                >
                  {isCompilingPreview ? (
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
                  size="sm"
                  className="gap-2"
                  onClick={handleDownloadPDF}
                  disabled={compiling}
                >
                  {compiling ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download PDF
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* LaTeX Code Loaded Banner */}
            {showLoadedBanner && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-start gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-green-800 font-medium">LaTeX code loaded successfully!</p>
                  <p className="text-xs text-green-700 mt-1">Click &quot;Compile LaTeX&quot; to generate your PDF preview</p>
                </div>
                <button
                  onClick={() => setShowLoadedBanner(false)}
                  className="text-green-600 hover:text-green-800 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}

            {/* Info Banner - Inline */}
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
              <p className="text-xs text-blue-700 flex items-center gap-2">
                <FileText className="h-3 w-3" />
                <span><span className="font-semibold">Tectonic LaTeX Engine</span> • Automatically optimizes commands for compilation</span>
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {compilationError && (
          <div className="max-w-7xl mx-auto px-6 pt-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-1">Compilation Failed</h3>
                <p className="text-sm text-red-700 whitespace-pre-wrap">{compilationError}</p>
              </div>
              <button
                onClick={() => setCompilationError(null)}
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Editor and Preview */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="h-[85vh] rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* LaTeX Editor */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "border-r border-border bg-white",
                !showPreview && "lg:col-span-2",
                showPreview && "hidden lg:block"
              )}
            >
              <div className="h-full flex flex-col">
                <div className="px-4 py-3 border-b border-border bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">LaTeX Source</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {latexCode.split('\n').length} lines
                    </span>
                  </div>
                </div>
                <div className="flex-1 overflow-auto">
                  <Textarea
                    value={latexCode}
                    onChange={(e) => setLatexCode(e.target.value)}
                    className="h-full w-full resize-none border-0 rounded-none font-mono text-sm p-4 focus-visible:ring-0"
                    placeholder="Enter your LaTeX code here..."
                    spellCheck={false}
                  />
                </div>
              </div>
            </motion.div>

            {/* Preview Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className={cn(
                "bg-white overflow-hidden",
                !showPreview && "hidden",
                showPreview && "block"
              )}
            >
              <div className="h-full flex flex-col">
                <div className="px-4 py-3 border-b border-border bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">PDF Preview</span>
                  </div>
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
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">No Preview Available</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Click &quot;Compile LaTeX&quot; to generate a preview
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleCompilePreview}
                        disabled={isCompilingPreview}
                        className="gap-2"
                      >
                        {isCompilingPreview ? (
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
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
