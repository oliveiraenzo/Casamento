const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'client', 'public', 'lista-presentes.html');
const imagesDir = path.join(__dirname, '..', 'client', 'public', 'assets', 'images', 'gifts');

if (!fs.existsSync(htmlPath)) {
  console.error('lista-presentes.html not found:', htmlPath);
  process.exit(1);
}
if (!fs.existsSync(imagesDir)) {
  console.error('gifts folder not found:', imagesDir);
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');
const regex = /src="\.\/assets\/images\/gifts\/([^"]+)"/g;
const referenced = new Set();
let m;
while ((m = regex.exec(html)) !== null) {
  referenced.add(m[1]);
}

const files = fs.readdirSync(imagesDir);
const unused = files.filter(f => !referenced.has(f));

if (unused.length === 0) {
  console.log('No unused image files found.');
  process.exit(0);
}

console.log('Found unused images:', unused.length);
unused.forEach(f => {
  const full = path.join(imagesDir, f);
  try {
    fs.unlinkSync(full);
    console.log('Deleted:', f);
  } catch (err) {
    console.error('Failed to delete', f, err.message);
  }
});

console.log('Cleanup complete.');
