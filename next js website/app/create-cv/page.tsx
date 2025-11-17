"use client"

import * as React from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { Check, Download, Loader2, CheckCircle, Github, Linkedin, Twitter, Mail, Globe, ArrowRight, ArrowLeft, Edit2, FileText, Plus, Briefcase, X, AlertCircle, Star, Clock, Activity, Zap, TrendingUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

// Types
interface SocialMediaData {
  github: string
  linkedin: string
  twitter: string
  email: string
}

interface Repository {
  id: string
  name: string
  description: string
  language: string
  stars: number
  url: string
}

interface Experience {
  id: string
  title: string
  company: string
  duration: string
  description: string
  location?: string
}

interface CVData extends SocialMediaData {
  selectedRepos: Repository[]
  selectedExperiences: Experience[]
  name: string
  title: string
  summary: string
  githubRepo1?: string
  githubRepo2?: string
  githubRepo3?: string
  jobDescription?: string
  opusJobId?: string
  opusLatexCode?: string
  opusGeneratedCV?: any
}

// Tabs Components
const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-lg bg-muted p-0.5 text-muted-foreground/70",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium outline-offset-2 transition-all hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

// Accordion Components
const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b last:border-b-0", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="text-muted-foreground h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = AccordionPrimitive.Content.displayName

// Workflow Audit Viewer Component
function WorkflowAuditViewer({ auditLog }: { auditLog: any }) {
  const [expandedNode, setExpandedNode] = React.useState<string>('')

  // Transform audit log data to node executions
  const getNodeExecutions = () => {
    if (!auditLog?.audit?.nodes_execution_data) return []
    
    return Object.entries(auditLog.audit.nodes_execution_data).map(([nodeName, nodeData]: [string, any]) => ({
      id: nodeName,
      name: nodeName,
      status: nodeData.execution_status === 'COMPLETED' ? 'success' : 'failed',
      startTime: new Date(nodeData.execution_start_time).toISOString(),
      duration: nodeData.execution_time || 0,
      output: nodeData.execution_output,
      executionIndex: nodeData.execution_index
    })).sort((a, b) => a.executionIndex - b.executionIndex)
  }

  const nodeExecutions = getNodeExecutions()
  const stats = {
    totalNodes: auditLog?.nb_nodes || 0,
    executedNodes: auditLog?.nb_executed_nodes || 0,
    failedNodes: auditLog?.nb_failed_nodes || 0,
    totalDuration: nodeExecutions.reduce((sum, node) => sum + node.duration, 0)
  }

  const getStatusIcon = (status: string) => {
    return status === 'success' ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <X className="w-5 h-5 text-red-500" />
    )
  }

  const formatDuration = (ms: number) => {
    if (ms < 1000) return `${ms}ms`
    return `${(ms / 1000).toFixed(2)}s`
  }

  const formatTime = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-green-600" />
        <h3 className="text-2xl font-bold text-foreground">Workflow Execution Audit</h3>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Nodes</p>
              <p className="text-3xl font-bold mt-2">{stats.totalNodes}</p>
            </div>
            <Activity className="w-10 h-10 text-blue-200" />
          </div>
                </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Executed</p>
              <p className="text-3xl font-bold mt-2">{stats.executedNodes}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Failed</p>
              <p className="text-3xl font-bold mt-2">{stats.failedNodes}</p>
            </div>
            <X className="w-10 h-10 text-red-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Duration</p>
              <p className="text-3xl font-bold mt-2">{formatDuration(stats.totalDuration)}</p>
            </div>
            <Zap className="w-10 h-10 text-purple-200" />
          </div>
        </motion.div>
      </div>

      {/* Execution Timeline */}
      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <h4 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Execution Timeline
        </h4>

        <div className="space-y-4">
          {nodeExecutions.map((execution, index) => (
            <div key={execution.id} className="relative">
              {/* Timeline Line */}
              {index < nodeExecutions.length - 1 && (
                <div className="absolute left-[21px] top-12 w-0.5 h-full bg-gradient-to-b from-green-500/50 to-green-500/20" />
              )}

              {/* Timeline Node */}
              <div className="flex gap-4">
                <div className="relative z-10 mt-1">
                  <div className="w-11 h-11 rounded-full bg-background border-2 border-green-500/30 flex items-center justify-center shadow-lg">
                    {getStatusIcon(execution.status)}
              </div>
            </div>

                <div className="flex-1">
                  <div className="p-4 bg-white border rounded-lg hover:border-green-500/30 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h5 className="text-base font-semibold text-foreground">{execution.name}</h5>
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20">
                            {execution.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(execution.startTime)}
                          </span>
                          <span className="flex items-center gap-1 font-medium text-green-600">
                            <Zap className="w-4 h-4" />
                            {formatDuration(execution.duration)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    {execution.output && (
                      <Accordion type="single" collapsible value={expandedNode} onValueChange={setExpandedNode}>
                        <AccordionItem value={execution.id} className="border-0">
                          <AccordionTrigger className="text-sm text-blue-600 hover:text-blue-700 py-2">
                            View Output Details
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg mt-2">
                              <pre className="text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
                                {JSON.stringify(execution.output, null, 2)}
                              </pre>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="p-6 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl">
        <div className="flex items-center justify-between">
              <div>
            <p className="text-sm text-muted-foreground">Success Rate</p>
            <p className="text-2xl font-bold text-foreground">
              {stats.executedNodes > 0
                ? (((stats.executedNodes - stats.failedNodes) / stats.executedNodes) * 100).toFixed(1)
                : '0.0'}%
                </p>
              </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Avg Node Duration</p>
            <p className="text-2xl font-bold text-foreground">
              {stats.executedNodes > 0 ? formatDuration(stats.totalDuration / stats.executedNodes) : '0ms'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Interactive Project Info Component
function ProjectTabs({ 
  youtubeVideoId = "dQw4w9WgXcQ",
  progress = 0
}: { 
  youtubeVideoId?: string
  progress?: number
}) {
  const [activeTab, setActiveTab] = React.useState("about")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-8"
    >
      <div className="text-center space-y-3 mb-6">
        <h3 className="text-xl font-semibold text-foreground">
          While you wait...
        </h3>
        <p className="text-sm text-muted-foreground">
          Learn more about our project or watch a demo video
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-center mb-6">
          <TabsList className="inline-flex items-center gap-2 bg-gray-50 backdrop-blur-md p-1.5 rounded-xl border border-border shadow-sm">
            <TabsTrigger
              value="about"
                  className={cn(
                "relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                "hover:bg-gray-100",
                activeTab === "about" && "bg-white text-foreground shadow-sm"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Learn About Project
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="video"
              className={cn(
                "relative px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                "hover:bg-gray-100",
                activeTab === "video" && "bg-white text-foreground shadow-sm"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Watch Demo Video
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "about" && (
              <motion.div
                key="about"
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
                className="absolute inset-0"
              >
                <TabsContent value="about" className="m-0">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border bg-white hover:shadow-2xl transition-shadow duration-300">
                    <iframe
                      src="/about"
                      className="w-full h-[500px] border-0"
                      title="About Page"
                      loading="lazy"
                    />
              </div>
                </TabsContent>
              </motion.div>
            )}

            {activeTab === "video" && (
              <motion.div
                key="video"
                initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                }}
                className="absolute inset-0"
              >
                <TabsContent value="video" className="m-0">
                  <div className="rounded-2xl overflow-hidden shadow-xl border border-border bg-black hover:shadow-2xl transition-shadow duration-300">
                    <div className="relative w-full aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&rel=0`}
                        className="absolute inset-0 w-full h-full"
                        title="Project Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
            </div>
                  </div>
                </TabsContent>
          </motion.div>
            )}
          </AnimatePresence>
      </div>
      </Tabs>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground mt-6"
      >
        <div className="flex gap-1">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
            className="w-2 h-2 rounded-full bg-blue-600"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            className="w-2 h-2 rounded-full bg-blue-600"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
            className="w-2 h-2 rounded-full bg-blue-600"
          />
        </div>
        <span>Your CV is being generated... {Math.round(progress)}%</span>
      </motion.div>
    </motion.div>
  )
}

// Step 1: Social Media Input Form
function SocialMediaStep({ 
  data, 
  onChange
}: { 
  data: SocialMediaData & { jobDescription?: string; githubRepo1?: string; githubRepo2?: string; githubRepo3?: string; selectedRepos?: Repository[] }
  onChange: (data: any) => void
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [repos, setRepos] = useState<Repository[]>([])
  const [loadingRepos, setLoadingRepos] = useState(false)
  const [repoError, setRepoError] = useState<string | null>(null)
  // Always use professional template (AI-powered generation)
  const isProfessionalTemplate = true
  const selectedRepos = (data as any).selectedRepos || []

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value })
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  // Extract username from GitHub URL or use as-is
  const extractGitHubUsername = (input: string): string => {
    if (!input) return ''
    
    // If it's a URL, extract username
    const urlPattern = /github\.com\/([^\/]+)/i
    const match = input.match(urlPattern)
    
    if (match) {
      return match[1]
    }
    
    // Otherwise, use as username
    return input.trim()
  }

  // Fetch repos when GitHub username changes
  React.useEffect(() => {
    const fetchRepos = async () => {
      if (!isProfessionalTemplate || !data.github || data.github.trim() === '') {
        setRepos([])
        return
      }

      setLoadingRepos(true)
      setRepoError(null)

      try {
        const username = extractGitHubUsername(data.github)
        const githubApiUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
        const response = await fetch(githubApiUrl)

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub repositories')
        }

        const reposData = await response.json()
        const formattedRepos: Repository[] = reposData.map((repo: any) => ({
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || "No description available",
          language: repo.language || "N/A",
          stars: repo.stargazers_count,
          url: repo.html_url
        }))

        setRepos(formattedRepos)

        // Auto-select repos that match pre-filled URLs
        const preFilledUrls = [
          (data as any).githubRepo1,
          (data as any).githubRepo2,
          (data as any).githubRepo3
        ].filter(Boolean)

        if (preFilledUrls.length > 0 && selectedRepos.length === 0) {
          const matchingRepos = formattedRepos.filter(repo => 
            preFilledUrls.includes(repo.url)
          )
          
          if (matchingRepos.length > 0) {
            onChange({
              ...data,
              selectedRepos: matchingRepos,
              githubRepo1: matchingRepos[0]?.url || '',
              githubRepo2: matchingRepos[1]?.url || '',
              githubRepo3: matchingRepos[2]?.url || ''
            })
          }
        }
      } catch (err) {
        setRepoError(err instanceof Error ? err.message : 'Failed to fetch repositories')
        setRepos([])
      } finally {
        setLoadingRepos(false)
      }
    }

    const timeoutId = setTimeout(fetchRepos, 500) // Debounce
    return () => clearTimeout(timeoutId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.github, isProfessionalTemplate])

  const handleToggleRepo = (repo: Repository) => {
    const isSelected = selectedRepos.some((r: Repository) => r.id === repo.id)
    let newSelectedRepos: Repository[]

    if (isSelected) {
      newSelectedRepos = selectedRepos.filter((r: Repository) => r.id !== repo.id)
    } else {
      if (selectedRepos.length >= 3) {
        alert('You can select up to 3 repositories only')
        return
      }
      newSelectedRepos = [...selectedRepos, repo]
    }

    // Update the data with selected repos and their URLs
    onChange({
      ...data,
      selectedRepos: newSelectedRepos,
      githubRepo1: newSelectedRepos[0]?.url || '',
      githubRepo2: newSelectedRepos[1]?.url || '',
      githubRepo3: newSelectedRepos[2]?.url || ''
    })
  }

  const formFields = [
    { id: "github", label: "GitHub Username or URL", placeholder: "octocat or https://github.com/octocat", icon: Github, value: data.github, required: true },
    { id: "linkedin", label: "LinkedIn Profile", placeholder: "linkedin.com/in/username", icon: Linkedin, value: data.linkedin, required: isProfessionalTemplate },
    { id: "twitter", label: "Twitter/X Handle", placeholder: "@username or yashwanthstwt", icon: Twitter, value: data.twitter, required: isProfessionalTemplate },
    { id: "email", label: "Email Address", placeholder: "your.email@example.com", icon: Mail, value: data.email, type: "email" }
  ]

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          {isProfessionalTemplate ? 'AI-Powered CV Generation' : 'Social Media Profiles'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isProfessionalTemplate 
            ? 'Provide your details and let AI generate your professional CV (approx. 2 minutes)'
            : 'Connect your professional profiles to generate your CV'}
        </p>
      </div>

      {isProfessionalTemplate && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 text-sm">AI-Powered Generation</h3>
              <p className="text-xs text-blue-700">Our AI will analyze your projects and generate a tailored CV in approximately 2 minutes</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {formFields.map((field, index) => {
          const Icon = field.icon
          return (
            <motion.div 
              key={field.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08, ease: "easeOut" }}
              className="space-y-2"
            >
              <Label htmlFor={field.id} className="text-sm font-medium">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors" />
                <Input
                  id={field.id}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="pl-10 transition-all duration-200 focus:shadow-sm"
                />
              </div>
            </motion.div>
          )
        })}

        {isProfessionalTemplate && (
          <>
            {/* Repository Selection */}
            {data.github && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: formFields.length * 0.08, ease: "easeOut" }}
                className="space-y-2"
              >
                <Label className="text-sm font-medium">
                  Select 3 GitHub Repositories <span className="text-red-500">*</span>
                </Label>
                
                {loadingRepos && (
                  <div className="flex items-center justify-center py-4 border rounded-lg">
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600 mr-2" />
                    <span className="text-sm text-muted-foreground">Loading repositories...</span>
                  </div>
                )}

                {repoError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{repoError}</p>
                  </div>
                )}

                {!loadingRepos && !repoError && repos.length > 0 && (
                  <div className="space-y-2 max-h-64 overflow-y-auto border rounded-lg p-3">
                    {repos.map((repo) => {
                      const isSelected = selectedRepos.some((r: Repository) => r.id === repo.id)
                      return (
                        <motion.div
                          key={repo.id}
                          className={cn(
                            "border rounded-lg p-3 cursor-pointer transition-all duration-200",
                            isSelected 
                              ? "border-foreground bg-gray-50/50 shadow-sm" 
                              : "border-border hover:border-gray-300 hover:shadow-sm"
                          )}
                          onClick={() => handleToggleRepo(repo)}
                          whileHover={{ y: -2, transition: { duration: 0.2 } }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-2">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => handleToggleRepo(repo)}
                              className="mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-sm text-foreground">{repo.name}</h3>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                                  {repo.language}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground line-clamp-2">{repo.description}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <Star className="h-3 w-3" />
                                <span>{repo.stars} stars</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}

                {!loadingRepos && !repoError && repos.length === 0 && data.github && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-600">No repositories found for this username</p>
                  </div>
                )}

                {selectedRepos.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {selectedRepos.length} of 3 repositories selected
                  </p>
                )}
              </motion.div>
            )}

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: (formFields.length + 1) * 0.08, ease: "easeOut" }}
              className="space-y-2"
            >
              <Label htmlFor="jobDescription" className="text-sm font-medium">
                Job Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="jobDescription"
                placeholder="Paste the job description here..."
                value={(data as any).jobDescription || ''}
                onChange={(e) => handleChange('jobDescription', e.target.value)}
                className="min-h-[120px] transition-all duration-200 focus:shadow-sm"
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

// Step 2A: Opus-Powered CV Generation (for Professional Template only)
function OpusCVGeneration({
  data,
  onChange
}: {
  data: CVData
  onChange: (data: CVData) => void
}) {
  const [status, setStatus] = useState<'idle' | 'generating' | 'completed' | 'failed'>('idle')
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [auditLog, setAuditLog] = useState<any>(null)
  const hasStartedGeneration = React.useRef(false)

  const WORKFLOW_ID = process.env.NEXT_PUBLIC_OPUS_WORKFLOW_ID || '5sLHcgw7N9gVv5lz'

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev])
  }

  const generateCV = async () => {
    // Reset the ref when manually retrying
    hasStartedGeneration.current = true
    
    setStatus('generating')
    setProgress(0)
    setError(null)
    setLogs([])
    setAuditLog(null)
    setStatusMessage('Initializing workflow...')
    addLog('🚀 Starting CV generation workflow')

    try {
      // Step 1: Fetch workflow schema
      setProgress(10)
      setStatusMessage('Fetching workflow schema...')
      addLog(`📋 Fetching workflow schema for workflow ID: ${WORKFLOW_ID}`)
      
      const schemaResponse = await fetch(`/api/opus/workflow/${WORKFLOW_ID}`)
      if (!schemaResponse.ok) {
        throw new Error('Failed to fetch workflow schema')
      }
      const workflowSchema = await schemaResponse.json()
      addLog(`✅ Workflow schema fetched successfully: ${workflowSchema.name}`)
      console.log('📋 Workflow Schema:', workflowSchema)
      
      // Step 2: Initiate job
      setProgress(20)
      setStatusMessage('Initiating job...')
      addLog(`📝 Initiating job for ${data.github}`)
      const initiateResponse = await fetch('/api/opus/job/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workflowId: WORKFLOW_ID,
          title: `CV Generation for ${data.github}`,
          description: 'AI-powered CV generation from user profile'
        })
      })

      if (!initiateResponse.ok) {
        const errorData = await initiateResponse.json()
        addLog(`❌ Failed to initiate job: ${errorData.error}`)
        throw new Error(errorData.error || 'Failed to initiate job')
      }

      const { jobExecutionId } = await initiateResponse.json()
      onChange({ ...data, opusJobId: jobExecutionId })
      addLog(`✅ Job initiated successfully with ID: ${jobExecutionId}`)

      // Step 3: Build payload directly (same as test-opus)
      setProgress(30)
      setStatusMessage('Preparing workflow inputs...')
      addLog('📦 Preparing workflow inputs...')
      
      // Direct mapping from CV data to workflow inputs
      const jobPayloadSchemaInstance: Record<string, any> = {
        workflow_input_kywzun45y: { value: data.githubRepo1 || '', type: 'str' },
        workflow_input_b6wxg8qkt: { value: data.githubRepo2 || '', type: 'str' },
        workflow_input_i4i825m16: { value: data.githubRepo3 || '', type: 'str' },
        workflow_input_qior8st0v: { value: data.linkedin || '', type: 'str' },
        workflow_input_mj5wlva02: { value: data.twitter || '', type: 'str' },
        workflow_input_3loh6ags2: { value: data.jobDescription || '', type: 'str' }
      }
      
      addLog(`✅ Workflow inputs prepared: 3 repos, LinkedIn, Twitter, job description`)
      console.log('📤 Payload:', jobPayloadSchemaInstance)
      
      // Step 4: Execute job with inputs
      setProgress(40)
      setStatusMessage('Executing workflow...')
      addLog('🚀 Executing workflow...')
      
      const executeResponse = await fetch('/api/opus/job/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobExecutionId,
          jobPayloadSchemaInstance
        })
      })

      if (!executeResponse.ok) {
        const errorData = await executeResponse.json().catch(() => ({}))
        console.error('Execute job failed:', errorData)
        addLog(`❌ Workflow execution failed: ${errorData.error || 'Unknown error'}`)
        throw new Error(errorData.details || errorData.error || 'Failed to execute job')
      }

      addLog('✅ Workflow execution started successfully')

      // Step 5: Poll for completion (no timeout - will poll until job completes or fails)
      setProgress(50)
      setStatusMessage('Processing...')
      addLog('⏳ Polling for completion (no timeout - waiting for job to complete)...')
      
      let completed = false
      let attempts = 0
      const startTime = Date.now()

      while (!completed) {
        await new Promise(resolve => setTimeout(resolve, 10000)) // Poll every 10 seconds
        attempts++
        
        // Progress increases slowly but never reaches 100 until actually complete
        const progressPercent = 50 + Math.min(40, (attempts * 2))
        setProgress(Math.min(90, progressPercent))
        
        // Calculate elapsed time
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000)
        const minutes = Math.floor(elapsedSeconds / 60)
        const seconds = elapsedSeconds % 60
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`
        
        try {
          // Try to get job status - handle transient API failures gracefully
        const statusResponse = await fetch(`/api/opus/job/${jobExecutionId}/status`)
          
          if (!statusResponse.ok) {
            // API call failed, but don't stop - log and continue polling
            addLog(`⚠️ Status check #${attempts} failed (API error), will retry... (${timeString})`)
            setStatusMessage(`Processing... (${timeString}) - Retrying status check...`)
            continue // Skip to next iteration
          }
          
        const { status: jobStatus } = await statusResponse.json()
        
        setStatusMessage(`Processing... (${timeString}) - Status: ${jobStatus}`)
          addLog(`⏳ Job status check #${attempts}: ${jobStatus} (${timeString} elapsed)`)

          // Only stop on definitive status from the workflow
        if (jobStatus === 'COMPLETED') {
          completed = true
            addLog('🎉 Job completed successfully!')
        } else if (jobStatus === 'FAILED') {
            // Job explicitly failed - this is the only real failure
            addLog('❌ Workflow execution returned FAILED status')
            
            // Try to get more details about the failure
            try {
              const failedAuditResponse = await fetch(`/api/opus/job/${jobExecutionId}/audit`)
              if (failedAuditResponse.ok) {
                const failedAudit = await failedAuditResponse.json()
                addLog(`📊 Failed nodes: ${failedAudit.failed_nodes?.join(', ') || 'Unknown'}`)
                setAuditLog(failedAudit)
              }
            } catch (auditErr) {
              addLog('⚠️ Could not fetch audit log for failed job')
            }
            
            throw new Error('Workflow execution failed. Check the audit log for details.')
          }
        } catch (pollError: any) {
          // If it's our intentional error (FAILED status), re-throw it
          if (pollError.message?.includes('Workflow execution failed')) {
            throw pollError
          }
          
          // Otherwise it's a transient network error - log and continue
          addLog(`⚠️ Status check #${attempts} encountered error: ${pollError.message}. Continuing...`)
          setStatusMessage(`Processing... (${timeString}) - Connection issue, retrying...`)
          // Continue polling - don't give up on transient errors
        }
      }

      // Step 6: Get results
      setProgress(95)
      setStatusMessage('Retrieving your generated CV...')
      addLog('📥 Fetching job results...')
      
      const resultsResponse = await fetch(`/api/opus/job/${jobExecutionId}/results`)
      const results = await resultsResponse.json()
      addLog('✅ Results fetched successfully')
      
      console.log('📦 Full Results Object:', JSON.stringify(results, null, 2))
      console.log('📦 Results keys:', Object.keys(results))

      // Try multiple extraction paths
      let latexCode = ''
      
      // Path 1: Check jobResultsPayloadSchema
      if (results?.jobResultsPayloadSchema) {
        console.log('🔍 jobResultsPayloadSchema:', results.jobResultsPayloadSchema)
        const outputKeys = Object.keys(results.jobResultsPayloadSchema)
        console.log('🔍 Output keys:', outputKeys)
        
        // Try each output key
        for (const key of outputKeys) {
          const value = results.jobResultsPayloadSchema[key]
          console.log(`🔍 Checking ${key}:`, value)
          
          if (value?.value?.cv_latex) {
            latexCode = value.value.cv_latex
            console.log('✅ Found LaTeX in path 1:', key)
            break
          }
          if (value?.value && typeof value.value === 'string' && value.value.includes('\\documentclass')) {
            latexCode = value.value
            console.log('✅ Found LaTeX string in path 1:', key)
            break
          }
        }
      }
      
      // Path 2: Check direct results
      if (!latexCode && results?.results?.cv_latex) {
        latexCode = results.results.cv_latex
        console.log('✅ Found LaTeX in path 2')
      }
      
      // Path 3: Check if results itself is a string
      if (!latexCode && typeof results === 'string' && results.includes('\\documentclass')) {
        latexCode = results
        console.log('✅ Found LaTeX as string in path 3')
      }
      
      // Path 4: Check for any property that looks like LaTeX
      if (!latexCode) {
        const searchForLatex = (obj: any, depth = 0): string => {
          if (depth > 5) return ''
          if (typeof obj === 'string' && obj.includes('\\documentclass')) {
            return obj
          }
          if (typeof obj === 'object' && obj !== null) {
            for (const key in obj) {
              const result = searchForLatex(obj[key], depth + 1)
              if (result) return result
            }
          }
          return ''
        }
        latexCode = searchForLatex(results)
        if (latexCode) console.log('✅ Found LaTeX via deep search')
      }

      console.log('📄 Extracted LaTeX length:', latexCode.length)
      console.log('📄 LaTeX preview (first 200 chars):', latexCode.substring(0, 200))

      if (latexCode && latexCode.length > 0) {
        addLog(`✅ LaTeX code extracted successfully (${latexCode.length} characters)`)
      } else {
        addLog('⚠️ Warning: No LaTeX code found in results')
      }

      // Step 7: Fetch audit log
      setStatusMessage('Fetching audit log...')
      addLog('📊 Fetching audit log for workflow execution...')
      
      try {
        const auditResponse = await fetch(`/api/opus/job/${jobExecutionId}/audit`)
        if (auditResponse.ok) {
          const audit = await auditResponse.json()
          setAuditLog(audit)
          addLog(`✅ Audit log fetched: ${audit.nb_executed_nodes || 0} nodes executed`)
          console.log('📊 Audit Log:', audit)
        } else {
          addLog('⚠️ Failed to fetch audit log (non-critical)')
        }
      } catch (auditErr) {
        console.error('Failed to fetch audit log:', auditErr)
        addLog('⚠️ Failed to fetch audit log (non-critical)')
      }

      setProgress(100)
      setStatus('completed')
      setStatusMessage('CV generated successfully!')
      addLog('🎊 CV generation workflow completed successfully!')
      
      onChange({
        ...data,
        opusGeneratedCV: results,
        opusLatexCode: latexCode
      })

    } catch (err: any) {
      setStatus('failed')
      setError(err.message || 'Failed to generate CV')
      setStatusMessage('Failed to generate CV')
      addLog(`❌ ERROR: ${err.message || 'Failed to generate CV'}`)
    }
  }

  React.useEffect(() => {
    // Only generate once - prevent duplicate calls
    if (!hasStartedGeneration.current && status === 'idle' && data.githubRepo1 && data.githubRepo2 && data.githubRepo3 && data.linkedin && data.twitter && data.jobDescription) {
      hasStartedGeneration.current = true
      addLog('🔒 Generation initiated (preventing duplicate calls)')
      generateCV()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full space-y-8 pb-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-2"
      >
        <h2 className="text-3xl font-bold text-foreground">AI is Generating Your CV</h2>
        <p className="text-base text-muted-foreground">
          Please wait while our AI analyzes your profiles and creates a professional CV
        </p>
      </motion.div>

      {/* Main Content Container */}
      <div className="space-y-6 w-full">
        {/* Progress Card - Primary Focus */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="bg-white border rounded-xl p-8 shadow-md">
            <div className="space-y-6">
          {/* Progress Bar */}
              <div className="space-y-3">
            <div className="flex justify-between items-center">
                  <span className="text-base font-semibold text-foreground">{statusMessage}</span>
                  <span className="text-base font-bold text-foreground">{Math.round(progress)}%</span>
            </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <motion.div
                className={cn(
                      "h-full rounded-full shadow-sm",
                      status === 'completed' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      status === 'failed' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                      'bg-gradient-to-r from-blue-500 to-blue-600'
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>

          {/* Status Icon */}
              <div className="flex items-center justify-center py-10">
            {status === 'generating' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="h-20 w-20 text-blue-600" />
                  </motion.div>
            )}
            {status === 'completed' && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                    <CheckCircle className="h-20 w-20 text-green-600" />
              </motion.div>
            )}
            {status === 'failed' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <AlertCircle className="h-20 w-20 text-red-600" />
                  </motion.div>
            )}
          </div>

          {/* Status Message */}
          <div className="text-center">
            {status === 'generating' && (
                  <p className="text-base text-muted-foreground">
                    This usually takes about 3 minutes. Please wait...
              </p>
            )}
            {status === 'completed' && (
                  <div className="space-y-2">
                    <p className="text-lg text-green-600 font-semibold">
                      ✨ Your professional CV has been generated!
              </p>
                    <p className="text-sm text-muted-foreground">
                      Click Next to view and edit it
                    </p>
                  </div>
            )}
            {status === 'failed' && error && (
                  <div className="space-y-3">
                    <p className="text-base text-red-600 font-semibold">{error}</p>
                    <Button onClick={generateCV} variant="outline" size="default" className="mt-2">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Retry Generation
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
        </motion.div>

        {/* Interactive Content - While Generating */}
        {status === 'generating' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <ProjectTabs youtubeVideoId="dQw4w9WgXcQ" progress={progress} />
          </motion.div>
        )}

        {/* Real-Time Activity Logs - While Generating/Failed */}
        {logs.length > 0 && status !== 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="bg-white border rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Real-Time Activity Log</h3>
                    <p className="text-xs text-muted-foreground">Live workflow execution updates</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLogs([])}
                  className="hover:bg-white"
                >
                  Clear
                </Button>
              </div>
              <div className="bg-gray-900 text-green-400 p-6 font-mono text-xs">
                {logs.map((log, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mb-1.5 whitespace-pre-wrap break-all"
                  >
                    {log}
                  </motion.div>
                ))}
                {logs.length === 0 && (
                  <div className="text-gray-500 text-center py-4">No activity yet...</div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Workflow Execution Audit - After Completion */}
        {auditLog && status === 'completed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <WorkflowAuditViewer auditLog={auditLog} />
          </motion.div>
        )}

        {/* LaTeX Code Preview - After Completion */}
      {status === 'completed' && data.opusLatexCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white border rounded-xl shadow-md overflow-hidden">
              <div className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <FileText className="h-5 w-5 text-purple-600" />
          </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Generated LaTeX Code</h3>
                    <p className="text-xs text-muted-foreground">Raw LaTeX source for your CV</p>
        </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 max-h-96 overflow-auto">
                  <pre className="text-xs font-mono text-gray-800">{data.opusLatexCode}</pre>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

// Step 2: GitHub Repository and LinkedIn Experience Selector
function RepositoryAndExperienceSelector({ 
  selectedRepos,
  selectedExperiences, 
  onChange,
  githubUsername,
  linkedinUrl
}: { 
  selectedRepos: Repository[]
  selectedExperiences: Experience[]
  onChange: (repos: Repository[], experiences: Experience[]) => void
  githubUsername: string
  linkedinUrl: string
}) {
  const [showAddExperience, setShowAddExperience] = useState(false)
  const [repos, setRepos] = useState<Repository[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loadingGithub, setLoadingGithub] = useState(true)
  const [loadingLinkedin, setLoadingLinkedin] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [linkedinError, setLinkedinError] = useState<string | null>(null)
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    title: "",
    company: "",
    duration: "",
    description: "",
    location: ""
  })

  // Fetch data from API
  React.useEffect(() => {
    const fetchData = async () => {
      console.log('🚀 [FETCH] Starting data fetch...')
      console.log('📌 [FETCH] GitHub Username:', githubUsername)
      console.log('📌 [FETCH] LinkedIn URL:', linkedinUrl)
      
      try {
        // Step 1: Fetch GitHub repositories first
        console.log('📦 [GITHUB] Fetching repositories...')
        setLoadingGithub(true)
        setError(null)
        
        const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`
        console.log('📡 [GITHUB] API URL:', githubApiUrl)
        
        const reposResponse = await fetch(githubApiUrl)
        console.log('📡 [GITHUB] Response status:', reposResponse.status)
        
        if (!reposResponse.ok) {
          throw new Error('Failed to fetch GitHub repositories')
        }
        
        const reposData = await reposResponse.json()
        console.log('✅ [GITHUB] Fetched repositories count:', reposData.length)
        console.log('📊 [GITHUB] Repository data:', reposData)
        
        const formattedRepos: Repository[] = reposData.map((repo: any) => ({
          id: repo.id.toString(),
          name: repo.name,
          description: repo.description || "No description available",
          language: repo.language || "N/A",
          stars: repo.stargazers_count,
          url: repo.html_url
        }))
        
        console.log('✅ [GITHUB] Formatted repositories:', formattedRepos)
        setRepos(formattedRepos)
        setLoadingGithub(false)
        console.log('✅ [GITHUB] Repositories loaded successfully!')
        
        // Step 2: Now fetch LinkedIn profile experiences
        if (linkedinUrl && linkedinUrl.trim()) {
          console.log('🔗 [LINKEDIN] Starting LinkedIn fetch...')
          setLoadingLinkedin(true)
          setLinkedinError(null)
          
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
          const linkedinApiUrl = `${apiUrl}/linkedin-profile?max_wait=60`
          console.log('📡 [LINKEDIN] API URL:', linkedinApiUrl)
          console.log('📡 [LINKEDIN] Request body:', { user_input: linkedinUrl })
          
          try {
            const linkedinResponse = await fetch(linkedinApiUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ user_input: linkedinUrl })
            })
            
            console.log('📡 [LINKEDIN] Response status:', linkedinResponse.status)
            
            if (linkedinResponse.ok) {
              const linkedinData = await linkedinResponse.json()
              console.log('✅ [LINKEDIN] Raw response data:', linkedinData)
              
              // Extract experiences from LinkedIn profile
              const formattedExperiences: Experience[] = []
              
              if (linkedinData.profile && linkedinData.profile.position_groups) {
                console.log('📊 [LINKEDIN] Position groups found:', linkedinData.profile.position_groups.length)
                
                linkedinData.profile.position_groups.forEach((group: any, groupIndex: number) => {
                  console.log(`📌 [LINKEDIN] Processing group ${groupIndex + 1}:`, group)
                  
                  if (group.profile_positions) {
                    console.log(`📌 [LINKEDIN] Group ${groupIndex + 1} has ${group.profile_positions.length} positions`)
                    
                    group.profile_positions.forEach((position: any, posIndex: number) => {
                      console.log(`📄 [LINKEDIN] Position ${posIndex + 1}:`, position)
                      
                      const startDate = position.starts_at ? `${position.starts_at.month || ''}/${position.starts_at.year || ''}` : ''
                      const endDate = position.ends_at ? `${position.ends_at.month || ''}/${position.ends_at.year || ''}` : 'Present'
                      const duration = startDate && endDate ? `${startDate} - ${endDate}` : ''
                      
                      const experience = {
                        id: `linkedin-${position.company || 'unknown'}-${position.title || 'position'}`.replace(/\s+/g, '-').toLowerCase(),
                        title: position.title || "Position",
                        company: position.company || group.company?.name || "Company",
                        duration: duration || "Not specified",
                        location: position.location || "",
                        description: position.description || ""
                      }
                      
                      console.log('✅ [LINKEDIN] Formatted experience:', experience)
                      formattedExperiences.push(experience)
                    })
                  }
                })
                
                console.log('✅ [LINKEDIN] Total formatted experiences:', formattedExperiences.length)
              } else {
                console.log('⚠️ [LINKEDIN] No position_groups found in profile')
              }
              
              if (formattedExperiences.length > 0) {
                console.log('✅ [LINKEDIN] Setting experiences:', formattedExperiences)
                setExperiences(formattedExperiences)
              } else {
                console.log('⚠️ [LINKEDIN] No experiences found, setting empty array')
                setExperiences([])
              }
            } else {
              const errorData = await linkedinResponse.json()
              console.error('❌ [LINKEDIN] API failed:', errorData)
              setLinkedinError('Failed to fetch LinkedIn data')
              setExperiences([])
            }
          } catch (linkedinError) {
            console.error('❌ [LINKEDIN] Error:', linkedinError)
            setLinkedinError(linkedinError instanceof Error ? linkedinError.message : 'LinkedIn fetch failed')
            setExperiences([])
          } finally {
            setLoadingLinkedin(false)
            console.log('✅ [LINKEDIN] Fetch complete')
          }
        } else {
          console.log('⚠️ [LINKEDIN] No LinkedIn URL provided, skipping')
          setExperiences([])
        }
        
      } catch (err) {
        console.error('❌ [FETCH] Error fetching GitHub data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
        setLoadingGithub(false)
        
        // Fallback to mock data on error
        const fallbackRepos: Repository[] = [
          {
            id: "1",
            name: "awesome-project",
            description: "A full-stack web application built with React and Node.js",
            language: "TypeScript",
            stars: 245,
            url: "https://github.com/user/awesome-project"
          },
          {
            id: "2",
            name: "machine-learning-toolkit",
            description: "Collection of ML algorithms and utilities",
            language: "Python",
            stars: 189,
            url: "https://github.com/user/ml-toolkit"
          },
          {
            id: "3",
            name: "design-system",
            description: "Comprehensive UI component library",
            language: "JavaScript",
            stars: 567,
            url: "https://github.com/user/design-system"
          }
        ]

        setRepos(fallbackRepos)
        setExperiences([])
      }
    }

    if (githubUsername) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [githubUsername, linkedinUrl])

  const handleToggleRepo = (repo: Repository) => {
    const isSelected = selectedRepos.some(r => r.id === repo.id)
    const newRepos = isSelected 
      ? selectedRepos.filter(r => r.id !== repo.id)
      : [...selectedRepos, repo]
    onChange(newRepos, selectedExperiences)
  }

  const handleToggleExperience = (exp: Experience) => {
    const isSelected = selectedExperiences.some(e => e.id === exp.id)
    const newExperiences = isSelected
      ? selectedExperiences.filter(e => e.id !== exp.id)
      : [...selectedExperiences, exp]
    onChange(selectedRepos, newExperiences)
  }

  const handleAddExperience = () => {
    if (newExperience.title && newExperience.company) {
      const exp: Experience = {
        id: `custom-${Date.now()}`,
        title: newExperience.title || "",
        company: newExperience.company || "",
        duration: newExperience.duration || "",
        description: newExperience.description || "",
        location: newExperience.location
      }
      onChange(selectedRepos, [...selectedExperiences, exp])
      setNewExperience({ title: "", company: "", duration: "", description: "", location: "" })
      setShowAddExperience(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* GitHub Loading State */}
      {loadingGithub && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-foreground" />
            <h3 className="text-lg font-semibold mb-2">Loading GitHub Repositories</h3>
            <p className="text-sm text-muted-foreground">Fetching your repositories from GitHub...</p>
          </div>
        </div>
      )}
      
      {/* LinkedIn Loading Indicator (shown while repos are visible) */}
      {!loadingGithub && loadingLinkedin && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Loading LinkedIn Experiences</h3>
              <p className="text-sm text-blue-700">Fetching work experience from LinkedIn... This may take 10-60 seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Error State */}
      {error && !loadingGithub && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Could not fetch GitHub data</h3>
              <p className="text-sm text-yellow-700">Using sample data instead. Error: {error}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* LinkedIn Error State */}
      {linkedinError && !loadingLinkedin && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 mb-1">Could not fetch LinkedIn data</h3>
              <p className="text-sm text-yellow-700">You can add experiences manually. Error: {linkedinError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Two Column Layout */}
      {!loadingGithub && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Repositories Column */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Github className="h-5 w-5 text-foreground" />
                <h2 className="text-lg font-bold text-foreground">Repositories</h2>
              </div>
              <p className="text-xs text-muted-foreground">Choose up to 4 projects from @{githubUsername}</p>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
              {repos.map((repo, index) => {
              const isSelected = selectedRepos.some(r => r.id === repo.id)
              const isDisabled = !isSelected && selectedRepos.length >= 4
              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all duration-200",
                    isSelected 
                      ? "border-foreground bg-gray-50/50 shadow-sm" 
                      : isDisabled
                      ? "border-border opacity-50 cursor-not-allowed"
                      : "border-border hover:border-gray-300 hover:shadow-sm"
                  )}
                  onClick={() => !isDisabled && handleToggleRepo(repo)}
                  whileHover={!isDisabled ? { y: -2, transition: { duration: 0.2 } } : {}}
                  whileTap={!isDisabled ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={isSelected}
                      disabled={isDisabled}
                      onCheckedChange={() => !isDisabled && handleToggleRepo(repo)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-semibold text-sm text-foreground truncate">{repo.name}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                            {repo.language}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Star className="h-3 w-3" />
                            <span>{repo.stars}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* LinkedIn Experiences Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Linkedin className="h-5 w-5 text-foreground" />
                <h2 className="text-lg font-bold text-foreground">Experience</h2>
              </div>
              <p className="text-xs text-muted-foreground">Select work experiences</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddExperience(!showAddExperience)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>

          {/* Add New Experience Form */}
          {showAddExperience && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-3 p-3 border border-border rounded-lg bg-secondary/50"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-foreground">Add New Experience</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddExperience(false)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
                <div className="space-y-1.5">
                  <Label htmlFor="exp-title" className="text-xs">Job Title *</Label>
                  <Input
                    id="exp-title"
                    placeholder="Software Engineer"
                    value={newExperience.title}
                    onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="exp-company" className="text-xs">Company *</Label>
                  <Input
                    id="exp-company"
                    placeholder="Company Name"
                    value={newExperience.company}
                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="exp-duration" className="text-xs">Duration</Label>
                    <Input
                      id="exp-duration"
                      placeholder="2021 - Present"
                      value={newExperience.duration}
                      onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="exp-location" className="text-xs">Location</Label>
                    <Input
                      id="exp-location"
                      placeholder="Remote"
                      value={newExperience.location}
                      onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
                      className="h-8 text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="exp-description" className="text-xs">Description</Label>
                  <Textarea
                    id="exp-description"
                    placeholder="Brief description..."
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                    rows={2}
                    className="text-sm"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewExperience({ title: "", company: "", duration: "", description: "", location: "" })
                      setShowAddExperience(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAddExperience}
                    disabled={!newExperience.title || !newExperience.company}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {experiences.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No LinkedIn experiences found</p>
                <p className="text-xs mt-1">Add your experiences manually using the &ldquo;Add&rdquo; button above</p>
              </div>
            )}
            {experiences.map((exp, index) => {
              const isSelected = selectedExperiences.some(e => e.id === exp.id)
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all duration-200",
                    isSelected 
                      ? "border-foreground bg-gray-50/50 shadow-sm" 
                      : "border-border hover:border-gray-300 hover:shadow-sm"
                  )}
                  onClick={() => handleToggleExperience(exp)}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleToggleExperience(exp)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-semibold text-sm text-foreground">{exp.title}</h3>
                          <p className="text-xs text-muted-foreground">{exp.company}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {exp.duration}
                        </span>
                      </div>
                      {exp.location && (
                        <p className="text-xs text-muted-foreground mb-1">{exp.location}</p>
                      )}
                      <p className="text-xs text-muted-foreground line-clamp-2">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Custom Added Experiences */}
          {selectedExperiences.filter(e => e.id.startsWith('custom-')).length > 0 && (
            <div className="mt-3 space-y-2">
              <h3 className="text-xs font-semibold text-foreground">Custom Experiences</h3>
              {selectedExperiences.filter(e => e.id.startsWith('custom-')).map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border border-gray-300 bg-gray-50/50 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <h3 className="font-semibold text-sm text-foreground">{exp.title}</h3>
                          <p className="text-xs text-muted-foreground">{exp.company}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {exp.duration}
                        </span>
                      </div>
                      {exp.location && (
                        <p className="text-xs text-muted-foreground mb-1">{exp.location}</p>
                      )}
                      <p className="text-xs text-muted-foreground line-clamp-2">{exp.description}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => {
                        const newExperiences = selectedExperiences.filter(e => e.id !== exp.id)
                        onChange(selectedRepos, newExperiences)
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  )
}

// Step 3: CV Preview with Live Editing
function CVPreview({ 
  data, 
  onChange 
}: { 
  data: CVData
  onChange: (data: CVData) => void 
}) {
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "downloaded" | "complete">("idle")
  const [progress, setProgress] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [compiling, setCompiling] = useState(false)
  const [compilationError, setCompilationError] = useState<string | null>(null)

  // Auto-compile LaTeX when available
  React.useEffect(() => {
    if (data.opusLatexCode && !pdfUrl) {
      handleCompileLatex()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.opusLatexCode])

  const handleCompileLatex = async () => {
    if (!data.opusLatexCode) return

    setCompiling(true)
    setCompilationError(null)

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/compile-latex`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ latex_code: data.opusLatexCode }),
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
      setCompiling(false)
    }
  }

  const handleDownload = () => {
    setDownloadStatus("downloading")
    setProgress(0)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setDownloadStatus("downloaded")
          return 100
        }
        return prev + 10
      })
    }, 100)

    setTimeout(() => {
      setDownloadStatus("complete")
      setTimeout(() => {
        setDownloadStatus("idle")
        setProgress(0)
      }, 1500)
    }, 2500)
  }

  return (
    <div className="space-y-4">
      {/* Only show default preview if no Opus LaTeX code */}
      {!data.opusLatexCode && (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1">CV Preview</h2>
              <p className="text-sm text-muted-foreground">Review and edit your CV before downloading</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              {isEditing ? "Done" : "Edit"}
            </Button>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="border border-border rounded-lg bg-background shadow-sm"
          >
            <div className="p-8 space-y-6">
              {/* Header */}
              <div className="border-b border-border pb-6">
                {isEditing ? (
                  <div className="space-y-3">
                    <Input
                      value={data.name || "Your Name"}
                      onChange={(e) => onChange({ ...data, name: e.target.value })}
                      className="text-3xl font-bold"
                      placeholder="Your Name"
                    />
                    <Input
                      value={data.title || "Professional Title"}
                      onChange={(e) => onChange({ ...data, title: e.target.value })}
                      className="text-lg"
                      placeholder="Professional Title"
                    />
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {data.name || "Your Name"}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {data.title || "Professional Title"}
                    </p>
                  </>
                )}
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Contact</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {data.email && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{data.email}</span>
                    </div>
                  )}
                  {data.github && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Github className="h-4 w-4" />
                      <span>{data.github}</span>
                    </div>
                  )}
                  {data.linkedin && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Linkedin className="h-4 w-4" />
                      <span>{data.linkedin}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Summary</h3>
                {isEditing ? (
                  <Textarea
                    value={data.summary || ""}
                    onChange={(e) => onChange({ ...data, summary: e.target.value })}
                    placeholder="Write a brief professional summary..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">
                    {data.summary || "Add a professional summary to highlight your experience and skills."}
                  </p>
                )}
              </div>

              {/* Experience */}
              {data.selectedExperiences.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Experience</h3>
                  <div className="space-y-4">
                    {data.selectedExperiences.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-foreground pl-4">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div>
                            <h4 className="font-semibold text-foreground">{exp.title}</h4>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {exp.duration}
                          </span>
                        </div>
                        {exp.location && (
                          <p className="text-xs text-muted-foreground mb-2">{exp.location}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {data.selectedRepos.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Featured Projects</h3>
                  <div className="space-y-4">
                    {data.selectedRepos.map((repo) => (
                      <div key={repo.id} className="border-l-2 border-foreground pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{repo.name}</h4>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {repo.language}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>⭐ {repo.stars} stars</span>
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          </motion.div>
        </>
      )}

      {/* LaTeX PDF Preview (for Professional Template with Opus) */}
      {data.opusLatexCode && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-white border rounded-lg overflow-hidden shadow-sm"
        >
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold text-foreground">AI-Generated CV</h3>
            </div>
            <div className="flex items-center gap-2">
              {compiling && (
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Compiling...
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleCompileLatex}
                disabled={compiling}
              >
                {compiling ? 'Compiling...' : 'Recompile'}
              </Button>
            </div>
          </div>
          
          {compilationError && (
            <div className="p-4 bg-red-50 border-b border-red-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900 mb-1">Compilation Failed</h4>
                  <p className="text-sm text-red-700 whitespace-pre-wrap">{compilationError}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-gray-100" style={{ height: '600px' }}>
            {pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full border-0"
                title="CV PDF Preview"
              />
            ) : compiling ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">Compiling your CV...</p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8">
                  <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">No Preview Available</h3>
                  <p className="text-sm text-gray-500 mb-4">Click &ldquo;Recompile&rdquo; to generate a preview</p>
                  <Button variant="outline" onClick={handleCompileLatex}>
                    Compile LaTeX
                  </Button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Download Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex justify-center"
      >
        <Button
          onClick={handleDownload}
          className={cn(
            "w-48 relative overflow-hidden transition-all duration-200",
            downloadStatus === "downloading" && "bg-primary/50 hover:bg-primary/50",
            downloadStatus !== "idle" && "pointer-events-none"
          )}
          disabled={downloadStatus !== "idle"}
        >
          {downloadStatus === "idle" && (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </>
          )}
          {downloadStatus === "downloading" && (
            <div className="z-[5] flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {progress}%
            </div>
          )}
          {downloadStatus === "downloaded" && (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Downloaded</span>
            </>
          )}
          {downloadStatus === "complete" && <span>Download PDF</span>}
          {downloadStatus === "downloading" && (
            <div
              className="absolute bottom-0 z-[3] h-full left-0 bg-primary inset-0 transition-all duration-200 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          )}
        </Button>
      </motion.div>
    </div>
  )
}

// Main Wizard Component
export default function CVGeneratorWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [animationDirection, setAnimationDirection] = useState<"forward" | "backward">("forward")
  const [cvData, setCVData] = useState<CVData>({
    github: "yashwanth-3000",
    linkedin: "https://www.linkedin.com/in/pyashwanthkrishna/",
    twitter: "yashwanthstwt",
    email: "",
    selectedRepos: [],
    selectedExperiences: [],
    name: "",
    title: "",
    summary: "",
    githubRepo1: "https://github.com/yashwanth-3000/Mathemagica",
    githubRepo2: "https://github.com/yashwanth-3000/MakeMyCv",
    githubRepo3: "https://github.com/yashwanth-3000/content--hub",
    jobDescription: "Design, build, and optimize autonomous AI agents for real-world tasks and workflows.\nIntegrate LLMs, APIs, retrieval systems, and tool-use capabilities into agent pipelines.\nDevelop agent reasoning, planning, and multi-step task-execution logic.\nImplement monitoring, evaluation, and continuous improvement for agent reliability.\nWork with cross-functional teams to embed agents into products and operations.\nCreate scalable architectures for agent orchestration and multi-agent collaboration.\nEnsure data security, compliance, and performance efficiency across agent systems.\nResearch emerging frameworks to innovate and upgrade agentic capabilities."
  })

  const steps = [
    { id: "social", title: "Social Media", icon: Mail },
    { id: "content", title: "AI Generation", icon: Briefcase },
    { id: "preview", title: "Preview", icon: CheckCircle }
  ]

  const handleNext = async () => {
    // Validate Step 0 (Social Media / Input) - now always uses professional template
    if (currentStep === 0) {
      console.log('🔍 Validating form data:', {
        github: cvData.github,
        linkedin: cvData.linkedin,
        twitter: cvData.twitter,
        selectedRepos: (cvData as any).selectedRepos,
        githubRepo1: (cvData as any).githubRepo1,
        githubRepo2: (cvData as any).githubRepo2,
        githubRepo3: (cvData as any).githubRepo3,
        jobDescription: (cvData as any).jobDescription?.substring(0, 50) + '...'
      })

      // GitHub username is always required
      if (!cvData.github.trim()) {
        alert("GitHub Username is required")
        return
      }

      // Validate required fields for AI-powered CV generation
        const selectedReposCount = (cvData as any).selectedRepos?.length || 0
      
      // Also check if repos are selected via URL fields
      const hasRepoUrls = Boolean(
        (cvData as any).githubRepo1?.trim() && 
        (cvData as any).githubRepo2?.trim() && 
        (cvData as any).githubRepo3?.trim()
      )
      
      console.log('🔍 Repo validation:', { selectedReposCount, hasRepoUrls })
        
        if (!cvData.linkedin || !cvData.linkedin.trim()) {
          alert("LinkedIn Profile is required for AI-powered CV generation")
          return
        }
        
        if (!cvData.twitter || !cvData.twitter.trim()) {
          alert("Twitter/X Handle is required for AI-powered CV generation")
          return
        }
        
      // Check either selectedRepos array OR individual repo URL fields
      if (selectedReposCount !== 3 && !hasRepoUrls) {
          alert("Please select exactly 3 GitHub repositories")
          return
        }
        
        if (!(cvData as any).jobDescription || !(cvData as any).jobDescription.trim()) {
          alert("Job Description is required")
          return
        }

      console.log('✅ Validation passed! Moving to next step')
    }

    setAnimationDirection("forward")
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setAnimationDirection("backward")
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-foreground pt-16">
        <div className="flex flex-col">
          {/* Header with Progress Stepper */}
          <div className="border-b border-gray-100 bg-white sticky top-16 z-10 flex-shrink-0">
            <div className="max-w-5xl mx-auto px-8 py-6">
              {/* Title and Step Info */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">Create Your CV</h1>
                <p className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length} • {steps[currentStep].title}
                </p>
              </div>

              {/* Progress Stepper */}
              <div className="flex items-center justify-center gap-3">
                {steps.map((step, index) => (
                  <React.Fragment key={step.id}>
                    <motion.div 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={cn(
                            "rounded-full flex items-center justify-center transition-all duration-300 w-10 h-10 border-2 shadow-sm",
                            index <= currentStep
                              ? "bg-foreground text-background border-foreground shadow-md"
                              : "bg-white text-muted-foreground border-gray-200"
                          )}
                          animate={index === currentStep ? { scale: [1, 1.05, 1] } : {}}
                          transition={{ duration: 0.5 }}
                        >
                          {index < currentStep ? (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              <Check className="w-5 h-5" />
                            </motion.div>
                          ) : (
                            <step.icon className="w-5 h-5" />
                          )}
                        </motion.div>
                        <div className="hidden md:block">
                          <p className={cn(
                            "text-sm font-medium whitespace-nowrap transition-colors",
                            index <= currentStep ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {step.title}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                    {index < steps.length - 1 && (
                      <div className="flex-shrink-0 w-16 h-0.5 bg-gray-200 mx-1">
                        <motion.div
                          className="h-full bg-foreground"
                          initial={{ width: 0 }}
                          animate={{ width: index < currentStep ? "100%" : 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 py-6">
            <div className="max-w-5xl mx-auto px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {currentStep === 0 && (
                    <SocialMediaStep
                      data={cvData}
                      onChange={(socialData) => setCVData({ ...cvData, ...socialData })}
                    />
                  )}
                  {currentStep === 1 && (
                      <OpusCVGeneration
                        data={cvData}
                        onChange={setCVData}
                      />
                  )}
                  {currentStep === 2 && (
                    <CVPreview
                      data={cvData}
                      onChange={setCVData}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="py-4 bg-white flex-shrink-0">
            <div className="max-w-5xl mx-auto px-8 flex justify-between items-center">
              <AnimatePresence mode="wait">
                {currentStep > 0 ? (
                  <motion.div
                    key="prev-button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      className="transition-all hover:shadow-sm"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>
                  </motion.div>
                ) : (
                  <div />
                )}
              </AnimatePresence>
              <AnimatePresence mode="wait">
                {currentStep < steps.length - 1 ? (
                  <motion.div
                    key="next-button"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      onClick={handleNext}
                      className="transition-all hover:shadow-sm"
                    >
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ) : currentStep === steps.length - 1 ? (
                  <motion.div
                    key="finish-button"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button 
                      onClick={() => {
                        // Save LaTeX code to localStorage for editor
                        if (cvData.opusLatexCode) {
                          localStorage.setItem('cvLatexCode', cvData.opusLatexCode)
                        }
                        window.location.href = '/create-cv/editor'
                      }}
                      className="transition-all hover:shadow-sm"
                    >
                      Edit in LaTeX
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

