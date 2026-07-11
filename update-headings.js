const fs = require('fs');
const path = require('path');
const dir = './components/portfolio';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (file === 'HeroSection.jsx') return;
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace heading text-white with orange gradient
  content = content.replace(/className="text-4xl font-bold text-white mb-4"/g, 'className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#ff5a1f] to-orange-400 bg-clip-text text-transparent mb-4 uppercase tracking-tighter"');
  
  // Replace blue underline bar with orange
  content = content.replace(/bg-blue-500 mx-auto/g, 'bg-gradient-to-r from-[#ff5a1f] to-orange-400 mx-auto');
  
  // Replace other blue elements in portfolio sections with orange
  content = content.replace(/bg-blue-500\/20/g, 'bg-[#ff5a1f]/20');
  content = content.replace(/bg-blue-600/g, 'bg-[#ff5a1f]');
  content = content.replace(/hover:bg-blue-700/g, 'hover:bg-[#e04d19]');
  content = content.replace(/text-blue-500/g, 'text-[#ff5a1f]');
  content = content.replace(/text-blue-400/g, 'text-[#ff5a1f]');
  content = content.replace(/border-blue-500/g, 'border-[#ff5a1f]');
  content = content.replace(/ring-blue-500/g, 'ring-[#ff5a1f]');
  content = content.replace(/shadow-\[0_0_20px_-5px_rgba\(37,99,235,0.4\)\]/g, 'shadow-[0_0_20px_-5px_rgba(255,90,31,0.4)]');
  
  fs.writeFileSync(filePath, content);
  console.log('Updated ' + file);
});
