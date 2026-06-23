'use client'

import { Terminal, Code2, Briefcase, Mail, MapPin, Trash2, Plus, ArrowRight, ExternalLink, ArrowUp, ArrowDown, Phone, Award, GraduationCap } from 'lucide-react'
import { EditableField } from '../editor/EditableField'
import { EditableLink } from '../editor/EditableLink'
import { motion } from 'framer-motion'

export function DeveloperTemplate({ portfolio, profile, setProfile, projects, setProjects, experience, setExperience, galleries, setGalleries, blocks, setBlocks, isEditor = false, isPreview = false }: any) {
  const accentColor = portfolio?.theme_color || '#3b82f6'; // Blue-500 default
  const skills = profile?.skills || ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "Tailwind CSS", "GraphQL", "Docker", "AWS", "Figma"];
  
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
      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover/block:opacity-100 transition-opacity z-50 bg-zinc-800/90 backdrop-blur shadow-sm border border-zinc-700 rounded-lg p-1">
        <button onClick={() => moveBlock(index, 'up')} className="p-1.5 hover:bg-zinc-700 rounded text-zinc-400"><ArrowUp size={14}/></button>
        <button onClick={() => moveBlock(index, 'down')} className="p-1.5 hover:bg-zinc-700 rounded text-zinc-400"><ArrowDown size={14}/></button>
        <div className="w-px h-4 bg-zinc-700 mx-1"></div>
        <button onClick={() => deleteBlock(index)} className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded text-zinc-400"><Trash2 size={14}/></button>
      </div>
    );
  };

  const renderBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'hero':
        return (
          <section className="relative group/block pt-32 pb-20 border-b border-zinc-800/50">
            {renderBlockControls(index)}
            <motion.div 
              initial={isPreview ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full mb-8 text-xs font-mono text-zinc-400">
                <span className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ backgroundColor: accentColor }}></span>
                System Status: <EditableField value={block.content?.status || "Online & Deploying"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, status: val } } : b));
                  }
                }} isEditor={isEditor} />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-100 mb-6 leading-[1.1]">
                <EditableField value={profile?.full_name || 'Alex Chen'} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} /><br/>
                <span className="text-zinc-500">
                  <EditableField value={profile?.headline || 'Engineering seamless digital products.'} onChange={(val: string) => setProfile?.({...profile, headline: val})} multiline isEditor={isEditor} />
                </span>
              </h1>
              <div className="text-xl text-zinc-400 leading-relaxed max-w-2xl font-light mb-10">
                <EditableField value={profile?.bio || 'Full-stack product engineer specialized in building scalable, accessible, and high-performance web applications.'} onChange={(val: string) => setProfile?.({...profile, bio: val})} multiline isEditor={isEditor} />
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-zinc-500">
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <Mail size={14} /> <EditableField value={block.content?.email || 'hello@developer.com'} onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, email: val } } : b));
                    }
                  }} isEditor={isEditor} />
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg">
                  <Phone size={14} /> <EditableField value={block.content?.phone || '+1 (555) 000-0000'} onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, phone: val } } : b));
                    }
                  }} isEditor={isEditor} />
                </div>
              </div>
            </motion.div>
          </section>
        );

      case 'about':
        return (
          <section id="about" className="py-24 relative group/block border-b border-zinc-800/50">
            {renderBlockControls(index)}
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100"><EditableField value={block.content?.title || "About Me"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
              <span className="text-sm font-mono text-zinc-500">{"<Bio />"}</span>
            </div>
            <div className="text-zinc-400 leading-relaxed text-lg max-w-3xl">
              <EditableField value={block.content?.about || 'I am a passionate software engineer with a knack for creating intuitive and performant web applications. With a strong foundation in computer science and years of hands-on experience, I thrive in environments that challenge me to solve complex problems and learn new technologies.'} onChange={(val: string) => {
                if(isEditor && setBlocks) {
                  setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, about: val } } : b));
                }
              }} multiline isEditor={isEditor} />
            </div>
          </section>
        );

      case 'skills':
        return (
          <section className="py-24 relative group/block border-b border-zinc-800/50">
            {renderBlockControls(index)}
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-100"><EditableField value={block.content?.title || "Stack"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
              <span className="text-sm font-mono text-zinc-500">{"<Skills />"}</span>
            </div>
                          <EditableField 
                value={block.content?.skills?.join('\n') || "React\nTypeScript\nNode.js\nNext.js\nPostgreSQL\nTailwind CSS\nGraphQL\nDocker\nAWS\nFigma"} 
                onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, skills: val.split('\n').filter((s: string) => s.trim() !== '') } } : b));
                  }
                }} 
                multiline 
                isEditor={isEditor} 
                renderDisplay={
                  <div className="flex flex-wrap gap-3">
                    {(block.content?.skills || ["React", "TypeScript", "Node.js", "Next.js", "PostgreSQL", "Tailwind CSS", "GraphQL", "Docker", "AWS", "Figma"]).map((skill: string, i: number) => (
                      <span key={i} className="px-4 py-2 bg-zinc-900/50 border border-zinc-800 text-zinc-300 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                }
              />
          </section>
        );

      case 'education':
        const eduItems = block.content?.education || [
          { degree: 'B.S. Computer Science', school: 'Tech University', year: '2020' }
        ];
        return (
          <section id="education" className="py-24 relative group/block border-b border-zinc-800/50">
            {renderBlockControls(index)}
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-100"><EditableField value={block.content?.title || "Education"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
              <span className="text-sm font-mono text-zinc-500">{"<Education />"}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eduItems.map((edu: any, i: number) => (
                <div key={i} className="relative group/item bg-zinc-900/30 p-6 border border-zinc-800 rounded-xl">
                  {isEditor && (
                    <button onClick={() => {
                      const newBlocks = [...activeBlocks];
                      const newEdu = [...eduItems];
                      newEdu.splice(i, 1);
                      newBlocks[index].content = {...newBlocks[index].content, education: newEdu};
                      setBlocks?.(newBlocks);
                    }} className="absolute top-4 right-4 z-10 p-2 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <GraduationCap size={24} className="text-zinc-500 mb-4" style={{ color: accentColor }} />
                  <h3 className="text-lg font-bold text-zinc-100 mb-1">
                    <EditableField value={edu.degree || 'Degree'} onChange={(val: string) => {
                      if(isEditor && setBlocks) {
                        const newBlocks = [...activeBlocks];
                        newBlocks[index].content.education[i].degree = val;
                        setBlocks(newBlocks);
                      }
                    }} isEditor={isEditor} />
                  </h3>
                  <p className="text-zinc-400 mb-2">
                    <EditableField value={edu.school || 'School'} onChange={(val: string) => {
                      if(isEditor && setBlocks) {
                        const newBlocks = [...activeBlocks];
                        newBlocks[index].content.education[i].school = val;
                        setBlocks(newBlocks);
                      }
                    }} isEditor={isEditor} />
                  </p>
                  <div className="inline-flex px-2 py-1 bg-zinc-800 rounded text-xs font-mono text-zinc-300">
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
              }} className="mt-6 w-full md:w-max px-4 py-2 border border-dashed border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-all font-mono text-sm flex items-center justify-center gap-2">
                <Plus size={16} /> Append Education
              </button>
            )}
          </section>
        );

      case 'experience':
        return (
          <section id="experience" className="py-24 relative group/block border-b border-zinc-800/50">
            {renderBlockControls(index)}
            <div className="mb-16 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100"><EditableField value={block.content?.title || "Experience"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
              <span className="text-sm font-mono text-zinc-500">{"<Timeline />"}</span>
            </div>
            
            <div className="relative border-l border-zinc-800 ml-4 pl-8 lg:pl-12 flex flex-col gap-16">
              {experience && experience.length > 0 ? experience.map((e: any, i: number) => (
                <div key={i} className="relative group">
                  {isEditor && (
                    <button onClick={() => {
                      const newE = [...experience]; newE.splice(i, 1); setExperience?.(newE);
                    }} className="absolute top-0 right-0 z-10 p-2 text-red-500 hover:text-red-400 bg-zinc-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  )}
                  {/* Timeline Dot */}
                  <div className="absolute -left-[41px] lg:-left-[57px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2" style={{ borderColor: accentColor }}>
                    <div className="absolute inset-0.5 rounded-full" style={{ backgroundColor: accentColor, opacity: 0.2 }}></div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4 gap-2">
                    <div>
                      <h3 className="text-2xl font-bold text-zinc-100 mb-1">
                        <EditableField value={e.role || 'Senior Engineer'} onChange={(val: string) => {
                          const newE = [...experience]; newE[i].role = val; setExperience?.(newE);
                        }} isEditor={isEditor} />
                      </h3>
                      <p className="text-lg text-zinc-400">
                        <EditableField value={e.company || 'Tech Corp'} onChange={(val: string) => {
                          const newE = [...experience]; newE[i].company = val; setExperience?.(newE);
                        }} isEditor={isEditor} />
                      </p>
                    </div>
                    <div className="text-sm font-mono text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 w-max">
                      <EditableField value={e.start_date || 'YYYY'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].start_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                      {' '}-{' '}
                      <EditableField value={e.end_date || 'Present'} onChange={(val: string) => {
                        const newE = [...experience]; newE[i].end_date = val; setExperience?.(newE);
                      }} isEditor={isEditor} />
                    </div>
                  </div>
                  <div className="text-zinc-400 leading-relaxed max-w-3xl">
                    <EditableField value={e.description || 'Led core product development.'} onChange={(val: string) => {
                      const newE = [...experience]; newE[i].description = val; setExperience?.(newE);
                    }} multiline isEditor={isEditor} />
                  </div>
                </div>
              )) : (
                <p className="text-zinc-500 font-mono">No experience logs found.</p>
              )}
              {isEditor && (
                <button onClick={() => setExperience?.([...(experience||[]), { id: crypto.randomUUID(), role: 'Role', company: 'Company', start_date: '2024', end_date: 'Present' }])} className="w-full md:w-max px-6 py-3 border border-dashed border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-all font-mono text-sm flex items-center justify-center gap-2">
                  <Plus size={16} /> Append Record
                </button>
              )}
            </div>
          </section>
        );

      case 'projects':
        return (
          <section id="work" className="py-24 relative group/block border-b border-zinc-800/50">
            {renderBlockControls(index)}
            <div className="mb-16 flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-100"><EditableField value={block.content?.title || "Featured Work"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
              <span className="text-sm font-mono text-zinc-500">{"<Projects />"}</span>
            </div>
            
            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects && projects.length > 0 ? projects.map((p: any, i: number) => {
                // Make the first item take up 2 columns if possible
                const isFeatured = i === 0;
                return (
                  <motion.div 
                    initial={isPreview ? false : { opacity: 0, y: 20 }}
                    whileInView={isPreview ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    key={i} 
                    className={`relative group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-600 transition-all duration-300 ${isFeatured ? 'md:col-span-1 lg:col-span-2' : ''}`}
                  >
                    {isEditor && (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        const newP = [...projects]; newP.splice(i, 1); setProjects?.(newP);
                      }} className="absolute top-4 right-4 z-20 p-2 bg-zinc-950/80 text-red-400 hover:text-red-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 size={16} />
                      </button>
                    )}
                    
                    <div className="p-8 flex flex-col h-full z-10 relative">
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl">
                          <Code2 size={24} style={{ color: accentColor }} />
                        </div>
                        <EditableLink 
                          value="" 
                          href={p.link || '#'} 
                          onChange={(val: any) => {
                            const newP = [...projects]; newP[i].link = val.href; setProjects?.(newP);
                          }}
                          className="text-zinc-500 hover:text-zinc-300 transition-colors" 
                          isEditor={isEditor} 
                        >
                          <ExternalLink size={20} />
                        </EditableLink>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-zinc-100 mb-3">
                        <EditableField value={p.title || 'Project Name'} onChange={(val: string) => {
                          const newP = [...projects]; newP[i].title = val; setProjects?.(newP);
                        }} isEditor={isEditor} />
                      </h3>
                      
                      <div className="text-zinc-400 leading-relaxed mb-8 flex-1 break-words">
                        <EditableField value={p.description || 'A high-performance web application built for scale.'} onChange={(val: string) => {
                          const newP = [...projects]; newP[i].description = val; setProjects?.(newP);
                        }} multiline isEditor={isEditor} />
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {p.tech_stack?.map((t: string, j: number) => (
                          <span key={j} className="px-2.5 py-1 text-[11px] font-mono text-zinc-300 bg-zinc-950 border border-zinc-800 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    {/* Subtle Glow Effect */}
                    <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-zinc-800/40 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </motion.div>
                )
              }) : (
                <div className="col-span-full py-12 text-center text-zinc-500 font-mono border border-dashed border-zinc-800 rounded-2xl">
                  No projects configured.
                </div>
              )}
              
              {isEditor && (
                <button onClick={() => setProjects?.([...(projects||[]), { id: crypto.randomUUID(), title: 'New Repository', description: 'Description', tech_stack: ['Next.js', 'TypeScript'] }])} className="md:col-span-1 min-h-[300px] border border-dashed border-zinc-800 rounded-2xl text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900/50 transition-all flex flex-col items-center justify-center gap-3 font-mono text-sm">
                  <Plus size={24} /> 
                  <span>git init new_project</span>
                </button>
              )}
            </div>
          </section>
        );

      case 'certifications':
        const certItems = block.content?.certifications || [
          { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2023' }
        ];
        return (
          <section id="certifications" className="py-24 relative group/block border-b border-zinc-800/50">
            {renderBlockControls(index)}
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-100"><EditableField value={block.content?.title || "Certifications"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} /></h2>
              <span className="text-sm font-mono text-zinc-500">{"<Certifications />"}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certItems.map((cert: any, i: number) => (
                <div key={i} className="relative group/item bg-zinc-900/30 p-6 border border-zinc-800 rounded-xl flex items-start gap-4">
                  {isEditor && (
                    <button onClick={() => {
                      const newBlocks = [...activeBlocks];
                      const newCerts = [...certItems];
                      newCerts.splice(i, 1);
                      newBlocks[index].content = {...newBlocks[index].content, certifications: newCerts};
                      setBlocks?.(newBlocks);
                    }} className="absolute top-2 right-2 z-10 p-2 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  )}
                  <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-lg shrink-0">
                    <Award size={20} className="text-zinc-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-100 mb-1 leading-snug">
                      <EditableField value={cert.name || 'Cert Name'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.certifications[i].name = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </h3>
                    <p className="text-sm text-zinc-500 mb-2">
                      <EditableField value={cert.issuer || 'Issuer'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.certifications[i].issuer = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </p>
                    <span className="text-xs font-mono text-zinc-600 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                      <EditableField value={cert.year || 'YYYY'} onChange={(val: string) => {
                        if(isEditor && setBlocks) {
                          const newBlocks = [...activeBlocks];
                          newBlocks[index].content.certifications[i].year = val;
                          setBlocks(newBlocks);
                        }
                      }} isEditor={isEditor} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {isEditor && (
              <button onClick={() => {
                const newBlocks = [...activeBlocks];
                const newCerts = [...certItems, { name: 'New Cert', issuer: 'Issuer', year: 'YYYY' }];
                newBlocks[index].content = {...newBlocks[index].content, certifications: newCerts};
                setBlocks?.(newBlocks);
              }} className="mt-6 w-full md:w-max px-4 py-2 border border-dashed border-zinc-800 rounded-lg text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-all font-mono text-sm flex items-center justify-center gap-2">
                <Plus size={16} /> Append Certification
              </button>
            )}
          </section>
        );

      case 'contact':
        return (
          <section id="contact" className="py-32 relative group/block text-center">
            {renderBlockControls(index)}
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-100 mb-6">
              <EditableField value={block.content?.title || "Ready to build something?"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));
                  }
                }} isEditor={isEditor} />
            </h2>
            <p className="text-zinc-400 mb-10 max-w-xl mx-auto">
              <EditableField value={block.content?.subtitle || "My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!"} onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, subtitle: val } } : b));
                  }
                }} multiline isEditor={isEditor} />
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

          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-[#09090b] text-zinc-300 selection:bg-zinc-800 selection:text-white relative`} style={{ fontFamily: portfolio?.font || 'Inter, sans-serif' }}>
      
      {/* Background Grid Pattern (Vercel/Linear style) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b] via-transparent to-[#09090b] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Navigation */}
        <nav className="py-8 flex items-center justify-between">
          <span className="font-bold tracking-tighter text-zinc-100 text-lg">
            <EditableField value={profile?.full_name || 'Alex Chen'} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} />
          </span>
          <div className="flex gap-6 text-sm font-medium text-zinc-400">
            <a href="#work" className="hover:text-zinc-100 transition-colors">Work</a>
            <a href="#experience" className="hover:text-zinc-100 transition-colors">Experience</a>
          </div>
        </nav>

        <main>
          {activeBlocks.map((block: any, index: number) => (
            <div key={block.id || index}>
              {renderBlock(block, index)}
            </div>
          ))}

          {isEditor && setBlocks && (
            <div className="py-24 flex justify-center border-t border-zinc-800/50">
               <button 
                 onClick={() => {
                   setBlocks([...activeBlocks, { id: crypto.randomUUID(), type: 'projects', content: {} }]);
                 }}
                 className="flex items-center gap-2 px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 rounded-full transition-all text-sm font-medium shadow-lg shadow-black/50"
               >
                 <Plus size={16} /> Add Component
               </button>
            </div>
          )}
        </main>

        <footer className="py-12 border-t border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <span>{new Date().getFullYear()} © <EditableField value={profile?.full_name || "Alex Chen"} onChange={(val: string) => setProfile?.({...profile, full_name: val})} isEditor={isEditor} /></span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> All systems operational</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
