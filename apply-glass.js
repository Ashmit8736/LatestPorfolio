const fs = require('fs');
const path = require('path');

const glassClass = "bg-white/30 backdrop-blur-md border border-white/40 shadow-xl";
const sidebarGlassClass = "bg-white/20 backdrop-blur-lg border-r border-white/40 shadow-xl text-gray-900";
const oldWhiteBox = "bg-white rounded-xl shadow-sm border border-gray-200";
const oldLoginBox = "bg-white p-8 border border-gray-200 rounded-xl shadow-sm";

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

// 1. AdminLayout main container
replaceInFile('./components/layout/AdminLayout.jsx', [
  [/bg-white rounded-xl shadow-sm border border-gray-200/g, `rounded-xl ${glassClass}`],
  // mobile top bar
  [/bg-gray-900 text-white/g, "bg-white/20 backdrop-blur-lg border-b border-white/40 shadow-sm text-gray-900"],
]);

// 2. AdminSidebar
replaceInFile('./components/layout/AdminSidebar.jsx', [
  [/bg-gray-900 text-white/g, sidebarGlassClass],
  [/hover:bg-gray-800/g, "hover:bg-white/40 hover:text-gray-900"],
]);

// 3. Login Page
replaceInFile('./pages/login.js', [
  [/bg-white p-8 border border-gray-200 rounded-xl shadow-sm/g, `p-8 rounded-xl ${glassClass}`],
  // Also inputs should be slightly transparent or white
  [/bg-white/g, 'bg-white/50'], 
]);

// 4. Tables inside pages/admin (they usually have bg-white rounded-lg shadow-sm border)
function updateAdminPages(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateAdminPages(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath, [
        [/bg-white rounded-lg shadow-sm border/g, `rounded-lg ${glassClass}`],
        [/bg-gray-100 border-b/g, "bg-white/40 border-b border-white/30"], // table header
        [/border-b hover:bg-gray-50/g, "border-b border-white/20 hover:bg-white/20"], // table row
        // forms inside admin might have bg-white
        [/bg-white p-6 rounded-lg shadow-sm border/g, `p-6 rounded-lg ${glassClass}`],
      ]);
    }
  });
}

updateAdminPages('./pages/admin');
updateAdminPages('./components/forms');

