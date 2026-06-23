'use client'

import { Pencil, ArrowUp, ArrowDown, Trash2, Plus, ArrowRight } from 'lucide-react'
import { EditableField } from '../editor/EditableField'
import { EditableLink } from '../editor/EditableLink'
import { EditableImage } from '../editor/EditableImage'
import { motion } from 'framer-motion'

export function MinimalTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, galleries, setGalleries, blocks, setBlocks, isEditor = false, isPreview = false }: any) {
  const skills = profile?.skills || ["Strategy", "Interface Design", "Prototyping", "Art Direction", "Interaction"];

  const defaultBlocks = [
    { id: 'h1', type: 'hero' },
    { id: 'a1', type: 'about' },
    { id: 'p1', type: 'projects' },
    { id: 'e1', type: 'experience' },
    { id: 's1', type: 'skills' },
    { id: 'c1', type: 'contact' }
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

  const renderBlockControls = (index: number) => {
    if (!isEditor || !setBlocks) return null;
    return (
      <div className="absolute top-0 right-0 flex items-center gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity z-50 bg-white/90 backdrop-blur shadow-sm border border-gray-100 rounded-lg p-1">
        <button onClick={() => moveBlock(index, 'up')} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><ArrowUp size={14}/></button>
        <button onClick={() => moveBlock(index, 'down')} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><ArrowDown size={14}/></button>
        <div className="w-px h-4 bg-gray-200 mx-1"></div>
        <button onClick={() => deleteBlock(index)} className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded text-gray-500"><Trash2 size={14}/></button>
      </div>
    );
  };

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'hero':
        return (
          <motion.section 
            initial={isPreview ? false : { y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="pt-24 md:pt-32 pb-24 md:pb-40 relative group/block"
          >
            {renderBlockControls(index)}
            <div className="max-w-3xl">
              <p className="text-sm tracking-[0.15em] text-gray-400 uppercase mb-12">
                <EditableField value={profile?.full_name || 'Alex Chen'} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />
              </p>
              <h1 className="text-5xl md:text-7xl font-light tracking-tight leading-[1.05] text-[#111] mb-12">
                <EditableField value={profile?.headline || 'Designing clarity from complexity.'} onChange={(val: string) => setProfile?.({...profile, headline: val})} multiline isEditor={isEditor} />
              </h1>
              <div className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed max-w-2xl">
                <EditableField value={profile?.bio || 'Independent designer focused on digital products and minimal interfaces.'} onChange={(val: string) => setProfile?.({...profile, bio: val})} multiline isEditor={isEditor} />
              </div>
            </div>
          </motion.section>
        );
      
      case 'about':
        return (
          <section id="about" className="py-16 md:py-24 relative group/block border-t border-gray-100/50">
            {renderBlockControls(index)}
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-widest text-gray-400"><EditableField value={block.content?.title || "About"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></p>
              </div>
              <div className="md:col-span-8">
                <div className="text-xl text-gray-700 font-light leading-relaxed mb-16 max-w-2xl">
                  <EditableField value={block.content?.text || 'With over a decade of experience in digital design, I focus on stripping away the unnecessary to reveal the essential.'} onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, text: val } } : b));
                    }
                  }} multiline isEditor={isEditor} />
                </div>
                <div className="w-full aspect-[21/9] bg-gray-100 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                   <EditableImage 
                    src={profile?.avatar_url || "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1200&h=500&fit=crop&auto=format"} 
                    alt="Studio" 
                    onChange={(val: any) => setProfile?.({...profile, avatar_url: val.src})} 
                    isEditor={isEditor} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        );

      case 'projects':
        return (
          <motion.section 
            initial={isPreview ? false : { y: 20, opacity: 0 }}
            whileInView={isPreview ? undefined : { y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            id="projects" 
            className="py-16 md:py-32 relative group/block"
          >
            {renderBlockControls(index)}
            <div className="grid md:grid-cols-12 gap-12 mb-16">
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-widest text-gray-400"><EditableField value={block.content?.title || "Selected Work"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></p>
              </div>
            </div>
            
            <div className="flex flex-col border-t border-gray-200 overflow-hidden">
              {projects && projects.length > 0 ? projects.map((p: any, i: number) => (
                <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between py-10 border-b border-gray-200 hover:px-6 hover:-mx-6 transition-all duration-500 cursor-pointer relative bg-white">
                  {isEditor && (
                    <button onClick={(e) => {
                      e.stopPropagation();
                      const newP = [...projects]; newP.splice(i, 1); setProjects?.(newP);
                    }} className="absolute top-1/2 -translate-y-1/2 right-4 z-20 p-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={16} />
                    </button>
                  )}
                  <div className="flex-1">
                    <h3 className="text-3xl font-light text-[#111] group-hover:text-gray-500 transition-colors">
                      <EditableField value={p.title || 'Project Title'} onChange={(val: string) => {
                        const newP = [...projects]; newP[i].title = val; setProjects?.(newP);
                      }} isEditor={isEditor} />
                    </h3>
                  </div>
                  <div className="md:w-1/3 flex items-center justify-between mt-4 md:mt-0">
                    <p className="text-gray-400 text-lg font-light">
                      <EditableField value={p.description || 'Description'} onChange={(val: string) => {
                        const newP = [...projects]; newP[i].description = val; setProjects?.(newP);
                      }} isEditor={isEditor} />
                    </p>
                    <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-gray-400" strokeWidth={1} />
                  </div>
                </div>
              )) : (
                <p className="text-sm font-light text-gray-400 py-10">No projects added yet.</p>
              )}
              {isEditor && (
                <button onClick={() => setProjects?.([...(projects||[]), { id: crypto.randomUUID(), title: 'New Project', description: 'Web Application', tech_stack: [] }])} className="w-full py-10 text-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-2 font-light tracking-wide border-b border-gray-200">
                  <Plus size={16} strokeWidth={1} /> Add Project
                </button>
              )}
            </div>
          </motion.section>
        );

      case 'gallery':
        return null; // Minimal template skips loud masonry galleries to maintain whitespace.

      case 'experience':
        return (
          <section id="experience" className="py-16 md:py-24 relative group/block">
            {renderBlockControls(index)}
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-widest text-gray-400"><EditableField value={block.content?.title || "Experience"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></p>
              </div>
              <div className="md:col-span-8 flex flex-col gap-16">
                {experience && experience.length > 0 ? experience.map((e: any, i: number) => (
                  <div key={i} className="relative group flex flex-col gap-2">
                    {isEditor && (
                      <button onClick={() => {
                        const newE = [...experience]; newE.splice(i, 1); setExperience?.(newE);
                      }} className="absolute -left-12 top-0 z-10 p-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    )}
                    <p className="text-sm tracking-widest text-gray-400 uppercase">
                      <EditableField value={e.start_date || 'YYYY'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].start_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                      {' '}-{' '}
                      <EditableField value={e.end_date || 'Present'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].end_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                    </p>
                    <h4 className="text-2xl font-light text-[#111]">
                      <EditableField value={e.role || 'Role'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].role = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                      {' '},{' '}
                      <span className="text-gray-400">
                        <EditableField value={e.company || 'Company'} onChange={(val: string) => {
                          const newE = [...experience]; newE[i].company = val; setExperience?.(newE);
                        }} isEditor={isEditor} />
                      </span>
                    </h4>
                  </div>
                )) : (
                  <p className="text-sm text-gray-400 font-light">No experience added yet.</p>
                )}
                {isEditor && (
                  <button onClick={() => setExperience?.([...(experience||[]), { id: crypto.randomUUID(), role: 'Role', company: 'Company', start_date: '2024', end_date: 'Present' }])} className="w-max text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2 text-sm">
                    <Plus size={14} strokeWidth={1} /> Add Experience
                  </button>
                )}
              </div>
            </div>
          </section>
        );

      case 'skills':
        return (
          <section className="py-16 md:py-24 relative group/block">
            {renderBlockControls(index)}
            <div className="grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <p className="text-xs uppercase tracking-widest text-gray-400"><EditableField value={block.content?.title || "Expertise"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></p>
              </div>
              <div className="md:col-span-8">
                <EditableField 
                  value={block.content?.skills?.join('\n') || "Strategy\nInterface Design\nPrototyping\nArt Direction\nInteraction"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, skills: val.split('\n').filter((s: string) => s.trim() !== '') } } : b));
                    }
                  }} 
                  multiline 
                  isEditor={isEditor} 
                  renderDisplay={
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {(block.content?.skills || ["Strategy", "Interface Design", "Prototyping", "Art Direction", "Interaction"]).map((s: string) => (
                        <span key={s} className="text-lg font-light text-gray-500 hover:text-[#111] transition-colors cursor-default">
                          {s}
                        </span>
                      ))}
                    </div>
                  }
                />
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section id="contact" className="py-16 md:py-32 relative group/block border-t border-gray-100">
            {renderBlockControls(index)}
            <div className="flex flex-col items-center text-center">
              <p className="text-xs uppercase tracking-widest text-gray-400 mb-12"><EditableField value={block.content?.title || "Inquiries"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></p>
              <h2 className="text-4xl md:text-5xl font-light mb-16 text-[#111]">
                <EditableField value={block.content?.subtitle || "Available for new opportunities."} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, subtitle: val } } : b));
                  }
                }} isEditor={isEditor} />
              </h2>
              
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
    <div className={`min-h-screen bg-white text-gray-900 selection:bg-gray-200`} style={{ fontFamily: portfolio?.font || 'Inter, sans-serif' }}>
      <main className="max-w-6xl mx-auto px-8 md:px-12 pt-12">
        {activeBlocks.map((block: any, index: number) => (
          <div key={block.id || index}>
            {renderBlock(block, index)}
          </div>
        ))}

        {isEditor && setBlocks && (
          <div className="py-24 flex justify-center">
             <button 
               onClick={() => {
                 setBlocks([...activeBlocks, { id: crypto.randomUUID(), type: 'about', content: {} }]);
               }}
               className="flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-full transition-colors text-sm font-light tracking-wide"
             >
               <Plus size={16} strokeWidth={1} /> Add Section
             </button>
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-gray-100 mt-24">
        <div className="max-w-5xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm font-medium text-gray-900">
            <EditableField value={profile?.full_name || "Alex Chen"} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />
          </p>
          <p className="text-sm font-light text-gray-500">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
