const fs = require('fs');
const path = require('path');

const buttonGradient = 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90 transition-opacity border-0';
const bgGradient = 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]';

function updateFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // login.js specific background
  if (filePath.includes('login.js')) {
    if (content.includes('bg-gray-50')) {
      content = content.replace('bg-gray-50', bgGradient);
      changed = true;
    }
  }

  // Replace buttons
  const blueBtnRegex = /bg-blue-600\s+text-white\s+(?:font-medium\s+)?px-4\s+py-2\s+rounded(-[a-z]+)?\s+hover:bg-blue-700/g;
  if (blueBtnRegex.test(content)) {
    content = content.replace(blueBtnRegex, `px-4 py-2 rounded$1 ${buttonGradient}`);
    changed = true;
  }
  
  const py3BtnRegex = /bg-blue-600\s+text-white\s+font-medium\s+py-3\s+rounded(-[a-z]+)?\s+hover:bg-blue-700\s+transition/g;
  if (py3BtnRegex.test(content)) {
    content = content.replace(py3BtnRegex, `font-medium py-3 rounded$1 ${buttonGradient}`);
    changed = true;
  }

  const grayBtnRegex = /bg-gray-900\s+text-white\s+font-medium\s+py-2\s+rounded(-[a-z]+)?\s+hover:bg-black\s+transition/g;
  if (grayBtnRegex.test(content)) {
    content = content.replace(grayBtnRegex, `font-medium py-2 rounded$1 ${buttonGradient}`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log('Updated', filePath);
  }
}

function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      updateFile(fullPath);
    }
  });
}

processDir('./pages/admin');
processDir('./components/forms');
updateFile('./pages/login.js');
