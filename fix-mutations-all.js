const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Also fix the ones that don't have .value or .href
  // Replace:
  // const newBlocks = [...activeBlocks];
  // newBlocks[index].content = {...newBlocks[index].content, about: val};
  // setBlocks(newBlocks);
  
  // This is a more robust replacement
  content = content.replace(/const newBlocks = \[\.\.\.activeBlocks\];\s*newBlocks\[index\]\.content = \{\.\.\.newBlocks\[index\]\.content,\s*([^:]+):\s*([^}]+)\};\s*setBlocks\(newBlocks\);/g, 
    "setBlocks(activeBlocks.map((b: any, i: number) => i === index ? { ...b, content: { ...b.content, $1: $2 } } : b));");

  fs.writeFileSync(filePath, content);
}

console.log("Fixed all mutations");
