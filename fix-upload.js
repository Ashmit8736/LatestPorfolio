const fs = require('fs');

const compressImageCode = `
    const compressImage = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = event => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxWidth = 800;
            const scaleSize = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.8));
          };
          img.onerror = reject;
        };
        reader.onerror = reject;
      });
    };
`;

const replaceUploadLogic = (filePath) => {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Inject compressImage function right before handleSubmit
  if (!content.includes('const compressImage =')) {
    content = content.replace('const handleSubmit = async', compressImageCode + '\n  const handleSubmit = async');
  }

  // Replace fetch('/api/upload') logic with compression
  const oldLogic = `      const uploadData = new FormData();
      uploadData.append('image', imageFile);

      try {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });
        if (!uploadRes.ok) throw new Error('Upload failed');
        const { url } = await uploadRes.json();
        uploadedUrl = url;
      } catch (err) {
        alert('Image upload failed: ' + err.message);
        setIsUploading(false);
        return;
      }`;

  const newLogic = `      try {
        uploadedUrl = await compressImage(imageFile);
      } catch (err) {
        alert('Image processing failed: ' + err.message);
        setIsUploading(false);
        return;
      }`;

  content = content.replace(oldLogic, newLogic);
  fs.writeFileSync(filePath, content);
  console.log('Fixed uploads in', filePath);
};

replaceUploadLogic('./pages/admin/projects/new.js');
replaceUploadLogic('./pages/admin/projects/[id]/edit.js');

