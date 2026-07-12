import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/layout/AdminLayout';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/portfolio/projects/${id}`).then(res => res.json()).then(data => setFormData(data.data));
  }, [id]);

  
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

    const res = await fetch(`/api/portfolio/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalData)
    });
    
    setIsUploading(false);
    if (res.ok) window.location.href = '/admin/projects';
    else alert('Error saving');
  };

  if (!formData) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl p-6 rounded-lg bg-white/85 backdrop-blur-xl border border-white/50 shadow-2xl text-gray-900">
        <div>
          <label className="block mb-1 font-medium text-gray-900 font-semibold">Project Name</label>
          <input type="text" required className="w-full border p-2 rounded" placeholder="Project Name" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900 font-semibold">Technologies Used</label>
          <input type="text" required className="w-full border p-2 rounded" placeholder="React, Next.js, Tailwind..." value={formData.techStack || ''} onChange={e => setFormData({ ...formData, techStack: e.target.value })} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900 font-semibold">Description</label>
          <textarea required rows="4" className="w-full border p-2 rounded" placeholder="Describe the project..." value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900 font-semibold">GitHub Link</label>
          <input type="url" className="w-full border p-2 rounded" placeholder="https://github.com/..." value={formData.githubUrl || ''} onChange={e => setFormData({ ...formData, githubUrl: e.target.value })} />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-900 font-semibold">Live Link</label>
          <input type="url" className="w-full border p-2 rounded" placeholder="https://..." value={formData.liveUrl || ''} onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} />
        </div>
        <div>
          <label className="block mb-2 font-medium text-gray-900 font-semibold">Project Image</label>
          
          {formData.imageUrl && !imageFile && (
            <div className="mb-4">
              <span className="text-sm text-gray-500 block mb-1">Current Image:</span>
              <img src={formData.imageUrl} alt="Current" className="h-32 w-auto rounded border object-cover" />
            </div>
          )}

          {imageFile ? (
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-sm font-medium text-blue-700 truncate">New file selected: {imageFile.name}</span>
              <button type="button" onClick={() => setImageFile(null)} className="text-blue-700 hover:text-blue-900 font-bold px-2">✕</button>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                  <svg className="w-8 h-8 mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-1 text-sm"><span className="font-semibold text-blue-600">Click to upload</span> a new image</p>
                  <p className="text-xs text-gray-500">PNG, JPG, WEBP or GIF</p>
                </div>
                <input type="file" accept="image/*" className="hidden" onChange={e => setImageFile(e.target.files[0])} />
              </label>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 mt-4">
          <input type="checkbox" id="featured" checked={!!formData.featured} onChange={e => setFormData({ ...formData, featured: e.target.checked })} />
          <label htmlFor="featured" className="font-medium text-gray-900 font-semibold">Featured Project</label>
        </div>
        <div className="pt-4">
          <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full disabled:opacity-50">
            {isUploading ? 'Updating...' : 'Update Project'}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}