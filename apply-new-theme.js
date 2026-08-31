const fs = require('fs');
const path = require('path');

const newGlassClass = "bg-white/20 backdrop-blur-xl border border-white/50 shadow-2xl";
const tableHeaderClass = "bg-white/30 border-b border-white/30 text-purple-900";
const tableRowClass = "border-b border-white/20 hover:bg-white/30 transition-colors";
const purpleBtn = "bg-gradient-to-r from-purple-600 to-purple-400 text-white shadow-lg hover:from-purple-700 hover:to-purple-500";

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

function updateAdminPages(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateAdminPages(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath, [
        [/bg-white\/30 backdrop-blur-md border border-white\/40 shadow-xl/g, newGlassClass],
        [/bg-white rounded-lg shadow-sm border/g, `rounded-2xl ${newGlassClass}`],
        [/rounded-lg bg-white\/30 backdrop-blur-md border border-white\/40 shadow-xl/g, `rounded-2xl ${newGlassClass}`],
        [/bg-white\/40 border-b border-white\/30/g, tableHeaderClass],
        [/border-b border-white\/20 hover:bg-white\/20/g, tableRowClass],
        [/p-6 rounded-lg bg-white\/30 backdrop-blur-md border border-white\/40 shadow-xl/g, `p-6 rounded-2xl ${newGlassClass}`],
        [/bg-gradient-to-r from-\[#833ab4\] via-\[#fd1d1d\] to-\[#fcb045\]/g, purpleBtn],
        [/text-gray-900/g, "text-purple-900"],
        [/text-gray-500/g, "text-purple-700/70"],
        [/text-gray-600/g, "text-purple-800/80"],
      ]);
    }
  });
}

updateAdminPages('./pages/admin');
updateAdminPages('./components/forms');
