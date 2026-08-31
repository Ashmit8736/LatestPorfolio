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
        // Backgrounds & Glass
        [/bg-white\/\d+/g, 'bg-[#111111]'],
        [/backdrop-blur-[a-z0-9]+/g, ''],
        [/border-white\/\d+/g, 'border-[#333]'],
        [/border-purple-\d+\/\d+/g, 'border-[#333]'],
        
        // Gradients -> Solid Orange
        [/bg-gradient-to-r from-purple-\d+ to-purple-\d+(\/\d+)?/g, 'bg-[#ff5a1f]'],
        [/bg-gradient-to-tr from-purple-\d+\/\d+ to-purple-\d+\/\d+/g, 'bg-[#1a1a1a]'],
        
        // Text Colors
        [/text-purple-900/g, 'text-white'],
        [/text-purple-800\/\d+/g, 'text-gray-400'],
        [/text-purple-800/g, 'text-gray-300'],
        [/text-purple-700/g, 'text-[#ff5a1f]'],
        [/text-purple-600/g, 'text-[#ff5a1f]'],
        
        // Hover States
        [/hover:from-purple-\d+ hover:to-purple-\d+/g, 'hover:bg-[#e04d19]'],
        [/hover:bg-white\/\d+/g, 'hover:bg-[#1a1a1a]'],
        [/hover:text-purple-\d+/g, 'hover:text-[#ff5a1f]'],
        
        // Typography / Font replacements
        // Any "font-black" or "font-bold" for headings should get font-heading
        [/font-black/g, 'font-heading font-normal tracking-widest'],
        [/font-bold/g, 'font-heading font-normal tracking-wider'],
      ]);
    }
  });
}

['./pages/admin', './components/forms', './components/portfolio', './components/layout', './pages'].forEach(dir => {
  processDirectory(dir);
});
