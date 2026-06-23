const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');

function wrapTitle(text, blockName) {
  return `<EditableField value={block.content?.title || "${text}"} onChange={(val: string) => {\n                  if(isEditor && setBlocks) {\n                    setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, title: val } } : b));\n                  }\n                }} isEditor={isEditor} />`;
}

const updates = {
  'MinimalTemplate.tsx': [
    { from: />About<\/p>/g, to: `>${wrapTitle('About', 'about')}</p>` },
    { from: />Selected Work<\/p>/g, to: `>${wrapTitle('Selected Work', 'projects')}</p>` },
    { from: />Experience<\/p>/g, to: `>${wrapTitle('Experience', 'experience')}</p>` },
    { from: />Expertise<\/p>/g, to: `>${wrapTitle('Expertise', 'skills')}</p>` },
    { from: />Inquiries<\/p>/g, to: `>${wrapTitle('Inquiries', 'contact')}</p>` }
  ],
  'DeveloperTemplate.tsx': [
    { from: />About Me<\/h2>/g, to: `>${wrapTitle('About Me', 'about')}</h2>` },
    { from: />Stack<\/h2>/g, to: `>${wrapTitle('Stack', 'skills')}</h2>` },
    { from: />Education<\/h2>/g, to: `>${wrapTitle('Education', 'education')}</h2>` },
    { from: />Experience<\/h2>/g, to: `>${wrapTitle('Experience', 'experience')}</h2>` },
    { from: />Featured Work<\/h2>/g, to: `>${wrapTitle('Featured Work', 'projects')}</h2>` },
    { from: />Certifications<\/h2>/g, to: `>${wrapTitle('Certifications', 'certifications')}</h2>` }
  ],
  'CreativeTemplate.tsx': [
    { from: />Story<\/motion\.h2>/g, to: `>${wrapTitle('Story', 'about')}</motion.h2>` },
    { from: />Expertise<\/motion\.h2>/g, to: `>${wrapTitle('Expertise', 'skills')}</motion.h2>` },
    { from: />Journey<\/motion\.h2>/g, to: `>${wrapTitle('Journey', 'experience')}</motion.h2>` },
    { from: />Selected Works<\/motion\.h2>/g, to: `>${wrapTitle('Selected Works', 'projects')}</motion.h2>` }
  ],
  'ProfessionalTemplate.tsx': [
    { from: />How I can help<\/h2>/g, to: `>${wrapTitle('How I can help', 'skills')}</h2>` },
    { from: />Featured Case Studies<\/h2>/g, to: `>${wrapTitle('Featured Case Studies', 'projects')}</h2>` },
    { from: />Background<\/h2>/g, to: `>${wrapTitle('Background', 'experience')}</h2>` },
    { from: />Ready to scale\?<\/h2>/g, to: `>${wrapTitle('Ready to scale?', 'contact')}</h2>` }
  ],
  'ExecutiveTemplate.tsx': [
    { from: />Career Trajectory<\/h2>/g, to: `>${wrapTitle('Career Trajectory', 'experience')}</h2>` },
    { from: />Core Competencies<\/h2>/g, to: `>${wrapTitle('Core Competencies', 'skills')}</h2>` },
    { from: />Key Initiatives<\/h2>/g, to: `>${wrapTitle('Key Initiatives', 'projects')}</h2>` }
  ]
};

for (const [file, rules] of Object.entries(updates)) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  for (const rule of rules) {
    content = content.replace(rule.from, rule.to);
  }
  fs.writeFileSync(filePath, content);
  console.log(`Updated headings in ${file}`);
}
