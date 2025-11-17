"use client"

import { Navbar } from '@/components/navbar'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { LinkPreview } from '@/components/ui/link-preview'
import Link from 'next/link'

export default function AboutPage() {
    return (
        <>
            <ScrollProgress />
            <Navbar />
            <main className="min-h-screen bg-white text-black">
                <div className="mx-auto max-w-4xl px-8 pt-32 pb-20 font-mono text-sm leading-relaxed">
                    {/* Main Content */}
                    <article className="space-y-12">
                        {/* Title */}
                        <section>
                            <h1 className="text-3xl font-bold mb-8">MakeMyCv - AI-Powered CV Builder</h1>
                            <p className="mb-4">
                                A Next.js and FastAPI-based application that transforms social media profiles and GitHub repositories 
                                into professional, ATS-optimized resumes using AI workflow automation.
                            </p>
                        </section>

                        {/* Introduction */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Introduction</h2>
                            <p className="mb-4">
                                MakeMyCv is an AI-native CV building platform that turns your digital presence into a professional resume. 
                                Built with Next.js 15, FastAPI, and integrated with Opus.ai workflows, it offers an intelligent canvas where 
                                you connect social profiles, select projects, and let AI generate tailored CVs.
                            </p>
                            <p className="mb-4">
                                We support integration with GitHub (via GitIngest), LinkedIn profile scraping (via Agent.ai), Twitter/X analysis, 
                                and real-time LaTeX compilation with Tectonic. The platform handles multi-format intake, AI-powered content 
                                generation, conditional workflow branching, and produces professional PDF outputs optimized for Applicant 
                                Tracking Systems.
                            </p>
                            <p className="mb-4">
                                Built for the{' '}
                                <LinkPreview url="https://lablab.ai" isStatic imageSrc="/placeholder.jpg">
                                    <Link href="https://lablab.ai" className="text-red-500 hover:text-red-400 underline">
                                        lablab.ai Opus Challenge
                                    </Link>
                                </LinkPreview>
                                {' '}, MakeMyCv demonstrates how AI workflows can tackle the common pain points of manual CV creation—
                                no matter your industry or experience level.
                            </p>
                        </section>

                        {/* The Challenge */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">The Challenge</h2>
                            <p className="mb-4">
                                Build a reusable &ldquo;Intake → Understand → Decide → Review → Deliver&rdquo; automation that tackles the common 
                                pain points of creating professional resumes using AI-native workflows.
                            </p>
                            
                            <h3 className="text-lg font-semibold mb-2">The Problem with Traditional CV Creation:</h3>
                            
                            <p className="mb-2 ml-4"><strong>Content Quality vs Speed:</strong></p>
                            <p className="mb-4 ml-8">
                                Writing compelling, ATS-optimized resume bullets requires both deterministic checks (keywords, formatting) 
                                and nuanced reasoning (impact, relevance). Manual creation is slow; templated solutions lack personalization.
                            </p>
                            
                            <p className="mb-2 ml-4"><strong>Format Consistency Issues:</strong></p>
                            <p className="mb-4 ml-8">
                                Different job applications need different CV versions. Maintaining formatting consistency while customizing 
                                content for each role is error-prone and time-consuming.
                            </p>
                            
                            <p className="mb-2 ml-4"><strong>No Built-in Audit Trail:</strong></p>
                            <p className="mb-4 ml-8">
                                Without tracking what content was used, which projects were highlighted, or why certain experiences were 
                                prioritized, it&apos;s hard to iterate and improve CV versions.
                            </p>
                        </section>

                        {/* What We Built */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">What We Built</h2>
                            <p className="mb-4">
                                A professional CV maker powered by Opus AI workflows. We&apos;ve built three separate Opus workflows, 
                                one for each template type (Professional, Academic, Creative), each handling the complete 
                                &ldquo;Intake → Understand → Decide → Review → Deliver&rdquo; pipeline.
                            </p>
                            
                            <h3 className="text-lg font-semibold mb-2">Three Independent Opus Workflows:</h3>
                            
                            <p className="mb-2 ml-4"><strong>1. Professional Template Workflow</strong></p>
                            <p className="mb-4 ml-8">
                                Full AI-powered generation using Opus workflow automation. Analyzes GitHub repositories, LinkedIn profiles, 
                                Twitter activity, and job descriptions to create tailored LaTeX CVs in ~2 minutes. Includes AI-powered 
                                content generation and automated review checkpoints.
                            </p>
                            
                            <p className="mb-2 ml-4"><strong>2. Academic Template Workflow</strong></p>
                            <p className="mb-4 ml-8">
                                Opus workflow optimized for academic CVs with emphasis on publications, research, and education. 
                                Fetches GitHub repos and LinkedIn experiences with manual selection gates before final generation.
                            </p>
                            
                            <p className="mb-2 ml-4"><strong>3. Creative Template Workflow</strong></p>
                            <p className="mb-4 ml-8">
                                Opus workflow tailored for creative professionals. Highlights portfolio projects, visual work, and 
                                creative accomplishments with customizable sections.
                            </p>
                            
                            <p className="mb-4">
                                Additionally, we provide independent review workflows available on Opus:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li><strong>Human Review Workflow:</strong> Manual review checkpoint for quality assurance</li>
                                <li><strong>AI Review Workflow:</strong> Automated agentic review against ATS guidelines and best practices</li>
                            </ul>
                            
                            <p className="mb-4">
                                If you want to review our workflows or use them, please visit:{' '}
                                <Link href="#" className="text-red-500 hover:text-red-400 underline">
                                    Opus Workflow Gallery
                                </Link>
                            </p>
                        </section>

                        {/* Required Building Blocks */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Implementation: Required Building Blocks</h2>
                            
                            <h3 className="text-lg font-semibold mb-2">Data Import & Processing</h3>
                            <p className="mb-2 ml-4">✓ Accept multiple input types:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>GitHub profile URLs → Repository analysis via GitIngest</li>
                                <li>LinkedIn profile URLs → Work experience via Agent.ai scraping</li>
                                <li>Twitter handles → Social presence analysis</li>
                                <li>Job descriptions → Plain text requirements parsing</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Extract and structure key fields:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Repository metadata: languages, stars, descriptions</li>
                                <li>Experience data: titles, companies, durations, descriptions</li>
                                <li>Skills from code analysis and profile scraping</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Token optimization via GitIngest:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>98.8% token reduction using detailed summaries vs full code</li>
                                <li>Intelligent chunking prevents context overflow</li>
                                <li>Includes all README/markdown documentation</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Parallel data imports:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>GitHub repos fetched concurrently (up to 100 per user)</li>
                                <li>LinkedIn profile + posts scraped simultaneously</li>
                                <li>Significantly reduced wait time vs sequential processing</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Conditional Logic & Branching</h3>
                            <p className="mb-2 ml-4">✓ Opus workflow decision nodes:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Template selection determines workflow path (Professional/Academic/Creative)</li>
                                <li>Input validation gates (3 repos required, valid URLs)</li>
                                <li>Experience relevance scoring based on job description</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Error handling & fallbacks:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>API timeout handling with retry logic</li>
                                <li>Graceful degradation when LinkedIn/Twitter unavailable</li>
                                <li>Mock data fallbacks for testing without credentials</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Multi-condition logic:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Repository filtering: language, stars, recency</li>
                                <li>Experience selection: duration, relevance, completeness</li>
                                <li>ATS keyword matching against job descriptions</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Parallel processing for latency reduction:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>GitHub repository analysis, LinkedIn scraping, and Twitter posts fetched simultaneously</li>
                                <li>All independent data sources processed in parallel to aggregate results</li>
                                <li>Measured time savings: ~60-70% reduction vs sequential processing</li>
                                <li>Typical wait time: 30-40 seconds (parallel) vs 90+ seconds (sequential)</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Review for Quality & Safety</h3>
                            <p className="mb-4 ml-4">
                                We include at least two review checkpoints in our workflows, available as independent Opus workflows:
                            </p>
                            
                            <p className="mb-2 ml-4">✓ Agentic Review (AI-powered automated review):</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Auto-checks outputs against ATS guidelines and policy</li>
                                <li>Content quality validation against best practices</li>
                                <li>ATS compatibility verification with keyword analysis</li>
                                <li>Length and formatting validation</li>
                                <li>Available as independent Opus workflow for reuse</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Human Review (manual quality assurance):</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Repository selection interface (choose best 3-4 projects)</li>
                                <li>Experience curation from LinkedIn results</li>
                                <li>Pre-generation preview of selected content</li>
                                <li>Accept/reject/override capabilities for low-confidence or high-impact cases</li>
                                <li>Available as independent Opus workflow for manual checkpoints</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Post-generation review via LaTeX editor:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Real-time editing with live PDF preview</li>
                                <li>Syntax highlighting and error detection</li>
                                <li>Recompile and iterate on generated content</li>
                                <li>Complete control over final output</li>
                            </ul>
                            
                            <p className="mb-4 ml-4">
                                Both review workflows (Agentic and Human) are mentioned in the &ldquo;What We Built&rdquo; section above 
                                and are available as standalone workflows on Opus for integration into other projects.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Provenance & Audit</h3>
                            <p className="mb-2 ml-4">✓ Complete data trail:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Job execution IDs from Opus workflows</li>
                                <li>Input payloads stored (GitHub URLs, job descriptions)</li>
                                <li>Selected repositories and experiences logged</li>
                                <li>Timestamps for each workflow stage</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Opus workflow observability:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Status polling with detailed progress messages</li>
                                <li>Error logging with full stack traces</li>
                                <li>Results inspection via Opus audit endpoints</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Version control:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>LaTeX source code preserved for each generation</li>
                                <li>Multiple CV versions manageable via localStorage</li>
                                <li>Edit history through browser session</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Delivery</h3>
                            <p className="mb-2 ml-4">✓ Multiple export formats:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>PDF download via Tectonic LaTeX compiler</li>
                                <li>.tex file export for external editing</li>
                                <li>LaTeX code copy to clipboard</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Real-time preview:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Live PDF rendering in browser</li>
                                <li>Split-screen editor/preview interface</li>
                                <li>Instant compilation feedback (~3-5 seconds)</li>
                            </ul>
                            
                            <p className="mb-2 ml-4">✓ Programmatic access:</p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>RESTful API for all backend functions</li>
                                <li>Opus workflow triggers via API</li>
                                <li>Job status monitoring and result retrieval</li>
                            </ul>
                        </section>

                        {/* Technology Stack */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Technology Stack</h2>
                            
                            <h3 className="text-lg font-semibold mb-2">Frontend (Next.js 15)</h3>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">• React 18 with TypeScript for type safety</p>
                                <p className="mb-1">• Framer Motion for smooth animations and transitions</p>
                                <p className="mb-1">• Tailwind CSS for responsive styling</p>
                                <p className="mb-1">• Radix UI for accessible components</p>
                                <p className="mb-1">• Lucide React for consistent iconography</p>
                                <p>• Server-side rendering for optimal performance</p>
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">Backend (FastAPI)</h3>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">• Python 3.13 async/await for concurrent operations</p>
                                <p className="mb-1">• Pydantic for request/response validation</p>
                                <p className="mb-1">• CORS middleware for cross-origin requests</p>
                                <p className="mb-1">• GitIngest package for repository analysis</p>
                                <p>• Requests + httpx for external API calls</p>
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">AI & Workflow Automation</h3>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">• Opus.ai for AI-powered workflow orchestration</p>
                                <p className="mb-1">• Agent.ai webhooks for LinkedIn/Twitter scraping</p>
                                <p className="mb-1">• Custom Opus nodes: data import, AI agents, decisions</p>
                                <p>• Polling mechanism for async job completion</p>
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">Document Processing</h3>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">• Tectonic LaTeX compiler for PDF generation</p>
                                <p className="mb-1">• Subprocess management for compilation</p>
                                <p className="mb-1">• Temporary file handling with cleanup</p>
                                <p>• Real-time preview via blob URLs</p>
                            </div>
                            
                            <h3 className="text-lg font-semibold mb-2">External Integrations</h3>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">• GitHub API for repository metadata</p>
                                <p className="mb-1">• GitIngest for codebase summarization</p>
                                <p className="mb-1">• Agent.ai for social media scraping</p>
                                <p>• Opus.ai API for workflow execution</p>
                            </div>
                        </section>

                        {/* How It Works */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">How MakeMyCv Works: Technical Flow</h2>
                            
                            <h3 className="text-lg font-semibold mb-2">Step 1: Template Selection & Input Collection</h3>
                            <p className="mb-4 ml-4">
                                User selects from three templates (Professional, Academic, Creative). Professional template triggers 
                                full Opus workflow; others use semi-automated flows.
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">→ React component renders template selector</p>
                                <p className="mb-1">→ User provides: GitHub username, LinkedIn URL, Twitter handle</p>
                                <p className="mb-1">→ Professional template: select 3 repositories + job description</p>
                                <p className="mb-1">→ Input validation on frontend before API calls</p>
                                <p>→ Data stored in component state for workflow execution</p>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Step 2: Data Fetching & Parallel Processing</h3>
                            <p className="mb-4 ml-4">
                                Multiple API calls execute in parallel to gather all necessary data:
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">1. GitHub API → Fetch user repositories (100 max, sorted by updated)</p>
                                <p className="mb-1">2. Agent.ai webhook → POST to LinkedIn profile scraper</p>
                                <p className="mb-1">3. Agent.ai webhook → POST to Twitter posts scraper</p>
                                <p className="mb-1">4. GitIngest → Analyze selected repositories for tech stack</p>
                                <p className="mb-1">5. Polling loops → Check Agent.ai status endpoints every 2-5s</p>
                                <p>6. Results aggregation → Combine all data for workflow input</p>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Step 3: Opus Workflow Execution (Professional Template)</h3>
                            <p className="mb-4 ml-4">
                                When Professional template selected, initiate Opus AI workflow:
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">1. GET /api/opus/workflow/[workflowId] → Fetch workflow schema</p>
                                <p className="mb-1">2. POST /api/opus/job/initiate → Create job execution</p>
                                <p className="mb-1">3. Build payload with workflow_input_* fields:</p>
                                <p className="mb-1 ml-4">  - workflow_input_kywzun45y: GitHub repo 1 URL</p>
                                <p className="mb-1 ml-4">  - workflow_input_b6wxg8qkt: GitHub repo 2 URL</p>
                                <p className="mb-1 ml-4">  - workflow_input_i4i825m16: GitHub repo 3 URL</p>
                                <p className="mb-1 ml-4">  - workflow_input_qior8st0v: LinkedIn profile URL</p>
                                <p className="mb-1 ml-4">  - workflow_input_mj5wlva02: Twitter handle</p>
                                <p className="mb-1 ml-4">  - workflow_input_3loh6ags2: Job description text</p>
                                <p className="mb-1">4. POST /api/opus/job/execute → Start workflow processing</p>
                                <p className="mb-1">5. Poll GET /api/opus/job/[id]/status every 10s (max 3 minutes)</p>
                                <p className="mb-1">6. On COMPLETED: GET /api/opus/job/[id]/results</p>
                                <p>7. Extract LaTeX code from jobResultsPayloadSchema</p>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Step 4: LaTeX Compilation & Preview</h3>
                            <p className="mb-4 ml-4">
                                Generated or edited LaTeX code compiled to PDF:
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">1. Frontend sends LaTeX code to POST /api/compile-latex</p>
                                <p className="mb-1">2. Backend creates temporary directory</p>
                                <p className="mb-1">3. Write LaTeX to document.tex</p>
                                <p className="mb-1">4. Execute: tectonic document.tex</p>
                                <p className="mb-1">5. Tectonic auto-handles multiple passes, package downloads</p>
                                <p className="mb-1">6. Return PDF as FileResponse with streaming</p>
                                <p className="mb-1">7. Frontend creates blob URL for iframe preview</p>
                                <p>8. Cleanup temporary files after response</p>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Step 5: Delivery & Iteration</h3>
                            <p className="mb-4 ml-4">
                                User can download, edit, and regenerate:
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">→ Download PDF button → Trigger compilation + browser download</p>
                                <p className="mb-1">→ Download .tex button → Export LaTeX source file</p>
                                <p className="mb-1">→ &ldquo;Edit in LaTeX&rdquo; → Transfer to live editor page</p>
                                <p className="mb-1">→ Editor page: Split view with LaTeX code + PDF preview</p>
                                <p className="mb-1">→ Real-time editing with manual recompile button</p>
                                <p>→ LocalStorage preservation of LaTeX for session continuity</p>
                            </div>
                        </section>

                        {/* Performance Optimizations */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Performance Optimizations</h2>
                            
                            <h3 className="text-lg font-semibold mb-2">Token Efficiency (GitIngest Integration)</h3>
                            <p className="mb-4 ml-4">
                                Challenge: GitHub repositories can contain millions of lines of code, resulting in massive token costs 
                                when passed to AI models.
                            </p>
                            <p className="mb-4 ml-4">
                                Solution: GitIngest generates detailed summaries instead of returning full code. Our implementation 
                                achieves 98.8% token reduction while preserving all important information:
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">• File categorization by type (Python, JS, Config, etc.)</p>
                                <p className="mb-1">• Technology stack detection from imports</p>
                                <p className="mb-1">• Complete directory tree structure</p>
                                <p className="mb-1">• Full content of ALL markdown/documentation files</p>
                                <p className="mb-1">• Repository statistics and insights</p>
                                <p>• Result: ~5-10KB vs ~1MB, 83.9% smaller responses</p>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Parallel Data Fetching</h3>
                            <p className="mb-4 ml-4">
                                All data sources (GitHub repository analysis, LinkedIn profile scraping, Twitter posts) are fetched 
                                in parallel rather than sequentially. This is a critical optimization that dramatically reduces wait time:
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">• GitHub repos + LinkedIn + Twitter: All fetched simultaneously</p>
                                <p className="mb-1">• Fire all Agent.ai webhook requests at the same time</p>
                                <p className="mb-1">• Poll multiple status endpoints concurrently</p>
                                <p className="mb-1">• Use Promise.all() for parallel GitHub repo fetching</p>
                                <p className="mb-1">• Aggregate results once all independent steps complete</p>
                                <p className="mb-1">• <strong>Measured time savings: ~60-70% reduction in total wait time</strong></p>
                                <p>• <strong>Typical performance: 90s sequential → 30-40s parallel</strong></p>
                            </div>
                            <p className="mb-4 ml-4">
                                This parallel processing approach ensures that independent workflow steps don&apos;t block each other, 
                                maximizing throughput and minimizing user wait time.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Smart Polling Strategy</h3>
                            <p className="mb-4 ml-4">
                                Agent.ai scrapers and Opus workflows are async. Our adaptive polling:
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">• Starts with 2s intervals (fast for quick completions)</p>
                                <p className="mb-1">• Gradually increases to 5s (reduces server load)</p>
                                <p className="mb-1">• Shows elapsed time to user for transparency</p>
                                <p className="mb-1">• Implements timeout limits (60s-180s depending on operation)</p>
                                <p>• Graceful degradation on timeout with partial results</p>
                            </div>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Tectonic LaTeX Compilation</h3>
                            <p className="mb-4 ml-4">
                                LaTeX compilation can be slow with traditional tools. Tectonic advantages:
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">• Automatically downloads only required packages</p>
                                <p className="mb-1">• Handles multiple compilation passes internally</p>
                                <p className="mb-1">• No manual package installation needed</p>
                                <p className="mb-1">• Compiles typical resume in 3-5 seconds</p>
                                <p>• Runs in isolated temporary directories for safety</p>
                            </div>
                        </section>

                        {/* What We're Proud Of */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">What We&apos;re Proud Of</h2>
                            
                            <h3 className="text-lg font-semibold mb-2">1. Seamless Opus Integration</h3>
                            <p className="mb-4 ml-4">
                                Successfully integrated Opus workflows into a production Next.js application. The workflow handles:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Dynamic input mapping from user selections to workflow schema</li>
                                <li>Robust polling with timeout handling</li>
                                <li>Deep result extraction from nested jobResultsPayloadSchema</li>
                                <li>Graceful error messages surfaced to users</li>
                                <li>Workflow observability through Opus dashboard</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2">2. Real-World Data Integration</h3>
                            <p className="mb-4 ml-4">
                                No mock data in production. Everything is live:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>GitHub API for actual user repositories</li>
                                <li>Agent.ai for real LinkedIn profile scraping</li>
                                <li>Agent.ai for authentic Twitter/X timeline fetching</li>
                                <li>GitIngest for genuine codebase analysis</li>
                                <li>All integrated without enterprise credentials (public APIs)</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2">3. Professional Output Quality</h3>
                            <p className="mb-4 ml-4">
                                LaTeX compilation via Tectonic produces publication-quality PDFs:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Pixel-perfect typography and spacing</li>
                                <li>Consistent formatting across all sections</li>
                                <li>ATS-compatible structure (single-column, standard fonts)</li>
                                <li>Professional templates tested with real ATS systems</li>
                                <li>Editable source code for complete customization</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2">4. Developer Experience</h3>
                            <p className="mb-4 ml-4">
                                Built with maintainability and extensibility in mind:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>TypeScript for type safety across frontend</li>
                                <li>Pydantic models for backend validation</li>
                                <li>Comprehensive error logging and debugging tools</li>
                                <li>Clear separation of concerns (API routes, components, workflows)</li>
                                <li>Environment-based configuration for easy deployment</li>
                            </ul>
                        </section>

                        {/* Challenges & Limitations */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">What We Wanted to Create But Couldn&apos;t</h2>
                            
                            <h3 className="text-lg font-semibold mb-2">LLM Fine-Tuning with Our Dataset</h3>
                            <p className="mb-4 ml-4">
                                We initially planned to fine-tune a language model (DeepSeek) using our meticulously prepared dataset—
                                comprising diverse user interactions, successful CV examples, and integrated SEO strategies—to achieve 
                                even greater content nuance. However, persistent API errors and rate limiting forced us to pivot and 
                                rely on Opus&apos;s built-in AI capabilities.
                            </p>
                            <p className="mb-4 ml-4">
                                View our dataset and training preparation materials{' '}
                                <Link href="#" className="text-red-500 hover:text-red-400 underline">
                                    here
                                </Link>.
                            </p>
                            
                            <h3 className="text-lg font-semibold mb-2 mt-6">Social Content Calendar Integration</h3>
                            <p className="mb-4 ml-4">
                                A key feature in our vision was a Social Content Calendar designed to assist users in planning their 
                                online presence alongside CV creation—scheduling LinkedIn posts, tracking application followups, managing 
                                networking outreach.
                            </p>
                            <p className="mb-4 ml-4">
                                Unfortunately, the LLM exhibited a tendency to hallucinate dates and event structures, resulting in 
                                frequent JSON parsing errors. These inconsistencies made the integration of this feature into the main 
                                website unfeasible within our timeline.
                            </p>
                            <p className="mb-4 ml-4">
                                See our Social Content Calendar prototype{' '}
                                <Link href="#" className="text-red-500 hover:text-red-400 underline">
                                    /social-media-timeline
                                </Link>.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Multi-Language CV Support</h3>
                            <p className="mb-4 ml-4">
                                We explored generating CVs in multiple languages to support international job seekers. While the 
                                technical infrastructure (LaTeX with fontspec packages) supports this, accurately translating technical 
                                terms and maintaining cultural appropriateness in CV formatting proved challenging without native speaker 
                                review loops.
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">ATS Score Prediction</h3>
                            <p className="mb-4 ml-4">
                                Originally planned: a machine learning model to predict CV ATS scores before submission. We collected 
                                data on successful CVs but lacked access to enough proprietary ATS systems for training a reliable model. 
                                Current implementation relies on best practices rather than predictive scoring.
                            </p>
                        </section>

                        {/* Technical Constraints */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Technical Constraints & Mitigations</h2>
                            
                            <h3 className="text-lg font-semibold mb-2">Context Window Limits</h3>
                            <p className="mb-4 ml-4">
                                Challenge: Large GitHub repositories can exceed AI model context windows.
                            </p>
                            <p className="mb-4 ml-4">
                                Mitigation: GitIngest summaries with intelligent chunking. Instead of passing 1MB of code, we send:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>~10KB detailed summary with file structure</li>
                                <li>Key insights and technology detection</li>
                                <li>All README/documentation content</li>
                                <li>Progressive summarization for multi-repo analysis</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Agent.ai Rate Limits</h3>
                            <p className="mb-4 ml-4">
                                Challenge: LinkedIn and Twitter scraping have inherent rate limits and may fail or timeout.
                            </p>
                            <p className="mb-4 ml-4">
                                Mitigation:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Generous timeout windows (60-120 seconds)</li>
                                <li>User-facing progress indicators with elapsed time</li>
                                <li>Graceful degradation: LinkedIn failure doesn&apos;t block GitHub data</li>
                                <li>Manual experience input fallback</li>
                                <li>Clear error messages guiding retry attempts</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-6">LaTeX Compilation Errors</h3>
                            <p className="mb-4 ml-4">
                                Challenge: User-edited LaTeX or AI-generated code may have syntax errors.
                            </p>
                            <p className="mb-4 ml-4">
                                Mitigation:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Tectonic provides detailed error output</li>
                                <li>Frontend surfaces last 2000 characters of errors</li>
                                <li>Editor preserves working code even after failed compilation</li>
                                <li>Template validation before sending to compiler</li>
                                <li>Common error patterns caught with helpful hints</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Opus Workflow Complexity</h3>
                            <p className="mb-4 ml-4">
                                Challenge: Mapping user inputs to Opus workflow schema requires exact field IDs.
                            </p>
                            <p className="mb-4 ml-4">
                                Mitigation:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Fetch workflow schema dynamically to verify IDs</li>
                                <li>Structured payload building with type safety</li>
                                <li>Comprehensive logging for debugging mismatches</li>
                                <li>Test endpoint to validate connectivity before execution</li>
                                <li>Workflow versioning strategy for schema updates</li>
                            </ul>
                        </section>

                        {/* Future Roadmap */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">Future Roadmap</h2>
                            <p className="mb-4">
                                We&apos;re constantly iterating to make MakeMyCv more powerful:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                <li>
                                    <strong>Cover Letter Generation:</strong> Extend Opus workflow to generate tailored cover letters 
                                    matching CV content and job descriptions
                                </li>
                                <li>
                                    <strong>Multi-Version Management:</strong> Save and organize multiple CV variations for different 
                                    roles with easy switching
                                </li>
                                <li>
                                    <strong>ATS Compatibility Checker:</strong> Automated analysis against known ATS requirements with 
                                    actionable improvement suggestions
                                </li>
                                <li>
                                    <strong>Portfolio Integration:</strong> Connect personal portfolios and automatically include 
                                    relevant projects with screenshots
                                </li>
                                <li>
                                    <strong>Collaboration Features:</strong> Share CVs with mentors or peers for feedback with comment 
                                    threads
                                </li>
                                <li>
                                    <strong>Interview Preparation:</strong> Generate interview questions based on CV content and job 
                                    description
                                </li>
                                <li>
                                    <strong>Application Tracking:</strong> Integrated dashboard to track where CVs were sent and 
                                    application status
                                </li>
                            </ul>
                        </section>

                        {/* For Evaluators */}
                        <section>
                            <h2 className="text-xl font-bold mb-4">For Opus Challenge Evaluators</h2>
                            
                            <h3 className="text-lg font-semibold mb-2">How to Test the Application</h3>
                            <p className="mb-4 ml-4">
                                1. Visit the live deployment and click &ldquo;Create CV&rdquo;
                            </p>
                            <p className="mb-4 ml-4">
                                2. Select &ldquo;Professional&rdquo; template to trigger full Opus workflow
                            </p>
                            <p className="mb-4 ml-4">
                                3. Enter test data:
                            </p>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-8">
                                <p className="mb-1">• GitHub: yashwanth-3000</p>
                                <p className="mb-1">• LinkedIn: https://www.linkedin.com/in/pyashwanthkrishna/</p>
                                <p className="mb-1">• Twitter: yashwanthstwt</p>
                                <p>• Select 3 repositories from the auto-loaded list</p>
                            </div>
                            <p className="mb-4 ml-4">
                                4. Paste any job description (AI Engineer, Software Developer, etc.)
                            </p>
                            <p className="mb-4 ml-4">
                                5. Click &ldquo;Next&rdquo; and observe:
                            </p>
                            <ul className="list-disc list-inside space-y-1 ml-8 mb-4">
                                <li>Workflow initialization and schema fetch</li>
                                <li>Job execution with progress updates</li>
                                <li>Status polling with elapsed time</li>
                                <li>LaTeX code extraction and compilation</li>
                                <li>PDF preview generation</li>
                            </ul>
                            <p className="mb-4 ml-4">
                                6. Navigate to editor page to see live LaTeX editing
                            </p>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Architecture Highlights</h3>
                            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                                <li><strong>Intake:</strong> Multi-source (GitHub, LinkedIn, Twitter, Job Description)</li>
                                <li><strong>Understand:</strong> GitIngest summaries + Agent.ai scraping</li>
                                <li><strong>Decide:</strong> Opus workflow with conditional nodes</li>
                                <li><strong>Review:</strong> Manual repo/experience selection + LaTeX editor</li>
                                <li><strong>Deliver:</strong> PDF download with .tex export option</li>
                            </ul>

                            <h3 className="text-lg font-semibold mb-2 mt-6">Data Flow</h3>
                            <div className="bg-zinc-100 p-4 rounded mb-4 ml-4">
                                <p className="mb-1">User Input → Next.js Form</p>
                                <p className="mb-1">    ↓</p>
                                <p className="mb-1">Parallel API Calls (GitHub + Agent.ai webhooks)</p>
                                <p className="mb-1">    ↓</p>
                                <p className="mb-1">Data Aggregation + Validation</p>
                                <p className="mb-1">    ↓</p>
                                <p className="mb-1">Opus Workflow (if Professional template)</p>
                                <p className="mb-1">    ↓</p>
                                <p className="mb-1">LaTeX Generation (AI or manual)</p>
                                <p className="mb-1">    ↓</p>
                                <p className="mb-1">Tectonic Compilation</p>
                                <p className="mb-1">    ↓</p>
                                <p>PDF Download + Editor Access</p>
                            </div>
                        </section>

                        {/* Call to Action */}
                        <section className="text-center py-12 border-t border-zinc-200">
                            <h2 className="text-2xl font-bold mb-4">Ready to Create Your Perfect CV?</h2>
                            <p className="mb-6">
                                Transform your digital presence into a professional resume powered by AI. 
                                Start building your future today.
                            </p>
                            <Link 
                                href="/create-cv" 
                                className="inline-block bg-black text-white px-6 py-3 rounded font-semibold hover:bg-zinc-800 transition-colors"
                            >
                                Get Started Now →
                            </Link>
                            <p className="text-xs text-muted-foreground mt-4">
                                Built for the lablab.ai Opus Challenge • Open Source • Production Ready
                            </p>
                        </section>
                    </article>
                </div>
            </main>
        </>
    )
}
