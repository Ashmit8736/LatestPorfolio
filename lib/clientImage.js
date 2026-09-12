// Vercel's serverless functions have a read-only filesystem (except /tmp, which
// doesn't persist or get served publicly), so writing uploads to disk via multer
// (see pages/api/upload.js) only ever works in local dev — it fails silently in
// production. Instead we read the file client-side and store it as a data URI
// directly on the record (fields are @db.LongText), same as Projects already does.

export function compressImage(file, maxWidth = 1000, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = () => reject(new Error('Could not read that image file.'));
    };
    reader.onerror = () => reject(new Error('Could not read that file.'));
  });
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read that file.'));
  });
}
