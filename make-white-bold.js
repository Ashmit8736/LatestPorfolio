const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  replacements.forEach(([regex, replacement]) => {
    if (content.match(regex)) {
      content = content.replace(regex, replacement);
      changed = true;
    }
  });

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath, [
        // Text gray -> white bold
        [/text-gray-400/g, 'text-white font-bold'],
        [/text-gray-300/g, 'text-white font-bold'],
        
        // Make normal text bold if it is white
        // Example: text-white mb-2 -> text-white font-bold mb-2
        // Instead of complex regex, let's target specific things:
        [/font-normal/g, 'font-bold'],
        [/font-medium/g, 'font-bold'],
      ]);
    }
  });
}

processDirectory('./components/portfolio');
