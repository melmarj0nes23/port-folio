'use client'

import React, { useState, useEffect } from 'react'
import { EditableField } from '../editor/EditableField'
import { 
  Briefcase, GraduationCap, Award, Mail, Phone, MapPin, Globe, 
  Plus, Trash2, Link, ExternalLink, Image as ImageIcon,
  LayoutDashboard, User, Code, FileText, FolderGit2
} from 'lucide-react'

export function EliteDashboardTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, blocks, setBlocks, isEditor, isPreview = false }: any) {
  const [activeSection, setActiveSection] = useState('overview')

  const themeColor = portfolio?.theme_color || '#3b82f6'
  const fontFam = portfolio?.font || 'Inter'

  // Standard helper for block content
  const getBlockContent = (type: string) => {
    return blocks?.find((b: any) => b.type === type)?.content || {}
  }

  const updateBlockContent = (type: string, key: string, value: any) => {
    if (!setBlocks) return
    setBlocks((prev: any[]) => {
      const existing = prev.find(b => b.type === type)
      if (existing) {
        return prev.map(b => b.type === type ? { ...b, content: { ...b.content, [key]: value } } : b)
      } else {
        return [...prev, { id: crypto.randomUUID(), type, content: { [key]: value }, order_index: prev.length }]
      }
    })
  }

  // Pre-load content with placeholders
  const heroContent = getBlockContent('hero')
  const aboutContent = getBlockContent('about')
  const quickFactsContent = getBlockContent('quickFacts')
  const skillsContent = getBlockContent('skills')
  const eduContent = getBlockContent('education')
  const certContent = getBlockContent('certifications')
  const contactContent = getBlockContent('contact')
  const mediaContent = getBlockContent('media')

  // Listen for scroll to update active section (simple version)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'about', 'experience', 'projects', 'education', 'contact']
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el && window.scrollY >= (el.offsetTop - 150)) {
          setActiveSection(section)
          break
        }
      }
    }
    if (!isPreview && !isEditor) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [isPreview, isEditor])

  const scrollTo = (id: string) => {
    setActiveSection(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'contact', label: 'Contact', icon: Mail },
  ]

  // Add/Remove functions
  const addSkillCategory = () => {
    const items = skillsContent?.items || [
      { category: 'Programming Languages', skills: 'JavaScript, TypeScript, Python, Go' },
      { category: 'Frameworks', skills: 'React, Next.js, Node.js, Express' }
    ]
    updateBlockContent('skills', 'items', [...items, { category: 'New Category', skills: 'Skill 1, Skill 2' }])
  }
  const removeSkillCategory = (idx: number) => {
    const items = [...(skillsContent?.items || [])]
    items.splice(idx, 1)
    updateBlockContent('skills', 'items', items)
  }

  const addExperience = () => {
    if (setExperience) {
      setExperience([...(experience || []), {
        id: crypto.randomUUID(),
        role: 'Senior Software Engineer',
        company: 'Tech Solutions Inc.',
        start_date: '2023',
        end_date: 'Present',
        description: 'Led the development of a high-performance analytics dashboard processing millions of events daily.'
      }])
    }
  }
  const removeExperience = (idx: number) => {
    if (setExperience && experience) {
      const newExp = [...experience]
      newExp.splice(idx, 1)
      setExperience(newExp)
    }
  }

  const addProject = () => {
    if (setProjects) {
      setProjects([...(projects || []), {
        id: crypto.randomUUID(),
        title: 'E-commerce Platform Architecture',
        description: 'A fully scalable microservices architecture for a modern e-commerce platform.',
        tech_stack: ['Next.js', 'Kubernetes', 'PostgreSQL'],
        link: 'https://example.com'
      }])
    }
  }
  const removeProject = (idx: number) => {
    if (setProjects && projects) {
      const newProj = [...projects]
      newProj.splice(idx, 1)
      setProjects(newProj)
    }
  }

  const addEdu = () => {
    const items = eduContent?.items || [
      { degree: 'M.S. Computer Science', school: 'Stanford University', year: '2021', honors: 'Summa Cum Laude' }
    ]
    updateBlockContent('education', 'items', [...items, { degree: 'New Degree', school: 'University Name', year: '2024', honors: '' }])
  }
  const removeEdu = (idx: number) => {
    const items = [...(eduContent?.items || [])]
    items.splice(idx, 1)
    updateBlockContent('education', 'items', items)
  }

  const addCert = () => {
    const items = certContent?.items || [
      { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023', credentialId: 'AWS-12345' }
    ]
    updateBlockContent('certifications', 'items', [...items, { name: 'New Certification', issuer: 'Issuing Org', year: '2024', credentialId: '' }])
  }
  const removeCert = (idx: number) => {
    const items = [...(certContent?.items || [])]
    items.splice(idx, 1)
    updateBlockContent('certifications', 'items', items)
  }

  const addQuickFact = () => {
    const items = quickFactsContent?.items || [
      { label: 'Time Zone', value: 'EST (UTC-5)' },
      { label: 'Languages', value: 'English (Native), Spanish (Conversational)' }
    ]
    updateBlockContent('quickFacts', 'items', [...items, { label: 'New Fact', value: 'Details' }])
  }
  const removeQuickFact = (idx: number) => {
    const items = [...(quickFactsContent?.items || [])]
    items.splice(idx, 1)
    updateBlockContent('quickFacts', 'items', items)
  }

  return (
    <div 
      className="min-h-screen bg-slate-50 text-slate-900"
      style={{ fontFamily: fontFam }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        :root { --theme-color: ${themeColor}; }
        .theme-text { color: var(--theme-color); }
        .theme-bg { background-color: var(--theme-color); }
        .theme-border { border-color: var(--theme-color); }
        .theme-ring { --tw-ring-color: var(--theme-color); }
        
        /* Hide scrollbar for nav */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* MOBILE HORIZONTAL NAV */}
      <nav className="lg:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <ul className="flex items-center overflow-x-auto no-scrollbar py-3 px-4 gap-2">
          {navItems.map(item => (
            <li key={item.id} className="shrink-0">
              <button 
                onClick={() => scrollTo(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeSection === item.id 
                    ? 'theme-bg text-white shadow-md' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="max-w-[1600px] mx-auto w-full lg:flex lg:h-screen lg:overflow-hidden">
        
        {/* LEFT SIDEBAR (Desktop Fixed, Mobile Flow) */}
        <aside className="lg:w-[360px] xl:w-[420px] shrink-0 bg-white border-r border-slate-200 lg:h-full lg:overflow-y-auto no-scrollbar p-6 md:p-8 flex flex-col relative z-20">
          
          {/* Profile Image */}
          <div className="relative group w-32 h-32 md:w-48 md:h-48 rounded-2xl overflow-hidden shadow-xl mb-6 mx-auto lg:mx-0 ring-4 ring-white">
            <img 
              src={profile?.avatar_url || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'} 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
            {isEditor && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <div className="bg-white p-2 rounded shadow-lg max-w-[90%]">
                  <input 
                    className="w-full text-xs outline-none"
                    value={profile?.avatar_url || ''}
                    onChange={(e) => setProfile?.({ ...profile, avatar_url: e.target.value })}
                    placeholder="Avatar URL..."
                  />
                </div>
              </div>
            )}
            {/* Status Badge */}
            <div className="absolute top-3 right-3 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-sm"></div>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
              <EditableField value={profile?.full_name || "Sarah Jenkins"} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />
            </h1>
            <h2 className="text-lg md:text-xl font-semibold theme-text mb-4">
              <EditableField value={profile?.headline || "Senior Solutions Architect"} onChange={(val: string) => setProfile?.({...profile, headline: val})} isEditor={isEditor} />
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              <EditableField value={heroContent?.tagline || "Architecting scalable cloud solutions and leading high-performance engineering teams for enterprise platforms."} onChange={(val: string) => updateBlockContent('hero', 'tagline', val)} isEditor={isEditor} multiline />
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <MapPin size={18} className="theme-text" />
              <EditableField value={contactContent?.location || "San Francisco, CA"} onChange={(val: string) => updateBlockContent('contact', 'location', val)} isEditor={isEditor} />
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <Mail size={18} className="theme-text" />
              <EditableField value={contactContent?.email || "sarah.j@example.com"} onChange={(val: string) => updateBlockContent('contact', 'email', val)} isEditor={isEditor} />
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <Briefcase size={18} className="theme-text" />
              <EditableField value={contactContent?.availability || "Available for Opportunities"} onChange={(val: string) => updateBlockContent('contact', 'availability', val)} isEditor={isEditor} />
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <button className="w-full theme-bg text-white font-medium py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Mail size={18} />
              <EditableField value={contactContent?.primaryBtn || "Contact Me"} onChange={(val: string) => updateBlockContent('contact', 'primaryBtn', val)} isEditor={isEditor} />
            </button>
            <button className="w-full bg-slate-100 text-slate-700 font-medium py-3 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
              <FileText size={18} />
              <EditableField value={contactContent?.secondaryBtn || "Download Resume"} onChange={(val: string) => updateBlockContent('contact', 'secondaryBtn', val)} isEditor={isEditor} />
            </button>
          </div>

          <div className="flex items-center justify-center lg:justify-start gap-4 text-slate-400 mt-auto">
            <div className="relative group">
              <Globe size={22} className="hover:text-slate-800 transition-colors cursor-pointer" />
              {isEditor && (
                <div className="absolute bottom-8 left-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 bg-white p-2 shadow-lg rounded border border-slate-200 z-50 w-48">
                  <input className="text-xs w-full outline-none" value={contactContent?.github || ''} onChange={(e) => updateBlockContent('contact', 'github', e.target.value)} placeholder="GitHub URL..." />
                </div>
              )}
            </div>
            <div className="relative group">
              <Link size={22} className="hover:text-blue-600 transition-colors cursor-pointer" />
              {isEditor && (
                <div className="absolute bottom-8 left-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 bg-white p-2 shadow-lg rounded border border-slate-200 z-50 w-48">
                  <input className="text-xs w-full outline-none" value={contactContent?.linkedin || ''} onChange={(e) => updateBlockContent('contact', 'linkedin', e.target.value)} placeholder="LinkedIn URL..." />
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* RIGHT DASHBOARD CONTENT */}
        <main className="flex-1 lg:h-full lg:overflow-y-auto bg-slate-50/50 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 pb-32">
          
          {/* DESKTOP NAV */}
          <nav className="hidden lg:flex items-center gap-6 mb-12 bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-100">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-semibold transition-colors flex items-center gap-2 ${
                  activeSection === item.id ? 'theme-text' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <item.icon size={16} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* DASHBOARD WIDGETS */}
          <div className="space-y-8 md:space-y-10">

            {/* OVERVIEW SECTION */}
            <section id="overview" className="scroll-mt-24 lg:scroll-mt-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                  <EditableField value={heroContent?.greeting || "Welcome to my Workspace."} onChange={(val: string) => updateBlockContent('hero', 'greeting', val)} isEditor={isEditor} />
                </h2>
                <p className="text-slate-500">
                  <EditableField value={heroContent?.subGreeting || "Here's a brief overview of my professional journey."} onChange={(val: string) => updateBlockContent('hero', 'subGreeting', val)} isEditor={isEditor} />
                </p>
              </div>

              {/* STAT CARDS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {[
                  { id: 'stat1', defaultLabel: 'Years Experience', defaultValue: '8+' },
                  { id: 'stat2', defaultLabel: 'Projects Delivered', defaultValue: '45+' },
                  { id: 'stat3', defaultLabel: 'Certifications', defaultValue: '5' },
                  { id: 'stat4', defaultLabel: 'Client Satisfaction', defaultValue: '100%' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center hover:shadow-md transition-shadow">
                    <div className="text-3xl font-black theme-text mb-1">
                      <EditableField value={heroContent?.[stat.id]?.value || stat.defaultValue} onChange={(val: string) => updateBlockContent('hero', stat.id, { ...heroContent?.[stat.id], value: val })} isEditor={isEditor} />
                    </div>
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <EditableField value={heroContent?.[stat.id]?.label || stat.defaultLabel} onChange={(val: string) => updateBlockContent('hero', stat.id, { ...heroContent?.[stat.id], label: val })} isEditor={isEditor} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ABOUT WIDGET */}
            <section id="about" className="scroll-mt-24 lg:scroll-mt-10 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl theme-bg/10 flex items-center justify-center theme-text">
                  <User size={20} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  <EditableField value={aboutContent?.title || "About Me"} onChange={(val: string) => updateBlockContent('about', 'title', val)} isEditor={isEditor} />
                </h3>
              </div>
              <div className="prose prose-slate max-w-none text-slate-600">
                <p className="text-base md:text-lg leading-relaxed">
                  <EditableField 
                    value={aboutContent?.paragraph1 || "I am a seasoned software architect specializing in distributed systems and cloud infrastructure. With a deep passion for elegant code and scalable architecture, I help enterprises transform their complex business requirements into robust technical solutions."} 
                    onChange={(val: string) => updateBlockContent('about', 'paragraph1', val)} 
                    isEditor={isEditor} 
                    multiline 
                  />
                </p>
                <p className="text-base md:text-lg leading-relaxed mt-4">
                  <EditableField 
                    value={aboutContent?.paragraph2 || "Beyond writing code, I strongly believe in mentoring junior developers and fostering a culture of continuous learning and engineering excellence."} 
                    onChange={(val: string) => updateBlockContent('about', 'paragraph2', val)} 
                    isEditor={isEditor} 
                    multiline 
                  />
                </p>
              </div>
            </section>

            {/* TWO COLUMN GRID FOR TABLET/DESKTOP */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              
              {/* SKILLS WIDGET */}
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl theme-bg/10 flex items-center justify-center theme-text">
                      <Code size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Skills & Expertise</h3>
                  </div>
                  {isEditor && (
                    <button onClick={addSkillCategory} className="text-sm theme-text hover:underline flex items-center gap-1 font-medium">
                      <Plus size={14} /> Add Category
                    </button>
                  )}
                </div>
                
                <div className="space-y-6">
                  {(skillsContent?.items || [
                    { category: 'Programming Languages', skills: 'TypeScript, Python, Rust, Go, Java' },
                    { category: 'Cloud & Infrastructure', skills: 'AWS, Kubernetes, Docker, Terraform' },
                    { category: 'Frameworks', skills: 'React, Next.js, Django, Spring Boot' }
                  ]).map((item: any, idx: number) => (
                    <div key={idx} className="relative group/skill">
                      {isEditor && (
                        <button onClick={() => removeSkillCategory(idx)} className="absolute -top-2 -right-2 p-1.5 bg-red-50 text-red-500 rounded-full opacity-100 md:opacity-0 md:group-hover/skill:opacity-100 transition-opacity z-10">
                          <Trash2 size={14} />
                        </button>
                      )}
                      <h4 className="text-sm font-bold text-slate-800 mb-3">
                        <EditableField 
                          value={item.category} 
                          onChange={(val: string) => {
                            const newItems = [...skillsContent?.items || []]
                            newItems[idx] = { ...item, category: val }
                            updateBlockContent('skills', 'items', newItems)
                          }} 
                          isEditor={isEditor} 
                        />
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {isEditor ? (
                          <div className="w-full">
                            <textarea 
                              className="w-full text-sm p-2 border rounded outline-none resize-none"
                              value={item.skills}
                              onChange={(e) => {
                                const newItems = [...skillsContent?.items || []]
                                newItems[idx] = { ...item, skills: e.target.value }
                                updateBlockContent('skills', 'items', newItems)
                              }}
                              placeholder="Comma separated skills..."
                            />
                          </div>
                        ) : (
                          item.skills.split(',').map((skill: string, sIdx: number) => (
                            <span key={sIdx} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg">
                              {skill.trim()}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* QUICK FACTS WIDGET */}
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl theme-bg/10 flex items-center justify-center theme-text">
                      <FileText size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Quick Facts</h3>
                  </div>
                  {isEditor && (
                    <button onClick={addQuickFact} className="text-sm theme-text hover:underline flex items-center gap-1 font-medium">
                      <Plus size={14} /> Add
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {(quickFactsContent?.items || [
                    { label: 'Languages Spoken', value: 'English, Spanish, French' },
                    { label: 'Time Zone', value: 'PST (UTC-8)' },
                    { label: 'Preferred Stack', value: 'MERN / Next.js' },
                    { label: 'Working Style', value: 'Remote / Hybrid' }
                  ]).map((item: any, idx: number) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-xl relative group border border-slate-100">
                      {isEditor && (
                        <button onClick={() => removeQuickFact(idx)} className="absolute -top-2 -right-2 p-1.5 bg-red-50 text-red-500 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
                          <Trash2 size={12} />
                        </button>
                      )}
                      <span className="text-sm font-bold text-slate-500 mb-1 sm:mb-0">
                        <EditableField 
                          value={item.label} 
                          onChange={(val: string) => {
                            const newItems = [...quickFactsContent?.items || []]
                            newItems[idx] = { ...item, label: val }
                            updateBlockContent('quickFacts', 'items', newItems)
                          }} 
                          isEditor={isEditor} 
                        />
                      </span>
                      <span className="text-sm font-semibold text-slate-800 text-left sm:text-right">
                        <EditableField 
                          value={item.value} 
                          onChange={(val: string) => {
                            const newItems = [...quickFactsContent?.items || []]
                            newItems[idx] = { ...item, value: val }
                            updateBlockContent('quickFacts', 'items', newItems)
                          }} 
                          isEditor={isEditor} 
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* EXPERIENCE WIDGET */}
            <section id="experience" className="scroll-mt-24 lg:scroll-mt-10 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl theme-bg/10 flex items-center justify-center theme-text">
                    <Briefcase size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Work Experience</h3>
                </div>
                {isEditor && (
                  <button onClick={addExperience} className="text-sm theme-text hover:underline flex items-center gap-1 font-medium bg-blue-50 px-3 py-1.5 rounded-lg">
                    <Plus size={14} /> Add Experience
                  </button>
                )}
              </div>

              <div className="space-y-8">
                {(experience && experience.length > 0 ? experience : [
                  { id: 1, role: 'Principal Engineer', company: 'Global Tech', start_date: '2020', end_date: 'Present', description: 'Architected and led the migration to a microservices architecture, reducing deployment times by 40%.' },
                  { id: 2, role: 'Senior Software Engineer', company: 'Innovate Systems', start_date: '2016', end_date: '2020', description: 'Developed core features for the flagship product.' }
                ]).map((exp: any, idx: number) => (
                  <div key={exp.id || idx} className="relative group/exp flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-slate-100 pb-8 last:border-0 last:pb-0">
                    {isEditor && (
                      <button onClick={() => removeExperience(idx)} className="absolute top-0 right-0 p-2 bg-red-50 text-red-500 rounded-lg opacity-100 md:opacity-0 md:group-hover/exp:opacity-100 transition-opacity z-10">
                        <Trash2 size={16} />
                      </button>
                    )}
                    
                    {/* Optional Logo Placeholder */}
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                      <Briefcase size={20} className="text-slate-400" />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">
                            <EditableField 
                              value={exp.role} 
                              onChange={(val: string) => {
                                if (setExperience && experience) {
                                  const newExp = [...experience]; newExp[idx] = { ...exp, role: val }; setExperience(newExp);
                                }
                              }} 
                              isEditor={isEditor} 
                            />
                          </h4>
                          <h5 className="text-sm font-semibold theme-text">
                            <EditableField 
                              value={exp.company} 
                              onChange={(val: string) => {
                                if (setExperience && experience) {
                                  const newExp = [...experience]; newExp[idx] = { ...exp, company: val }; setExperience(newExp);
                                }
                              }} 
                              isEditor={isEditor} 
                            />
                          </h5>
                        </div>
                        <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full self-start">
                          <EditableField 
                            value={exp.start_date} 
                            onChange={(val: string) => {
                              if (setExperience && experience) {
                                const newExp = [...experience]; newExp[idx] = { ...exp, start_date: val }; setExperience(newExp);
                              }
                            }} 
                            isEditor={isEditor} 
                          />
                          {' - '}
                          <EditableField 
                            value={exp.end_date} 
                            onChange={(val: string) => {
                              if (setExperience && experience) {
                                const newExp = [...experience]; newExp[idx] = { ...exp, end_date: val }; setExperience(newExp);
                              }
                            }} 
                            isEditor={isEditor} 
                          />
                        </div>
                      </div>
                      <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                        <EditableField 
                          value={exp.description} 
                          onChange={(val: string) => {
                            if (setExperience && experience) {
                              const newExp = [...experience]; newExp[idx] = { ...exp, description: val }; setExperience(newExp);
                            }
                          }} 
                          isEditor={isEditor} 
                          multiline
                        />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* PROJECTS WIDGET */}
            <section id="projects" className="scroll-mt-24 lg:scroll-mt-10 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl theme-bg/10 flex items-center justify-center theme-text">
                    <FolderGit2 size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">Featured Projects</h3>
                </div>
                {isEditor && (
                  <button onClick={addProject} className="text-sm theme-text hover:underline flex items-center gap-1 font-medium bg-blue-50 px-3 py-1.5 rounded-lg">
                    <Plus size={14} /> Add Project
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                {(projects && projects.length > 0 ? projects : [
                  { id: 1, title: 'Project Alpha', description: 'A revolutionary tool for developers.', tech_stack: ['React', 'Node.js'] },
                  { id: 2, title: 'Beta Platform', description: 'Enterprise management dashboard.', tech_stack: ['Vue', 'Python'] }
                ]).map((proj: any, idx: number) => {
                  const projectMediaUrl = mediaContent?.[`project_${proj.id || idx}`] || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop&sig=${idx}`;
                  
                  return (
                    <div key={proj.id || idx} className="group/proj flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all relative">
                      {isEditor && (
                        <button onClick={() => removeProject(idx)} className="absolute top-2 right-2 p-2 bg-red-50 text-red-500 rounded-lg opacity-100 md:opacity-0 md:group-hover/proj:opacity-100 transition-opacity z-20">
                          <Trash2 size={16} />
                        </button>
                      )}
                      
                      <div className="w-full aspect-video relative overflow-hidden group/img bg-slate-200">
                        <img src={projectMediaUrl} alt={proj.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/proj:scale-105" />
                        {isEditor && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/img:opacity-100 transition-opacity">
                            <div className="bg-white p-2 rounded shadow-lg max-w-[90%]">
                              <input 
                                className="text-xs w-full outline-none"
                                value={projectMediaUrl}
                                onChange={(e) => updateBlockContent('media', `project_${proj.id || idx}`, e.target.value)}
                                placeholder="Project Image URL..."
                              />
                            </div>
                          </div>
                        )}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase rounded text-slate-800">
                          <EditableField value={proj.status || "Completed"} onChange={(val: string) => {
                            if (setProjects && projects) {
                              const newProj = [...projects]; newProj[idx] = { ...proj, status: val }; setProjects(newProj);
                            }
                          }} isEditor={isEditor} />
                        </div>
                      </div>

                      <div className="p-6 flex flex-col flex-1">
                        <h4 className="text-lg font-bold text-slate-900 mb-2">
                          <EditableField 
                            value={proj.title} 
                            onChange={(val: string) => {
                              if (setProjects && projects) {
                                const newProj = [...projects]; newProj[idx] = { ...proj, title: val }; setProjects(newProj);
                              }
                            }} 
                            isEditor={isEditor} 
                          />
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-1">
                          <EditableField 
                            value={proj.description} 
                            onChange={(val: string) => {
                              if (setProjects && projects) {
                                const newProj = [...projects]; newProj[idx] = { ...proj, description: val }; setProjects(newProj);
                              }
                            }} 
                            isEditor={isEditor} 
                            multiline
                          />
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-200">
                          {isEditor ? (
                            <input 
                              className="w-full text-xs p-2 border rounded"
                              value={(proj.tech_stack || []).join(', ')}
                              onChange={(e) => {
                                if (setProjects && projects) {
                                  const newProj = [...projects]; 
                                  newProj[idx] = { ...proj, tech_stack: e.target.value.split(',').map(s => s.trim()) }; 
                                  setProjects(newProj);
                                }
                              }}
                              placeholder="Technologies (comma separated)"
                            />
                          ) : (
                            (proj.tech_stack || []).map((tech: string, tIdx: number) => (
                              <span key={tIdx} className="px-2 py-1 bg-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-wider rounded">
                                {tech}
                              </span>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* TWO COLUMN GRID FOR EDU/CERT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              
              {/* EDUCATION WIDGET */}
              <section id="education" className="scroll-mt-24 lg:scroll-mt-10 bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl theme-bg/10 flex items-center justify-center theme-text">
                      <GraduationCap size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Education</h3>
                  </div>
                  {isEditor && (
                    <button onClick={addEdu} className="text-sm theme-text hover:underline flex items-center gap-1 font-medium">
                      <Plus size={14} /> Add
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {(eduContent?.items || [
                    { degree: 'B.S. Computer Science', school: 'University of Technology', year: '2016 - 2020', honors: 'Cum Laude' }
                  ]).map((item: any, idx: number) => (
                    <div key={idx} className="relative group p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      {isEditor && (
                        <button onClick={() => removeEdu(idx)} className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-500 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
                          <Trash2 size={14} />
                        </button>
                      )}
                      <h4 className="text-sm font-bold text-slate-900 pr-8">
                        <EditableField 
                          value={item.degree} 
                          onChange={(val: string) => {
                            const newItems = [...eduContent?.items || []]
                            newItems[idx] = { ...item, degree: val }
                            updateBlockContent('education', 'items', newItems)
                          }} 
                          isEditor={isEditor} 
                        />
                      </h4>
                      <div className="text-sm text-slate-600 mt-1">
                        <EditableField 
                          value={item.school} 
                          onChange={(val: string) => {
                            const newItems = [...eduContent?.items || []]
                            newItems[idx] = { ...item, school: val }
                            updateBlockContent('education', 'items', newItems)
                          }} 
                          isEditor={isEditor} 
                        />
                      </div>
                      <div className="flex items-center justify-between mt-3 text-xs font-semibold text-slate-500">
                        <span className="theme-text bg-blue-50 px-2 py-1 rounded">
                          <EditableField 
                            value={item.year} 
                            onChange={(val: string) => {
                              const newItems = [...eduContent?.items || []]
                              newItems[idx] = { ...item, year: val }
                              updateBlockContent('education', 'items', newItems)
                            }} 
                            isEditor={isEditor} 
                          />
                        </span>
                        <span>
                          <EditableField 
                            value={item.honors || ''} 
                            onChange={(val: string) => {
                              const newItems = [...eduContent?.items || []]
                              newItems[idx] = { ...item, honors: val }
                              updateBlockContent('education', 'items', newItems)
                            }} 
                            isEditor={isEditor} 
                            placeholder="Optional Honors"
                          />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* CERTIFICATIONS WIDGET */}
              <section className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl theme-bg/10 flex items-center justify-center theme-text">
                      <Award size={20} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800">Certifications</h3>
                  </div>
                  {isEditor && (
                    <button onClick={addCert} className="text-sm theme-text hover:underline flex items-center gap-1 font-medium">
                      <Plus size={14} /> Add
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {(certContent?.items || [
                    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2022' },
                    { name: 'Certified Kubernetes Admin', issuer: 'CNCF', year: '2023' }
                  ]).map((item: any, idx: number) => (
                    <div key={idx} className="relative group flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      {isEditor && (
                        <button onClick={() => removeCert(idx)} className="absolute top-2 right-2 p-1.5 bg-red-50 text-red-500 rounded-lg opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-10">
                          <Trash2 size={14} />
                        </button>
                      )}
                      <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-1">
                        <Award size={14} className="text-slate-400" />
                      </div>
                      <div className="flex-1 pr-6">
                        <h4 className="text-sm font-bold text-slate-900">
                          <EditableField 
                            value={item.name} 
                            onChange={(val: string) => {
                              const newItems = [...certContent?.items || []]
                              newItems[idx] = { ...item, name: val }
                              updateBlockContent('certifications', 'items', newItems)
                            }} 
                            isEditor={isEditor} 
                          />
                        </h4>
                        <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
                          <span>
                            <EditableField 
                              value={item.issuer} 
                              onChange={(val: string) => {
                                const newItems = [...certContent?.items || []]
                                newItems[idx] = { ...item, issuer: val }
                                updateBlockContent('certifications', 'items', newItems)
                              }} 
                              isEditor={isEditor} 
                            />
                          </span>
                          <span className="font-semibold text-slate-700">
                            <EditableField 
                              value={item.year} 
                              onChange={(val: string) => {
                                const newItems = [...certContent?.items || []]
                                newItems[idx] = { ...item, year: val }
                                updateBlockContent('certifications', 'items', newItems)
                              }} 
                              isEditor={isEditor} 
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

            </div>

            {/* CONTACT SECTION */}
            <section id="contact" className="scroll-mt-24 lg:scroll-mt-10 bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 theme-bg rounded-full blur-[100px] opacity-30 -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  <EditableField value={contactContent?.heading || "Ready to collaborate?"} onChange={(val: string) => updateBlockContent('contact', 'heading', val)} isEditor={isEditor} />
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  <EditableField value={contactContent?.subheading || "I'm always open to discussing product design work or partnership opportunities."} onChange={(val: string) => updateBlockContent('contact', 'subheading', val)} isEditor={isEditor} multiline />
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="theme-bg text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Mail size={18} />
                    <EditableField value={contactContent?.cta1 || "Send an Email"} onChange={(val: string) => updateBlockContent('contact', 'cta1', val)} isEditor={isEditor} />
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-8 rounded-xl backdrop-blur-sm transition-colors flex items-center justify-center gap-2">
                    <Globe size={18} />
                    <EditableField value={contactContent?.cta2 || "Schedule a Call"} onChange={(val: string) => updateBlockContent('contact', 'cta2', val)} isEditor={isEditor} />
                  </button>
                </div>
              </div>
            </section>

          </div>

          {/* FOOTER */}
          <footer className="mt-20 border-t border-slate-200 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} <EditableField value={profile?.full_name || "Name"} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <EditableField value={contactContent?.footerLink1 || "Privacy Policy"} onChange={(val: string) => updateBlockContent('contact', 'footerLink1', val)} isEditor={isEditor} />
              <EditableField value={contactContent?.footerLink2 || "Terms of Service"} onChange={(val: string) => updateBlockContent('contact', 'footerLink2', val)} isEditor={isEditor} />
            </div>
          </footer>

        </main>
      </div>
    </div>
  )
}
