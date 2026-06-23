const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

function updateFile(filename, replacements) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  
  for (const r of replacements) {
    content = content.replace(r.from, r.to);
  }
  
  if (content !== original) {
    fs.writeFileSync(filePath, content);
    console.log(`Fixed empty handlers in ${filename}`);
  }
}

const blockField = (key, fallback) => `<EditableField value={block.content?.${key} || "${fallback}"} onChange={(val: string) => {\n                  if(isEditor && setBlocks) {\n                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, ${key}: val } } : b));\n                  }\n                }}`;

const profileField = (fallback) => `<EditableField value={profile?.full_name || "${fallback}"} onChange={(val: string) => setProfile?.({...profile, full_name: val})}`;

updateFile('CreativeTemplate.tsx', [
  { from: /<EditableField value="Let's Talk" onChange=\{\(\)=>{}\}/, to: blockField('title', "Let's Talk") }
]);

updateFile('DeveloperTemplate.tsx', [
  { from: /<EditableField value="Online & Deploying" onChange=\{\(\)=>{}\}/, to: blockField('status', "Online & Deploying") },
  { from: /<EditableField value="Ready to build something\?" onChange=\{\(\)=>{}\}/, to: blockField('title', "Ready to build something?") },
  { from: /<EditableField value="My inbox is always open[\s\S]*?" onChange=\{\(\)=>{}\}/, to: blockField('subtitle', "My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!") },
  { from: /<EditableField value=\{profile\?\.full_name \|\| 'Alex Chen'\} onChange=\{\(\)=>{}\}/, to: profileField('Alex Chen') }
]);

updateFile('ExecutiveTemplate.tsx', [
  { from: /<EditableField value="Executive Inquiries" onChange=\{\(\)=>{}\}/, to: blockField('title', "Executive Inquiries") },
  { from: /<EditableField value="Available for board positions[\s\S]*?" onChange=\{\(\)=>{}\}/, to: blockField('subtitle', "Available for board positions, advisory roles, and high-level consulting engagements.") },
  { from: /<EditableField value=\{profile\?\.full_name \|\| 'Alexandra Chen'\} onChange=\{\(\)=>{}\}/, to: profileField('Alexandra Chen') }
]);

updateFile('MinimalTemplate.tsx', [
  { from: /<EditableField value="Available for new opportunities\." onChange=\{\(\)=>{}\}/, to: blockField('subtitle', "Available for new opportunities.") },
  { from: /<EditableField value=\{profile\?\.full_name \|\| 'Alex Chen'\} onChange=\{\(\)=>{}\}/, to: profileField('Alex Chen') }
]);

updateFile('ProfessionalTemplate.tsx', [
  { from: /<EditableField value=\{profile\?\.full_name\?\.split\(' '\)\[0\] \|\| 'Alex'\} onChange=\{\(\)=>{}\}/, to: profileField('Alex') },
  { from: /<EditableField value=\{profile\?\.full_name \|\| 'Alex Chen'\} onChange=\{\(\)=>{}\}/, to: profileField('Alex Chen') }
]);

console.log("Done");
