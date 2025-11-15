"use client"

import * as React from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { Check, Download, Loader2, CheckCircle, Github, Linkedin, Twitter, Mail, Globe, ArrowRight, ArrowLeft, Edit2, FileText, Plus, Briefcase, X, AlertCircle, Star } from "lucide-react"
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

interface Template {
  id: string
  name: string
  description: string
  image: string
  previewUrl: string
}

interface CVData extends SocialMediaData {
  selectedTemplate: string
  selectedRepos: Repository[]
  selectedExperiences: Experience[]
  name: string
  title: string
  summary: string
}

// Step 0: Template Selection
function TemplateSelector({ 
  selectedTemplate,
  onChange
}: { 
  selectedTemplate: string
  onChange: (templateId: string) => void 
}) {
  const templates: Template[] = [
    {
      id: "professional",
      name: "Professional",
      description: "Clean and modern design perfect for software engineers and tech professionals. Features clear sections for experience, projects, and skills.",
      image: "/templates/professional.png",
      previewUrl: "#"
    },
    {
      id: "academic",
      name: "Academic",
      description: "Structured layout ideal for researchers and academics. Emphasizes publications, education, and research experience.",
      image: "/templates/academic.png",
      previewUrl: "#"
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold and eye-catching design for designers, artists, and creative professionals. Showcases portfolio and creative work.",
      image: "/templates/creative.png",
      previewUrl: "#"
    }
  ]

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-foreground mb-1">Choose Your Template</h2>
        <p className="text-sm text-muted-foreground">Select a template that best fits your professional profile</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 items-start">
        {templates.map((template, index) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
            className={cn(
              "border rounded-lg overflow-hidden cursor-pointer transition-all duration-200",
              selectedTemplate === template.id
                ? "border-foreground bg-gray-50/30 shadow-md"
                : "border-border hover:border-gray-300 hover:shadow-sm"
            )}
            onClick={() => onChange(template.id)}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Template Preview Image Placeholder */}
            <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
              <FileText className="h-16 w-16 text-gray-400" />
              {selectedTemplate === template.id && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className="absolute top-2 right-2 bg-foreground text-background rounded-full p-1"
                >
                  <Check className="h-4 w-4" />
                </motion.div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
                <p className="text-white text-xs font-medium">Preview Available</p>
              </div>
            </div>

            {/* Template Info */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {template.description}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    // Preview functionality
                  }}
                >
                  Preview
                </Button>
                <Button
                  size="sm"
                  className={cn(
                    "flex-1 text-xs",
                    selectedTemplate === template.id
                      ? "bg-foreground text-background"
                      : "bg-secondary text-foreground hover:bg-foreground hover:text-background"
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(template.id)
                  }}
                >
                  {selectedTemplate === template.id ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
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
      { id: "github", label: "GitHub Username", placeholder: "octocat", icon: Github, value: data.github, required: true },
      { id: "linkedin", label: "LinkedIn Profile", placeholder: "linkedin.com/in/username", icon: Linkedin, value: data.linkedin },
      { id: "twitter", label: "Twitter/X Handle", placeholder: "@username", icon: Twitter, value: data.twitter },
      { id: "email", label: "Email Address", placeholder: "your.email@example.com", icon: Mail, value: data.email, type: "email" }
    ]

  return (
    <div className="space-y-4">
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
                  onChange={(e) => handleChange(field.id as keyof SocialMediaData, e.target.value)}
                  className="pl-10 transition-all duration-200 focus:shadow-sm"
                />
              </div>
            </motion.div>
          )
        })}
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
        
        const githubApiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=10`
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
                <p className="text-xs mt-1">Add your experiences manually using the "Add" button above</p>
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
    selectedTemplate: "",
    github: "",
    linkedin: "",
    twitter: "",
    email: "",
    selectedRepos: [],
    selectedExperiences: [],
    name: "",
    title: "",
    summary: ""
  })

  const steps = [
    { id: "template", title: "Template", icon: FileText },
    { id: "social", title: "Social Media", icon: Mail },
    { id: "content", title: "Content", icon: Briefcase },
    { id: "preview", title: "Preview", icon: CheckCircle }
  ]

  const handleNext = async () => {
    // Validate template selection
    if (currentStep === 0 && !cvData.selectedTemplate) {
      alert("Please select a template before proceeding")
      return
    }

    // Validate GitHub username (required field)
    if (currentStep === 1 && !cvData.github.trim()) {
      alert("GitHub Username is required")
      return
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
        <div className="h-[calc(100vh-4rem)] flex flex-col">
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
          <div className="flex-1 overflow-hidden py-6">
            <div className="max-w-5xl mx-auto h-full overflow-auto px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="h-full"
                >
                  {currentStep === 0 && (
                    <TemplateSelector
                      selectedTemplate={cvData.selectedTemplate}
                      onChange={(templateId) => setCVData({ ...cvData, selectedTemplate: templateId })}
                    />
                  )}
                  {currentStep === 1 && (
                    <SocialMediaStep
                      data={cvData}
                      onChange={(socialData) => setCVData({ ...cvData, ...socialData })}
                    />
                  )}
                  {currentStep === 2 && (
                    <RepositoryAndExperienceSelector
                      selectedRepos={cvData.selectedRepos}
                      selectedExperiences={cvData.selectedExperiences}
                      onChange={(repos, experiences) => setCVData({ ...cvData, selectedRepos: repos, selectedExperiences: experiences })}
                      githubUsername={cvData.github}
                      linkedinUrl={cvData.linkedin}
                    />
                  )}
                  {currentStep === 3 && (
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
                      disabled={currentStep === 0 && !cvData.selectedTemplate}
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
                    <Button asChild className="transition-all hover:shadow-sm">
                      <Link href="/create-cv/editor">
                        Edit in LaTeX
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
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

