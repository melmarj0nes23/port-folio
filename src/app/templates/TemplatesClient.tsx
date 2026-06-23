'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, Eye, X, Layers } from 'lucide-react'
import { Sidebar } from '@/components/ui/original/Sidebar'
import { Btn } from '@/components/ui/original/Btn'
import { Badge } from '@/components/ui/original/Badge'
import { createPortfolioWithTemplate } from '../dashboard/actions'

import { TemplatePreview } from '@/components/ui/TemplatePreview'

export function TemplatesClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  const templates = [
    {
      name: "Minimal",
      desc: "Clean typography-led layout. Generous whitespace, strong hierarchy. Ideal for designers and writers.",
      category: "General",
      bg: "bg-slate-50 dark:bg-slate-900",
      accent: "#111",
    },
    {
      name: "Developer",
      desc: "Monospace accents, project-first structure with GitHub stats. Built for engineers.",
      category: "Technical",
      bg: "bg-zinc-900",
      accent: "#22d3ee",
      dark: true,
    },
    {
      name: "Creative",
      desc: "Bold asymmetric grid with strong color contrast. For visual artists and creative directors.",
      category: "Creative",
      bg: "bg-violet-50 dark:bg-violet-950",
      accent: "#7c6af6",
    },
    {
      name: "Professional",
      desc: "Classic structured resume layout. Clean, formal, and respected by recruiters.",
      category: "Business",
      bg: "bg-blue-50 dark:bg-blue-950",
      accent: "#2563eb",
    },
    {
      name: "Executive",
      desc: "High-authority layout for founders, executives, and senior leaders.",
      category: "Business",
      bg: "bg-stone-100 dark:bg-stone-900",
      accent: "#78716c",
    },
  ];

  const handleCreate = async () => {
    if (!selected) return
    if (!isLoggedIn) {
      router.push('/login?redirect=/templates')
      return
    }
    setIsCreating(true)
    try {
      const templateId = selected.toLowerCase()
      await createPortfolioWithTemplate(templateId)
    } catch (e) {
      console.error(e)
      setIsCreating(false)
    }
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden pb-16 md:pb-0">
      {/* PREVIEW MODAL */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 flex flex-col backdrop-blur-sm">
          <div className="h-14 bg-background border-b border-border flex items-center justify-between px-3 md:px-6 shrink-0 gap-2">
            <span className="font-semibold text-sm md:text-base truncate flex-1">{previewTemplate} <span className="hidden sm:inline">Preview</span></span>
            <div className="flex items-center gap-1 md:gap-3 shrink-0">
              <Btn variant="primary" size="sm" onClick={() => { setSelected(previewTemplate); setPreviewTemplate(null); }}>
                <span className="hidden sm:inline">Select this template</span>
                <span className="inline sm:hidden">Select</span>
              </Btn>
              <button onClick={() => setPreviewTemplate(null)} className="p-2 hover:bg-muted rounded-full transition-colors shrink-0">
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-muted">
            <TemplatePreview templateName={previewTemplate} />
          </div>
        </div>
      )}

      {isLoggedIn ? (
        <Sidebar active="Templates" />
      ) : null}

      <main className="flex-1 overflow-auto">
        {!isLoggedIn && (
          <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm h-14 flex items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <Layers size={13} className="text-white" />
              </div>
              <span className="text-sm font-semibold tracking-tight">Melmar's Portfolio Maker</span>
            </Link>
            <div className="flex items-center gap-2">
              <Link href="/login"><Btn variant="ghost" size="sm">Sign in</Btn></Link>
              <Link href="/signup"><Btn variant="primary" size="sm">Get started</Btn></Link>
            </div>
          </header>
        )}

        <div className={isLoggedIn ? "h-14 border-b border-border flex items-center justify-between px-6" : "hidden"}>
          <div>
            <h1 className="text-sm font-semibold">Templates</h1>
          </div>
          {selected && (
            <Btn variant="primary" size="sm" onClick={handleCreate} disabled={isCreating}>
              {isCreating ? "Creating..." : `Use ${selected}`} {!isCreating && <ArrowRight size={13} />}
            </Btn>
          )}
        </div>

        {/* Public Header Sticky Use Button */}
        {!isLoggedIn && selected && (
          <div className="sticky top-14 z-30 border-b border-border bg-background/95 backdrop-blur-sm p-4 flex items-center justify-between">
            <span className="text-sm font-medium">Selected: {selected}</span>
            <Btn variant="primary" size="sm" onClick={handleCreate}>
              Sign up to use {selected} <ArrowRight size={13} />
            </Btn>
          </div>
        )}

        <div className="p-6 max-w-6xl mx-auto">
          <div className="mb-6">
            {!isLoggedIn ? (
              <>
                <h1 className="text-3xl font-bold mb-2">Portfolio Templates</h1>
                <p className="text-sm text-muted-foreground">Choose a starting point. You can switch templates anytime in the editor.</p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Choose a template to start with. You can switch templates anytime in the editor.</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {templates.map((t) => (
              <div
                key={t.name}
                className={`rounded-xl border-2 transition-all ${
                  selected === t.name ? "border-primary shadow-sm" : "border-border"
                }`}
              >
                {/* Template preview card */}
                <div className="h-48 rounded-t-[10px] relative overflow-hidden bg-background border-b border-border pointer-events-none">
                  <div className="absolute inset-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none select-none">
                    <TemplatePreview templateName={t.name} />
                  </div>
                  {/* Subtle overlay to prevent interaction and add a bit of polish */}
                  <div className="absolute inset-0 bg-transparent md:hover:bg-black/5 transition-colors duration-300"></div>
                  {selected === t.name && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center z-10 shadow-sm">
                      <Check size={11} className="text-white" />
                    </div>
                  )}
                </div>
                {/* Info */}
                <div className="p-4 bg-card rounded-b-[10px]">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold">{t.name}</p>
                    <Badge variant="muted">{t.category}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                  <div className="mt-3 flex gap-2 relative z-50 pointer-events-auto">
                    <Btn 
                      variant={selected === t.name ? "primary" : "outline"} 
                      size="sm" 
                      className="flex-1" 
                      onClick={(e) => { 
                        if (selected !== t.name) {
                          setSelected(t.name);
                        } else {
                          handleCreate();
                        }
                      }}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (selected !== t.name) {
                          setSelected(t.name);
                        } else {
                          handleCreate();
                        }
                      }}
                      disabled={selected === t.name && isCreating}
                    >
                      {selected === t.name && isCreating ? "Creating..." : selected === t.name ? "Use this template" : "Select"}
                    </Btn>
                    <button
                      onClick={() => setPreviewTemplate(t.name)}
                      className="px-3 py-1.5 text-xs border border-border rounded-[6px] text-muted-foreground md:hover:text-foreground transition-colors flex items-center gap-1 bg-card"
                    >
                      <Eye size={11} /> Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
