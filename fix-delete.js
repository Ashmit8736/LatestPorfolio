const fs = require('fs');
const path = require('path');

function fixDeleteInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace old handleDelete with a robust one
  const oldHandleDeleteRegex = /const handleDelete = async \(id\) => \{\s+if \(!confirm\('Are you sure\?'\)\) return;\s+await fetch\(`\/api\/portfolio\/[a-z]+\/\$\{id\}`,\s*\{ method: 'DELETE' \}\);\s+setItems\(items\.filter\(i => i\.id !== id\)\);\s+\};/g;

  if (content.match(oldHandleDeleteRegex)) {
    content = content.replace(oldHandleDeleteRegex, (match) => {
      // Extract the fetch URL
      const fetchUrlMatch = match.match(/fetch\(`([^`]+)`/);
      if (!fetchUrlMatch) return match;
      const fetchUrl = fetchUrlMatch[1];
      
      return `const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(\`${fetchUrl}\`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter(i => i.id !== id));
      } else {
        const err = await res.json();
        alert('Failed to delete: ' + (err.message || 'Unknown error'));
      }
    } catch (e) {
      alert('Network error while deleting');
    }
  };`;
    });
    fs.writeFileSync(filePath, content);
    console.log('Fixed handleDelete in', filePath);
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
      fixDeleteInFile(fullPath);
    }
  });
}

processDir('./pages/admin');
