const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace emerald
      content = content.replace(/emerald-400/g, '[#ff5a1f]');
      content = content.replace(/emerald-500/g, '[#ff5a1f]');
      
      // Replace purple
      content = content.replace(/purple-400/g, '[#ff5a1f]');
      content = content.replace(/purple-500/g, '[#ff5a1f]');

      fs.writeFileSync(fullPath, content);
      console.log('Updated ' + fullPath);
    }
  });
}

processDir('./components');
