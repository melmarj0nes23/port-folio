'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, Eye, Globe } from 'lucide-react'
import { Btn } from '@/components/ui/original/Btn'
import { Badge } from '@/components/ui/original/Badge'
import { EditorRightPanel } from './EditorRightPanel'
import { EditorPreviewPanel } from './EditorPreviewPanel'
import { savePortfolioData } from './actions'

export default function EditorClient({ 
  initialPortfolio, 
  initialProfile, 
  initialProjects, 
  initialExperience, 
  initialGalleries,
  initialPages,
  initialBlocks,
  username,
  isDemo = false
}: any) {
  const router = useRouter()

  const [portfolio, setPortfolio] = useState(initialPortfolio)
  const [profile, setProfile] = useState(initialProfile)
  const [projects, setProjects] = useState(initialProjects)
  const [experience, setExperience] = useState(initialExperience)
  const [galleries, setGalleries] = useState(initialGalleries || [])
  const [pages, setPages] = useState(initialPages || [])
  const [blocks, setBlocks] = useState(initialBlocks || [])
  const [isSaving, setIsSaving] = useState(false)

  const [showMobileSettings, setShowMobileSettings] = useState(false)

  // Auto-save logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      setIsSaving(true)
      try {
        if (!isDemo) {
          await savePortfolioData({ portfolio, profile, projects, experience, galleries, pages, blocks })
        }
      } catch (err) {
        console.error('Error auto-saving:', err)
      } finally {
        setIsSaving(false)
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [portfolio, profile, projects, experience, galleries, pages, blocks, isDemo])

  const handlePublish = async () => {
    if (isDemo) {
      alert("You're in demo mode! Create an account to publish your live portfolio.")
      return
    }
    setPortfolio({ ...portfolio, is_published: !portfolio.is_published })
  }

  const handleExit = async () => {
    if (isDemo) {
      router.push("/")
      return
    }
    setIsSaving(true)
    try {
      await savePortfolioData({ portfolio, profile, projects, experience, galleries, pages, blocks })
    } catch (err) {
      console.error(err)
    }
    router.push("/dashboard")
  }

  const handleViewLive = (e: any) => {
    e.preventDefault()
    if (isDemo) {
      alert("You're in demo mode! Create an account to publish your live portfolio.")
      return
    }
    // Open synchronously to avoid mobile Safari popup blocker
    const targetUrl = `/p/${portfolio?.slug || portfolio?.id}`;
    const newWindow = window.open(targetUrl, '_blank');
    
    setIsSaving(true)
    savePortfolioData({ portfolio, profile, projects, experience, galleries, pages, blocks })
      .catch(console.error)
      .finally(() => setIsSaving(false))
      
    // Fallback if popup blocker still caught it
    if (!newWindow) {
      window.location.href = targetUrl;
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden flex-col">
      {/* Editor header */}
      <header className="h-14 md:h-12 border-b border-border bg-card flex flex-wrap md:flex-nowrap items-center justify-between px-2 md:px-4 shrink-0 gap-y-2 py-2 md:py-0">
        <div className="flex items-center gap-2 md:gap-3">
          <button onClick={handleExit} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors p-1 md:p-0">
            <X size={16} className="md:w-[13px] md:h-[13px]" /> <span className="hidden md:inline">Exit</span>
          </button>
          <div className="w-px h-4 bg-border"></div>
          <button onClick={handleViewLive} className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors p-1 md:p-0">
            <Globe size={16} className="md:w-[13px] md:h-[13px]" /> <span className="hidden md:inline">View Live</span>
          </button>
          <div className="w-px h-4 bg-border md:hidden"></div>
          <button onClick={() => setShowMobileSettings(true)} className="md:hidden flex items-center gap-1.5 text-sm text-foreground hover:text-foreground/80 transition-colors p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <span className="text-sm font-medium hidden md:inline">{portfolio?.name || profile?.full_name || 'Untitled Portfolio'} {isSaving ? <span className="text-muted-foreground ml-2 text-xs italic">Saving...</span> : <span className="text-muted-foreground ml-2 text-xs italic">Saved</span>}</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground whitespace-nowrap hidden md:inline-block">https://my-4polio.vercel.app/p/</span>
            <input 
              type="text" 
              value={portfolio.slug || ''} 
              onChange={(e) => setPortfolio({...portfolio, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')})}
              placeholder="custom-url"
              title="Custom URL slug"
              className="h-8 px-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-1 focus:ring-primary w-28 md:w-48"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={portfolio.is_published ? "success" : "muted"} className="hidden md:inline-flex">{portfolio.is_published ? "Published" : "Draft"}</Badge>
            <Btn variant="primary" size="sm" onClick={handlePublish}>
              <Globe size={12} className="hidden md:block" /> {portfolio.is_published ? "Unpublish" : "Publish"}
            </Btn>
          </div>
        </div>
      </header>

      {/* 3-column layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Center: preview */}
        <div className="flex-1 bg-muted flex flex-col overflow-hidden w-full">
          <div className="h-10 border-b border-border bg-card flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1 hidden md:flex">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/20"></div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="h-5 px-3 rounded bg-muted text-xs flex items-center text-muted-foreground truncate max-w-full">
                my-4polio.vercel.app/p/{portfolio?.slug || portfolio?.id || ''}
              </div>
            </div>
          </div>
          <div className="flex-1 md:m-4 rounded-none md:rounded-lg border-x-0 md:border border-border shadow-none md:shadow-sm overflow-hidden flex justify-center bg-gray-100 relative">
            <div className="absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden">
              <EditorPreviewPanel 
                portfolio={portfolio}
                profile={profile}
                setProfile={setProfile}
                projects={projects}
                setProjects={setProjects}
                experience={experience}
                setExperience={setExperience}
                galleries={galleries}
                setGalleries={setGalleries}
                blocks={blocks}
                setBlocks={setBlocks}
              />
            </div>
          </div>
        </div>

        {/* Mobile Overlay Background */}
        {showMobileSettings && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden" 
            onClick={() => setShowMobileSettings(false)}
          />
        )}

        {/* Right Panel */}
        <div className={`fixed inset-y-0 right-0 z-50 transform ${showMobileSettings ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 md:relative md:translate-x-0 md:w-64 h-full bg-card shadow-2xl md:shadow-none w-80 max-w-[85vw]`}>
          <EditorRightPanel 
            portfolio={portfolio}
            setPortfolio={setPortfolio}
            onClose={() => setShowMobileSettings(false)}
          />
        </div>
      </div>
    </div>
  )
}
