'use client'

import React from 'react'
import { EditableField } from '../editor/EditableField'
import { EditableImage } from '../editor/EditableImage'
import { EditableLink } from '../editor/EditableLink'
import { 
  ArrowRight, Mail, Phone, Globe, Link, AtSign,
  MapPin, Briefcase, GraduationCap, Award, ExternalLink,
  Code, Terminal, Layout, Database, Server, Smartphone, Monitor
} from 'lucide-react'

export function BentoShowcaseTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, blocks, setBlocks, isEditor, isPreview = false }: any) {
  const themeColor = portfolio?.theme_color || '#171717'
  const fontFam = portfolio?.font || 'Inter'

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
  const contactContent = getBlockContent('contact')
  const quickFactsContent = getBlockContent('quickFacts')
  const quoteContent = getBlockContent('quote')
  const techContent = getBlockContent('technologies')
  const socialContent = getBlockContent('social')
  const eduContent = getBlockContent('education')
  const certContent = getBlockContent('certifications')

  // Helpers to add array items
  const addProject = () => {
    if (setProjects) {
      setProjects([...(projects || []), {
        id: crypto.randomUUID(),
        title: 'New Bento Project',
        description: 'An elegant showcase of my recent work.',
        tech_stack: ['React', 'Tailwind', 'Next.js'],
        image_url: '',
        link: 'https://github.com'
      }])
    }
  }

  const addExperience = () => {
    if (setExperience) {
      setExperience([...(experience || []), {
        id: crypto.randomUUID(),
        role: 'Senior Designer',
        company: 'Design Studio',
        start_date: '2023',
        end_date: 'Present',
        description: 'Led the redesign of core products.'
      }])
    }
  }

  const Card = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
    <div id={id} className={`bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  )

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-12 md:py-20 px-4 sm:px-6 lg:px-8" style={{ fontFamily: fontFam }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[minmax(min-content,max-content)]">
          
          {/* HERO CARD - Spans 2 cols on Desktop */}
          <Card className="md:col-span-2 lg:col-span-2 flex flex-col justify-center min-h-[400px]">
            <div className="flex flex-col gap-6">
              <EditableImage
                src={profile?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200"}
                onUpload={(url: string) => setProfile?.({ ...profile, avatar_url: url })}
                isEditor={isEditor}
                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-neutral-100 dark:ring-neutral-800"
              />
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-2">
                  <EditableField value={profile?.full_name || "Alex Morgan"} onChange={(val: string) => setProfile?.({ ...profile, full_name: val })} isEditor={isEditor} />
                </h1>
                <p className="text-xl sm:text-2xl text-neutral-500 dark:text-neutral-400 font-medium tracking-tight mb-4">
                  <EditableField value={profile?.headline || "Product Designer & Frontend Developer"} onChange={(val: string) => setProfile?.({ ...profile, headline: val })} isEditor={isEditor} />
                </p>
                <div className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg">
                  <EditableField value={heroContent?.tagline || "I build digital products that are not only beautiful but also highly functional and user-centric."} onChange={(val: string) => updateBlockContent('hero', 'tagline', val)} isEditor={isEditor} multiline />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 mt-4">
                <a href="#contact" className="px-6 py-3 rounded-full text-white font-medium transition-opacity hover:opacity-90 flex items-center gap-2" style={{ backgroundColor: themeColor }}>
                  <EditableField value={heroContent?.cta1 || "Let's Talk"} onChange={(val: string) => updateBlockContent('hero', 'cta1', val)} isEditor={isEditor} />
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#projects" className="px-6 py-3 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium transition-colors hover:bg-neutral-300 dark:hover:bg-neutral-700">
                  <EditableField value={heroContent?.cta2 || "View Work"} onChange={(val: string) => updateBlockContent('hero', 'cta2', val)} isEditor={isEditor} />
                </a>
              </div>
            </div>
          </Card>

          {/* QUOTE CARD - 1 col */}
          <Card className="md:col-span-1 lg:col-span-1 flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-950 dark:from-neutral-100 dark:to-neutral-300 text-white dark:text-neutral-900 text-center min-h-[300px]">
            <div className="flex flex-col items-center gap-6">
              <svg className="w-12 h-12 opacity-50" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-2.2 1.8-4 4-4V8zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-2.2 1.8-4 4-4V8z"/></svg>
              <h3 className="text-2xl font-serif italic leading-tight">
                "<EditableField value={quoteContent?.text || "Simplicity is the ultimate sophistication."} onChange={(val: string) => updateBlockContent('quote', 'text', val)} isEditor={isEditor} multiline />"
              </h3>
            </div>
          </Card>

          {/* QUICK FACTS CARD - 1 col */}
          <Card className="md:col-span-1 lg:col-span-1 flex flex-col justify-between min-h-[300px]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">
              <EditableField value={quickFactsContent?.title || "By the Numbers"} onChange={(val: string) => updateBlockContent('quickFacts', 'title', val)} isEditor={isEditor} />
            </h3>
            <div className="grid grid-cols-2 gap-4 flex-1">
              {[
                { key: 'stat1', label: 'Years Exp.', value: '5+' },
                { key: 'stat2', label: 'Projects', value: '40+' },
                { key: 'stat3', label: 'Clients', value: '25+' },
                { key: 'stat4', label: 'Awards', value: '3' }
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col justify-end bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-2xl">
                  <span className="text-3xl font-bold tracking-tighter" style={{ color: themeColor }}>
                    <EditableField value={quickFactsContent?.[stat.key + '_val'] || stat.value} onChange={(val: string) => updateBlockContent('quickFacts', stat.key + '_val', val)} isEditor={isEditor} />
                  </span>
                  <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mt-1 uppercase tracking-wider">
                    <EditableField value={quickFactsContent?.[stat.key + '_label'] || stat.label} onChange={(val: string) => updateBlockContent('quickFacts', stat.key + '_label', val)} isEditor={isEditor} />
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* ABOUT ME CARD - Spans 2 cols */}
          <Card className="md:col-span-2 lg:col-span-2 min-h-[300px]">
             <div className="flex items-center gap-3 mb-6">
               <div className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
                 <MapPin className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
               </div>
               <h3 className="text-xl font-bold tracking-tight">
                 <EditableField value={aboutContent?.title || "About Me"} onChange={(val: string) => updateBlockContent('about', 'title', val)} isEditor={isEditor} />
               </h3>
             </div>
             <div className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-lg space-y-4">
                <EditableField value={profile?.bio || "I am a multidisciplinary designer and developer based in New York. I specialize in creating intuitive user interfaces and robust frontend architectures. With a background in both graphic design and computer science, I bridge the gap between aesthetics and functionality."} onChange={(val: string) => setProfile?.({ ...profile, bio: val })} isEditor={isEditor} multiline />
             </div>
          </Card>

          {/* SOCIAL LINKS CARD - 1 col */}
          <Card className="md:col-span-1 lg:col-span-1 min-h-[300px]">
             <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-6">
                <EditableField value={socialContent?.title || "Connect"} onChange={(val: string) => updateBlockContent('social', 'title', val)} isEditor={isEditor} />
             </h3>
             <div className="flex flex-col gap-3">
               {[
                 { icon: <Globe className="w-5 h-5" />, key: 'github', label: 'GitHub', link: 'https://github.com' },
                 { icon: <Link className="w-5 h-5" />, key: 'linkedin', label: 'LinkedIn', link: 'https://linkedin.com' },
                 { icon: <AtSign className="w-5 h-5" />, key: 'twitter', label: 'Twitter', link: 'https://twitter.com' },
                 { icon: <Mail className="w-5 h-5" />, key: 'email', label: 'Email', link: 'mailto:hello@example.com' }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors group">
                    <div className="text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <EditableField value={socialContent?.[item.key + '_label'] || item.label} onChange={(val: string) => updateBlockContent('social', item.key + '_label', val)} isEditor={isEditor} />
                    </div>
                    {isEditor ? (
                       <EditableField value={socialContent?.[item.key] || item.link} onChange={(val: string) => updateBlockContent('social', item.key, val)} isEditor={isEditor} />
                    ) : (
                       <a href={socialContent?.[item.key] || item.link} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                         <ExternalLink className="w-4 h-4 text-neutral-400" />
                       </a>
                    )}
                 </div>
               ))}
             </div>
          </Card>

          {/* TECHNOLOGIES CARD - 1 col */}
          <Card className="md:col-span-1 lg:col-span-1 min-h-[300px] bg-neutral-900 dark:bg-white text-white dark:text-neutral-900">
             <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-6">
                <EditableField value={techContent?.title || "Core Tech"} onChange={(val: string) => updateBlockContent('technologies', 'title', val)} isEditor={isEditor} />
             </h3>
             <div className="flex flex-wrap gap-2">
                {(techContent?.items || ["React", "TypeScript", "Next.js", "TailwindCSS", "Node.js", "Figma", "Framer Motion", "GraphQL"]).map((tech: string, idx: number) => (
                  <span key={idx} className="px-4 py-2 rounded-full bg-neutral-800 dark:bg-neutral-100 text-sm font-medium border border-neutral-700 dark:border-neutral-200">
                    {isEditor ? (
                      <EditableField 
                        value={tech} 
                        onChange={(val: string) => {
                          const newTechs = [...(techContent?.items || [])];
                          newTechs[idx] = val;
                          updateBlockContent('technologies', 'items', newTechs);
                        }} 
                        isEditor={isEditor} 
                      />
                    ) : (
                      tech
                    )}
                  </span>
                ))}
                {isEditor && (
                  <button 
                    onClick={() => updateBlockContent('technologies', 'items', [...(techContent?.items || ["React", "TypeScript", "Next.js", "TailwindCSS", "Node.js", "Figma", "Framer Motion", "GraphQL"]), 'New Tech'])}
                    className="px-4 py-2 rounded-full bg-neutral-800 dark:bg-neutral-100 text-sm font-medium opacity-50 hover:opacity-100 transition-opacity"
                  >
                    + Add
                  </button>
                )}
             </div>
          </Card>

          {/* FEATURED PROJECTS - Spans 4 cols */}
          <Card className="md:col-span-2 lg:col-span-4 min-h-[400px]" id="projects">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-bold tracking-tight">
                 <EditableField value={getBlockContent('projects')?.title || "Featured Projects"} onChange={(val: string) => updateBlockContent('projects', 'title', val)} isEditor={isEditor} />
               </h3>
               {isEditor && (
                 <button onClick={addProject} className="text-sm font-medium px-4 py-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                   + Add Project
                 </button>
               )}
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(projects && projects.length > 0 ? projects : [
                  { id: '1', title: 'Modern SaaS Dashboard', description: 'A sleek, modular dashboard interface designed for enterprise analytics.', tech_stack: ['React', 'Tailwind', 'Recharts'], link: '#' },
                  { id: '2', title: 'E-commerce Platform', description: 'High-conversion storefront with seamless cart management and filtering.', tech_stack: ['Next.js', 'Stripe', 'Zustand'], link: '#' },
                  { id: '3', title: 'Financial Tech App', description: 'Mobile-first banking experience with real-time transaction updates.', tech_stack: ['React Native', 'TypeScript', 'Node.js'], link: '#' }
                ]).map((proj: any, idx: number) => (
                  <div key={proj.id} className="group flex flex-col gap-4">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 relative">
                       <EditableImage
                         src={proj.image_url || `https://images.unsplash.com/photo-${1551288049 + idx * 100}-cc599ad51b5c?auto=format&fit=crop&q=80&w=800&h=450`}
                         onUpload={(url: string) => { const newP = [...projects]; newP[idx].image_url = url; setProjects?.(newP); }}
                         isEditor={isEditor}
                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       />
                       {isEditor && (
                         <button onClick={() => { const newP = [...projects]; newP.splice(idx, 1); setProjects?.(newP); }} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                         </button>
                       )}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">
                        <EditableField value={proj.title} onChange={(val: string) => { const newP = [...projects]; newP[idx].title = val; setProjects?.(newP); }} isEditor={isEditor} />
                      </h4>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                        <EditableField value={proj.description} onChange={(val: string) => { const newP = [...projects]; newP[idx].description = val; setProjects?.(newP); }} isEditor={isEditor} multiline />
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {proj.tech_stack?.map((tech: string, i: number) => (
                          <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
                            {tech}
                          </span>
                        ))}
                        {isEditor && (
                          <EditableField 
                            value={proj.tech_stack?.join(', ') || ''} 
                            onChange={(val: string) => { const newP = [...projects]; newP[idx].tech_stack = val.split(',').map(s=>s.trim()).filter(Boolean); setProjects?.(newP); }} 
                            isEditor={isEditor} 
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </Card>

          {/* WORK EXPERIENCE - Spans 2 cols */}
          <Card className="md:col-span-2 lg:col-span-2">
             <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-3">
                 <div className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
                   <Briefcase className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                 </div>
                 <h3 className="text-xl font-bold tracking-tight">
                   <EditableField value={getBlockContent('experience')?.title || "Work Experience"} onChange={(val: string) => updateBlockContent('experience', 'title', val)} isEditor={isEditor} />
                 </h3>
               </div>
               {isEditor && (
                 <button onClick={addExperience} className="text-sm font-medium px-3 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                   + Add
                 </button>
               )}
             </div>

             <div className="space-y-6">
                {(experience && experience.length > 0 ? experience : [
                  { id: '1', role: 'Lead Product Designer', company: 'InnovateTech', start_date: '2021', end_date: 'Present', description: 'Spearheaded the design system overhaul and led a team of 4 designers.' },
                  { id: '2', role: 'UX/UI Designer', company: 'Creative Solutions', start_date: '2018', end_date: '2021', description: 'Designed end-to-end flows for mobile and web applications.' }
                ]).map((exp: any, idx: number) => (
                  <div key={exp.id} className="relative group">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                      <h4 className="text-lg font-bold">
                        <EditableField value={exp.role} onChange={(val: string) => { const newE = [...experience]; newE[idx].role = val; setExperience?.(newE); }} isEditor={isEditor} />
                      </h4>
                      <span className="text-sm font-mono text-neutral-500">
                        <EditableField value={exp.start_date} onChange={(val: string) => { const newE = [...experience]; newE[idx].start_date = val; setExperience?.(newE); }} isEditor={isEditor} /> — <EditableField value={exp.end_date} onChange={(val: string) => { const newE = [...experience]; newE[idx].end_date = val; setExperience?.(newE); }} isEditor={isEditor} />
                      </span>
                    </div>
                    <div className="text-neutral-600 dark:text-neutral-400 font-medium mb-2" style={{ color: themeColor }}>
                      <EditableField value={exp.company} onChange={(val: string) => { const newE = [...experience]; newE[idx].company = val; setExperience?.(newE); }} isEditor={isEditor} />
                    </div>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                      <EditableField value={exp.description} onChange={(val: string) => { const newE = [...experience]; newE[idx].description = val; setExperience?.(newE); }} isEditor={isEditor} multiline />
                    </p>
                    {isEditor && (
                      <button onClick={() => { const newE = [...experience]; newE.splice(idx, 1); setExperience?.(newE); }} className="absolute -left-10 top-0 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    )}
                  </div>
                ))}
             </div>
          </Card>

          {/* EDUCATION & CERTIFICATIONS - Spans 2 cols */}
          <div className="md:col-span-2 lg:col-span-2 flex flex-col gap-6">
            
            <Card>
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
                   <GraduationCap className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                 </div>
                 <h3 className="text-xl font-bold tracking-tight">
                   <EditableField value={eduContent?.title || "Education"} onChange={(val: string) => updateBlockContent('education', 'title', val)} isEditor={isEditor} />
                 </h3>
               </div>
               <div className="space-y-4">
                  {(eduContent?.items || [
                    { degree: 'B.S. Computer Science', school: 'University of Technology', year: '2018' },
                    { degree: 'Design UI/UX Masterclass', school: 'Design Academy', year: '2019' }
                  ]).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start group relative">
                       <div>
                         <h4 className="font-bold">
                           <EditableField value={item.degree} onChange={(val: string) => { const newItems = [...(eduContent?.items || [])]; newItems[idx].degree = val; updateBlockContent('education', 'items', newItems); }} isEditor={isEditor} />
                         </h4>
                         <p className="text-sm text-neutral-500">
                           <EditableField value={item.school} onChange={(val: string) => { const newItems = [...(eduContent?.items || [])]; newItems[idx].school = val; updateBlockContent('education', 'items', newItems); }} isEditor={isEditor} />
                         </p>
                       </div>
                       <span className="text-sm font-mono text-neutral-400">
                         <EditableField value={item.year} onChange={(val: string) => { const newItems = [...(eduContent?.items || [])]; newItems[idx].year = val; updateBlockContent('education', 'items', newItems); }} isEditor={isEditor} />
                       </span>
                    </div>
                  ))}
                  {isEditor && (
                    <button 
                      onClick={() => updateBlockContent('education', 'items', [...(eduContent?.items || []), { degree: 'Degree', school: 'School', year: '2024' }])}
                      className="text-sm font-medium opacity-50 hover:opacity-100 transition-opacity mt-4"
                    >
                      + Add Education
                    </button>
                  )}
               </div>
            </Card>

            <Card className="flex-1">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800">
                   <Award className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                 </div>
                 <h3 className="text-xl font-bold tracking-tight">
                   <EditableField value={certContent?.title || "Certifications"} onChange={(val: string) => updateBlockContent('certifications', 'title', val)} isEditor={isEditor} />
                 </h3>
               </div>
               <div className="space-y-4">
                  {(certContent?.items || [
                    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2022' },
                    { name: 'Google UX Design Professional', issuer: 'Coursera', year: '2021' }
                  ]).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-start group relative">
                       <div>
                         <h4 className="font-bold">
                           <EditableField value={item.name} onChange={(val: string) => { const newItems = [...(certContent?.items || [])]; newItems[idx].name = val; updateBlockContent('certifications', 'items', newItems); }} isEditor={isEditor} />
                         </h4>
                         <p className="text-sm text-neutral-500">
                           <EditableField value={item.issuer} onChange={(val: string) => { const newItems = [...(certContent?.items || [])]; newItems[idx].issuer = val; updateBlockContent('certifications', 'items', newItems); }} isEditor={isEditor} />
                         </p>
                       </div>
                       <span className="text-sm font-mono text-neutral-400">
                         <EditableField value={item.year} onChange={(val: string) => { const newItems = [...(certContent?.items || [])]; newItems[idx].year = val; updateBlockContent('certifications', 'items', newItems); }} isEditor={isEditor} />
                       </span>
                    </div>
                  ))}
                  {isEditor && (
                    <button 
                      onClick={() => updateBlockContent('certifications', 'items', [...(certContent?.items || []), { name: 'Certificate', issuer: 'Issuer', year: '2024' }])}
                      className="text-sm font-medium opacity-50 hover:opacity-100 transition-opacity mt-4"
                    >
                      + Add Certification
                    </button>
                  )}
               </div>
            </Card>

          </div>

          {/* CONTACT & SKILLS - Span 4 cols as sub-grid */}
          <Card className="md:col-span-2 lg:col-span-4 p-0 overflow-visible border-0 shadow-none bg-transparent dark:bg-transparent">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* SKILLS CARD - Spans 2 cols */}
                <Card className="md:col-span-2 lg:col-span-2 min-h-[300px]">
                  <h3 className="text-2xl font-bold tracking-tight mb-6">
                    <EditableField value={skillsContent?.title || "Skills & Expertise"} onChange={(val: string) => updateBlockContent('skills', 'title', val)} isEditor={isEditor} />
                  </h3>
                  <div className="space-y-6">
                    {(skillsContent?.categories || [
                      { title: 'Programming Languages', skills: ['JavaScript', 'TypeScript', 'Python', 'Go', 'HTML/CSS'] },
                      { title: 'Frameworks & Libraries', skills: ['React', 'Next.js', 'Node.js', 'TailwindCSS', 'Express'] },
                      { title: 'Design Tools', skills: ['Figma', 'Adobe XD', 'Framer', 'Illustrator'] }
                    ]).map((cat: any, idx: number) => (
                      <div key={idx}>
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                          <EditableField value={cat.title} onChange={(val: string) => { const newCats = [...(skillsContent?.categories || [])]; newCats[idx].title = val; updateBlockContent('skills', 'categories', newCats); }} isEditor={isEditor} />
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {cat.skills.map((skill: string, sIdx: number) => (
                            <span key={sIdx} className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm font-medium">
                              {isEditor ? (
                                <EditableField 
                                  value={skill} 
                                  onChange={(val: string) => {
                                    const newCats = [...(skillsContent?.categories || [])];
                                    newCats[idx].skills[sIdx] = val;
                                    updateBlockContent('skills', 'categories', newCats);
                                  }} 
                                  isEditor={isEditor} 
                                />
                              ) : (
                                skill
                              )}
                            </span>
                          ))}
                          {isEditor && (
                            <button 
                              onClick={() => {
                                const newCats = [...(skillsContent?.categories || [])];
                                newCats[idx].skills.push('New Skill');
                                updateBlockContent('skills', 'categories', newCats);
                              }}
                              className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm font-medium opacity-50 hover:opacity-100 transition-opacity"
                            >
                              +
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    {isEditor && (
                      <button 
                        onClick={() => updateBlockContent('skills', 'categories', [...(skillsContent?.categories || []), { title: 'New Category', skills: ['Skill 1'] }])}
                        className="text-sm font-medium opacity-50 hover:opacity-100 transition-opacity mt-4"
                      >
                        + Add Skill Category
                      </button>
                    )}
                  </div>
                </Card>

                {/* DIRECT CONTACT CARD - 1 col */}
                <Card className="md:col-span-1 lg:col-span-1 flex flex-col justify-center min-h-[300px]" id="contact">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold tracking-tight mb-2">
                      <EditableField value={contactContent?.title || "Let's Work Together"} onChange={(val: string) => updateBlockContent('contact', 'title', val)} isEditor={isEditor} />
                    </h3>
                    <p className="text-neutral-500">
                      <EditableField value={contactContent?.subtitle || "I'm available for freelance opportunities and full-time roles."} onChange={(val: string) => updateBlockContent('contact', 'subtitle', val)} isEditor={isEditor} multiline />
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <a href={`mailto:${contactContent?.email || profile?.email || 'hello@example.com'}`} className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-white font-semibold transition-opacity hover:opacity-90" style={{ backgroundColor: themeColor }}>
                      <Mail className="w-5 h-5" />
                      <EditableField value={contactContent?.email || profile?.email || "hello@example.com"} onChange={(val: string) => updateBlockContent('contact', 'email', val)} isEditor={isEditor} />
                    </a>
                    <a href={contactContent?.phone_link || '#'} className="w-full py-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center gap-2 font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
                      <Phone className="w-5 h-5" />
                      <EditableField value={contactContent?.phone || "+1 (555) 123-4567"} onChange={(val: string) => updateBlockContent('contact', 'phone', val)} isEditor={isEditor} />
                    </a>
                  </div>
                </Card>

             </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
