const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && !f.includes('Index'));

function getContactLinks(isDark) {
  return `
              <div className="flex flex-wrap justify-center gap-6 mt-8">
                {(!isEditor && !block.content?.email) ? null : (
                  <div className={\`flex items-center gap-2 \${!block.content?.email && isEditor ? 'opacity-30' : ''}\`}>
                    <EditableLink 
                      value={block.content?.email || "Email"} 
                      href={block.content?.email ? \`mailto:\${block.content.email}\` : "#"} 
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
                  <div className={\`flex items-center gap-2 \${!block.content?.phone && isEditor ? 'opacity-30' : ''}\`}>
                    <EditableLink 
                      value={block.content?.phone || "Phone"} 
                      href={block.content?.phone ? \`tel:\${block.content.phone}\` : "#"} 
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
                  <div className={\`flex items-center gap-2 \${!block.content?.website && isEditor ? 'opacity-30' : ''}\`}>
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
                  <div className={\`flex items-center gap-2 \${!block.content?.linkedin && isEditor ? 'opacity-30' : ''}\`}>
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
                  <div className={\`flex items-center gap-2 \${!block.content?.twitter && isEditor ? 'opacity-30' : ''}\`}>
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
                  <div className={\`flex items-center gap-2 \${!block.content?.instagram && isEditor ? 'opacity-30' : ''}\`}>
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
`;
}

// MinimalTemplate
let minimal = fs.readFileSync(path.join(dir, 'MinimalTemplate.tsx'), 'utf8');
minimal = minimal.replace(/<EditableLink\s+value="hello@example\.com"[\s\S]*?\/>/, getContactLinks(false));
fs.writeFileSync(path.join(dir, 'MinimalTemplate.tsx'), minimal);

// DeveloperTemplate
let dev = fs.readFileSync(path.join(dir, 'DeveloperTemplate.tsx'), 'utf8');
dev = dev.replace(/<div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">[\s\S]*?<\/div>\s*<\/section>/, getContactLinks(true) + '\n          </section>');
fs.writeFileSync(path.join(dir, 'DeveloperTemplate.tsx'), dev);

// CreativeTemplate
let creative = fs.readFileSync(path.join(dir, 'CreativeTemplate.tsx'), 'utf8');
creative = creative.replace(/<div className="flex gap-6 mb-20">[\s\S]*?<\/div>\s*<EditableLink[\s\S]*?\/>/, getContactLinks(false));
fs.writeFileSync(path.join(dir, 'CreativeTemplate.tsx'), creative);

// ProfessionalTemplate
let prof = fs.readFileSync(path.join(dir, 'ProfessionalTemplate.tsx'), 'utf8');
prof = prof.replace(/<EditableLink\s+value="Get in touch"[\s\S]*?\/>/, getContactLinks(false));
fs.writeFileSync(path.join(dir, 'ProfessionalTemplate.tsx'), prof);

// ExecutiveTemplate
let exec = fs.readFileSync(path.join(dir, 'ExecutiveTemplate.tsx'), 'utf8');
exec = exec.replace(/<div className="flex gap-8 mb-16">[\s\S]*?<\/div>\s*<EditableLink[\s\S]*?\/>/, getContactLinks(false));
fs.writeFileSync(path.join(dir, 'ExecutiveTemplate.tsx'), exec);

console.log("Contact sections updated.");
