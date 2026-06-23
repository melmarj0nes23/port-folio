'use client'

import { Playfair_Display } from 'next/font/google'
import { Pencil, ArrowUp, ArrowDown, Trash2, Plus, ArrowRight, Mail, Phone, Briefcase, Globe } from 'lucide-react'
import { EditableField } from '../editor/EditableField'
import { EditableLink } from '../editor/EditableLink'
import { EditableImage } from '../editor/EditableImage'
import { motion } from 'framer-motion'

const playfair = Playfair_Display({ subsets: ['latin'] })

export function ExecutiveTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, galleries, setGalleries, blocks, setBlocks, isEditor = false, isPreview = false }: any) {
  const accentColor = portfolio?.theme_color || '#0f172a'; // Slate-900 default
  const skills = profile?.skills || ["Strategic Leadership", "Global Markets", "P&L Management", "Mergers & Acquisitions", "Organizational Scaling"];

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

  const renderBlockControls = (index: number) => {
    if (!isEditor || !setBlocks) return null;
    return (
      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity z-50 bg-white/90 backdrop-blur shadow-sm border border-gray-100 rounded-lg p-1">
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
          <section className="relative group/block bg-[#0f172a] text-white">
            {renderBlockControls(index)}
            <div className="grid lg:grid-cols-2 min-h-[90vh]">
              {/* Left Side */}
              <div className="flex flex-col justify-center px-8 lg:px-24 py-20 z-10">
                <motion.div 
                  initial={isPreview ? false : { opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <p className="text-sm font-semibold tracking-[0.2em] uppercase text-slate-400 mb-6">
                    <EditableField value={profile?.headline || 'Chief Executive Officer'} onChange={(val: string) => setProfile?.({...profile, headline: val})} isEditor={isEditor} />
                  </p>
                  <h1 className={`text-6xl lg:text-8xl font-normal leading-tight mb-8 ${playfair.className}`}>
                    <EditableField value={profile?.full_name || 'Alexandra Chen'} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />
                  </h1>
                  <h2 className="text-2xl lg:text-3xl text-slate-300 font-light leading-snug mb-10 max-w-xl">
                    <EditableField value={block.content?.value_prop || 'Driving operational excellence and sustainable growth for Fortune 500 companies.'} onChange={(val: string) => {
                      if(isEditor && setBlocks) {
                        setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, value_prop: val } } : b));
                      }
                    }} multiline isEditor={isEditor} />
                  </h2>
                  <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2"><Mail size={16}/> <EditableField value={block.content?.email || 'alexandra@executive.com'} onChange={(val: string) => {
                      if(isEditor && setBlocks) {
                        setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, email: val } } : b));
                      }
                    }} isEditor={isEditor} /></div>
                    <div className="flex items-center gap-2"><Phone size={16}/> <EditableField value={block.content?.phone || '+1 (555) 123-4567'} onChange={(val: string) => {
                      if(isEditor && setBlocks) {
                        setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, phone: val } } : b));
                      }
                    }} isEditor={isEditor} /></div>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Side */}
              <div className="relative hidden lg:block">
                <EditableImage 
                  src={profile?.avatar_url || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=1600&fit=crop&auto=format"} 
                  alt="Portrait" 
                  onChange={(val: any) => setProfile?.({...profile, avatar_url: val.src})} 
                  isEditor={isEditor} 
                  className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </section>
        );
      
      case 'about':
        return (
          <section id="about" className="py-32 bg-white relative group/block">
            {renderBlockControls(index)}
            <div className="max-w-4xl mx-auto px-8 lg:px-24">
              <h3 className={`text-3xl lg:text-4xl text-slate-900 mb-10 ${playfair.className}`}>
                <EditableField 
                  value={block.content?.title || "About Me"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </h3>
              <div className="text-xl lg:text-2xl text-slate-600 leading-relaxed font-light">
                <EditableField value={profile?.bio || 'Strategic leader with over 15 years of experience in global markets, specializing in digital transformation and organizational scaling. Passionate about aligning operations with ambitious growth objectives.'} onChange={(val: string) => setProfile?.({...profile, bio: val})} multiline isEditor={isEditor} />
              </div>
            </div>
          </section>
        );

      case 'skills':
        return (
          <section id="skills" className="py-20 bg-slate-50 relative group/block">
            {renderBlockControls(index)}
            <div className="max-w-6xl mx-auto px-8 lg:px-24">
              <h3 className={`text-3xl lg:text-4xl text-slate-900 mb-12 ${playfair.className}`}>
                <EditableField 
                  value={block.content?.title || "Core Competencies"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </h3>
              <EditableField 
                value={block.content?.competencies?.join('\n') || "Strategic Leadership\nGlobal Markets\nP&L Management\nMergers & Acquisitions\nOrganizational Scaling"} 
                onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, competencies: val.split('\n').filter((s: string) => s.trim() !== '') } } : b));
                  }
                }} 
                multiline 
                isEditor={isEditor} 
                renderDisplay={
                  <div className="flex flex-wrap gap-6">
                    {(block.content?.competencies || ["Strategic Leadership", "Global Markets", "P&L Management", "Mergers & Acquisitions", "Organizational Scaling"]).map((s: string, i: number) => (
                      <div key={i} className="px-6 py-3 border border-slate-200 bg-white text-slate-700 tracking-wider uppercase text-sm font-semibold rounded-sm">
                        {s}
                      </div>
                    ))}
                  </div>
                }
              />
            </div>
          </section>
        );

      case 'education':
        const eduItems = block.content?.education || [
          { degree: 'MBA in Finance', school: 'Harvard Business School', year: '2010' },
          { degree: 'B.S. Economics', school: 'Stanford University', year: '2006' }
        ];
        return (
          <section id="education" className="py-32 bg-white relative group/block">
            {renderBlockControls(index)}
            <div className="max-w-6xl mx-auto px-8 lg:px-24">
              <h3 className={`text-3xl lg:text-4xl text-slate-900 mb-16 ${playfair.className}`}>
                <EditableField 
                  value={block.content?.title || "Education"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </h3>
              <div className="grid md:grid-cols-2 gap-12">
                {eduItems.map((edu: any, i: number) => (
                  <div key={i} className="relative group/item">
                    {isEditor && (
                      <button onClick={() => {
                        const newBlocks = [...activeBlocks];
                        const newEdu = [...eduItems];
                        newEdu.splice(i, 1);
                        newBlocks[index].content = {...newBlocks[index].content, education: newEdu};
                        setBlocks?.(newBlocks);
                      }} className="absolute -top-4 -right-4 z-10 p-2 bg-red-50 text-red-600 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    )}
                    <h4 className={`text-2xl text-slate-900 mb-2 ${playfair.className}`}>
                      <EditableField value={edu.degree || 'Degree'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.education[i].degree = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </h4>
                    <p className="text-lg text-slate-600 mb-1">
                      <EditableField value={edu.school || 'School'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.education[i].school = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </p>
                    <p className="text-sm tracking-widest uppercase text-slate-500 font-bold">
                      <EditableField value={edu.year || 'YYYY'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.education[i].year = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </p>
                  </div>
                ))}
              </div>
              {isEditor && (
                <button onClick={() => {
                  const newBlocks = [...activeBlocks];
                  const newEdu = [...eduItems, { degree: 'New Degree', school: 'University', year: 'YYYY' }];
                  newBlocks[index].content = {...newBlocks[index].content, education: newEdu};
                  setBlocks?.(newBlocks);
                }} className="mt-12 text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 font-semibold tracking-wider uppercase text-sm">
                  <Plus size={16} /> Add Education
                </button>
              )}
            </div>
          </section>
        );

      case 'experience':
        return (
          <section id="experience" className="py-32 bg-slate-50 relative group/block">
            {renderBlockControls(index)}
            <div className="max-w-6xl mx-auto px-8 lg:px-24">
              <div className="mb-20">
                <h3 className={`text-4xl lg:text-5xl text-slate-900 ${playfair.className}`}>
                  <EditableField 
                    value={block.content?.title || "Career Trajectory"} 
                    onChange={(val: string) => {
                      if(isEditor && setBlocks) {
                        setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                      }
                    }} 
                    isEditor={isEditor} 
                  />
                </h3>
              </div>
              
              <div className="relative border-l border-slate-200 pl-10 lg:pl-16 ml-4 lg:ml-8 flex flex-col gap-24">
                {experience && experience.length > 0 ? experience.map((e: any, i: number) => (
                  <motion.div 
                    initial={isPreview ? false : { opacity: 0, x: -20 }}
                    whileInView={isPreview ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    key={i} 
                    className="relative group"
                  >
                    {/* Timeline Node */}
                    <div className="absolute -left-[45px] lg:-left-[69px] top-2 w-3 h-3 bg-slate-900 rounded-full ring-8 ring-slate-50"></div>
                    
                    {isEditor && (
                      <button onClick={() => {
                        const newE = [...experience]; newE.splice(i, 1); setExperience?.(newE);
                      }} className="absolute -top-6 right-0 z-10 p-2 bg-red-50 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    )}
                    <p className="text-sm font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
                      <EditableField value={e.start_date || 'YYYY'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].start_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                      {' '}—{' '}
                      <EditableField value={e.end_date || 'Present'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].end_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                    </p>
                    <h4 className={`text-3xl lg:text-4xl text-slate-900 mb-2 ${playfair.className}`}>
                      <EditableField value={e.role || 'Senior Executive'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].role = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                    </h4>
                    <p className="text-xl text-slate-500 mb-6">
                      <EditableField value={e.company || 'Enterprise Corp'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].company = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                    </p>
                    <div className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                      <EditableField value={e.description || 'Led a division of 500+ employees. Increased market share by 24% over 3 years while reducing operational overhead.'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].description = val; setExperience?.(newE);
                      }} multiline isEditor={isEditor} />
                    </div>
                  </motion.div>
                )) : (
                  <p className="text-lg text-slate-500">No career history added.</p>
                )}
                {isEditor && (
                  <button onClick={() => setExperience?.([...(experience||[]), { id: crypto.randomUUID(), role: 'Executive Role', company: 'Company', start_date: '2024', end_date: 'Present' }])} className="w-max text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 font-semibold tracking-wider uppercase text-sm">
                    <Plus size={16} /> Add Position
                  </button>
                )}
              </div>
            </div>
          </section>
        );

      case 'projects':
        return (
          <section id="projects" className="py-32 bg-white relative group/block">
            {renderBlockControls(index)}
            <div className="max-w-6xl mx-auto px-8 lg:px-24">
              <div className="mb-24">
                <h3 className={`text-4xl lg:text-5xl text-slate-900 ${playfair.className}`}>
                  <EditableField 
                    value={block.content?.title || "Business Case Studies"} 
                    onChange={(val: string) => {
                      if(isEditor && setBlocks) {
                        setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                      }
                    }} 
                    isEditor={isEditor} 
                  />
                </h3>
              </div>
              
              <div className="flex flex-col gap-32">
                {projects && projects.length > 0 ? projects.map((p: any, i: number) => {
                  const isEven = i % 2 === 0;
                  return (
                    <motion.div 
                      initial={isPreview ? false : { opacity: 0, y: 40 }}
                      whileInView={isPreview ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1 }}
                      key={i} 
                      className="relative group grid lg:grid-cols-2 gap-16 items-center"
                    >
                      {isEditor && (
                        <button onClick={() => {
                          const newP = [...projects]; newP.splice(i, 1); setProjects?.(newP);
                        }} className="absolute top-0 right-0 z-20 p-3 bg-red-50 text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={16} />
                        </button>
                      )}
                      
                      <div className={`aspect-[4/3] w-full bg-slate-200 overflow-hidden ${!isEven ? 'lg:order-last' : ''}`}>
                        <EditableImage 
                          src={p.image_url || `https://images.unsplash.com/photo-${i % 2 === 0 ? '1486406146926-c627a92ad1ab' : '1554200876-56c2f25224fa'}?w=800&h=600&fit=crop&auto=format`} 
                          alt="Case Study" 
                          onChange={(val: any) => {
                            if(isEditor && setProjects) {
                              const newP = [...projects];
                              newP[i].image_url = val.src;
                              setProjects(newP);
                            }
                          }}
                          isEditor={isEditor}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <h4 className={`text-4xl text-slate-900 mb-6 ${playfair.className}`}>
                          <EditableField value={p.title || 'Market Expansion Strategy'} onChange={(val: string) => {
                            const newP = [...projects]; newP[i].title = val; setProjects?.(newP);
                          }} isEditor={isEditor} />
                        </h4>
                        <div className="text-lg text-slate-600 leading-relaxed mb-8">
                          <EditableField value={p.description || 'Developed and executed a comprehensive go-to-market strategy for the EMEA region, resulting in $50M new ARR.'} onChange={(val: string) => {
                            const newP = [...projects]; newP[i].description = val; setProjects?.(newP);
                          }} multiline isEditor={isEditor} />
                        </div>
                        <EditableLink 
                          value="Read Full Report" 
                          href={p.link || '#'} 
                          onChange={(val: any) => {
                            const newP = [...projects]; newP[i].link = val.href; setProjects?.(newP);
                          }}
                          className="inline-flex items-center gap-3 text-slate-900 font-bold tracking-widest uppercase text-sm hover:gap-5 transition-all" 
                          isEditor={isEditor} 
                        />
                      </div>
                    </motion.div>
                  )
                }) : (
                  <p className="text-lg text-slate-500">No case studies added yet.</p>
                )}
                {isEditor && (
                  <button onClick={() => setProjects?.([...(projects||[]), { id: crypto.randomUUID(), title: 'New Case Study', description: 'Business impact and results.' }])} className="w-full py-12 border border-dashed border-slate-300 text-slate-500 hover:text-slate-900 hover:border-slate-900 transition-colors flex items-center justify-center gap-3 font-bold tracking-widest uppercase text-sm">
                    <Plus size={18} /> Add Case Study
                  </button>
                )}
              </div>
            </div>
          </section>
        );

      case 'certifications':
        const certItems = block.content?.certifications || [
          { name: 'Certified Corporate Director', issuer: 'NACD', year: '2021' }
        ];
        return (
          <section id="certifications" className="py-20 bg-slate-50 relative group/block">
            {renderBlockControls(index)}
            <div className="max-w-6xl mx-auto px-8 lg:px-24">
              <h3 className={`text-3xl lg:text-4xl text-slate-900 mb-12 ${playfair.className}`}>
                <EditableField 
                  value={block.content?.title || "Certifications"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                    }
                  }} 
                  isEditor={isEditor} 
                />
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {certItems.map((cert: any, i: number) => (
                  <div key={i} className="relative group/item bg-white p-8 border border-slate-200">
                    {isEditor && (
                      <button onClick={() => {
                        const newBlocks = [...activeBlocks];
                        const newCerts = [...certItems];
                        newCerts.splice(i, 1);
                        newBlocks[index].content = {...newBlocks[index].content, certifications: newCerts};
                        setBlocks?.(newBlocks);
                      }} className="absolute top-4 right-4 z-10 p-2 bg-red-50 text-red-600 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <Trash2 size={14} />
                      </button>
                    )}
                    <h4 className="text-lg font-bold text-slate-900 mb-1">
                      <EditableField value={cert.name || 'Certification Name'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.certifications[i].name = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </h4>
                    <p className="text-slate-600 mb-3">
                      <EditableField value={cert.issuer || 'Issuing Organization'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.certifications[i].issuer = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </p>
                    <p className="text-xs tracking-widest uppercase text-slate-500 font-bold">
                      <EditableField value={cert.year || 'YYYY'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.certifications[i].year = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </p>
                  </div>
                ))}
              </div>
              {isEditor && (
                <button onClick={() => {
                  const newBlocks = [...activeBlocks];
                  const newCerts = [...certItems, { name: 'New Certification', issuer: 'Issuer', year: 'YYYY' }];
                  newBlocks[index].content = {...newBlocks[index].content, certifications: newCerts};
                  setBlocks?.(newBlocks);
                }} className="mt-8 text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2 font-semibold tracking-wider uppercase text-sm">
                  <Plus size={16} /> Add Certification
                </button>
              )}
            </div>
          </section>
        );

      case 'contact':
        return (
          <section id="contact" className="py-32 bg-slate-900 text-white relative group/block">
            {renderBlockControls(index)}
            <div className="max-w-4xl mx-auto px-8 text-center">
              <h2 className={`text-5xl md:text-7xl mb-12 ${playfair.className}`}>
                <EditableField value={block.content?.title || "Executive Inquiries"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} />
              </h2>
              <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-light leading-relaxed">
                <EditableField value={block.content?.subtitle || "Available for board positions, advisory roles, and high-level consulting engagements."} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, subtitle: val } } : b));
                  }
                }} multiline isEditor={isEditor} />
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-12 text-slate-300">
                <div className="flex flex-col items-center gap-4">
                  <Mail size={24} className="text-white opacity-50" />
                  <EditableLink 
                    value="contact@executive.com" 
                    href="mailto:contact@executive.com" 
                    onChange={(val: any) => {
                      if(isEditor && setBlocks) {
                        setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, email: val.value } } : b));
                      }
                    }} 
                    className="text-xl hover:text-white transition-colors" 
                    isEditor={isEditor} 
                  />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Phone size={24} className="text-white opacity-50" />
                  <EditableField value={block.content?.phone || '+1 (555) 123-4567'} onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, phone: val } } : b));
                    }
                  }} isEditor={isEditor} className="text-xl" />
                </div>
                <div className="flex flex-col items-center gap-4">
                  <Briefcase size={24} className="text-white opacity-50" />
                  <EditableLink 
                    value="LinkedIn Profile" 
                    href="#" 
                    onChange={(val: any) => {
                      if(isEditor && setBlocks) {
                        setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, linkedin: val.href } } : b));
                      }
                    }} 
                    className="text-xl hover:text-white transition-colors" 
                    isEditor={isEditor} 
                  />
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-white text-slate-900`} style={{ fontFamily: portfolio?.font || 'Inter, sans-serif' }}>
      <main className="w-full">
        {activeBlocks.map((block: any, index: number) => (
          <div key={block.id || index}>
            {renderBlock(block, index)}
          </div>
        ))}

        {isEditor && setBlocks && (
          <div className="py-24 flex justify-center bg-white">
             <button 
               onClick={() => {
                 setBlocks([...activeBlocks, { id: crypto.randomUUID(), type: 'experience', content: {} }]);
               }}
               className="flex items-center gap-2 px-8 py-4 bg-slate-50 border border-slate-200 hover:border-slate-400 text-slate-900 transition-colors font-bold tracking-widest uppercase text-xs"
             >
               <Plus size={16} /> Add Section
             </button>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-8 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium text-white">
            <EditableField value={profile?.full_name || "Alexandra Chen"} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />
          </p>
          <p className="text-sm">
            © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
