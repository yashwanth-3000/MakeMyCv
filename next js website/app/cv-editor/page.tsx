"use client"

import * as React from "react"
import { useState } from "react"
import { Download, FileText, Copy, Check, Eye, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
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
\\input{glyphtounicode}

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

% Ensure that generate pdf is machine readable/ATS parsable
\\pdfgentounicode=1

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
    \\href{mailto:pyashwanthkrishna@gmail.com}{\\underline{pyashwanthkrishna@gmail.com}} \\quad
    \\href{https://www.linkedin.com/in/pyashwanthkrishna/}{\\underline{linkedin.com/in/pyashwanthkrishna}} \\quad
    \\href{https://github.com/yashwanth-3000}{\\underline{github.com/yashwanth-3000}}
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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        {/* Header */}
        <div className="border-b border-border bg-white">
          <div className="max-w-[1800px] mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-foreground" />
                <div>
                  <h1 className="text-xl font-bold text-foreground">LaTeX CV Editor</h1>
                  <p className="text-sm text-muted-foreground">Professional resume builder with LaTeX</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy LaTeX"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownloadTex}
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download .tex
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="gap-2 lg:hidden"
                >
                  {showPreview ? <Code className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  {showPreview ? "Code" : "Preview"}
                </Button>
                <Button
                  size="sm"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Compile PDF
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor and Preview */}
        <div className="max-w-[1800px] mx-auto h-[calc(100vh-160px)]">
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
                "bg-white overflow-auto",
                !showPreview && "hidden",
                showPreview && "block"
              )}
            >
              <div className="h-full flex flex-col">
                <div className="px-4 py-3 border-b border-border bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Live Preview</span>
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-8">
                  <CVPreview latexCode={latexCode} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

// CV Preview Component - Renders a visual representation of the LaTeX
function CVPreview({ latexCode }: { latexCode: string }) {
  return (
    <div className="max-w-[800px] mx-auto bg-white shadow-lg border border-border">
      <div className="p-12 space-y-5">
        {/* Header */}
        <div className="text-center border-b-2 border-black pb-4">
          <h1 className="text-3xl font-bold uppercase tracking-wide mb-3">
            Pavushetty Yashwanth Krishna
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <a href="mailto:pyashwanthkrishna@gmail.com" className="hover:underline flex items-center gap-1">
              <span>✉</span> pyashwanthkrishna@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/pyashwanthkrishna/" className="hover:underline flex items-center gap-1">
              <span>in</span> linkedin.com/in/pyashwanthkrishna
            </a>
            <a href="https://github.com/yashwanth-3000" className="hover:underline flex items-center gap-1">
              <span>⚙</span> github.com/yashwanth-3000
            </a>
          </div>
        </div>

        {/* Education Section */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b border-black">
            Education
          </h2>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">KAKATIYA INSTITUTE OF TECHNOLOGY & SCIENCE WARANGAL</h3>
              <p className="text-sm italic">Bachelor of Technology in Computer Science and Engineering</p>
            </div>
            <div className="text-right text-sm">
              <p className="italic">Expected May 2026</p>
              <p className="italic">Warangal, Telangana, India</p>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b border-black">
            Experience
          </h2>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold">Restack (Earn By Building Program)</h3>
              <p className="text-sm italic">Open Source Contributor</p>
            </div>
            <div className="text-right text-sm">
              <p className="italic">Dec 2024</p>
              <p className="italic">Remote / Berlin, Germany</p>
            </div>
          </div>
          <ul className="list-disc list-inside space-y-1 text-sm ml-4">
            <li>Contributed to the Restack AI Python SDK Examples repository by integrating ElevenLabs&apos; Text-to-Speech and Voice Isolation functionalities, simplifying user onboarding and providing clear workflow examples.</li>
            <li>Enhanced the repository&apos;s value through advanced integrations that demonstrate real-world applications of the Restack SDK, benefiting developers of all skill levels.</li>
            <li>Awarded $500 in recognition of high-quality contributions that align with Restack&apos;s mission to empower developers in building AI-powered applications.</li>
          </ul>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b border-black">
            Projects
          </h2>
          <div className="space-y-3">
            {/* Text2Story */}
            <div>
              <h3 className="font-bold mb-1">
                Text2Story <span className="text-sm font-normal italic">| AI, Animation, Voice Synthesis</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Developed an AI-driven platform that transforms textbook lessons into interactive, animated videos, enhancing children&apos;s education.</li>
                <li>Enabled parents to add personalized voiceovers, making learning more engaging and tailored to individual needs.</li>
                <li>Bridges traditional education with storytelling, improving retention and making concepts more accessible.</li>
              </ul>
            </div>

            {/* Content Hub */}
            <div>
              <h3 className="font-bold mb-1">
                Content Hub <span className="text-sm font-normal italic">| AI, Social Media Automation</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Developed an AI-powered cross-platform content generation with IBM&apos;s Granite AI models and APIs to deliver personalized, SEO-optimized posts that capture each user&apos;s unique voice.</li>
                <li>Implemented a real-time ingestion pipeline from Twitter, LinkedIn, and Instagram to transform raw interactions into compelling narratives in seconds.</li>
                <li>Built an interactive analytics dashboard that provides actionable insights and performance metrics to refine digital communication strategies.</li>
                <li>Winner of the IBM Granite AI Challenge, securing the first prize among 1900 participants worldwide with a $5,000 USD reward.</li>
              </ul>
            </div>

            {/* DevDocs */}
            <div>
              <h3 className="font-bold mb-1">
                DevDocs <span className="text-sm font-normal italic">| AI-Powered Search, Workflow Automation</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Designed an AI-powered tool that streamlines developer workflows by providing real-time, accurate answers from company documentation.</li>
                <li>Utilized the Modus framework and Llama 3.1 to eliminate manual browsing through extensive documentation.</li>
                <li>Enabled AI-powered search, real-time results, and custom data integration, improving productivity and reducing frustration.</li>
                <li>Implemented Neo4j for knowledge graph storage and retrieval, leveraging RAG search for efficient query processing.</li>
                <li>Winner of the Hypermode Knowledge Graph + AI Challenge, securing the first prize among 553 teams worldwide with a $3,000 USD reward.</li>
              </ul>
            </div>

            {/* NASA Project */}
            <div>
              <h3 className="font-bold mb-1">
                AI-Powered Space Exploration <span className="text-sm font-normal italic">| NASA Space Apps Challenge</span>
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm ml-4">
                <li>Developed an AI-powered platform inspired by the James Webb Space Telescope to create personalized space exploration videos.</li>
                <li>Integrated real telescope data with AI-generated visuals and multilingual narrations for a more immersive experience.</li>
                <li>Recognized as a Global Nominee and winner of the People&apos;s Choice Award in the NASA Space Apps Challenge.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <h2 className="text-lg font-bold uppercase tracking-wide mb-3 pb-1 border-b border-black">
            Technical Skills
          </h2>
          <div className="text-sm space-y-2">
            <div>
              <span className="font-bold">AI Agent Development:</span> CrewAI (Multi-Agent Systems), LangGraph (Stateful Workflows), LangChain (LLM Orchestration), Autonomous Agent Architectures, Agent Memory Management, Task Delegation Frameworks
            </div>
            <div>
              <span className="font-bold">Vector and Graph Databases:</span> Neo4j (Knowledge Graphs), Supabase (Vector Search), Pinecone (Vector Storage), Graph-Based RAG Architectures, Semantic Search Systems
            </div>
          </div>
        </div>

        {/* Preview Note */}
        <div className="mt-8 pt-4 border-t border-gray-300">
          <p className="text-xs text-center text-muted-foreground">
            This is a preview. Click &ldquo;Compile PDF&rdquo; to generate the final document.
          </p>
        </div>
      </div>
    </div>
  )
}

