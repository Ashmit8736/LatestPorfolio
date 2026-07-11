const fs = require('fs');
const path = require('path');

const newGlass = "bg-white/85 backdrop-blur-xl border border-white/50 shadow-2xl text-gray-900";
const oldGlass = "bg-white/30 backdrop-blur-md border border-white/40 shadow-xl";

const newSidebarGlass = "bg-white/85 backdrop-blur-xl border-r border-white/50 shadow-2xl text-gray-900";
const oldSidebarGlass = "bg-white/20 backdrop-blur-lg border-r border-white/40 shadow-xl text-gray-900";

const newMobileTop = "bg-white/85 backdrop-blur-xl border-b border-white/50 shadow-md text-gray-900";
const oldMobileTop = "bg-white/20 backdrop-blur-lg border-b border-white/40 shadow-sm text-gray-900";

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

// 1. AdminLayout
replaceInFile('./components/layout/AdminLayout.jsx', [
  [new RegExp(oldGlass.replace(/[.*+?^$\/()|[\]\\]/g, '\\$&'), 'g'), newGlass],
  [new RegExp(oldMobileTop.replace(/[.*+?^$\/()|[\]\\]/g, '\\$&'), 'g'), newMobileTop],
]);

// 2. AdminSidebar
replaceInFile('./components/layout/AdminSidebar.jsx', [
  [new RegExp(oldSidebarGlass.replace(/[.*+?^$\/()|[\]\\]/g, '\\$&'), 'g'), newSidebarGlass],
  [/hover:bg-white\/40/g, "hover:bg-white/60"],
]);

// 3. Login Page
replaceInFile('./pages/login.js', [
  [new RegExp(oldGlass.replace(/[.*+?^$\/()|[\]\\]/g, '\\$&'), 'g'), newGlass],
  [/bg-white\/50/g, 'bg-white/90'], // inputs
  // fix label colors just in case
  [/text-gray-700/g, 'text-gray-900 font-semibold'], 
]);

// 4. Admin Pages
function updateAdminPages(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateAdminPages(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath, [
        [new RegExp(oldGlass.replace(/[.*+?^$\/()|[\]\\]/g, '\\$&'), 'g'), newGlass],
        [/bg-white\/40 border-b border-white\/30/g, "bg-gray-100/80 border-b border-gray-300 text-black"], // table header
        [/border-b border-white\/20 hover:bg-white\/20/g, "border-b border-gray-200 hover:bg-white/60"], // table row
        // labels
        [/text-gray-700/g, 'text-gray-900 font-semibold'],
      ]);
    }
  });
}

updateAdminPages('./pages/admin');
updateAdminPages('./components/forms');
