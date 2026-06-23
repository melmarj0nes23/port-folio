const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

// DeveloperTemplate
let dev = fs.readFileSync(path.join(dir, 'DeveloperTemplate.tsx'), 'utf8');
const devSkills = `              <EditableField 
                value={block.content?.skills?.join('\\n') || "React\\nTypeScript\\nNode.js\\nNext.js\\nPostgreSQL\\nTailwind CSS\\nGraphQL\\nDocker\\nAWS\\nFigma"} 
                onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, skills: val.split('\\n').filter((s: string) => s.trim() !== '') } } : b));
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
              />`;
dev = dev.replace(/<div className="flex flex-wrap gap-3">[\s\S]*?<\/div>/, devSkills);
fs.writeFileSync(path.join(dir, 'DeveloperTemplate.tsx'), dev);

// MinimalTemplate
let min = fs.readFileSync(path.join(dir, 'MinimalTemplate.tsx'), 'utf8');
const minSkills = `              <EditableField 
                value={block.content?.skills?.join('\\n') || "Strategy\\nInterface Design\\nPrototyping\\nArt Direction\\nInteraction"} 
                onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, skills: val.split('\\n').filter((s: string) => s.trim() !== '') } } : b));
                  }
                }} 
                multiline 
                isEditor={isEditor} 
                renderDisplay={
                  <ul className="space-y-4">
                    {(block.content?.skills || ["Strategy", "Interface Design", "Prototyping", "Art Direction", "Interaction"]).map((skill: string, i: number) => (
                      <li key={i} className="text-xl text-gray-700 font-light border-b border-gray-100 pb-4">{skill}</li>
                    ))}
                  </ul>
                }
              />`;
min = min.replace(/<ul className="space-y-4">[\s\S]*?<\/ul>/, minSkills);
fs.writeFileSync(path.join(dir, 'MinimalTemplate.tsx'), min);

// CreativeTemplate
let cre = fs.readFileSync(path.join(dir, 'CreativeTemplate.tsx'), 'utf8');
const creSkills = `              <EditableField 
                value={block.content?.capabilities?.join('\\n') || "Brand Identity\\nArt Direction\\nMotion Graphics\\nTypography\\nPhotography"} 
                onChange={(val: string) => {
                  if(isEditor && setBlocks) {
                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, capabilities: val.split('\\n').filter((s: string) => s.trim() !== '') } } : b));
                  }
                }} 
                multiline 
                isEditor={isEditor} 
                renderDisplay={
                  <div className="flex flex-col gap-6">
                    {(block.content?.capabilities || ["Brand Identity", "Art Direction", "Motion Graphics", "Typography", "Photography"]).map((cap: string, i: number) => (
                      <div key={i} className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-slate-800 hover:text-slate-900 transition-colors cursor-default">
                        {cap}
                      </div>
                    ))}
                  </div>
                }
              />`;
cre = cre.replace(/<div className="flex flex-col gap-6">[\s\S]*?<\/div>/, creSkills);
fs.writeFileSync(path.join(dir, 'CreativeTemplate.tsx'), cre);

// ProfessionalTemplate
let prof = fs.readFileSync(path.join(dir, 'ProfessionalTemplate.tsx'), 'utf8');
const profSkills = `                <EditableField 
                  value={block.content?.skills?.join('\\n') || "Product Strategy\\nUser Experience\\nInterface Design\\nDesign Systems"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, skills: val.split('\\n').filter((s: string) => s.trim() !== '') } } : b));
                    }
                  }} 
                  multiline 
                  isEditor={isEditor} 
                  renderDisplay={
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                      {(block.content?.skills || ["Product Strategy", "User Experience", "Interface Design", "Design Systems"]).map((area: string, i: number) => (
                        <div key={i} className="flex items-center gap-4 py-4 border-b border-slate-100">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-semibold text-sm">
                            0{i + 1}
                          </div>
                          <span className="text-lg font-medium text-slate-900">{area}</span>
                        </div>
                      ))}
                    </div>
                  }
                />`;
prof = prof.replace(/<div className="grid md:grid-cols-2 gap-x-12 gap-y-6">[\s\S]*?<\/div>/, profSkills);
fs.writeFileSync(path.join(dir, 'ProfessionalTemplate.tsx'), prof);

// ExecutiveTemplate
let exec = fs.readFileSync(path.join(dir, 'ExecutiveTemplate.tsx'), 'utf8');
const execSkills = `                <EditableField 
                  value={block.content?.competencies?.join('\\n') || "Strategic Leadership\\nGlobal Markets\\nP&L Management\\nMergers & Acquisitions\\nOrganizational Scaling"} 
                  onChange={(val: string) => {
                    if(isEditor && setBlocks) {
                      setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, competencies: val.split('\\n').filter((s: string) => s.trim() !== '') } } : b));
                    }
                  }} 
                  multiline 
                  isEditor={isEditor} 
                  renderDisplay={
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {(block.content?.competencies || ["Strategic Leadership", "Global Markets", "P&L Management", "Mergers & Acquisitions", "Organizational Scaling"]).map((comp: string, i: number) => (
                        <div key={i} className="border-l-2 border-slate-300 pl-6 py-2 hover:border-slate-800 transition-colors">
                          <p className="text-lg font-medium text-slate-900">{comp}</p>
                        </div>
                      ))}
                    </div>
                  }
                />`;
exec = exec.replace(/<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">[\s\S]*?<\/div>/, execSkills);
fs.writeFileSync(path.join(dir, 'ExecutiveTemplate.tsx'), exec);

console.log("All skills replaced");
