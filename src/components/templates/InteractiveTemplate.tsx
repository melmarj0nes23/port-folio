'use client'

import React, { useState, useEffect } from 'react'
import { EditableField } from '../editor/EditableField'
import { EditableImage } from '../editor/EditableImage'
import { EditableLink } from '../editor/EditableLink'
import { 
  Briefcase, GraduationCap, Award, Star, Code, 
  MapPin, Mail, Globe, ExternalLink, ChevronRight
} from 'lucide-react'

const Github = ({ size = 20, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 3.6 3 5.6 6 5.6a4.8 4.8 0 0 0-1 3.2v4"></path></svg>
)

const Linkedin = ({ size = 20, ...props }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
)

export function InteractiveTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, blocks, setBlocks, isEditor, isPreview = false }: any) {
  const themeColor = portfolio?.theme_color || '#3b82f6'
  const fontFam = portfolio?.font || 'Inter'

  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    if (isPreview || isEditor) return;
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'journey', 'focus', 'contact']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break;
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isPreview, isEditor])

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

  const heroContent = getBlockContent('hero')
  const aboutContent = getBlockContent('about')
  const skillsContent = getBlockContent('skills')
  const eduContent = getBlockContent('education')
  const certContent = getBlockContent('certifications')
  const achievementsContent = getBlockContent('achievements')
  const focusContent = getBlockContent('focus')
  const futureContent = getBlockContent('future')
  const contactContent = getBlockContent('contact')
  const footerContent = getBlockContent('footer')

  // Generate continuous timeline
  const defaultProjects = [
    { id: 'p1', title: 'Interactive Portfolio Builder', description: 'A massive SAAS platform for building portfolios dynamically.', tech_stack: ['React', 'Next.js'], year: '2024' },
    { id: 'p2', title: 'E-commerce API', description: 'Built a highly scalable e-commerce backend.', tech_stack: ['Node', 'Postgres'], year: '2022' }
  ]
  const defaultExperience = [
    { id: 'e1', role: 'Senior Developer', company: 'TechNova', start_date: '2022', end_date: 'Present', description: 'Led the frontend team.' },
    { id: 'e2', role: 'Junior Developer', company: 'WebSolutions', start_date: '2020', end_date: '2022', description: 'Developed client websites.' }
  ]
  const defaultEdu = [
    { id: 'ed1', degree: 'B.S. Computer Science', school: 'State University', year: '2020', description: 'Graduated with Honors.' }
  ]
  const defaultCert = [
    { id: 'c1', name: 'AWS Certified Developer', issuer: 'Amazon', year: '2021', description: 'Associate level certification.' }
  ]
  const defaultAch = [
    { id: 'a1', title: 'Hackathon Winner', organization: 'Global Hacks', year: '2023', description: 'Won 1st place among 500 teams.' }
  ]

  const safeProjects = projects && projects.length > 0 ? projects : defaultProjects
  const safeExp = experience && experience.length > 0 ? experience : defaultExperience
  const safeEdu = eduContent?.items && eduContent.items.length > 0 ? eduContent.items : defaultEdu
  const safeCert = certContent?.items && certContent.items.length > 0 ? certContent.items : defaultCert
  const safeAch = achievementsContent?.items && achievementsContent.items.length > 0 ? achievementsContent.items : defaultAch

  const timelineItems = [
    ...safeEdu.map((edu: any, idx: number) => ({ type: 'education', date: edu.year || '2020', data: edu, idx, icon: GraduationCap, color: 'text-blue-500', bg: 'bg-blue-500/10' })),
    ...safeExp.map((exp: any, idx: number) => ({ type: 'experience', date: exp.start_date || '2021', data: exp, idx, icon: Briefcase, color: 'text-emerald-500', bg: 'bg-emerald-500/10' })),
    ...safeProjects.map((proj: any, idx: number) => ({ type: 'project', date: proj.year || proj.created_at?.substring(0,4) || '2023', data: proj, idx, icon: Code, color: 'text-violet-500', bg: 'bg-violet-500/10' })),
    ...safeCert.map((cert: any, idx: number) => ({ type: 'certification', date: cert.year || '2022', data: cert, idx, icon: Award, color: 'text-amber-500', bg: 'bg-amber-500/10' })),
    ...safeAch.map((ach: any, idx: number) => ({ type: 'achievement', date: ach.year || '2023', data: ach, idx, icon: Star, color: 'text-rose-500', bg: 'bg-rose-500/10' }))
  ].sort((a, b) => String(a.date).localeCompare(String(b.date)))

  const CtaTag = isPreview ? 'div' : 'a'

  return (
    <div className={`min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans`} style={{ fontFamily: fontFam }}>
      
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between overflow-x-auto no-scrollbar">
          <div className="font-bold tracking-tight text-lg shrink-0 whitespace-nowrap">
            <EditableField value={profile?.full_name || "Alex Chen"} onChange={(val: string) => setProfile?.({ ...profile, full_name: val })} isEditor={isEditor} />
          </div>
          <div className="flex items-center gap-6 text-sm font-medium ml-8 shrink-0">
            {['hero', 'about', 'skills', 'journey', 'focus', 'contact'].map(sec => (
              <CtaTag 
                key={sec} 
                href={isPreview ? undefined : `#${sec}`}
                className={`capitalize transition-colors hover:opacity-100 ${activeSection === sec ? 'opacity-100' : 'opacity-50'} ${isPreview ? 'cursor-default' : 'cursor-pointer'}`}
                style={{ color: activeSection === sec ? themeColor : undefined }}
              >
                {sec}
              </CtaTag>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <EditableImage
            src={heroContent?.bg_image || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=2000'}
            onUpload={(url: string) => updateBlockContent('hero', 'bg_image', url)}
            isEditor={isEditor}
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neutral-50 dark:to-neutral-950"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white dark:border-neutral-800 shadow-2xl">
            <EditableImage
              src={profile?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300'}
              onUpload={(url: string) => setProfile?.({ ...profile, avatar_url: url })}
              isEditor={isEditor}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <EditableField value={heroContent?.greeting || "Hi, I'm Alex."} onChange={(val: string) => updateBlockContent('hero', 'greeting', val)} isEditor={isEditor} />
          </h1>
          <h2 className="text-xl md:text-3xl text-neutral-600 dark:text-neutral-400 font-medium mb-6" style={{ color: themeColor }}>
            <EditableField value={profile?.headline || "A passionate software engineer building digital experiences."} onChange={(val: string) => setProfile?.({ ...profile, headline: val })} isEditor={isEditor} />
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-500 dark:text-neutral-400 text-lg mb-10 leading-relaxed">
            <EditableField value={heroContent?.subtitle || "I specialize in turning complex problems into elegant, user-friendly solutions. Let's create something amazing together."} onChange={(val: string) => updateBlockContent('hero', 'subtitle', val)} isEditor={isEditor} multiline />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaTag href={isPreview ? undefined : "#journey"} className="px-8 py-4 rounded-full text-white font-bold tracking-wide shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1" style={{ backgroundColor: themeColor }}>
              <EditableField value={heroContent?.cta_primary || "Start My Journey"} onChange={(val: string) => updateBlockContent('hero', 'cta_primary', val)} isEditor={isEditor} />
            </CtaTag>
            <CtaTag href={isPreview ? undefined : "#contact"} className="px-8 py-4 rounded-full bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold tracking-wide shadow-md hover:shadow-lg transition-all border border-neutral-200 dark:border-neutral-700">
              <EditableField value={heroContent?.cta_secondary || "Get In Touch"} onChange={(val: string) => updateBlockContent('hero', 'cta_secondary', val)} isEditor={isEditor} />
            </CtaTag>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white dark:bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">
            <EditableField value={aboutContent?.title || "About Me"} onChange={(val: string) => updateBlockContent('about', 'title', val)} isEditor={isEditor} />
          </h2>
          <div className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-6">
            <EditableField value={aboutContent?.text || "I am a dedicated professional with a passion for continuous learning and innovation. Over the years, I have honed my skills across various disciplines, always striving to deliver high-quality results. \n\nMy journey has been defined by a relentless curiosity and a drive to solve meaningful problems. I believe in the power of collaboration, clean design, and robust engineering."} onChange={(val: string) => updateBlockContent('about', 'text', val)} isEditor={isEditor} multiline />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-neutral-50 dark:bg-neutral-950">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            <EditableField value={skillsContent?.title || "Skills & Expertise"} onChange={(val: string) => updateBlockContent('skills', 'title', val)} isEditor={isEditor} />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(skillsContent?.categories || [
              { title: 'Programming', skills: ['JavaScript', 'Python', 'TypeScript', 'Go'] },
              { title: 'Frameworks', skills: ['React', 'Next.js', 'Node.js', 'Tailwind'] },
              { title: 'Tools', skills: ['Git', 'Docker', 'AWS', 'Figma'] }
            ]).map((cat: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-sm border border-neutral-100 dark:border-neutral-800">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themeColor }}></div>
                  <EditableField value={cat.title} onChange={(val: string) => { const newCats = [...(skillsContent?.categories || [])]; newCats[idx].title = val; updateBlockContent('skills', 'categories', newCats); }} isEditor={isEditor} />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill: string, sIdx: number) => (
                    <span key={sIdx} className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      {isEditor ? (
                        <EditableField value={skill} onChange={(val: string) => { const newCats = [...(skillsContent?.categories || [])]; newCats[idx].skills[sIdx] = val; updateBlockContent('skills', 'categories', newCats); }} isEditor={isEditor} />
                      ) : skill}
                    </span>
                  ))}
                  {isEditor && (
                    <button onClick={() => { const newCats = [...(skillsContent?.categories || [])]; newCats[idx].skills.push('New Skill'); updateBlockContent('skills', 'categories', newCats); }} className="px-4 py-2 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 text-sm opacity-50 hover:opacity-100">
                      + Add
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isEditor && (
            <div className="mt-8 text-center">
              <button onClick={() => updateBlockContent('skills', 'categories', [...(skillsContent?.categories || []), { title: 'New Category', skills: ['Skill 1'] }])} className="px-6 py-3 rounded-full bg-neutral-200 dark:bg-neutral-800 text-sm font-bold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors">
                + Add Category
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Career Timeline Section */}
      <section id="journey" className="py-32 bg-white dark:bg-neutral-900 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-24 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              <EditableField value={getBlockContent('timeline')?.title || "My Journey"} onChange={(val: string) => updateBlockContent('timeline', 'title', val)} isEditor={isEditor} />
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
              <EditableField value={getBlockContent('timeline')?.subtitle || "A chronological walkthrough of my professional growth, education, and milestones."} onChange={(val: string) => updateBlockContent('timeline', 'subtitle', val)} isEditor={isEditor} multiline />
            </p>
          </div>

          <div className="relative">
            {/* The Central Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-neutral-100 dark:bg-neutral-800 transform md:-translate-x-1/2 rounded-full"></div>

            <div className="space-y-16 md:space-y-32">
              {timelineItems.map((item, index) => {
                const Icon = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <div key={`${item.type}-${item.idx}`} className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                    
                    {/* Center Node */}
                    <div className="absolute left-8 md:left-1/2 w-12 h-12 rounded-full border-4 border-white dark:border-neutral-900 shadow-xl flex items-center justify-center transform -translate-x-1/2 z-10 transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: themeColor }}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>

                    {/* Content Card container */}
                    <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 md:ml-auto text-left'}`}>
                      <div className="bg-neutral-50 dark:bg-neutral-950 p-8 rounded-3xl shadow-lg border border-neutral-100 dark:border-neutral-800 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
                        
                        {/* Type Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 ${item.color} ${item.bg}`}>
                          <span className="uppercase tracking-wider">{item.type}</span>
                        </div>

                        {/* Card Content based on type */}
                        {item.type === 'education' && (
                          <>
                            <h3 className="text-2xl font-bold mb-1">
                              <EditableField value={item.data.degree} onChange={(val: string) => { const n = [...safeEdu]; n[item.idx].degree = val; updateBlockContent('education', 'items', n) }} isEditor={isEditor} />
                            </h3>
                            <p className="text-neutral-500 font-medium mb-4" style={{ color: themeColor }}>
                              <EditableField value={item.data.school} onChange={(val: string) => { const n = [...safeEdu]; n[item.idx].school = val; updateBlockContent('education', 'items', n) }} isEditor={isEditor} />
                            </p>
                            <div className="text-sm font-mono text-neutral-400 mb-4 bg-white dark:bg-neutral-900 inline-block px-3 py-1 rounded-lg">
                              <EditableField value={item.data.year} onChange={(val: string) => { const n = [...safeEdu]; n[item.idx].year = val; updateBlockContent('education', 'items', n) }} isEditor={isEditor} />
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              <EditableField value={item.data.description} onChange={(val: string) => { const n = [...safeEdu]; n[item.idx].description = val; updateBlockContent('education', 'items', n) }} isEditor={isEditor} multiline />
                            </p>
                          </>
                        )}

                        {item.type === 'experience' && (
                          <>
                            <h3 className="text-2xl font-bold mb-1">
                              <EditableField value={item.data.role} onChange={(val: string) => { const n = [...safeExp]; n[item.idx].role = val; setExperience?.(n) }} isEditor={isEditor} />
                            </h3>
                            <p className="text-neutral-500 font-medium mb-4" style={{ color: themeColor }}>
                              <EditableField value={item.data.company} onChange={(val: string) => { const n = [...safeExp]; n[item.idx].company = val; setExperience?.(n) }} isEditor={isEditor} />
                            </p>
                            <div className="text-sm font-mono text-neutral-400 mb-4 bg-white dark:bg-neutral-900 inline-block px-3 py-1 rounded-lg">
                              <EditableField value={item.data.start_date} onChange={(val: string) => { const n = [...safeExp]; n[item.idx].start_date = val; setExperience?.(n) }} isEditor={isEditor} /> — <EditableField value={item.data.end_date} onChange={(val: string) => { const n = [...safeExp]; n[item.idx].end_date = val; setExperience?.(n) }} isEditor={isEditor} />
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              <EditableField value={item.data.description} onChange={(val: string) => { const n = [...safeExp]; n[item.idx].description = val; setExperience?.(n) }} isEditor={isEditor} multiline />
                            </p>
                          </>
                        )}

                        {item.type === 'project' && (
                          <>
                            <div className="w-full aspect-video rounded-xl mb-6 overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                              <EditableImage
                                src={item.data.image_url || `https://images.unsplash.com/photo-${1551288049 + index * 100}-cc599ad51b5c?auto=format&fit=crop&q=80&w=800&h=450`}
                                onUpload={(url: string) => { const n = [...safeProjects]; n[item.idx].image_url = url; setProjects?.(n) }}
                                isEditor={isEditor}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">
                              <EditableField value={item.data.title} onChange={(val: string) => { const n = [...safeProjects]; n[item.idx].title = val; setProjects?.(n) }} isEditor={isEditor} />
                            </h3>
                            <div className="text-sm font-mono text-neutral-400 mb-4 bg-white dark:bg-neutral-900 inline-block px-3 py-1 rounded-lg">
                              <EditableField value={item.data.year || item.data.created_at?.substring(0,4) || '2023'} onChange={(val: string) => { const n = [...safeProjects]; n[item.idx].year = val; setProjects?.(n) }} isEditor={isEditor} />
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6">
                              <EditableField value={item.data.description} onChange={(val: string) => { const n = [...safeProjects]; n[item.idx].description = val; setProjects?.(n) }} isEditor={isEditor} multiline />
                            </p>
                            <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                              {item.data.tech_stack?.map((tech: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-md bg-white dark:bg-neutral-900 text-xs font-bold text-neutral-500">
                                  {tech}
                                </span>
                              ))}
                              {isEditor && (
                                <EditableField 
                                  value={item.data.tech_stack?.join(', ') || ''} 
                                  onChange={(val: string) => { const n = [...safeProjects]; n[item.idx].tech_stack = val.split(',').map(s=>s.trim()); setProjects?.(n) }} 
                                  isEditor={isEditor} 
                                />
                              )}
                            </div>
                          </>
                        )}

                        {item.type === 'certification' && (
                          <>
                            <h3 className="text-2xl font-bold mb-1">
                              <EditableField value={item.data.name} onChange={(val: string) => { const n = [...safeCert]; n[item.idx].name = val; updateBlockContent('certifications', 'items', n) }} isEditor={isEditor} />
                            </h3>
                            <p className="text-neutral-500 font-medium mb-4" style={{ color: themeColor }}>
                              <EditableField value={item.data.issuer} onChange={(val: string) => { const n = [...safeCert]; n[item.idx].issuer = val; updateBlockContent('certifications', 'items', n) }} isEditor={isEditor} />
                            </p>
                            <div className="text-sm font-mono text-neutral-400 mb-4 bg-white dark:bg-neutral-900 inline-block px-3 py-1 rounded-lg">
                              <EditableField value={item.data.year} onChange={(val: string) => { const n = [...safeCert]; n[item.idx].year = val; updateBlockContent('certifications', 'items', n) }} isEditor={isEditor} />
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              <EditableField value={item.data.description} onChange={(val: string) => { const n = [...safeCert]; n[item.idx].description = val; updateBlockContent('certifications', 'items', n) }} isEditor={isEditor} multiline />
                            </p>
                          </>
                        )}

                        {item.type === 'achievement' && (
                          <>
                            <h3 className="text-2xl font-bold mb-1">
                              <EditableField value={item.data.title} onChange={(val: string) => { const n = [...safeAch]; n[item.idx].title = val; updateBlockContent('achievements', 'items', n) }} isEditor={isEditor} />
                            </h3>
                            <p className="text-neutral-500 font-medium mb-4" style={{ color: themeColor }}>
                              <EditableField value={item.data.organization} onChange={(val: string) => { const n = [...safeAch]; n[item.idx].organization = val; updateBlockContent('achievements', 'items', n) }} isEditor={isEditor} />
                            </p>
                            <div className="text-sm font-mono text-neutral-400 mb-4 bg-white dark:bg-neutral-900 inline-block px-3 py-1 rounded-lg">
                              <EditableField value={item.data.year} onChange={(val: string) => { const n = [...safeAch]; n[item.idx].year = val; updateBlockContent('achievements', 'items', n) }} isEditor={isEditor} />
                            </div>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                              <EditableField value={item.data.description} onChange={(val: string) => { const n = [...safeAch]; n[item.idx].description = val; updateBlockContent('achievements', 'items', n) }} isEditor={isEditor} multiline />
                            </p>
                          </>
                        )}

                      </div>
                    </div>

                  </div>
                )
              })}
            </div>

            {/* End of line circle */}
            <div className="absolute left-8 md:left-1/2 bottom-0 w-4 h-4 rounded-full bg-neutral-300 dark:bg-neutral-700 transform -translate-x-1/2 translate-y-8"></div>
          </div>

          {isEditor && (
            <div className="mt-24 text-center">
              <p className="text-sm text-neutral-500 mb-4">Add new milestones to your timeline</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button onClick={() => { const n = [...safeExp, { id: crypto.randomUUID(), role: 'New Role', company: 'New Company', start_date: '2024', end_date: 'Present' }]; setExperience?.(n) }} className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold hover:bg-emerald-200 transition-colors">+ Experience</button>
                <button onClick={() => { const n = [...safeProjects, { id: crypto.randomUUID(), title: 'New Project', description: 'Desc', tech_stack: [], year: '2024' }]; setProjects?.(n) }} className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-bold hover:bg-violet-200 transition-colors">+ Project</button>
                <button onClick={() => { const n = [...safeEdu, { id: crypto.randomUUID(), degree: 'New Degree', school: 'School', year: '2024' }]; updateBlockContent('education', 'items', n) }} className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold hover:bg-blue-200 transition-colors">+ Education</button>
                <button onClick={() => { const n = [...safeCert, { id: crypto.randomUUID(), name: 'New Cert', issuer: 'Issuer', year: '2024' }]; updateBlockContent('certifications', 'items', n) }} className="px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-bold hover:bg-amber-200 transition-colors">+ Certification</button>
                <button onClick={() => { const n = [...safeAch, { id: crypto.randomUUID(), title: 'New Achievement', organization: 'Org', year: '2024' }]; updateBlockContent('achievements', 'items', n) }} className="px-4 py-2 rounded-full bg-rose-100 text-rose-700 text-sm font-bold hover:bg-rose-200 transition-colors">+ Achievement</button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Current Focus & Future Goals */}
      <section id="focus" className="py-24 bg-neutral-100 dark:bg-neutral-950">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Current Focus */}
            <div className="bg-white dark:bg-neutral-900 p-10 rounded-3xl shadow-sm border border-neutral-200 dark:border-neutral-800">
              <h2 className="text-3xl font-bold mb-6">
                <EditableField value={focusContent?.title || "Current Focus"} onChange={(val: string) => updateBlockContent('focus', 'title', val)} isEditor={isEditor} />
              </h2>
              <div className="text-neutral-600 dark:text-neutral-400 space-y-4 leading-relaxed">
                <EditableField value={focusContent?.description || "I am currently focused on expanding my expertise in scalable system architectures and exploring the latest advancements in AI integration. Day-to-day, I lead engineering efforts at my current role, mentoring junior developers and driving technical strategy."} onChange={(val: string) => updateBlockContent('focus', 'description', val)} isEditor={isEditor} multiline />
              </div>
            </div>

            {/* Future Goals */}
            <div className="bg-neutral-900 dark:bg-neutral-800 text-white p-10 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl opacity-20" style={{ backgroundColor: themeColor }}></div>
              <h2 className="text-3xl font-bold mb-6 relative z-10">
                <EditableField value={futureContent?.title || "What's Next?"} onChange={(val: string) => updateBlockContent('future', 'title', val)} isEditor={isEditor} />
              </h2>
              <div className="text-neutral-300 space-y-4 leading-relaxed relative z-10">
                <EditableField value={futureContent?.description || "Looking ahead, my goal is to transition into a Principal Engineering role where I can shape the architecture of highly impactful, global products. I am also planning to launch an open-source framework for building accessible UI components."} onChange={(val: string) => updateBlockContent('future', 'description', val)} isEditor={isEditor} multiline />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-white dark:bg-neutral-900 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-5xl font-black tracking-tight mb-8">
            <EditableField value={contactContent?.title || "Let's work together"} onChange={(val: string) => updateBlockContent('contact', 'title', val)} isEditor={isEditor} />
          </h2>
          <p className="text-xl text-neutral-500 mb-12">
            <EditableField value={contactContent?.subtitle || "I'm always open to discussing product design work or partnership opportunities."} onChange={(val: string) => updateBlockContent('contact', 'subtitle', val)} isEditor={isEditor} multiline />
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <a href={`mailto:${profile?.email}`} className="px-8 py-4 rounded-full text-white font-bold text-lg shadow-lg hover:shadow-xl transition-transform hover:-translate-y-1 w-full sm:w-auto" style={{ backgroundColor: themeColor }}>
              <EditableField value={contactContent?.btn_text || "Send me an email"} onChange={(val: string) => updateBlockContent('contact', 'btn_text', val)} isEditor={isEditor} />
            </a>
          </div>

          <div className="flex justify-center gap-8 border-t border-neutral-200 dark:border-neutral-800 pt-12">
            {[
              { icon: Github, link: profile?.github_url },
              { icon: Linkedin, link: profile?.linkedin_url },
              { icon: Globe, link: profile?.website_url }
            ].map((social, idx) => social.link && (
              <a key={idx} href={social.link} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900 transition-all">
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-sm text-neutral-500 bg-white dark:bg-neutral-900">
        <EditableField value={footerContent?.text || `© ${new Date().getFullYear()} ${profile?.full_name || 'Alex Chen'}. All rights reserved.`} onChange={(val: string) => updateBlockContent('footer', 'text', val)} isEditor={isEditor} />
      </footer>
    </div>
  )
}
