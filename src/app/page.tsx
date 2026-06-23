import React from 'react'
import Link from 'next/link'
import { Layers, ArrowRight, LayoutDashboard, FileText, Settings, Plus, Globe, Check, ChevronRight } from 'lucide-react'
import { Btn } from '@/components/ui/original/Btn'
import { Badge } from '@/components/ui/original/Badge'
import { TemplatePreview } from '@/components/ui/TemplatePreview'

export default function LandingPage() {
  const features = [
    {
      title: "Editor with live preview",
      desc: "Edit your portfolio in a structured form and see changes rendered in real-time beside your inputs.",
    },
    {
      title: "5 professional templates",
      desc: "Choose from carefully designed templates — Minimal, Developer, Creative, Professional, and Executive.",
    },
    {
      title: "One-click publishing",
      desc: "Publish to your own subdomain instantly. No build step, no configuration, no waiting.",
    },
    {
      title: "Custom theming",
      desc: "Adjust colors, fonts, and layout mode from the editor panel. Changes apply instantly to your preview.",
    },
    {
      title: "Structured content blocks",
      desc: "Add projects, experience, and skills with consistent input forms. Reorder sections with drag-and-drop controls.",
    },
    {
      title: "Lightning fast performance",
      desc: "Built on modern web technologies ensuring rapid load times, smooth animations, and perfect lighthouse scores.",
    },
  ];

  const templates = [
    { name: "Minimal", desc: "Clean typography-forward layout", color: "bg-slate-100 dark:bg-slate-800" },
    { name: "Developer", desc: "Monospace accents, project-first", color: "bg-zinc-100 dark:bg-zinc-800" },
    { name: "Creative", desc: "Bold asymmetric grid", color: "bg-violet-50 dark:bg-violet-950" },
    { name: "Professional", desc: "Classic structured resume", color: "bg-blue-50 dark:bg-blue-950" },
    { name: "Executive", desc: "Premium board-level biography", color: "bg-emerald-50 dark:bg-emerald-950" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Layers size={13} className="text-white" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Melmar's Portfolio Maker</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Features</a>
            <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Templates</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login"><Btn variant="ghost" size="sm">Sign in</Btn></Link>
            <Link href="/signup"><Btn variant="primary" size="sm">Get started</Btn></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        <div className="max-w-2xl">

          <h1 className="text-5xl font-bold leading-[1.1] tracking-tight mb-5">
            Build and publish your<br />portfolio in minutes
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
            A structured editor, live preview, and one-click publishing. Designed for developers, designers, and professionals who want a great portfolio without the overhead.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/signup">
              <Btn variant="primary" size="lg" className="w-full sm:w-auto h-12 px-8">
                Start Building <ArrowRight size={16} />
              </Btn>
            </Link>
            <Link href="/demo">
              <Btn variant="secondary" size="lg" className="w-full sm:w-auto h-12 px-8">
                Try the Demo
              </Btn>
            </Link>
          </div>
        </div>
      </section>

      {/* Dashboard mock */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          {/* Browser bar */}
          <div className="h-10 border-b border-border bg-muted flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30"></div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="h-5 w-64 rounded bg-muted-foreground/10 text-xs flex items-center justify-center text-muted-foreground">
                app.portfoilo.com/dashboard
              </div>
            </div>
          </div>
          {/* Dashboard preview */}
          <div className="flex h-[420px]">
            {/* Sidebar */}
            <div className="w-52 border-r border-border bg-sidebar p-4 flex flex-col gap-1 hidden sm:flex">
              <div className="flex items-center gap-2 px-2 py-1.5 mb-3">
                <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
                  <Layers size={11} className="text-white" />
                </div>
                <span className="text-xs font-semibold">Melmar's Portfolio Maker</span>
              </div>
              {[
                { icon: LayoutDashboard, label: "Dashboard", active: true },
                { icon: FileText, label: "Portfolios" },
                { icon: Layers, label: "Templates" },
                { icon: Settings, label: "Settings" },
              ].map(({ icon: Icon, label, active }) => (
                <div key={label} className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-[6px] text-xs transition-colors ${active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`}>
                  <Icon size={13} />
                  {label}
                </div>
              ))}
            </div>
            {/* Content */}
            <div className="flex-1 p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold">My Portfolios</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">3 portfolios</p>
                </div>
                <div className="h-7 px-3 rounded-[6px] bg-primary text-primary-foreground text-xs flex items-center gap-1.5">
                  <Plus size={11} /> New portfolio
                </div>
              </div>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-border bg-muted">
                      <th className="text-left px-3 py-2 text-muted-foreground font-medium">Name</th>
                      <th className="text-left px-3 py-2 text-muted-foreground font-medium">Template</th>
                      <th className="text-left px-3 py-2 text-muted-foreground font-medium">Status</th>
                      <th className="text-left px-3 py-2 text-muted-foreground font-medium">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Alex Chen — Design", tpl: "Minimal", status: "Published", date: "2 days ago" },
                      { name: "Alex Chen — Dev", tpl: "Developer", status: "Draft", date: "5 days ago" },
                      { name: "Executive Bio", tpl: "Executive", status: "Published", date: "2 weeks ago" },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors">
                        <td className="px-3 py-2 font-medium text-foreground">{row.name}</td>
                        <td className="px-3 py-2 text-muted-foreground">{row.tpl}</td>
                        <td className="px-3 py-2">
                          <Badge variant={row.status === "Published" ? "success" : "muted"}>{row.status}</Badge>
                        </td>
                        <td className="px-3 py-2 text-muted-foreground">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Features</p>
          <h2 className="text-3xl font-bold tracking-tight">Everything you need, nothing you don&apos;t</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {features.map((f, i) => (
            <div key={i} className="bg-background p-6">
              <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Check size={13} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Templates */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Templates</p>
            <h2 className="text-3xl font-bold tracking-tight">Five distinct starting points</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {templates.map((t, i) => (
            <Link href="/templates" key={i} className="group cursor-pointer">
              <div className="rounded-lg border border-border h-40 mb-3 relative overflow-hidden group-hover:border-primary/30 transition-colors bg-background">
                <div className="absolute inset-0 w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none select-none">
                  <TemplatePreview templateName={t.name} />
                </div>
                <div className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors duration-300"></div>
              </div>
              <p className="text-sm font-medium">{t.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-t border-border">
        <div className="rounded-xl border border-border bg-card p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to ship your portfolio?</h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            Join thousands of developers and designers who use Melmar's Portfolio Maker to present their best work.
          </p>
          <Link href="/signup">
            <Btn variant="primary" size="lg">
              Create your portfolio <ArrowRight size={15} />
            </Btn>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 items-center gap-4">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <div className="w-5 h-5 rounded bg-primary flex items-center justify-center">
              <Layers size={11} className="text-white" />
            </div>
            <span className="text-sm font-semibold">Melmar's Portfolio Maker</span>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">© 2026 Melmar's Portfolio Maker. All rights reserved.</p>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/disclaimer" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
