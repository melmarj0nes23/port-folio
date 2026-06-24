'use client'

import React from 'react'
import { EditableField } from '../editor/EditableField'
import { ArrowRight, Mail, MapPin, Globe, Phone, GraduationCap, Award, Briefcase, Plus, Trash2, ExternalLink, Image as ImageIcon } from 'lucide-react'

export function MagazineTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, blocks, setBlocks, isEditor, isPreview = false }: any) {
  
  const getBlockContent = (type: string) => {
    return blocks?.find((b: any) => b.type === type)?.content || {}
  }

  const updateBlockContent = (type: string, key: string, value: any) => {
    if (!isEditor || !setBlocks) return
    const newBlocks = [...(blocks || [])]
    const blockIndex = newBlocks.findIndex(b => b.type === type)
    
    if (blockIndex >= 0) {
      newBlocks[blockIndex] = {
        ...newBlocks[blockIndex],
        content: {
          ...newBlocks[blockIndex].content,
          [key]: value
        }
      }
    } else {
      newBlocks.push({
        type,
        content: { [key]: value },
        order: newBlocks.length
      })
    }
    setBlocks(newBlocks)
  }

  // Content Blocks
  const heroContent = getBlockContent('hero')
  const aboutContent = getBlockContent('about')
  const skillsContent = getBlockContent('skills')
  const eduContent = getBlockContent('education')
  const certContent = getBlockContent('certifications')
  const contactContent = getBlockContent('contact')
  const footerContent = getBlockContent('footer')
  const mediaContent = getBlockContent('media')

  const themeColor = portfolio?.theme_color || '#000000'
  const fontFam = portfolio?.font || 'Inter'

  const addExperience = () => {
    if (!isEditor) return
    setExperience([...experience, {
      id: `temp-${Date.now()}`,
      portfolio_id: portfolio?.id,
      company: 'New Company',
      role: 'New Role',
      start_date: '2023',
      end_date: 'Present',
      description: 'Describe your responsibilities and achievements.'
    }])
  }

  const removeExperience = (idx: number) => {
    if (!isEditor) return
    const newExp = [...experience]
    newExp.splice(idx, 1)
    setExperience(newExp)
  }

  const addProject = () => {
    if (!isEditor) return
    setProjects([...projects, {
      id: `temp-${Date.now()}`,
      portfolio_id: portfolio?.id,
      title: 'New Project',
      description: 'Describe the project and your role.',
      link: 'https://github.com',
      tech_stack: ['React', 'Next.js']
    }])
  }

  const removeProject = (idx: number) => {
    if (!isEditor) return
    const newProj = [...projects]
    newProj.splice(idx, 1)
    setProjects(newProj)
  }

  // Handlers for education, certs, skills array
  const addEdu = () => {
    const items = eduContent?.items || [{ degree: 'Degree', school: 'School', year: 'Year' }]
    updateBlockContent('education', 'items', [...items, { degree: 'New Degree', school: 'New School', year: 'Year' }])
  }
  const removeEdu = (idx: number) => {
    const items = [...(eduContent?.items || [])]
    items.splice(idx, 1)
    updateBlockContent('education', 'items', items)
  }

  const addCert = () => {
    const items = certContent?.items || [{ name: 'Cert Name', issuer: 'Issuer', year: 'Year' }]
    updateBlockContent('certifications', 'items', [...items, { name: 'New Cert', issuer: 'New Issuer', year: 'Year' }])
  }
  const removeCert = (idx: number) => {
    const items = [...(certContent?.items || [])]
    items.splice(idx, 1)
    updateBlockContent('certifications', 'items', items)
  }

  // Skills Categories Handlers
  const defaultSkills = [
    { category: 'Technical Skills', items: 'React, TypeScript, Node.js, Next.js, PostgreSQL' },
    { category: 'Soft Skills', items: 'Leadership, Communication, Problem Solving, Agile' },
    { category: 'Tools & Tech', items: 'Git, Figma, Docker, AWS, Vercel' }
  ]
  const skillsList = skillsContent?.categories || defaultSkills
  
  const addSkillCategory = () => {
    updateBlockContent('skills', 'categories', [...skillsList, { category: 'New Category', items: 'Skill 1, Skill 2' }])
  }
  
  const removeSkillCategory = (idx: number) => {
    const newSkills = [...skillsList]
    newSkills.splice(idx, 1)
    updateBlockContent('skills', 'categories', newSkills)
  }

  const updateSkillCategory = (idx: number, field: string, value: string) => {
    const newSkills = [...skillsList]
    newSkills[idx][field] = value
    updateBlockContent('skills', 'categories', newSkills)
  }

  return (
    <div 
      className="min-h-screen bg-[#fafafa] text-zinc-900"
      style={{ fontFamily: fontFam }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        :root { --theme-color: ${themeColor}; }
        .theme-text { color: var(--theme-color); }
        .theme-bg { background-color: var(--theme-color); }
        .theme-border { border-color: var(--theme-color); }
      `}} />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col md:flex-row border-b border-zinc-200">
        
        {/* Background Support (Optional Image or Color) */}
        <div className="absolute inset-0 z-0 bg-white">
          {mediaContent?.hero_bg && (
             <img src={mediaContent.hero_bg} alt="Background" className="w-full h-full object-cover opacity-30" />
          )}
        </div>

        {/* Hero Editor Controls */}
        {isEditor && (
          <div className="absolute top-4 left-4 z-50 bg-white/90 backdrop-blur px-3 py-2 rounded-lg shadow-sm border border-zinc-200 flex items-center gap-2 group w-64 md:w-10 md:hover:w-64 transition-all overflow-hidden">
            <ImageIcon size={16} className="text-zinc-500 shrink-0" />
            <input 
              className="bg-transparent border-none outline-none text-xs w-full text-zinc-800 opacity-100 md:opacity-0 md:group-hover:opacity-100"
              value={mediaContent?.hero_bg || ''}
              onChange={(e) => updateBlockContent('media', 'hero_bg', e.target.value)}
              placeholder="Hero Background URL..."
            />
          </div>
        )}

        {/* Left: Text Content */}
        <div className="relative w-full md:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center z-10">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-[0.9] mb-6 uppercase break-words">
              <EditableField 
                value={profile?.full_name || "Alex Chen"} 
                onChange={(val: string) => isEditor && setProfile({ ...profile, full_name: val })} 
                isEditor={isEditor} 
              />
            </h1>
            
            <div className="w-20 h-1 theme-bg mb-8"></div>

            <h2 className="text-2xl md:text-3xl font-light text-zinc-600 mb-6 tracking-tight">
              <EditableField 
                value={profile?.headline || "Product Designer & Frontend Engineer"} 
                onChange={(val: string) => isEditor && setProfile({ ...profile, headline: val })} 
                isEditor={isEditor} 
              />
            </h2>
            
            <p className="text-lg md:text-xl text-zinc-500 mb-10 leading-relaxed font-light">
              <EditableField 
                value={heroContent?.tagline || "Crafting digital experiences that merge premium aesthetic with robust engineering."} 
                onChange={(val: string) => updateBlockContent('hero', 'tagline', val)} 
                isEditor={isEditor}
                multiline 
              />
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="px-8 py-4 theme-bg text-white font-medium text-sm tracking-wide uppercase flex items-center gap-2 hover:opacity-90 transition-opacity">
                Contact Me <ArrowRight size={16} />
              </a>
              <a href="#projects" className="px-8 py-4 bg-transparent border border-zinc-300 text-zinc-700 font-medium text-sm tracking-wide uppercase hover:bg-zinc-50 transition-colors">
                View Projects
              </a>
            </div>
          </div>
        </div>

        {/* Right: Large Portrait */}
        <div className="w-full md:w-1/2 relative h-[50vh] md:h-auto z-10 group bg-zinc-100 overflow-hidden border-t md:border-t-0 md:border-l border-zinc-200">
          <img 
            src={profile?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop'} 
            alt="Portrait" 
            className="absolute inset-0 w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700 object-center"
          />
          {isEditor && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
              <div className="bg-white px-4 py-2 rounded shadow-lg flex items-center gap-2 max-w-xs w-full">
                <span className="text-xs font-semibold text-zinc-500 shrink-0">Photo URL:</span>
                <input 
                  className="bg-transparent border-none outline-none text-sm w-full text-zinc-800"
                  value={profile?.avatar_url || ''}
                  onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                  placeholder="Paste image URL..."
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 2. ABOUT ME */}
      <section id="about" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <p className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-2">01. Chapter</p>
            <h2 className="text-4xl font-black tracking-tight uppercase">About Me</h2>
            <div className="w-12 h-1 theme-bg mt-6"></div>
          </div>
          <div className="md:col-span-8">
            <div className="prose prose-lg prose-zinc max-w-none text-zinc-600 font-light leading-relaxed whitespace-pre-wrap">
              <EditableField 
                value={aboutContent?.bio || "I am a multi-disciplinary designer and developer focused on creating intuitive, engaging, and beautiful digital products.\n\nWith over 5 years of experience bridging the gap between design and engineering, I specialize in design systems, interaction design, and frontend architecture. I believe that the best products are built when form and function are considered simultaneously.\n\nCurrently, I'm exploring the intersection of AI and human-computer interaction, building tools that empower creators."} 
                onChange={(val: string) => updateBlockContent('about', 'bio', val)} 
                isEditor={isEditor}
                multiline 
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. SKILLS */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-2">02. Toolkit</p>
            <h2 className="text-4xl font-black tracking-tight uppercase">Expertise</h2>
            <div className="w-12 h-1 theme-bg mt-6 mb-8 md:mb-0"></div>
          </div>
          <div className="md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
              {skillsList.map((skillGroup: any, idx: number) => (
                <div key={idx} className="relative group">
                  {isEditor && (
                    <button onClick={() => removeSkillCategory(idx)} className="absolute -top-3 -right-3 p-1.5 bg-red-50 text-red-500 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <h3 className="text-lg font-bold tracking-tight uppercase mb-4 pb-2 border-b border-zinc-200">
                    <EditableField 
                      value={skillGroup.category} 
                      onChange={(val: string) => updateSkillCategory(idx, 'category', val)} 
                      isEditor={isEditor} 
                    />
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.split(',').map((item: string, i: number) => (
                      <span key={i} className="px-3 py-1.5 bg-zinc-100 text-zinc-700 text-sm font-medium tracking-wide">
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                  {isEditor && (
                    <div className="mt-4">
                      <span className="text-xs text-zinc-400 uppercase font-semibold mb-1 block">Edit List (comma separated):</span>
                      <textarea
                        className="w-full bg-zinc-50 border border-zinc-200 p-2 text-sm outline-none resize-none rounded focus:border-zinc-400"
                        value={skillGroup.items}
                        onChange={(e) => updateSkillCategory(idx, 'items', e.target.value)}
                        rows={2}
                      />
                    </div>
                  )}
                </div>
              ))}
              {isEditor && (
                <button onClick={addSkillCategory} className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-200 p-8 rounded-lg hover:border-zinc-300 hover:bg-zinc-50 transition-colors text-zinc-400">
                  <Plus size={24} className="mb-2" />
                  <span className="text-sm font-semibold uppercase tracking-widest">Add Category</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS */}
      <section id="projects" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200">
        <div className="mb-20 text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-2">03. Selected Work</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase">Featured Projects</h2>
          <div className="w-12 h-1 theme-bg mx-auto mt-6"></div>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {projects?.map((proj: any, idx: number) => {
            const isEven = idx % 2 === 0;
            const projectMediaUrl = mediaContent?.[`project_${proj.id}`] || `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop&sig=${idx}`;
            
            return (
              <div key={proj.id || idx} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center relative group`}>
                
                {isEditor && (
                  <button onClick={() => removeProject(idx)} className="absolute -top-4 -right-4 p-2 bg-red-50 text-red-500 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity z-50 shadow-sm border border-red-100">
                    <Trash2 size={16} />
                  </button>
                )}

                {/* Project Image */}
                <div className="w-full md:w-3/5 relative group/img overflow-hidden bg-zinc-100 shadow-xl">
                  <div className="aspect-[4/3] w-full">
                    <img 
                      src={projectMediaUrl} 
                      alt={proj.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-105"
                    />
                  </div>
                  {isEditor && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover/img:opacity-100 transition-opacity">
                      <div className="bg-white px-4 py-2 rounded shadow-lg flex items-center gap-2 max-w-sm w-full">
                        <span className="text-xs font-semibold text-zinc-500 shrink-0">Image URL:</span>
                        <input 
                          className="bg-transparent border-none outline-none text-sm w-full text-zinc-800"
                          value={mediaContent?.[`project_${proj.id}`] || ''}
                          onChange={(e) => updateBlockContent('media', `project_${proj.id}`, e.target.value)}
                          placeholder="Paste image URL..."
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="w-full md:w-2/5 flex flex-col">
                  <p className="text-xs font-bold tracking-widest uppercase theme-text mb-3">Project {String(idx + 1).padStart(2, '0')}</p>
                  <h3 className="text-3xl font-bold tracking-tight mb-4">
                    <EditableField 
                      value={proj.title} 
                      onChange={(val: string) => {
                        const newProj = [...projects];
                        newProj[idx].title = val;
                        setProjects(newProj);
                      }} 
                      isEditor={isEditor} 
                    />
                  </h3>
                  <div className="text-zinc-500 text-lg font-light leading-relaxed mb-8 whitespace-pre-wrap">
                    <EditableField 
                      value={proj.description} 
                      onChange={(val: string) => {
                        const newProj = [...projects];
                        newProj[idx].description = val;
                        setProjects(newProj);
                      }} 
                      isEditor={isEditor}
                      multiline 
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {(proj.tech_stack || []).map((t: string, tIdx: number) => (
                      <span key={tIdx} className="px-3 py-1 border border-zinc-200 text-zinc-600 text-xs font-bold uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                    {isEditor && (
                      <input 
                        className="px-3 py-1 border border-dashed border-zinc-300 text-zinc-500 text-xs outline-none focus:border-zinc-500"
                        placeholder="+ Tech (comma sep)"
                        value={(proj.tech_stack || []).join(', ')}
                        onChange={(e) => {
                          const newProj = [...projects];
                          newProj[idx].tech_stack = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          setProjects(newProj);
                        }}
                      />
                    )}
                  </div>

                  {proj.link && (
                    <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium theme-text uppercase tracking-widest text-sm hover:opacity-70 transition-opacity">
                      View Live Project <ExternalLink size={16} />
                    </a>
                  )}
                  {isEditor && (
                    <div className="mt-2 text-xs text-zinc-400">
                      Link: <input className="border-b border-zinc-200 bg-transparent outline-none w-full max-w-xs" value={proj.link || ''} onChange={(e) => {
                        const newProj = [...projects];
                        newProj[idx].link = e.target.value;
                        setProjects(newProj);
                      }} />
                    </div>
                  )}
                </div>

              </div>
            )
          })}
          
          {isEditor && (
            <button onClick={addProject} className="w-full py-12 border-2 border-dashed border-zinc-200 text-zinc-400 flex flex-col items-center justify-center hover:bg-zinc-50 hover:border-zinc-300 transition-colors">
              <Plus size={32} className="mb-2" />
              <span className="font-bold uppercase tracking-widest text-sm">Add Project</span>
            </button>
          )}
        </div>
      </section>

      {/* 5. EXPERIENCE TIMELINE */}
      <section className="bg-white py-20 md:py-32 px-4 sm:px-6 lg:px-8 border-y border-zinc-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-bold tracking-widest uppercase text-zinc-400 mb-2">04. History</p>
            <h2 className="text-4xl font-black tracking-tight uppercase">Professional Experience</h2>
            <div className="w-12 h-1 theme-bg mx-auto mt-6"></div>
          </div>

          <div className="relative pl-8 md:pl-0">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-200 -translate-x-1/2"></div>
            <div className="block md:hidden absolute left-0 top-0 bottom-0 w-px bg-zinc-200 ml-3.5"></div>

            {experience?.map((exp: any, idx: number) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={exp.id || idx} className={`relative flex flex-col md:flex-row items-start mb-16 last:mb-0 group`}>
                  
                  {isEditor && (
                    <button onClick={() => removeExperience(idx)} className="absolute top-0 right-0 p-1.5 bg-red-50 text-red-500 rounded z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  )}

                  {/* Marker */}
                  <div className={`absolute left-0 md:left-1/2 w-8 h-8 bg-white border-4 border-zinc-200 rounded-full -translate-x-1/2 mt-1 z-10 ${themeColor ? 'group-hover:border-[var(--theme-color)]' : ''} transition-colors flex items-center justify-center`}>
                    <Briefcase size={12} className="text-zinc-400" />
                  </div>

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right md:ml-0' : 'md:pl-16 md:ml-auto'} pl-12 md:pl-0`}>
                    <p className="text-sm font-bold tracking-widest uppercase theme-text mb-2">
                      <EditableField 
                        value={exp.start_date || '2020'} 
                        onChange={(val: string) => { const newE = [...experience]; newE[idx].start_date = val; setExperience(newE); }} 
                        isEditor={isEditor} 
                      />
                      {' — '}
                      <EditableField 
                        value={exp.end_date || 'Present'} 
                        onChange={(val: string) => { const newE = [...experience]; newE[idx].end_date = val; setExperience(newE); }} 
                        isEditor={isEditor} 
                      />
                    </p>
                    <h3 className="text-2xl font-bold tracking-tight mb-1">
                      <EditableField 
                        value={exp.role} 
                        onChange={(val: string) => { const newE = [...experience]; newE[idx].role = val; setExperience(newE); }} 
                        isEditor={isEditor} 
                      />
                    </h3>
                    <h4 className="text-lg text-zinc-500 font-medium mb-4">
                      <EditableField 
                        value={exp.company} 
                        onChange={(val: string) => { const newE = [...experience]; newE[idx].company = val; setExperience(newE); }} 
                        isEditor={isEditor} 
                      />
                    </h4>
                    <div className="text-zinc-600 font-light leading-relaxed whitespace-pre-wrap">
                      <EditableField 
                        value={exp.description} 
                        onChange={(val: string) => { const newE = [...experience]; newE[idx].description = val; setExperience(newE); }} 
                        isEditor={isEditor}
                        multiline 
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {isEditor && (
            <div className="mt-16 text-center">
              <button onClick={addExperience} className="px-6 py-3 border border-zinc-300 text-zinc-500 font-bold uppercase tracking-widest text-xs hover:bg-zinc-50 transition-colors">
                + Add Experience
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 6. EDUCATION & CERTS */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          
          {/* Education */}
          <div>
            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-zinc-200">
              <GraduationCap size={28} className="theme-text" />
              <h2 className="text-3xl font-black tracking-tight uppercase">Education</h2>
            </div>
            <div className="flex flex-col gap-8">
              {(eduContent?.items || [{ degree: 'B.S. Computer Science', school: 'University of Technology', year: '2016 - 2020' }]).map((item: any, idx: number) => (
                <div key={idx} className="relative group pl-6 border-l border-zinc-200">
                  {isEditor && (
                    <button onClick={() => removeEdu(idx)} className="absolute top-0 right-0 p-1 bg-red-50 text-red-500 rounded opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <h3 className="text-xl font-bold mb-1">
                    <EditableField value={item.degree} onChange={(val: string) => { const items = [...eduContent.items]; items[idx].degree = val; updateBlockContent('education', 'items', items) }} isEditor={isEditor} />
                  </h3>
                  <p className="text-zinc-600 mb-2">
                    <EditableField value={item.school} onChange={(val: string) => { const items = [...eduContent.items]; items[idx].school = val; updateBlockContent('education', 'items', items) }} isEditor={isEditor} />
                  </p>
                  <p className="text-sm font-bold tracking-widest uppercase text-zinc-400">
                    <EditableField value={item.year} onChange={(val: string) => { const items = [...eduContent.items]; items[idx].year = val; updateBlockContent('education', 'items', items) }} isEditor={isEditor} />
                  </p>
                </div>
              ))}
              {isEditor && (
                <button onClick={addEdu} className="text-left text-xs font-bold uppercase tracking-widest theme-text hover:opacity-70">+ Add Education</button>
              )}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-zinc-200">
              <Award size={28} className="theme-text" />
              <h2 className="text-3xl font-black tracking-tight uppercase">Certifications</h2>
            </div>
            <div className="flex flex-col gap-8">
              {(certContent?.items || [{ name: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2022' }]).map((item: any, idx: number) => (
                <div key={idx} className="relative group pl-6 border-l border-zinc-200">
                  {isEditor && (
                    <button onClick={() => removeCert(idx)} className="absolute top-0 right-0 p-1 bg-red-50 text-red-500 rounded opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <h3 className="text-xl font-bold mb-1">
                    <EditableField value={item.name} onChange={(val: string) => { const items = [...certContent.items]; items[idx].name = val; updateBlockContent('certifications', 'items', items) }} isEditor={isEditor} />
                  </h3>
                  <p className="text-zinc-600 mb-2">
                    <EditableField value={item.issuer} onChange={(val: string) => { const items = [...certContent.items]; items[idx].issuer = val; updateBlockContent('certifications', 'items', items) }} isEditor={isEditor} />
                  </p>
                  <p className="text-sm font-bold tracking-widest uppercase text-zinc-400">
                    <EditableField value={item.year} onChange={(val: string) => { const items = [...certContent.items]; items[idx].year = val; updateBlockContent('certifications', 'items', items) }} isEditor={isEditor} />
                  </p>
                </div>
              ))}
              {isEditor && (
                <button onClick={addCert} className="text-left text-xs font-bold uppercase tracking-widest theme-text hover:opacity-70">+ Add Certification</button>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 7. CONTACT & FOOTER */}
      <section id="contact" className="bg-zinc-900 text-white py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-2">05. Connect</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight uppercase mb-8">Let's work together.</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-20 text-zinc-300">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-white mb-2">
                <Mail size={20} />
              </div>
              <p className="font-light tracking-wide">
                <EditableField value={contactContent?.email || "hello@example.com"} onChange={(val: string) => updateBlockContent('contact', 'email', val)} isEditor={isEditor} />
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-white mb-2">
                <Globe size={20} />
              </div>
              <p className="font-light tracking-wide">
                <EditableField value={contactContent?.linkedin || "linkedin.com/in/username"} onChange={(val: string) => updateBlockContent('contact', 'linkedin', val)} isEditor={isEditor} />
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-zinc-700 flex items-center justify-center text-white mb-2">
                <MapPin size={20} />
              </div>
              <p className="font-light tracking-wide">
                <EditableField value={contactContent?.location || "San Francisco, CA"} onChange={(val: string) => updateBlockContent('contact', 'location', val)} isEditor={isEditor} />
              </p>
            </div>
          </div>

          <a href={`mailto:${contactContent?.email || 'hello@example.com'}`} className="inline-block px-12 py-5 theme-bg text-white font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
            Send an Email
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black py-8 border-t border-zinc-900 text-center">
        <p className="text-zinc-600 text-xs font-bold tracking-widest uppercase">
          &copy; {new Date().getFullYear()} <EditableField value={footerContent?.text || profile?.full_name || "Alex Chen"} onChange={(val: string) => updateBlockContent('footer', 'text', val)} isEditor={isEditor} />. ALL RIGHTS RESERVED.
        </p>
      </footer>

    </div>
  )
}
