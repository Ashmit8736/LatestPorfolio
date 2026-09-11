import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Loader3D from '../../components/common/Loader3D';

export default function ServiceDetail() {
  const [formData, setFormData] = useState({ heading: '', paragraph1: '', paragraph2: '', checklist: '', mediaUrl: '', mediaType: 'image' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio/service-detail').then(res => res.json()).then(data => {
      if (data.data) setFormData({ heading: '', paragraph1: '', paragraph2: '', checklist: '', mediaUrl: '', mediaType: 'image', ...data.data });
      setLoading(false);
    });
  }, []);

  const handleMediaChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingMedia(true);
    try {
      const body = new FormData();
      body.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (res.ok) {
        setFormData(f => ({ ...f, mediaUrl: data.url, mediaType: file.type.startsWith('video/') ? 'video' : 'image' }));
      } else {
        alert('Upload failed: ' + (data.error || 'Unknown error'));
      }
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingMedia(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio/service-detail', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) alert('Saved!');
      else {
        const err = await res.json().catch(() => null);
        if (res.status === 401) {
          alert('Your session has expired. Please log in again.');
          window.location.href = '/login';
        } else {
          alert(err?.message || 'Error saving');
        }
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLayout><div className="admin-card"><Loader3D label="Loading" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Homepage Content</p>
          <h1 className="admin-title">Service Detail Section</h1>
          <p className="admin-subtitle">The "About Website & App Development Services" block that sits between Services and Industries.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-3xl">
        <div>
          <label className="admin-label">Photo or Video</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {formData.mediaUrl && (
              formData.mediaType === 'video' ? (
                <video src={formData.mediaUrl} className="w-40 h-24 rounded-lg object-cover border border-line" muted />
              ) : (
                <img src={formData.mediaUrl} alt="Preview" className="w-40 h-24 rounded-lg object-cover border border-line" />
              )
            )}
            <div className="flex-1 w-full">
              <input type="file" accept="image/*,video/*" onChange={handleMediaChange} disabled={uploadingMedia} className="admin-input" />
              <p className="text-xs text-muted mt-1.5">Accepted formats: JPG, PNG, or WEBP for a photo; MP4 or WEBM for a video. Landscape 16:8 works best (under 20MB).</p>
              {uploadingMedia && <p className="text-xs text-accent mt-1 font-semibold">Uploading…</p>}
            </div>
          </div>
        </div>
        <div>
          <label className="admin-label">Heading</label>
          <input required className="admin-input" value={formData.heading} onChange={e => setFormData({ ...formData, heading: e.target.value })} />
        </div>
        <div>
          <label className="admin-label">Paragraph 1</label>
          <textarea required rows="3" className="admin-input" value={formData.paragraph1} onChange={e => setFormData({ ...formData, paragraph1: e.target.value })}></textarea>
        </div>
        <div>
          <label className="admin-label">Paragraph 2</label>
          <textarea required rows="4" className="admin-input" value={formData.paragraph2} onChange={e => setFormData({ ...formData, paragraph2: e.target.value })}></textarea>
        </div>
        <div>
          <label className="admin-label">"Services Include" Checklist (comma separated)</label>
          <textarea required rows="3" className="admin-input" value={formData.checklist} onChange={e => setFormData({ ...formData, checklist: e.target.value })}></textarea>
        </div>
        <button type="submit" disabled={saving || uploadingMedia} className="admin-btn admin-btn-primary admin-btn-block">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </AdminLayout>
  );
}
