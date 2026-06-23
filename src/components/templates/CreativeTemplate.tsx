'use client'

import { ArrowRight, Camera, MessageCircle, Globe, Trash2, Plus, Image as ImageIcon, ArrowUp, ArrowDown, Award, GraduationCap } from 'lucide-react'
import { EditableField } from '../editor/EditableField'
import { EditableImage } from '../editor/EditableImage'
import { EditableLink } from '../editor/EditableLink'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function CreativeTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, galleries, setGalleries, blocks, setBlocks, isEditor = false, isPreview = false }: any) {
  const accentColor = portfolio?.theme_color || '#ff4500'; // Orange/Red default
  const skills = profile?.skills || ["Brand Identity", "Art Direction", "Motion Graphics", "Typography", "Photography"];
  
  const defaultBlocks = [
    { id: 'h1', type: 'hero' },
    { id: 'a1', type: 'about' },
    { id: 's1', type: 'skills' },
    { id: 'ed1', type: 'education' },
    { id: 'e1', type: 'experience' },
    { id: 'p1', type: 'projects' },
    { id: 'c1', type: 'certifications' },
    { id: 'ct1', type: 'contact' }
  ];

  const activeBlocks = blocks && blocks.length > 0 ? blocks : defaultBlocks;

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (!setBlocks) return;
    const newBlocks = [...activeBlocks];
    if (direction === 'up' && index > 0) {
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
    } else if (direction === 'down' && index < newBlocks.length - 1) {
      [newBlocks[index + 1], newBlocks[index]] = [newBlocks[index], newBlocks[index + 1]];
    }
    setBlocks(newBlocks);
  };

  const deleteBlock = (index: number) => {
    if (!setBlocks) return;
    const newBlocks = [...activeBlocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  const renderBlockControls = (index: number, darkBg = false) => {
    if (!isEditor || !setBlocks) return null;
    return (
      <div className={`absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity z-50 ${darkBg ? 'bg-white/10 border-white/20' : 'bg-black/10 border-black/20'} backdrop-blur-md shadow-sm border rounded-lg p-1`}>
        <button onClick={() => moveBlock(index, 'up')} className={`p-1.5 ${darkBg ? 'hover:bg-white/20 text-white' : 'hover:bg-black/20 text-black'} rounded`}><ArrowUp size={14}/></button>
        <button onClick={() => moveBlock(index, 'down')} className={`p-1.5 ${darkBg ? 'hover:bg-white/20 text-white' : 'hover:bg-black/20 text-black'} rounded`}><ArrowDown size={14}/></button>
        <div className={`w-px h-4 ${darkBg ? 'bg-white/20' : 'bg-black/20'} mx-1`}></div>
        <button onClick={() => deleteBlock(index)} className={`p-1.5 ${darkBg ? 'hover:bg-red-500/20 text-white' : 'hover:bg-red-500/20 text-black'} rounded`}><Trash2 size={14}/></button>
      </div>
    );
  };

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'hero':
        return (
          <section className="px-8 md:px-16 py-20 md:py-40 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center relative group/block">
            {renderBlockControls(index, false)}
            <motion.h1 
              initial={isPreview ? false : { opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl md:text-[10rem] font-black tracking-tighter leading-[0.85] mb-12 uppercase max-w-6xl break-words hyphens-auto"
            >
              <EditableField value={profile?.headline || 'Creative Director'} onChange={(val: string) => setProfile?.({...profile, headline: val})} isEditor={isEditor} />
            </motion.h1>
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <motion.div 
                initial={isPreview ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="w-full h-4 origin-left" 
                style={{ backgroundColor: accentColor }}
              ></motion.div>
              <motion.div 
                initial={isPreview ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-2xl md:text-4xl font-bold leading-snug text-slate-800"
              >
                <EditableField value={profile?.bio || 'I craft bold, unapologetic brand identities and digital experiences.'} onChange={(val: string) => setProfile?.({...profile, bio: val})} multiline isEditor={isEditor} />
              </motion.div>
            </div>
          </section>
        );

      case 'about':
        return (
          <section id="about" className="px-8 md:px-16 py-32 bg-white relative group/block border-t-8 border-black">
            {renderBlockControls(index, false)}
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                initial={isPreview ? false : { opacity: 0, x: -50 }}
                whileInView={isPreview ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-16 text-slate-900"
              >
                <EditableField 
                  value={block.content?.title || "Story"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </motion.h2>
              <div className="text-xl md:text-3xl font-bold leading-relaxed text-slate-600 max-w-4xl">
                <EditableField value={block.content?.about || "I am a multi-disciplinary creative exploring the intersection of art, technology, and culture. My approach is rooted in conceptual thinking and meticulous execution. I believe in design that provokes, challenges, and endures."} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, about: val } } : b));
                  }
                }} multiline isEditor={isEditor} />
              </div>
            </div>
          </section>
        );

      case 'skills':
        return (
          <section className="px-8 md:px-16 py-32 bg-[#EAEAEA] relative group/block">
            {renderBlockControls(index, false)}
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                initial={isPreview ? false : { opacity: 0, y: 50 }}
                whileInView={isPreview ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-16"
              >
                <EditableField 
                  value={block.content?.title || "Capabilities"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </motion.h2>
              <EditableField 
                value={block.content?.capabilities?.join('\n') || "Brand Identity\nArt Direction\nMotion Graphics\nTypography\nPhotography"} 
                onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, capabilities: val.split('\n').filter((s: string) => s.trim() !== '') } } : b));
                  }
                }} 
                multiline 
                isEditor={isEditor} 
                renderDisplay={
                  <div className="flex flex-wrap gap-4">
                    {(block.content?.capabilities || ["Brand Identity", "Art Direction", "Motion Graphics", "Typography", "Photography"]).map((s: string, i: number) => (
                      <span key={i} className="px-6 py-4 border-2 border-black text-xl md:text-2xl font-black uppercase tracking-tight hover:bg-black hover:text-white transition-colors cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                }
              />
            </div>
          </section>
        );

      case 'education':
        const eduItems = block.content?.education || [
          { degree: 'BFA Design', school: 'School of Visual Arts', year: '2021' }
        ];
        return (
          <section id="education" className="px-8 md:px-16 py-32 bg-white relative group/block">
            {renderBlockControls(index, false)}
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                initial={isPreview ? false : { opacity: 0, x: -50 }}
                whileInView={isPreview ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-16 text-slate-900"
              >
                <EditableField 
                  value={block.content?.title || "Academic"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {eduItems.map((edu: any, i: number) => (
                  <div key={i} className="relative group/item border-4 border-black p-8 hover:bg-black hover:text-white transition-colors">
                    {isEditor && (
                      <button onClick={() => {
                        const newBlocks = [...activeBlocks];
                        const newEdu = [...eduItems];
                        newEdu.splice(i, 1);
                        newBlocks[index].content = {...newBlocks[index].content, education: newEdu};
                        setBlocks?.(newBlocks);
                      }} className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    )}
                    <GraduationCap size={48} className="mb-6 opacity-50" />
                    <h3 className="text-3xl font-black uppercase tracking-tight mb-2">
                      <EditableField value={edu.degree || 'Degree'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.education[i].degree = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </h3>
                    <p className="text-xl font-bold uppercase mb-4 opacity-80">
                      <EditableField value={edu.school || 'School'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.education[i].school = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </p>
                    <div className="inline-block px-4 py-2 bg-[#EAEAEA] text-black font-black tracking-widest uppercase">
                      <EditableField value={edu.year || 'YYYY'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.education[i].year = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </div>
                  </div>
                ))}
              </div>
              {isEditor && (
                <button onClick={() => {
                  const newBlocks = [...activeBlocks];
                  const newEdu = [...eduItems, { degree: 'Degree', school: 'School', year: 'YYYY' }];
                  newBlocks[index].content = {...newBlocks[index].content, education: newEdu};
                  setBlocks?.(newBlocks);
                }} className="mt-12 py-6 border-4 border-dashed border-black text-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-4 font-black uppercase tracking-widest text-xl w-full md:w-auto md:px-12">
                  <Plus size={24} /> Add Education
                </button>
              )}
            </div>
          </section>
        );

      case 'experience':
        return (
          <section id="experience" className="px-8 md:px-16 py-32 bg-slate-950 text-white relative group/block">
            {renderBlockControls(index, true)}
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                initial={isPreview ? false : { opacity: 0, y: 50 }}
                whileInView={isPreview ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-24"
              >
                <EditableField 
                  value={block.content?.title || "Chronicle"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </motion.h2>
              <div className="flex flex-col gap-20 border-l-4 border-slate-800 pl-8 md:pl-16">
                {experience && experience.length > 0 ? experience.map((e: any, i: number) => (
                  <div key={i} className="group cursor-default relative">
                    {isEditor && (
                      <button onClick={() => {
                        const newE = [...experience]; newE.splice(i, 1); setExperience?.(newE);
                      }} className="absolute -top-4 right-0 z-10 p-2 bg-slate-800 text-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    )}
                    <div className="absolute -left-[38px] md:-left-[70px] top-2 w-6 h-6 bg-slate-950 border-4 border-slate-800 rounded-full group-hover:border-white transition-colors"></div>
                    
                    <p className="text-xl md:text-2xl font-black tracking-widest text-slate-600 mb-4 uppercase flex items-center gap-2">
                      <EditableField value={e.start_date || 'YYYY'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].start_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                      {' '}—{' '}
                      <EditableField value={e.end_date || 'Present'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].end_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                    </p>
                    <h3 className="text-4xl md:text-5xl font-black mb-2 uppercase group-hover:text-white transition-colors tracking-tighter" style={{ color: accentColor }}>
                      <EditableField value={e.role || 'Role'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].role = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                    </h3>
                    <p className="text-2xl font-bold text-slate-400 mb-6 uppercase">
                      <EditableField value={e.company || 'Company'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].company = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                    </p>
                    <div className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-3xl">
                      <EditableField value={e.description || 'Description'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].description = val; setExperience?.(newE);
                      }} multiline isEditor={isEditor} />
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500 text-2xl font-black uppercase">No experience added.</p>
                )}
                {isEditor && (
                  <button onClick={() => setExperience?.([...(experience||[]), { id: crypto.randomUUID(), role: 'New Role', company: 'Company', start_date: '2024', end_date: 'Present', description: 'Description' }])} className="py-8 border-4 border-dashed border-slate-800 text-slate-600 hover:text-white hover:border-white transition-colors flex items-center justify-center gap-4 font-black uppercase tracking-widest text-xl">
                    <Plus size={24} /> Add Experience
                  </button>
                )}
              </div>
            </div>
          </section>
        );

      case 'projects':
        return (
          <section id="work" className="py-32 bg-black text-white relative group/block overflow-hidden">
            {renderBlockControls(index, true)}
            <div className="px-8 md:px-16 max-w-7xl mx-auto mb-20">
              <motion.h2 
                initial={isPreview ? false : { opacity: 0, x: -50 }}
                whileInView={isPreview ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black tracking-tighter uppercase"
                style={{ color: accentColor }}
              >
                <EditableField 
                  value={block.content?.title || "Selected Work"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </motion.h2>
            </div>
            
            {/* Horizontal Scroll Area */}
            <div className="flex overflow-x-auto pb-16 px-8 md:px-16 snap-x snap-mandatory hide-scrollbar gap-8">
              {projects && projects.length > 0 ? projects.map((p: any, i: number) => (
                <div 
                  key={i} 
                  className="snap-center shrink-0 w-[85vw] md:w-[60vw] group relative"
                >
                  {isEditor && (
                    <button onClick={() => {
                      const newP = [...projects]; newP.splice(i, 1); setProjects?.(newP);
                    }} className="absolute top-4 right-4 z-20 p-3 bg-red-500/80 text-white hover:bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={20} />
                    </button>
                  )}
                  <div className="aspect-[16/10] bg-zinc-900 mb-8 overflow-hidden relative rounded-sm">
                    <EditableImage 
                      src={p.image_url || `https://images.unsplash.com/photo-${i % 2 === 0 ? '1618005182384-a83a8bd57fbe' : '1558655146-d49347a942ea'}?q=80&w=1200&auto=format&fit=crop`}
                      alt={p.title}
                      onChange={(val: any) => {
                        if(isEditor && setProjects) {
                          const newP = [...projects];
                          newP[i].image_url = val.src;
                          setProjects(newP);
                        }
                      }}
                      isEditor={isEditor}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-700 pointer-events-none"></div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                    <div className="flex-1">
                      <h3 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
                        <EditableField value={p.title || 'Project Title'} onChange={(val: string) => {
                          const newP = [...projects]; newP[i].title = val; setProjects?.(newP);
                        }} isEditor={isEditor} />
                      </h3>
                      <div className="text-zinc-400 text-lg md:text-xl max-w-xl">
                        <EditableField value={p.description || 'Description'} onChange={(val: string) => {
                          const newP = [...projects]; newP[i].description = val; setProjects?.(newP);
                        }} multiline isEditor={isEditor} />
                      </div>
                    </div>
                    <div className="shrink-0 flex gap-4 text-sm font-black uppercase tracking-widest text-zinc-500">
                      <EditableField
                        value={p.tech_stack?.join(', ') || ''}
                        onChange={(val: string) => {
                          const newP = [...projects]; newP[i].tech_stack = val.split(',').map(s=>s.trim()).filter(Boolean); setProjects?.(newP);
                        }}
                        isEditor={isEditor}
                        renderDisplay={
                          <>{p.tech_stack?.slice(0,3).join(' • ')}</>
                        }
                      />
                    </div>
                  </div>
                </div>
              )) : (
                <div className="w-full text-center py-24 text-zinc-600 font-black tracking-widest uppercase">
                  No projects added yet.
                </div>
              )}
              
              {isEditor && (
                <div className="shrink-0 w-[85vw] md:w-[60vw] snap-center flex items-center justify-center p-8">
                  <button onClick={() => setProjects?.([...(projects||[]), { id: crypto.randomUUID(), title: 'New Project', description: 'Description here', tech_stack: [] }])} className="w-full h-full min-h-[50vh] border-4 border-dashed border-zinc-800 rounded-sm text-zinc-600 hover:text-white hover:border-zinc-500 transition-all flex flex-col items-center justify-center gap-6 font-black uppercase tracking-widest text-2xl">
                    <Plus size={48} /> Add Project
                  </button>
                </div>
              )}
            </div>
          </section>
        );

      case 'gallery':
        return (
          <section id="gallery" className="px-8 md:px-16 py-32 bg-[#EAEAEA] relative group/block border-y-8 border-black">
            {renderBlockControls(index, false)}
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                initial={isPreview ? false : { opacity: 0, x: -50 }}
                whileInView={isPreview ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-24 opacity-10 text-slate-800"
              >
                <EditableField 
                  value={block.content?.title || "Moodboard"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </motion.h2>

              {(galleries && galleries.length > 0) || isEditor ? (
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                  {galleries && galleries.length > 0 && galleries.map((g: any, i: number) => (
                    <motion.div 
                      initial={isPreview ? false : { opacity: 0, y: 50 }}
                      whileInView={isPreview ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: (i % 3) * 0.1 }}
                      key={i} 
                      className="group relative overflow-hidden bg-white break-inside-avoid border-4 border-transparent hover:border-black transition-colors rounded-xl"
                    >
                      {isEditor && (
                        <button onClick={() => {
                          const newG = [...galleries]; newG.splice(i, 1); setGalleries?.(newG);
                        }} className="absolute top-4 right-4 z-20 p-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-lg">
                          <Trash2 size={16} />
                        </button>
                      )}
                      <EditableImage 
                        src={g.url} 
                        alt={g.caption || 'Gallery Image'} 
                        onChange={(val: any) => { const newG = [...galleries]; newG[i].url = val.src; newG[i].caption = val.alt; setGalleries?.(newG); }}
                        isEditor={isEditor} 
                        className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-8 text-center pointer-events-none">
                        <p className="text-white font-black text-2xl uppercase tracking-tighter">
                          <EditableField value={g.caption || 'Visual Asset'} onChange={(val: string) => {
                            const newG = [...galleries]; newG[i].caption = val; setGalleries?.(newG);
                          }} isEditor={isEditor} />
                        </p>
                      </div>
                    </motion.div>
                  ))}
                  {isEditor && (
                    <div className="aspect-[3/4] bg-white border-4 border-dashed border-slate-300 hover:border-slate-800 transition-all flex flex-col items-center justify-center p-8 text-center group break-inside-avoid">
                      <div className="text-slate-300 group-hover:text-black transition-colors mb-6">
                        <ImageIcon size={48} />
                      </div>
                      <h3 className="font-black text-2xl text-slate-900 mb-3 uppercase tracking-tight">Add Visual</h3>
                      <div className="w-full text-sm font-medium text-slate-500 relative z-10" onClick={(e) => e.stopPropagation()}>
                        <EditableField 
                          value="" 
                          onChange={(val: string) => {
                            if (val && val.trim() !== '') {
                              setGalleries?.([...(galleries||[]), { url: val, caption: 'NEW VISUAL' }]);
                            }
                          }} 
                          isEditor={isEditor} 
                        />
                        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-slate-400">Paste URL</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xl font-bold text-slate-400 uppercase tracking-widest">Nothing to show.</p>
              )}
            </div>
          </section>
        );

      case 'certifications':
        const certItems = block.content?.certifications || [
          { name: 'Awwwards Jury Member', issuer: 'Awwwards', year: '2024' }
        ];
        return (
          <section id="certifications" className="px-8 md:px-16 py-32 bg-white relative group/block">
            {renderBlockControls(index, false)}
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                initial={isPreview ? false : { opacity: 0, x: -50 }}
                whileInView={isPreview ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-16 text-slate-900"
              >
                <EditableField 
                  value={block.content?.title || "Recognition"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certItems.map((cert: any, i: number) => (
                  <div key={i} className="relative group/item p-8 border-4 border-black hover:bg-black hover:text-white transition-colors flex flex-col justify-between min-h-[250px]">
                    {isEditor && (
                      <button onClick={() => {
                        const newBlocks = [...activeBlocks];
                        const newCerts = [...certItems];
                        newCerts.splice(i, 1);
                        newBlocks[index].content = {...newBlocks[index].content, certifications: newCerts};
                        setBlocks?.(newBlocks);
                      }} className="absolute top-4 right-4 z-10 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    )}
                    <div>
                      <Award size={48} className="mb-6 opacity-50" />
                      <h3 className="text-2xl font-black uppercase tracking-tight mb-2 leading-tight">
                        <EditableField value={cert.name || 'Recognition Name'} onChange={(val: string) => {
                          if(isEditor && setBlocks) {
                            const newBlocks = [...activeBlocks];
                            newBlocks[index].content.certifications[i].name = val;
                            setBlocks(newBlocks);
                          }
                        }} isEditor={isEditor} />
                      </h3>
                      <p className="font-bold uppercase opacity-80">
                        <EditableField value={cert.issuer || 'Organization'} onChange={(val: string) => {
                          if(isEditor && setBlocks) {
                            const newBlocks = [...activeBlocks];
                            newBlocks[index].content.certifications[i].issuer = val;
                            setBlocks(newBlocks);
                          }
                        }} isEditor={isEditor} />
                      </p>
                    </div>
                    <div className="mt-8 text-4xl font-black opacity-20 group-hover:opacity-40 transition-opacity" style={{ color: accentColor }}>
                      <EditableField value={cert.year || 'YYYY'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.certifications[i].year = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </div>
                  </div>
                ))}
              </div>
              {isEditor && (
                <button onClick={() => {
                  const newBlocks = [...activeBlocks];
                  const newCerts = [...certItems, { name: 'New Award', issuer: 'Organization', year: 'YYYY' }];
                  newBlocks[index].content = {...newBlocks[index].content, certifications: newCerts};
                  setBlocks?.(newBlocks);
                }} className="mt-12 py-6 border-4 border-dashed border-black text-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-4 font-black uppercase tracking-widest text-xl w-full md:w-auto md:px-12">
                  <Plus size={24} /> Add Recognition
                </button>
              )}
            </div>
          </section>
        );

      case 'contact':
        return (
          <section id="contact" className="px-8 md:px-16 py-32 bg-black text-white relative group/block border-t-8 border-[#EAEAEA]">
            {renderBlockControls(index, true)}
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                initial={isPreview ? false : { opacity: 0, y: 50 }}
                whileInView={isPreview ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-6xl md:text-9xl font-black tracking-tighter uppercase mb-12"
              >
                <EditableField value={block.content?.title || "Let's Talk"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} />
              </motion.h2>
              
              
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                {(!isEditor && !block.content?.email) ? null : (
                  <div className={`flex items-center gap-2 ${!block.content?.email && isEditor ? 'opacity-30' : ''}`}>
                    <EditableLink 
                      value={block.content?.email || "Email"} 
                      href={block.content?.email ? `mailto:${block.content.email}` : "#"} 
                      onChange={(val: any) => {
                        if(isEditor && setBlocks) {
                          setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, email: val.value } } : b));
                        }
                      }} 
                      className="text-lg hover:opacity-70 transition-opacity" 
                      isEditor={isEditor} 
                    />
                  </div>
                )}
                {(!isEditor && !block.content?.phone) ? null : (
                  <div className={`flex items-center gap-2 ${!block.content?.phone && isEditor ? 'opacity-30' : ''}`}>
                    <EditableLink 
                      value={block.content?.phone || "Phone"} 
                      href={block.content?.phone ? `tel:${block.content.phone}` : "#"} 
                      onChange={(val: any) => {
                        if(isEditor && setBlocks) {
                          setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, phone: val.value } } : b));
                        }
                      }} 
                      className="text-lg hover:opacity-70 transition-opacity" 
                      isEditor={isEditor} 
                    />
                  </div>
                )}
                {(!isEditor && !block.content?.website) ? null : (
                  <div className={`flex items-center gap-2 ${!block.content?.website && isEditor ? 'opacity-30' : ''}`}>
                    <EditableLink 
                      value={block.content?.website || "Website"} 
                      href={block.content?.website || "#"} 
                      onChange={(val: any) => {
                        if(isEditor && setBlocks) {
                          setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, website: val.value } } : b));
                        }
                      }} 
                      className="text-lg hover:opacity-70 transition-opacity" 
                      isEditor={isEditor} 
                    />
                  </div>
                )}
                {(!isEditor && !block.content?.linkedin) ? null : (
                  <div className={`flex items-center gap-2 ${!block.content?.linkedin && isEditor ? 'opacity-30' : ''}`}>
                    <EditableLink 
                      value={block.content?.linkedin || "LinkedIn"} 
                      href={block.content?.linkedin || "#"} 
                      onChange={(val: any) => {
                        if(isEditor && setBlocks) {
                          setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, linkedin: val.value } } : b));
                        }
                      }} 
                      className="text-lg hover:opacity-70 transition-opacity" 
                      isEditor={isEditor} 
                    />
                  </div>
                )}
                {(!isEditor && !block.content?.twitter) ? null : (
                  <div className={`flex items-center gap-2 ${!block.content?.twitter && isEditor ? 'opacity-30' : ''}`}>
                    <EditableLink 
                      value={block.content?.twitter || "Twitter"} 
                      href={block.content?.twitter || "#"} 
                      onChange={(val: any) => {
                        if(isEditor && setBlocks) {
                          setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, twitter: val.value } } : b));
                        }
                      }} 
                      className="text-lg hover:opacity-70 transition-opacity" 
                      isEditor={isEditor} 
                    />
                  </div>
                )}
                {(!isEditor && !block.content?.instagram) ? null : (
                  <div className={`flex items-center gap-2 ${!block.content?.instagram && isEditor ? 'opacity-30' : ''}`}>
                    <EditableLink 
                      value={block.content?.instagram || "Instagram"} 
                      href={block.content?.instagram || "#"} 
                      onChange={(val: any) => {
                        if(isEditor && setBlocks) {
                          setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, instagram: val.value } } : b));
                        }
                      }} 
                      className="text-lg hover:opacity-70 transition-opacity" 
                      isEditor={isEditor} 
                    />
                  </div>
                )}
              </div>

            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-white text-slate-900 overflow-x-hidden`} style={{ fontFamily: portfolio?.font || 'Manrope, sans-serif' }}>
      
      <motion.nav 
        initial={isPreview ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="p-8 md:px-16 flex justify-between items-center relative z-50 mix-blend-difference text-white"
      >
        <div className="font-black text-2xl tracking-tighter uppercase">
          <EditableField value={profile?.full_name || 'ALEX CHEN'} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />
        </div>
        <div className="flex gap-8 text-sm font-bold tracking-widest uppercase">
          <a href="#work" className="hover:opacity-60 transition-opacity">Work</a>
          <a href="#gallery" className="hover:opacity-60 transition-opacity">Gallery</a>
        </div>
      </motion.nav>

      <main className="relative z-10">
        {activeBlocks.map((block: any, index: number) => (
          <div key={block.id || index}>
            {renderBlock(block, index)}
          </div>
        ))}

        {isEditor && setBlocks && (
          <div className="py-32 flex justify-center bg-[#EAEAEA]">
             <button 
               onClick={() => {
                 setBlocks([...activeBlocks, { id: crypto.randomUUID(), type: 'projects', content: {} }]);
               }}
               className="flex items-center gap-3 px-12 py-6 bg-black text-white hover:bg-slate-900 transition-colors font-black tracking-widest uppercase text-xl shadow-2xl"
             >
               <Plus size={24} /> Add Block
             </button>
          </div>
        )}
      </main>
      
      <footer className="bg-black text-slate-600 py-12 px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-4 font-bold tracking-widest uppercase text-sm border-t border-slate-900">
        <div className="text-white">
          <EditableField value={profile?.full_name || "ALEX CHEN"} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />
        </div>
        <div>© {new Date().getFullYear()}</div>
      </footer>
    </div>
  );
}
