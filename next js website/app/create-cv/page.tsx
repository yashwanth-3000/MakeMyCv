"use client"

import * as React from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { Check, Download, Loader2, CheckCircle, Github, Linkedin, Twitter, Mail, Globe, ArrowRight, ArrowLeft, Edit2, FileText, Plus, Briefcase, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Navbar } from "@/components/navbar"
import { cn } from "@/lib/utils"

// Types
interface SocialMediaData {
  github: string
  linkedin: string
  twitter: string
  email: string
  website: string
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
}

// Step 1: Social Media Input Form
function SocialMediaStep({ 
  data, 
  onChange 
}: { 
  data: SocialMediaData
  onChange: (data: SocialMediaData) => void 
}) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof SocialMediaData, value: string) => {
    onChange({ ...data, [field]: value })
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const formFields = [
    { id: "github", label: "GitHub Username", placeholder: "octocat", icon: Github, value: data.github },
    { id: "linkedin", label: "LinkedIn Profile", placeholder: "linkedin.com/in/username", icon: Linkedin, value: data.linkedin },
    { id: "twitter", label: "Twitter/X Handle", placeholder: "@username", icon: Twitter, value: data.twitter },
    { id: "email", label: "Email Address", placeholder: "your.email@example.com", icon: Mail, value: data.email, type: "email" },
    { id: "website", label: "Personal Website", placeholder: "yourwebsite.com", icon: Globe, value: data.website }
  ]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Social Media Profiles</h2>
        <p className="text-sm text-muted-foreground">Connect your professional profiles to generate your CV</p>
      </div>

      <div className="space-y-3">
        {formFields.map((field, index) => {
          const Icon = field.icon
          return (
            <motion.div 
              key={field.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="space-y-2"
            >
              <Label htmlFor={field.id} className="text-sm font-medium">
                {field.label}
              </Label>
              <div className="relative">
                <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id={field.id}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={(e) => handleChange(field.id as keyof SocialMediaData, e.target.value)}
                  className="pl-10 transition-all duration-200 focus:scale-[1.01]"
                />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

// Step 2: GitHub Repository and LinkedIn Experience Selector
function RepositoryAndExperienceSelector({ 
  selectedRepos,
  selectedExperiences,
  onChange 
}: { 
  selectedRepos: Repository[]
  selectedExperiences: Experience[]
  onChange: (repos: Repository[], experiences: Experience[]) => void 
}) {
  const [showAddExperience, setShowAddExperience] = useState(false)
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    title: "",
    company: "",
    duration: "",
    description: "",
    location: ""
  })

  const mockRepos: Repository[] = [
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
    },
    {
      id: "4",
      name: "api-gateway",
      description: "Microservices API gateway with authentication",
      language: "Go",
      stars: 123,
      url: "https://github.com/user/api-gateway"
    },
    {
      id: "5",
      name: "mobile-app",
      description: "Cross-platform mobile application",
      language: "React Native",
      stars: 89,
      url: "https://github.com/user/mobile-app"
    }
  ]

  const mockExperiences: Experience[] = [
    {
      id: "exp1",
      title: "Senior Software Engineer",
      company: "Tech Corp",
      duration: "2021 - Present",
      location: "San Francisco, CA",
      description: "Led development of cloud-based solutions, mentored junior developers, and architected scalable microservices."
    },
    {
      id: "exp2",
      title: "Software Engineer",
      company: "StartupXYZ",
      duration: "2019 - 2021",
      location: "Remote",
      description: "Developed full-stack features for SaaS platform, improved performance by 40%, and collaborated with product team."
    },
    {
      id: "exp3",
      title: "Junior Developer",
      company: "Digital Agency",
      duration: "2018 - 2019",
      location: "New York, NY",
      description: "Built responsive websites, maintained client projects, and contributed to internal tools development."
    }
  ]

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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Repositories Column */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Github className="h-5 w-5 text-foreground" />
              <h2 className="text-lg font-bold text-foreground">Repositories</h2>
            </div>
            <p className="text-xs text-muted-foreground">Choose up to 4 projects</p>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
            {mockRepos.map((repo, index) => {
              const isSelected = selectedRepos.some(r => r.id === repo.id)
              const isDisabled = !isSelected && selectedRepos.length >= 4
              return (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all duration-200",
                    isSelected 
                      ? "border-foreground bg-secondary shadow-sm" 
                      : isDisabled
                      ? "border-border opacity-50 cursor-not-allowed"
                      : "border-border hover:border-foreground/50 hover:shadow-sm"
                  )}
                  onClick={() => !isDisabled && handleToggleRepo(repo)}
                  whileHover={!isDisabled ? { scale: 1.01 } : {}}
                >
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={isSelected}
                      disabled={isDisabled}
                      onCheckedChange={() => !isDisabled && handleToggleRepo(repo)}
                      className="mt-0.5"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-foreground truncate">{repo.name}</h3>
                        <span className="text-xs px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground whitespace-nowrap">
                          {repo.language}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-1">{repo.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>⭐ {repo.stars}</span>
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
            {mockExperiences.map((exp, index) => {
              const isSelected = selectedExperiences.some(e => e.id === exp.id)
              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={cn(
                    "border rounded-lg p-3 cursor-pointer transition-all duration-200",
                    isSelected 
                      ? "border-foreground bg-secondary shadow-sm" 
                      : "border-border hover:border-foreground/50 hover:shadow-sm"
                  )}
                  onClick={() => handleToggleExperience(exp)}
                  whileHover={{ scale: 1.01 }}
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
              {selectedExperiences.filter(e => e.id.startsWith('custom-')).map((exp) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="border border-foreground bg-secondary rounded-lg p-3"
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
    </motion.div>
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
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
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
              {data.website && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>{data.website}</span>
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
    </motion.div>
  )
}

// Main Wizard Component
export default function CVGeneratorWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [animationDirection, setAnimationDirection] = useState<"forward" | "backward">("forward")
  const [cvData, setCVData] = useState<CVData>({
    github: "",
    linkedin: "",
    twitter: "",
    email: "",
    website: "",
    selectedRepos: [],
    selectedExperiences: [],
    name: "",
    title: "",
    summary: ""
  })

  const steps = [
    { id: "social", title: "Social Media", icon: Mail },
    { id: "repos", title: "Content", icon: Briefcase },
    { id: "preview", title: "Preview", icon: FileText }
  ]

  const handleNext = () => {
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

  const pageVariants = {
    initial: (direction: string) => ({
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0
    }),
    in: {
      x: 0,
      opacity: 1
    },
    out: (direction: string) => ({
      x: direction === "forward" ? "-100%" : "100%",
      opacity: 0
    })
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-foreground pt-20 pb-8 px-4">
        <div className="w-full max-w-2xl mx-auto bg-white border border-border rounded-lg shadow-sm overflow-hidden">
          {/* Progress Bar */}
          <div className="px-4 pt-4 pb-3 border-b border-border">
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-lg font-bold">CV Generator</h1>
              <span className="text-xs text-muted-foreground">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>
            <div className="relative">
              <div className="overflow-hidden h-1.5 mb-3 text-xs flex rounded-full bg-muted">
                <div
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-foreground transition-all duration-500"
                />
              </div>
              <div className="flex justify-between">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex flex-col items-center">
                    <div
                      className={cn(
                        "rounded-full flex items-center justify-center transition-all w-8 h-8 border-2",
                        index <= currentStep
                          ? "bg-foreground text-background border-foreground"
                          : "bg-background text-muted-foreground border-border"
                      )}
                    >
                      {index < currentStep ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    <p className="text-xs mt-1.5 font-medium hidden sm:block">
                      {step.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="p-4">
            <AnimatePresence initial={false} custom={animationDirection} mode="wait">
              <motion.div
                key={currentStep}
                custom={animationDirection}
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
                className="min-h-[350px]"
              >
                {currentStep === 0 && (
                  <SocialMediaStep
                    data={cvData}
                    onChange={(socialData) => setCVData({ ...cvData, ...socialData })}
                  />
                )}
                {currentStep === 1 && (
                  <RepositoryAndExperienceSelector
                    selectedRepos={cvData.selectedRepos}
                    selectedExperiences={cvData.selectedExperiences}
                    onChange={(repos, experiences) => setCVData({ ...cvData, selectedRepos: repos, selectedExperiences: experiences })}
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

            {/* Navigation */}
            <div className={cn(
              "mt-6 flex",
              currentStep === 0 ? "justify-end" : "justify-between"
            )}>
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button 
                  size="sm"
                  onClick={handleNext}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  asChild
                >
                  <Link href="/cv-editor">
                    Edit in LaTeX
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

