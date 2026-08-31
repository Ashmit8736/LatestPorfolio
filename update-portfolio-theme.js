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

function updatePortfolioPages(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updatePortfolioPages(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath, [
        // Backgrounds (make transparent since Layout handles it)
        [/bg-\[#0a0a0a\]/g, 'bg-transparent'],
        [/bg-\[#050505\]/g, 'bg-transparent'],
        [/bg-\[#111111\]/g, 'bg-transparent'],
        
        // Gradients
        [/from-\[#ff5a1f\] to-orange-400/g, 'from-purple-600 to-purple-400'],
        [/from-\[#ff5a1f\]\/20 to-orange-900\/30/g, 'from-purple-400/20 to-purple-600/30'],
        
        // Text Colors
        [/text-\[#ff5a1f\]/g, 'text-purple-600'],
        [/text-white/g, 'text-purple-900'],
        [/text-gray-400/g, 'text-purple-800/80'],
        [/text-gray-300/g, 'text-purple-800'],
        
        // Borders and Backgrounds for buttons/accents
        [/bg-\[#ff5a1f\]/g, 'bg-gradient-to-r from-purple-600 to-purple-400'],
        [/border-\[#ff5a1f\]/g, 'border-purple-400'],
        [/bg-\[#ff5a1f\]\/10/g, 'bg-purple-600/10'],
        [/border-\[#ff5a1f\]\/20/g, 'border-purple-600/20'],
        [/bg-\[#ff5a1f\]\/20/g, 'bg-purple-600/20'],
        [/hover:bg-\[#e04d19\]/g, 'hover:from-purple-700 hover:to-purple-500'],
        
        // Glass Cards/Panels
        [/bg-white\/5/g, 'bg-white/20'],
        [/border-white\/10/g, 'border-white/50 backdrop-blur-xl shadow-xl'],
        [/hover:bg-white\/10/g, 'hover:bg-white/30'],
      ]);
    }
  });
}

updatePortfolioPages('./components/portfolio');
