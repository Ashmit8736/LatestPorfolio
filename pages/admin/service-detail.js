import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Loader3D from '../../components/common/Loader3D';

const EMPTY = { heading: '', paragraph1: '', paragraph2: '', checklist: '', mediaUrl: '', mediaType: 'image', cardImage1: '', cardImage2: '' };

export default function ServiceDetail() {
  const [formData, setFormData] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  useEffect(() => {
    fetch('/api/portfolio/service-detail').then(res => res.json()).then(data => {
      if (data.data) setFormData({ ...EMPTY, ...data.data });
      setLoading(false);
    });
  }, []);

  const handleMediaChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingField('media');
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
      setUploadingField(null);
    }
  };

  const handleCardImageChange = (field) => async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingField(field);
    try {
      const body = new FormData();
      body.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (res.ok) setFormData(f => ({ ...f, [field]: data.url }));
      else alert('Upload failed: ' + (data.error || 'Unknown error'));
    } catch {
      alert('Upload failed. Please try again.');
    } finally {
      setUploadingField(null);
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

  const anyUploading = !!uploadingField;

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
          <label className="admin-label">Main Photo or Video</label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {formData.mediaUrl && (
              formData.mediaType === 'video' ? (
                <video src={formData.mediaUrl} className="w-40 h-24 rounded-lg object-cover border border-line" muted />
              ) : (
                <img src={formData.mediaUrl} alt="Preview" className="w-40 h-24 rounded-lg object-cover border border-line" />
              )
            )}
            <div className="flex-1 w-full">
              <input type="file" accept="image/*,video/*" onChange={handleMediaChange} disabled={anyUploading} className="admin-input" />
              <p className="text-xs text-muted mt-1.5">Accepted formats: JPG, PNG, or WEBP for a photo; MP4 or WEBM for a video. Landscape 16:8 works best (under 20MB).</p>
              {uploadingField === 'media' && <p className="text-xs text-accent mt-1 font-semibold">Uploading…</p>}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line">
          <div className="pt-4">
            <label className="admin-label">"Our Services" Card Image (light card)</label>
            {formData.cardImage1 && (
              <img src={formData.cardImage1} alt="Our Services preview" className="w-full h-28 object-cover rounded-lg border border-line mb-2" />
            )}
            <input type="file" accept="image/*" onChange={handleCardImageChange('cardImage1')} disabled={anyUploading} className="admin-input" />
            <p className="text-xs text-muted mt-1.5">JPG, PNG, or WEBP. Square-ish works best (under 5MB).</p>
            {uploadingField === 'cardImage1' && <p className="text-xs text-accent mt-1 font-semibold">Uploading…</p>}
          </div>
          <div className="pt-4">
            <label className="admin-label">"User Research" Card Image (dark card)</label>
            {formData.cardImage2 && (
              <img src={formData.cardImage2} alt="User Research preview" className="w-full h-28 object-cover rounded-lg border border-line mb-2" />
            )}
            <input type="file" accept="image/*" onChange={handleCardImageChange('cardImage2')} disabled={anyUploading} className="admin-input" />
            <p className="text-xs text-muted mt-1.5">JPG, PNG, or WEBP. Square-ish works best (under 5MB).</p>
            {uploadingField === 'cardImage2' && <p className="text-xs text-accent mt-1 font-semibold">Uploading…</p>}
          </div>
        </div>

        <button type="submit" disabled={saving || anyUploading} className="admin-btn admin-btn-primary admin-btn-block">
          {saving ? 'Saving…' : 'Save'}
        </button>
      </form>
    </AdminLayout>
  );
}
