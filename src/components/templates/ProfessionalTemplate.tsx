'use client'

import { Mail, Briefcase, Globe, MapPin, ChevronRight, Trash2, Plus, Image as ImageIcon, ArrowUp, ArrowDown, CheckCircle2, MessageSquare } from 'lucide-react'
import { EditableField } from '../editor/EditableField'
import { EditableImage } from '../editor/EditableImage'
import { EditableLink } from '../editor/EditableLink'
import { motion } from 'framer-motion'

export function ProfessionalTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, galleries, setGalleries, blocks, setBlocks, isEditor = false, isPreview = false }: any) {
  const accentColor = portfolio?.theme_color || '#2563eb'; // Blue-600 default
  const skills = profile?.skills || ["Strategic Planning", "Team Leadership", "Product Management", "Financial Modeling", "Agile Methodologies", "Stakeholder Management", "Data Analysis", "Go-to-Market Strategy"];
  
  const defaultBlocks = [
    { id: 'h1', type: 'hero' },
    { id: 't1', type: 'trust' },
    { id: 's1', type: 'services' },
    { id: 'p1', type: 'projects' },
    { id: 'e1', type: 'experience' },
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
      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity z-50 bg-white/90 backdrop-blur shadow-sm border border-slate-200 rounded-lg p-1">
        <button onClick={() => moveBlock(index, 'up')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ArrowUp size={14}/></button>
        <button onClick={() => moveBlock(index, 'down')} className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><ArrowDown size={14}/></button>
        <div className="w-px h-4 bg-slate-200 mx-1"></div>
        <button onClick={() => deleteBlock(index)} className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded text-slate-600"><Trash2 size={14}/></button>
      </div>
    );
  };

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'hero':
        return (
          <section className="relative group/block py-24 md:py-32">
            {renderBlockControls(index)}
            <div className="max-w-4xl mx-auto px-6">
              <motion.div 
                initial={isPreview ? false : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-lg">
                    {/* Placeholder for Profile Photo */}
                    <div className="w-full h-full bg-gradient-to-tr from-slate-300 to-slate-100 flex items-center justify-center text-slate-400">
                      <ImageIcon size={24} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Available for work</div>
                    <div className="text-sm font-medium flex items-center gap-2" style={{ color: accentColor }}>
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }}></span>
                      Accepting new clients
                    </div>
                  </div>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]">
                  <span className="text-slate-400 block mb-2 text-4xl md:text-5xl">Hi, I'm <EditableField value={profile?.full_name || "Alex"} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />.</span>
                  <EditableField value={profile?.headline || 'I help ambitious companies build better products.'} onChange={(val: string) => setProfile?.({...profile, headline: val})} multiline isEditor={isEditor} />
                </h1>

                <div className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mb-12 font-medium">
                  <EditableField value={profile?.bio || 'With over a decade of experience in product management and strategy, I partner with founders to turn complex problems into elegant solutions.'} onChange={(val: string) => setProfile?.({...profile, bio: val})} multiline isEditor={isEditor} />
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a href="#contact" className="px-8 py-4 rounded-full text-white font-semibold transition-transform hover:scale-105 shadow-lg shadow-blue-500/20" style={{ backgroundColor: accentColor }}>
                    Book a Consultation
                  </a>
                  <a href="#work" className="px-8 py-4 rounded-full text-slate-700 bg-slate-100 font-semibold hover:bg-slate-200 transition-colors">
                    View Case Studies
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        );

      case 'trust':
        return (
          <section className="relative group/block py-16 border-y border-slate-200 bg-slate-50/50">
            {renderBlockControls(index)}
            <div className="max-w-6xl mx-auto px-6 text-center">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Trusted by innovative teams worldwide</p>
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
                <div className="text-xl font-bold text-slate-800 flex items-center gap-2"><Globe size={24}/> Acme Corp</div>
                <div className="text-xl font-bold text-slate-800 flex items-center gap-2"><Briefcase size={24}/> TechFlow</div>
                <div className="text-xl font-bold text-slate-800 flex items-center gap-2"><MessageSquare size={24}/> Nexus</div>
                <div className="text-xl font-bold text-slate-800 flex items-center gap-2"><MapPin size={24}/> GlobalScale</div>
              </div>
            </div>
          </section>
        );

      case 'services':
        return (
          <section className="relative group/block py-24 md:py-32">
            {renderBlockControls(index)}
            <div className="max-w-6xl mx-auto px-6">
              <div className="mb-16 md:mb-24">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6"><EditableField value={block.content?.title || "How I can help"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
                <p className="text-xl text-slate-600 max-w-2xl">Tailored solutions designed to accelerate your growth and streamline your operations.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: "Product Strategy", desc: "Comprehensive roadmapping and market analysis to ensure your product hits the mark." },
                  { title: "UX Consulting", desc: "Deep-dive audits of your user journey to identify friction points and boost conversion." },
                  { title: "Team Augmentation", desc: "Embedded leadership to guide your engineering and design teams through critical sprints." }
                ].map((s, i) => (
                  <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-slate-300 transition-colors">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white shadow-sm" style={{ backgroundColor: accentColor }}>
                      <CheckCircle2 size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'projects':
        return (
          <section id="work" className="relative group/block py-24 md:py-32 bg-slate-50 border-y border-slate-200 scroll-mt-20">
            {renderBlockControls(index)}
            <div className="max-w-6xl mx-auto px-6">
              <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6"><EditableField value={block.content?.title || "Featured Case Studies"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
                  <p className="text-xl text-slate-600 max-w-2xl">A selection of recent partnerships and the results we achieved together.</p>
                </div>
              </div>

              <div className="flex flex-col gap-12">
                {projects && projects.length > 0 ? projects.map((p: any, i: number) => (
                  <div key={i} className="group bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 relative">
                    {isEditor && (
                      <button onClick={() => {
                        const newP = [...projects]; newP.splice(i, 1); setProjects?.(newP);
                      }} className="absolute top-4 right-4 z-10 p-2 bg-red-50 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    )}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-6">
                          <EditableField
                            value={p.tech_stack?.join(', ') || ''}
                            onChange={(val: string) => {
                              const newP = [...projects]; newP[i].tech_stack = val.split(',').map(s=>s.trim()).filter(Boolean); setProjects?.(newP);
                            }}
                            isEditor={isEditor}
                            renderDisplay={
                              <>
                                {p.tech_stack?.slice(0,3).map((t: string, j: number) => (
                                  <span key={j} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm font-semibold rounded-full">
                                    {t}
                                  </span>
                                ))}
                              </>
                            }
                          />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                          <EditableField value={p.title || 'Project Title'} onChange={(val: string) => {
                            const newP = [...projects]; newP[i].title = val; setProjects?.(newP);
                          }} isEditor={isEditor} />
                        </h3>
                        <div className="text-lg text-slate-600 leading-relaxed mb-8">
                          <EditableField value={p.description || 'Description'} onChange={(val: string) => {
                            const newP = [...projects]; newP[i].description = val; setProjects?.(newP);
                          }} multiline isEditor={isEditor} />
                        </div>
                        <EditableLink 
                          value="Read Case Study" 
                          href={p.link || '#'} 
                          onChange={(val: any) => { const newP = [...projects]; newP[i].link = val.href; setProjects?.(newP); }}
                          className="inline-flex items-center gap-2 font-semibold text-lg hover:gap-3 transition-all"
                          style={{ color: accentColor }}
                          isEditor={isEditor} 
                        >
                          <ChevronRight size={20} />
                        </EditableLink>
                      </div>
                      <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                           <ImageIcon size={48} className="opacity-20" />
                        </div>
                        {/* If they had image in project, it would go here */}
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-lg text-slate-500">No case studies listed.</p>
                )}
                {isEditor && (
                  <button onClick={() => setProjects?.([...(projects||[]), { id: crypto.randomUUID(), title: 'New Case Study', description: 'Description here', tech_stack: ['Strategy', 'Design'] }])} className="w-full py-12 border-2 border-dashed border-slate-300 rounded-3xl text-slate-500 hover:text-slate-800 hover:border-slate-400 transition-colors flex flex-col items-center justify-center gap-4 font-semibold text-lg bg-white">
                    <Plus size={32} /> Add Case Study
                  </button>
                )}
              </div>
            </div>
          </section>
        );

      case 'experience':
        return (
          <section className="relative group/block py-24 md:py-32">
            {renderBlockControls(index)}
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-16"><EditableField value={block.content?.title || "Background"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
              
              <div className="flex flex-col gap-12">
                {experience && experience.length > 0 ? experience.map((e: any, i: number) => (
                  <div key={i} className="relative group flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                    {isEditor && (
                      <button onClick={() => {
                        const newE = [...experience]; newE.splice(i, 1); setExperience?.(newE);
                      }} className="absolute -top-4 right-0 z-10 p-2 bg-red-50 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    )}
                    <div className="md:w-48 shrink-0 text-slate-500 font-semibold uppercase tracking-wider text-sm pt-1">
                      <EditableField value={e.start_date || 'YYYY'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].start_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                      {' '}—{' '}
                      <EditableField value={e.end_date || 'Present'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].end_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        <EditableField value={e.role || 'Role'} onChange={(val: string) => {
                          const newE = [...experience]; newE[i].role = val; setExperience?.(newE);
                        }} isEditor={isEditor} />
                      </h3>
                      <div className="text-lg font-medium mb-4" style={{ color: accentColor }}>
                        <EditableField value={e.company || 'Company'} onChange={(val: string) => {
                          const newE = [...experience]; newE[i].company = val; setExperience?.(newE);
                        }} isEditor={isEditor} />
                      </div>
                      <div className="text-slate-600 leading-relaxed">
                        <EditableField value={e.description || 'Description'} onChange={(val: string) => {
                          const newE = [...experience]; newE[i].description = val; setExperience?.(newE);
                        }} multiline isEditor={isEditor} />
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500">No experience listed.</p>
                )}
                {isEditor && (
                  <button onClick={() => setExperience?.([...(experience||[]), { id: crypto.randomUUID(), role: 'New Role', company: 'Company', start_date: '2024', end_date: 'Present', description: 'Description' }])} className="w-full mt-8 py-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-colors flex items-center justify-center gap-2 font-semibold">
                    <Plus size={20} /> Add Experience
                  </button>
                )}
              </div>
            </div>
          </section>
        );

      case 'gallery':
        return null;

      case 'contact':
        return (
          <section id="contact" className="relative group/block py-24 md:py-32 bg-slate-900 text-white mt-12 rounded-t-[3rem] scroll-mt-20">
            {renderBlockControls(index)}
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8"><EditableField value={block.content?.title || "Ready to scale?"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
              <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto mb-12">
                Let's discuss how we can partner to achieve your next milestone.
              </p>
              
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
    <div className={`min-h-screen bg-white text-slate-800 selection:bg-slate-200 selection:text-slate-900`} style={{ fontFamily: portfolio?.font || 'Inter, sans-serif' }}>
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-slate-900">
            <EditableField value={profile?.full_name?.split(' ')[0] || 'Alex'} onChange={()=>{}} isEditor={isEditor} />.
          </div>
          <div className="hidden md:flex gap-8 font-semibold text-sm text-slate-600">
            <a href="#work" className="hover:text-slate-900 transition-colors">Case Studies</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {activeBlocks.map((block: any, index: number) => (
          <div key={block.id || index}>
            {renderBlock(block, index)}
          </div>
        ))}

        {isEditor && setBlocks && (
          <div className="py-24 flex justify-center bg-slate-50">
             <button 
               onClick={() => {
                 setBlocks([...activeBlocks, { id: crypto.randomUUID(), type: 'projects', content: {} }]);
               }}
               className="flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 hover:border-slate-400 text-slate-700 rounded-full transition-all font-semibold shadow-sm hover:shadow-md"
             >
               <Plus size={20} /> Add Component
             </button>
          </div>
        )}
      </main>

      <footer className="bg-slate-50 py-12 border-t border-slate-200 text-slate-500">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-slate-900">
            <EditableField value={profile?.full_name || "Alex Chen"} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />
          </p>
          <div className="flex items-center gap-6 text-sm font-semibold">
            <a href="#work" className="hidden md:block hover:text-slate-900 transition-colors">Case Studies</a>
            <a href="#contact" className="hidden md:block hover:text-slate-900 transition-colors">Contact</a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
