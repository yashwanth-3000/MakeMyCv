"use client"

import * as React from "react"
import { useState } from "react"
import { Download, FileText, Copy, Check, Eye, Code, Mail, Linkedin, Github, Loader2, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const defaultLatexTemplate = `%-------------------------
% Resume in Latex
% Author : Audric Serador
% Inspired by: https://github.com/sb2nov/resume
% License : MIT
%------------------------

\\documentclass[letterpaper,11pt]{article}

\\usepackage{fontawesome5}
\\usepackage{latexsym}
\\usepackage[empty]{fullpage}
\\usepackage{titlesec}
\\usepackage{marvosym}
\\usepackage[usenames,dvipsnames]{color}
\\usepackage{verbatim}
\\usepackage{enumitem}
\\usepackage[hidelinks]{hyperref}
\\usepackage{fancyhdr}
\\usepackage[english]{babel}
\\usepackage{tabularx}

% Custom font
\\usepackage[default]{lato}

\\pagestyle{fancy}
\\fancyhf{}
\\fancyfoot{}
\\renewcommand{\\headrulewidth}{0pt}
\\renewcommand{\\footrulewidth}{0pt}

% Adjust margins
\\addtolength{\\oddsidemargin}{-0.5in}
\\addtolength{\\evensidemargin}{-0.5in}
\\addtolength{\\textwidth}{1in}
\\addtolength{\\topmargin}{-.5in}
\\addtolength{\\textheight}{1.0in}

\\urlstyle{same}
\\raggedbottom
\\raggedright
\\setlength{\\tabcolsep}{0in}

% Sections formatting
\\titleformat{\\section}{
  \\vspace{-4pt}\\scshape\\raggedright\\large
}{}{0em}{}[\\color{black}\\titlerule\\vspace{-5pt}]

%-------------------------%
% Custom commands
\\newcommand{\\resumeItem}[1]{
  \\item\\small{
    {#1 \\vspace{-2pt}}
  }
}

\\newcommand{\\resumeSubheading}[4]{
  \\vspace{-2pt}\\item
    \\begin{tabular*}{0.97\\textwidth}[t]{l@{\\extracolsep{\\fill}}r}
      \\textbf{#1} & #2 \\\\
      \\textit{\\small#3} & \\textit{\\small #4} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubSubheading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\textit{\\small#1} & \\textit{\\small #2} \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeProjectHeading}[2]{
    \\item
    \\begin{tabular*}{0.97\\textwidth}{l@{\\extracolsep{\\fill}}r}
      \\small#1 & #2 \\\\
    \\end{tabular*}\\vspace{-7pt}
}

\\newcommand{\\resumeSubItem}[1]{\\resumeItem{#1}\\vspace{-4pt}}

\\renewcommand\\labelitemii{$\\vcenter{\\hbox{\\tiny$\\bullet$}}$}

\\newcommand{\\resumeSubHeadingListStart}{\\begin{itemize}[leftmargin=0.15in, label={}]}
\\newcommand{\\resumeSubHeadingListEnd}{\\end{itemize}}
\\newcommand{\\resumeItemListStart}{\\begin{itemize}}
\\newcommand{\\resumeItemListEnd}{\\end{itemize}\\vspace{-5pt}}

\\definecolor{Black}{RGB}{0, 0, 0}
\\newcommand{\\seticon}[1]{\\textcolor{Black}{\\csname #1\\endcsname}}

\\begin{document}

%----------HEADING----------%
\\begin{center}
    \\textbf{\\Huge \\scshape Pavushetty Yashwanth Krishna} \\\\[5pt]
    \\href{mailto:pyashwanthkrishna@gmail.com}{\\seticon{faEnvelope} \\underline{pyashwanthkrishna@gmail.com}} \\quad
    \\href{https://www.linkedin.com/in/pyashwanthkrishna/}{\\seticon{faLinkedin} \\underline{@pyashwanthkrishna}} \\quad
    \\href{https://github.com/yashwanth-3000}{\\seticon{faGithub} \\underline{@yashwanth-3000}}
\\end{center}

%-----------EDUCATION-----------%
\\section{Education}
\\resumeSubHeadingListStart
    \\resumeSubheading
    {KAKATIYA INSTITUTE OF TECHNOLOGY \\& SCIENCE WARANGAL}{Expected May 2026}
    {Bachelor of Technology in Computer Science and Engineering}{Warangal, Telangana, India}
\\resumeSubHeadingListEnd

%-----------EXPERIENCE-----------%
\\section{Experience}
\\resumeSubHeadingListStart
    \\resumeSubheading
    {Restack (Earn By Building Program)}{Dec 2024}
    {Open Source Contributor}{Remote / Berlin, Germany}
    \\resumeItemListStart
        \\resumeItem{Contributed to the Restack AI Python SDK Examples repository by integrating ElevenLabs' Text-to-Speech and Voice Isolation functionalities, simplifying user onboarding and providing clear workflow examples.}
        \\resumeItem{Enhanced the repository's value through advanced integrations that demonstrate real-world applications of the Restack SDK, benefiting developers of all skill levels.}
        \\resumeItem{Awarded \\$500 in recognition of high-quality contributions that align with Restack's mission to empower developers in building AI-powered applications.}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd

%-----------PROJECTS-----------%
\\section{Projects}
\\resumeSubHeadingListStart
    \\resumeProjectHeading
    {\\textbf{Text2Story} \\href{https://www.linkedin.com/posts/pyashwanthkrishna_ai-bulidspace-activity-7216175913535725569-1Z4H}{(Video Demo)} $|$ \\emph{AI, Animation, Voice Synthesis}}{}
    \\resumeItemListStart
        \\resumeItem{Developed an AI-driven platform that transforms textbook lessons into interactive, animated videos, enhancing children's education.}
        \\resumeItem{Enabled parents to add personalized voiceovers, making learning more engaging and tailored to individual needs.}
        \\resumeItem{Bridges traditional education with storytelling, improving retention and making concepts more accessible.}
    \\resumeItemListEnd
    
    \\resumeProjectHeading
    {\\textbf{Content Hub} \\href{https://lablab.ai/event/generative-ai-hackathon-with-ibm-granite/content-hub/content-hub}{(lablab.ai)} \\href{https://github.com/yashwanth-3000/content--hub}{(GitHub)} $|$ \\emph{AI, Social Media Automation}}{}
    \\resumeItemListStart
        \\resumeItem{Developed an AI-powered cross-platform content generation with IBM's Granite AI models and APIs to deliver personalized, SEO-optimized posts that capture each user's unique voice.}
        \\resumeItem{Implemented a real-time ingestion pipeline from Twitter, LinkedIn, and Instagram to transform raw interactions into compelling narratives in seconds.}
        \\resumeItem{Built an interactive analytics dashboard that provides actionable insights and performance metrics to refine digital communication strategies.}
        \\resumeItem{Winner of the IBM Granite AI Challenge, securing the first prize among 1900 participants worldwide with a \\$5,000 USD reward.}
    \\resumeItemListEnd
    
    \\resumeProjectHeading
    {\\textbf{DevDocs} \\href{https://devpost.com/software/dev-docs}{(Devpost)} \\href{https://github.com/yashwanth-3000/Dev-Docs-Local}{(GitHub)} $|$ \\emph{AI-Powered Search, Workflow Automation}}{}
    \\resumeItemListStart
        \\resumeItem{Designed an AI-powered tool that streamlines developer workflows by providing real-time, accurate answers from company documentation.}
        \\resumeItem{Utilized the Modus framework and Llama 3.1 to eliminate manual browsing through extensive documentation.}
        \\resumeItem{Enabled AI-powered search, real-time results, and custom data integration, improving productivity and reducing frustration.}
        \\resumeItem{Implemented Neo4j for knowledge graph storage and retrieval, leveraging RAG search for efficient query processing.}
        \\resumeItem{Winner of the Hypermode Knowledge Graph + AI Challenge, securing the first prize among 553 teams worldwide with a \\$3,000 USD reward.}
    \\resumeItemListEnd

    \\resumeProjectHeading
    {\\textbf{AI-Powered Space Exploration} \\href{https://www.spaceappschallenge.org/nasa-space-apps-2024/find-a-team/teamone/?tab=details}{(NASA Project)} $|$ \\emph{NASA Space Apps Challenge}}{}
    \\resumeItemListStart
        \\resumeItem{Developed an AI-powered platform inspired by the James Webb Space Telescope to create personalized space exploration videos.}
        \\resumeItem{Integrated real telescope data with AI-generated visuals and multilingual narrations for a more immersive experience.}
        \\resumeItem{Recognized as a Global Nominee and winner of the People's Choice Award in the NASA Space Apps Challenge.}
    \\resumeItemListEnd
\\resumeSubHeadingListEnd

%-----------SKILLS-----------%
\\section{Technical Skills}
\\begin{itemize}[leftmargin=0.15in, label={}]
    \\small{\\item{
        \\textbf{AI Agent Development}{: CrewAI (Multi-Agent Systems), LangGraph (Stateful Workflows), LangChain (LLM Orchestration), Autonomous Agent Architectures, Agent Memory Management, Task Delegation Frameworks} \\\\
        \\textbf{Vector and Graph Databases}{: Neo4j (Knowledge Graphs), Supabase (Vector Search), Pinecone (Vector Storage), Graph-Based RAG Architectures, Semantic Search Systems}
    }}
\\end{itemize}

\\end{document}`

export default function CVEditorPage() {
  const [latexCode, setLatexCode] = useState(defaultLatexTemplate)
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [compiling, setCompiling] = useState(false)
  const [compilationError, setCompilationError] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [isCompilingPreview, setIsCompilingPreview] = useState(false)

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
