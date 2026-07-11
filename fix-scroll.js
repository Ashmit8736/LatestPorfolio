const fs = require('fs');
const path = require('path');
const dir = './components/portfolio';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Search for <section id=... className=...
  if (content.includes('<section id=')) {
    // We can just inject scroll-mt-20 into the className of the section
    content = content.replace(/(<section[^>]*className=")([^"]+)(")/g, (match, p1, p2, p3) => {
      if (!p2.includes('scroll-mt-20')) {
        return p1 + 'scroll-mt-20 ' + p2 + p3;
      }
      return match;
    });
    
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
});
