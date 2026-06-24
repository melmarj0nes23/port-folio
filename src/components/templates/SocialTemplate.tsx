'use client'

import React, { useState, useEffect } from 'react'
import { EditableField } from '../editor/EditableField'
import { Plus, Briefcase, MapPin, GraduationCap, Mail, Phone, Link, Globe, Image as ImageIcon, ExternalLink, Calendar, Award, Trash2 } from 'lucide-react'

export function SocialTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, blocks, setBlocks, isEditor, isPreview = false }: any) {
  const [activeSection, setActiveSection] = useState('about');
  const accentColor = portfolio?.theme_color || '#3B82F6'; // Default elegant blue

  const getBlockContent = (type: string) => {
    return blocks?.find((b: any) => b.type === type)?.content || {};
  };

  const updateBlockContent = (type: string, key: string, val: any) => {
    if (!isEditor || !setBlocks) return;
    const newBlocks = [...blocks];
    const blockIndex = newBlocks.findIndex(b => b.type === type);
    if (blockIndex >= 0) {
      newBlocks[blockIndex] = {
        ...newBlocks[blockIndex],
        content: { ...newBlocks[blockIndex].content, [key]: val }
      };
      setBlocks(newBlocks);
    }
  };

  const heroContent = getBlockContent('hero');
  const aboutContent = getBlockContent('about');
  const skillsContent = getBlockContent('skills');
  const eduContent = getBlockContent('education');
  const certContent = getBlockContent('certifications');
  const contactContent = getBlockContent('contact');

  const addProject = () => {
    if(!isEditor || !setProjects) return;
    setProjects([...projects, {
      id: `temp-${Date.now()}`,
      title: 'New Project',
      description: 'Describe what you built...',
      tech_stack: ['React'],
      link: '',
      image_url: ''
    }]);
  }

  const removeProject = (idx: number) => {
    if(!isEditor || !setProjects) return;
    const newP = [...projects];
    newP.splice(idx, 1);
    setProjects(newP);
  }

  const addExperience = () => {
    if(!isEditor || !setExperience) return;
    setExperience([...experience, {
      id: `temp-${Date.now()}`,
      role: 'New Role',
      company: 'Company Name',
      start_date: '2023',
      end_date: 'Present',
      description: 'Describe your responsibilities...'
    }]);
  }

  const removeExperience = (idx: number) => {
    if(!isEditor || !setExperience) return;
    const newE = [...experience];
    newE.splice(idx, 1);
    setExperience(newE);
  }

  const addSkill = () => {
    if(!isEditor) return;
    const newSkills = [...(skillsContent.items || []), 'New Skill'];
    updateBlockContent('skills', 'items', newSkills);
  }

  const removeSkill = (idx: number) => {
    if(!isEditor) return;
    const newSkills = [...(skillsContent.items || [])];
    newSkills.splice(idx, 1);
    updateBlockContent('skills', 'items', newSkills);
  }

  const addEducation = () => {
    if(!isEditor) return;
    const items = [...(eduContent.items || []), { degree: 'Degree', school: 'School', year: '2024' }];
    updateBlockContent('education', 'items', items);
  }

  const removeEducation = (idx: number) => {
    if(!isEditor) return;
    const items = [...(eduContent.items || [])];
    items.splice(idx, 1);
    updateBlockContent('education', 'items', items);
  }

  const addCert = () => {
    if(!isEditor) return;
    const items = [...(certContent.items || []), { name: 'Certificate', issuer: 'Issuer', year: '2024' }];
    updateBlockContent('certifications', 'items', items);
  }

  const removeCert = (idx: number) => {
    if(!isEditor) return;
    const items = [...(certContent.items || [])];
    items.splice(idx, 1);
    updateBlockContent('certifications', 'items', items);
  }

  const navItems = ['About', 'Skills', 'Experience', 'Projects', 'Education', 'Certifications', 'Contact'];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const coverUrl = heroContent?.coverUrl || 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1600&h=400&fit=crop';
  const profileUrl = profile?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-slate-900 dark:text-zinc-100 pb-20">
      
      {/* Header Container */}
      <div className="bg-white dark:bg-zinc-900 border-b border-slate-200 dark:border-zinc-800 relative z-10">
        
        {/* Banner */}
        <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden group">
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          {isEditor && (
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-zinc-800/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <ImageIcon size={14} className="text-slate-500" />
              <span className="text-xs font-medium text-slate-500 whitespace-nowrap">Cover Image URL:</span>
              <input 
                className="bg-transparent border-none outline-none text-sm w-48 text-slate-800 dark:text-zinc-200"
                value={heroContent?.coverUrl || ''}
                onChange={(e) => updateBlockContent('hero', 'coverUrl', e.target.value)}
                placeholder="Paste image URL here"
              />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Profile Info Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mb-4 sm:mb-6 flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-4 sm:gap-6">
            
            {/* Avatar */}
            <div className="relative group shrink-0 -mt-16 sm:-mt-20 md:-mt-24 z-20">
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border-4 border-white dark:border-zinc-900 overflow-hidden bg-slate-100 dark:bg-zinc-800 shadow-md">
                <img src={profileUrl} alt="Profile" className="w-full h-full object-cover" />
              </div>
              {isEditor && (
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-zinc-800/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                  <span className="text-xs font-medium text-slate-500">Avatar URL:</span>
                  <input 
                    className="bg-transparent border-none outline-none text-sm w-32 text-slate-800 dark:text-zinc-200"
                    value={profile?.avatar_url || ''}
                    onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                    placeholder="URL..."
                  />
                </div>
              )}
            </div>

            {/* Title & Tagline */}
            <div className="flex-1 text-center sm:text-left pt-4 sm:pt-6 sm:pb-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                <EditableField 
                  value={profile?.full_name || "Alex Chen"} 
                  onChange={(val: string) => isEditor && setProfile({ ...profile, full_name: val })} 
                  isEditor={isEditor} 
                />
              </h1>
              <div className="text-lg sm:text-xl font-medium text-slate-600 dark:text-zinc-300 mt-1">
                <EditableField 
                  value={profile?.headline || "Senior Product Designer & Developer"} 
                  onChange={(val: string) => isEditor && setProfile({ ...profile, headline: val })} 
                  isEditor={isEditor} 
                />
              </div>
              <div className="text-sm text-slate-500 dark:text-zinc-400 mt-1.5 max-w-lg mx-auto sm:mx-0">
                <EditableField 
                  value={heroContent?.tagline || "Building digital experiences that combine beautiful design with robust engineering."} 
                  onChange={(val: string) => updateBlockContent('hero', 'tagline', val)} 
                  isEditor={isEditor}
                  multiline 
                />
              </div>
            </div>

            {/* Quick Contact Links */}
            <div className="flex gap-2 sm:pb-2 pt-2 sm:pt-6">
              <a href={`mailto:${contactContent?.email || ''}`} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-600 dark:text-zinc-300 transition-colors" title="Email">
                <Mail size={18} />
              </a>
              <a href={contactContent?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-600 dark:text-zinc-300 transition-colors" title="LinkedIn">
                <Link size={18} />
              </a>
              <a href={contactContent?.website || '#'} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-600 dark:text-zinc-300 transition-colors" title="Website">
                <Globe size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Sticky Nav */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-slate-200 dark:border-zinc-800 overflow-x-auto no-scrollbar">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-1 sm:gap-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className={`px-4 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                    activeSection === item.toLowerCase() 
                      ? `text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400` 
                      : `text-slate-500 dark:text-zinc-400 border-transparent hover:text-slate-800 dark:hover:text-zinc-200`
                  }`}
                  style={activeSection === item.toLowerCase() ? { color: accentColor, borderColor: accentColor } : {}}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content Feed */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 flex flex-col gap-8 sm:gap-12">
        
        {/* ABOUT */}
        <section id="about" className="scroll-mt-24">
          <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white flex items-center gap-2">
            <EditableField value={aboutContent?.title || "About Me"} onChange={(v:string) => updateBlockContent('about','title',v)} isEditor={isEditor} />
          </h2>
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
              <EditableField 
                value={profile?.bio || "I'm a designer and developer with over 5 years of experience building digital products. I specialize in bridging the gap between design and engineering, ensuring that beautiful interfaces are backed by robust, scalable code."} 
                onChange={(val: string) => isEditor && setProfile({ ...profile, bio: val })} 
                isEditor={isEditor} 
                multiline
              />
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-zinc-400">
                <MapPin size={18} className="text-slate-400" />
                <EditableField value={aboutContent?.location || "San Francisco, CA"} onChange={(v:string) => updateBlockContent('about','location',v)} isEditor={isEditor} />
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-zinc-400">
                <Mail size={18} className="text-slate-400" />
                <EditableField value={contactContent?.email || "hello@example.com"} onChange={(v:string) => updateBlockContent('contact','email',v)} isEditor={isEditor} />
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              <EditableField value={skillsContent?.title || "Skills & Expertise"} onChange={(v:string) => updateBlockContent('skills','title',v)} isEditor={isEditor} />
            </h2>
            {isEditor && (
              <button onClick={addSkill} className="text-sm font-medium flex items-center gap-1 transition-colors" style={{ color: accentColor }}>
                <Plus size={16} /> Add Skill
              </button>
            )}
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800">
            <div className="flex flex-wrap gap-2.5">
              {(skillsContent?.items || ['UI/UX Design', 'React', 'TypeScript', 'Figma', 'Node.js', 'Product Strategy', 'Tailwind CSS']).map((skill: string, i: number) => (
                <div key={i} className="group relative bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors px-4 py-2 rounded-xl text-sm font-medium text-slate-700 dark:text-zinc-200 flex items-center gap-2">
                  <EditableField 
                    value={skill} 
                    onChange={(val: string) => {
                      const newSkills = [...(skillsContent.items || [])];
                      newSkills[i] = val;
                      updateBlockContent('skills', 'items', newSkills);
                    }} 
                    isEditor={isEditor} 
                  />
                  {isEditor && (
                    <button onClick={() => removeSkill(i)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              <EditableField value={getBlockContent('experience')?.title || "Work Experience"} onChange={(v:string) => updateBlockContent('experience','title',v)} isEditor={isEditor} />
            </h2>
            {isEditor && (
              <button onClick={addExperience} className="text-sm font-medium flex items-center gap-1 transition-colors" style={{ color: accentColor }}>
                <Plus size={16} /> Add Role
              </button>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            {experience?.map((exp: any, idx: number) => (
              <div key={exp.id || idx} className="group bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 relative">
                {isEditor && (
                  <button onClick={() => removeExperience(idx)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={18} />
                  </button>
                )}
                
                <div className="flex gap-4 sm:gap-6">
                  <div className="hidden sm:flex w-14 h-14 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-100 dark:border-zinc-700 items-center justify-center shrink-0">
                    <Briefcase size={24} className="text-slate-400 dark:text-zinc-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 sm:mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        <EditableField 
                          value={exp.role} 
                          onChange={(val: string) => {
                            const newE = [...experience]; newE[idx].role = val; setExperience(newE);
                          }} 
                          isEditor={isEditor} 
                        />
                      </h3>
                      <div className="text-sm font-medium text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md inline-flex self-start sm:self-auto mt-2 sm:mt-0">
                        <EditableField 
                          value={exp.start_date || '2020'} 
                          onChange={(val: string) => {
                            const newE = [...experience]; newE[idx].start_date = val; setExperience(newE);
                          }} 
                          isEditor={isEditor} 
                        />
                        <span className="mx-1">-</span>
                        <EditableField 
                          value={exp.end_date || 'Present'} 
                          onChange={(val: string) => {
                            const newE = [...experience]; newE[idx].end_date = val; setExperience(newE);
                          }} 
                          isEditor={isEditor} 
                        />
                      </div>
                    </div>
                    <div className="text-base font-semibold mb-4" style={{ color: accentColor }}>
                      <EditableField 
                        value={exp.company} 
                        onChange={(val: string) => {
                          const newE = [...experience]; newE[idx].company = val; setExperience(newE);
                        }} 
                        isEditor={isEditor} 
                      />
                    </div>
                    <div className="text-slate-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                      <EditableField 
                        value={exp.description} 
                        onChange={(val: string) => {
                          const newE = [...experience]; newE[idx].description = val; setExperience(newE);
                        }} 
                        isEditor={isEditor} 
                        multiline
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              <EditableField value={getBlockContent('projects')?.title || "Featured Projects"} onChange={(v:string) => updateBlockContent('projects','title',v)} isEditor={isEditor} />
            </h2>
            {isEditor && (
              <button onClick={addProject} className="text-sm font-medium flex items-center gap-1 transition-colors" style={{ color: accentColor }}>
                <Plus size={16} /> Add Project
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.map((proj: any, idx: number) => (
              <div key={proj.id || idx} className="group bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 overflow-hidden flex flex-col relative">
                {isEditor && (
                  <button onClick={() => removeProject(idx)} className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-zinc-900/90 shadow-sm text-slate-400 hover:text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all z-20">
                    <Trash2 size={16} />
                  </button>
                )}
                
                {/* Project Image */}
                <div className="h-48 bg-slate-100 dark:bg-zinc-800 relative overflow-hidden group/img">
                  {proj.image_url ? (
                    <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-zinc-600 gap-2">
                      <ImageIcon size={32} />
                      <span className="text-sm font-medium">No Image</span>
                    </div>
                  )}
                  {isEditor && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity p-4">
                      <input 
                        className="w-full max-w-xs bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm outline-none backdrop-blur placeholder:text-white/50 text-center"
                        value={proj.image_url || ''}
                        onChange={(e) => {
                          const newP = [...projects]; newP[idx].image_url = e.target.value; setProjects(newP);
                        }}
                        placeholder="Paste image URL..."
                      />
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    <EditableField 
                      value={proj.title} 
                      onChange={(val: string) => {
                        const newP = [...projects]; newP[idx].title = val; setProjects(newP);
                      }} 
                      isEditor={isEditor} 
                    />
                  </h3>
                  <div className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-4 flex-1 whitespace-pre-wrap">
                    <EditableField 
                      value={proj.description} 
                      onChange={(val: string) => {
                        const newP = [...projects]; newP[idx].description = val; setProjects(newP);
                      }} 
                      isEditor={isEditor} 
                      multiline
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(proj.tech_stack || []).map((t: string, tIdx: number) => (
                      <span key={tIdx} className="px-2.5 py-1 bg-slate-50 dark:bg-zinc-800 text-xs font-semibold text-slate-600 dark:text-zinc-300 rounded-md border border-slate-200 dark:border-zinc-700">
                        <EditableField
                          value={t}
                          onChange={(val: string) => {
                            const newP = [...projects];
                            const newT = [...(newP[idx].tech_stack || [])];
                            newT[tIdx] = val;
                            newP[idx].tech_stack = newT;
                            setProjects(newP);
                          }}
                          isEditor={isEditor}
                        />
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    {isEditor ? (
                      <div className="flex items-center gap-2 w-full text-sm font-medium" style={{ color: accentColor }}>
                        <ExternalLink size={16} />
                        <input 
                          className="bg-transparent border-b border-dashed border-current outline-none flex-1 placeholder:text-current/50"
                          value={proj.link || ''}
                          onChange={(e) => {
                            const newP = [...projects]; newP[idx].link = e.target.value; setProjects(newP);
                          }}
                          placeholder="Project link..."
                        />
                      </div>
                    ) : proj.link ? (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity" style={{ color: accentColor }}>
                        <ExternalLink size={16} /> View Project
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS (Side by Side on large) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          
          {/* EDUCATION */}
          <section id="education" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap size={20} style={{ color: accentColor }} />
                <EditableField value={eduContent?.title || "Education"} onChange={(v:string) => updateBlockContent('education','title',v)} isEditor={isEditor} />
              </h2>
              {isEditor && (
                <button onClick={addEducation} className="text-sm font-medium flex items-center gap-1 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200">
                  <Plus size={16} /> Add
                </button>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {(eduContent?.items || [{ degree: 'B.S. Computer Science', school: 'University of Tech', year: '2020' }]).map((item: any, idx: number) => (
                <div key={idx} className="group bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 relative">
                  {isEditor && (
                    <button onClick={() => removeEducation(idx)} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div className="font-bold text-slate-900 dark:text-white text-base">
                    <EditableField 
                      value={item.degree} 
                      onChange={(val: string) => {
                        const newItems = [...(eduContent.items || [])];
                        newItems[idx] = { ...item, degree: val };
                        updateBlockContent('education', 'items', newItems);
                      }} 
                      isEditor={isEditor} 
                    />
                  </div>
                  <div className="text-sm font-medium mt-1 text-slate-600 dark:text-zinc-300">
                    <EditableField 
                      value={item.school} 
                      onChange={(val: string) => {
                        const newItems = [...(eduContent.items || [])];
                        newItems[idx] = { ...item, school: val };
                        updateBlockContent('education', 'items', newItems);
                      }} 
                      isEditor={isEditor} 
                    />
                  </div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-zinc-500 mt-2 flex items-center gap-1.5">
                    <Calendar size={14} />
                    <EditableField 
                      value={item.year} 
                      onChange={(val: string) => {
                        const newItems = [...(eduContent.items || [])];
                        newItems[idx] = { ...item, year: val };
                        updateBlockContent('education', 'items', newItems);
                      }} 
                      isEditor={isEditor} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CERTIFICATIONS */}
          <section id="certifications" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Award size={20} style={{ color: accentColor }} />
                <EditableField value={certContent?.title || "Certifications"} onChange={(v:string) => updateBlockContent('certifications','title',v)} isEditor={isEditor} />
              </h2>
              {isEditor && (
                <button onClick={addCert} className="text-sm font-medium flex items-center gap-1 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200">
                  <Plus size={16} /> Add
                </button>
              )}
            </div>
            <div className="flex flex-col gap-4">
              {(certContent?.items || [{ name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' }]).map((item: any, idx: number) => (
                <div key={idx} className="group bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-zinc-800 relative">
                  {isEditor && (
                    <button onClick={() => removeCert(idx)} className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-all">
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div className="font-bold text-slate-900 dark:text-white text-base">
                    <EditableField 
                      value={item.name} 
                      onChange={(val: string) => {
                        const newItems = [...(certContent.items || [])];
                        newItems[idx] = { ...item, name: val };
                        updateBlockContent('certifications', 'items', newItems);
                      }} 
                      isEditor={isEditor} 
                    />
                  </div>
                  <div className="text-sm font-medium mt-1 text-slate-600 dark:text-zinc-300">
                    <EditableField 
                      value={item.issuer} 
                      onChange={(val: string) => {
                        const newItems = [...(certContent.items || [])];
                        newItems[idx] = { ...item, issuer: val };
                        updateBlockContent('certifications', 'items', newItems);
                      }} 
                      isEditor={isEditor} 
                    />
                  </div>
                  <div className="text-xs font-semibold text-slate-400 dark:text-zinc-500 mt-2 flex items-center gap-1.5">
                    <Calendar size={14} />
                    <EditableField 
                      value={item.year} 
                      onChange={(val: string) => {
                        const newItems = [...(certContent.items || [])];
                        newItems[idx] = { ...item, year: val };
                        updateBlockContent('certifications', 'items', newItems);
                      }} 
                      isEditor={isEditor} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24 mt-8">
          <div className="bg-slate-900 dark:bg-zinc-900 p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-48 h-48 rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 relative z-10">
              <EditableField value={contactContent?.title || "Let's work together"} onChange={(v:string) => updateBlockContent('contact','title',v)} isEditor={isEditor} />
            </h2>
            <p className="text-slate-300 text-base max-w-lg mx-auto mb-8 relative z-10">
              <EditableField value={contactContent?.subtitle || "I'm currently available for freelance work and new opportunities."} onChange={(v:string) => updateBlockContent('contact','subtitle',v)} isEditor={isEditor} multiline />
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <a href={`mailto:${contactContent?.email || ''}`} className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-white font-bold text-base transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-md" style={{ backgroundColor: accentColor }}>
                <Mail size={18} />
                <EditableField value={contactContent?.btn1 || "Send an Email"} onChange={(v:string) => updateBlockContent('contact','btn1',v)} isEditor={isEditor} />
              </a>
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <a href={contactContent?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-300 transition-colors">
                  <Link size={20} />
                </a>
                <a href={`tel:${contactContent?.phone || ''}`} className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-slate-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 flex items-center justify-center text-slate-300 transition-colors">
                  <Phone size={20} />
                </a>
              </div>
            </div>

            {isEditor && (
              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col gap-3 max-w-sm mx-auto relative z-10 text-left">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-20 font-medium">Phone:</span>
                  <input className="flex-1 bg-transparent border-b border-slate-700 outline-none text-white focus:border-white transition-colors" value={contactContent?.phone || ''} onChange={(e) => updateBlockContent('contact', 'phone', e.target.value)} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-20 font-medium">LinkedIn:</span>
                  <input className="flex-1 bg-transparent border-b border-slate-700 outline-none text-white focus:border-white transition-colors" value={contactContent?.linkedin || ''} onChange={(e) => updateBlockContent('contact', 'linkedin', e.target.value)} placeholder="https://linkedin.com/in/..." />
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span className="w-20 font-medium">Website:</span>
                  <input className="flex-1 bg-transparent border-b border-slate-700 outline-none text-white focus:border-white transition-colors" value={contactContent?.website || ''} onChange={(e) => updateBlockContent('contact', 'website', e.target.value)} placeholder="https://..." />
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  )
}
