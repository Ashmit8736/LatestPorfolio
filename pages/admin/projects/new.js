import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function New() {
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let uploadedUrl = formData.imageUrl || '';

    if (imageFile) {
      try {
        uploadedUrl = await compressImage(imageFile);
      } catch (err) {
        alert('Image processing failed: ' + err.message);
        setIsUploading(false);
        return;
      }
    }

    const finalData = { ...formData, imageUrl: uploadedUrl };

    const res = await fetch('/api/portfolio/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData)
    });

    setIsUploading(false);
    if (res.ok) window.location.href = '/admin/projects';
    else {
      const err = await res.json().catch(() => null);
      if (res.status === 401) {
        alert('Your session has expired. Please log in again.');
        window.location.href = '/login';
      } else {
        alert(err?.message || 'Error saving');
      }
    }
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Projects</p>
          <h1 className="admin-title">Add Project</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-2xl">
        <div>
          <label className="admin-label">Project Name</label>
          <input type="text" required className="admin-input" placeholder="Project Name" onChange={e => setFormData({ ...formData, title: e.target.value })} />
        </div>
        <div>
          <label className="admin-label">Technologies Used</label>
          <input type="text" required className="admin-input" placeholder="React, Next.js, Tailwind..." onChange={e => setFormData({ ...formData, techStack: e.target.value })} />
        </div>
        <div>
          <label className="admin-label">Description</label>
          <textarea required rows="4" className="admin-input" placeholder="Describe the project..." onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
        </div>
        <div>
          <label className="admin-label">GitHub Link</label>
          <input type="url" className="admin-input" placeholder="https://github.com/..." onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} />
        </div>
        <div>
          <label className="admin-label">Live Link</label>
          <input type="url" className="admin-input" placeholder="https://..." onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} />
        </div>
        <div>
          <label className="admin-label">Project Image</label>

          {imageFile ? (
            <div className="admin-file">
              <span className="truncate">{imageFile.name}</span>
              <button type="button" onClick={() => setImageFile(null)} className="admin-file-remove" aria-label="Remove selected image">✕</button>
            </div>
          ) : (
            <label className="admin-upload">
              <svg className="w-8 h-8 mb-3 text-accent" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-1 text-sm"><span className="font-semibold text-ink">Click to upload</span> an image</p>
              <p className="text-xs">PNG, JPG, WEBP or GIF</p>
              <input type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files[0])} />
            </label>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2.5">
            <input type="checkbox" id="featured" className="admin-check" onChange={e => setFormData({ ...formData, featured: e.target.checked })} />
            <label htmlFor="featured" className="text-sm font-semibold text-ink cursor-pointer">Featured Project</label>
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="type" className="text-sm font-semibold text-ink">Project Type:</label>
            <select id="type" className="admin-input w-auto" value={formData.type || 'personal'} onChange={e => setFormData({ ...formData, type: e.target.value })}>
              <option value="personal">Personal Project</option>
              <option value="company">Company Project</option>
            </select>
          </div>
        </div>
        <div className="pt-2">
          <button type="submit" disabled={isUploading} className="admin-btn admin-btn-primary admin-btn-block">
            {isUploading ? 'Saving...' : 'Save Project'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
