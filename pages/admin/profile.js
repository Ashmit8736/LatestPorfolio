import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Loader3D from '../../components/common/Loader3D';

export default function Profile() {
  const [formData, setFormData] = useState({ fullName: '', headline: '', shortBio: '', about: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio/profile').then(res => res.json()).then(data => {
      if (data.data) setFormData(data.data);
      setLoading(false);
    });
  }, []);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingPhoto(true);
    try {
      const body = new FormData();
      body.append('image', file);
      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();
      if (res.ok) setFormData(f => ({ ...f, profileImage: data.url }));
      else alert('Photo upload failed: ' + (data.error || 'Unknown error'));
    } catch {
      alert('Photo upload failed. Please try again.');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) alert('Profile saved!');
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

  if (loading) return <AdminLayout><div className="admin-card"><Loader3D label="Loading profile" /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Portfolio</p>
          <h1 className="admin-title">Manage Profile</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-3xl">
        <div>
          <label className="admin-label">Profile Photo</label>
          <div className="flex items-center gap-4">
            {formData.profileImage && (
              <img src={formData.profileImage} alt="Profile preview" className="w-16 h-16 rounded-full object-cover border border-line" />
            )}
            <div className="flex-1">
              <input type="file" accept="image/*" onChange={handlePhotoChange} disabled={uploadingPhoto} className="admin-input" />
              <p className="text-xs text-muted mt-1.5">Accepted formats: JPG, PNG, or WEBP. Square photos work best (recommended 800×800px, under 5MB).</p>
              {uploadingPhoto && <p className="text-xs text-accent mt-1 font-semibold">Uploading…</p>}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Full Name</label><input required value={formData.fullName || ''} onChange={e => setFormData({...formData, fullName: e.target.value})} className="admin-input" /></div>
          <div><label className="admin-label">Headline</label><input required value={formData.headline || ''} onChange={e => setFormData({...formData, headline: e.target.value})} className="admin-input" /></div>
        </div>
        <div><label className="admin-label">Short Bio</label><textarea required rows="2" value={formData.shortBio || ''} onChange={e => setFormData({...formData, shortBio: e.target.value})} className="admin-input" /></div>
        <div><label className="admin-label">About</label><textarea required rows="5" value={formData.about || ''} onChange={e => setFormData({...formData, about: e.target.value})} className="admin-input" /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Location</label><input value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="admin-input" /></div>
          <div><label className="admin-label">Email</label><input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="admin-input" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Phone</label><input value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="admin-input" /></div>
          <div><label className="admin-label">Resume URL</label><input value={formData.resumeUrl || ''} onChange={e => setFormData({...formData, resumeUrl: e.target.value})} className="admin-input" /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">GitHub URL</label><input value={formData.githubUrl || ''} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="admin-input" /></div>
          <div><label className="admin-label">LinkedIn URL</label><input value={formData.linkedinUrl || ''} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} className="admin-input" /></div>
        </div>
        <button type="submit" disabled={saving || uploadingPhoto} className="admin-btn admin-btn-primary admin-btn-block">
          {saving ? 'Saving…' : 'Save Profile'}
        </button>
      </form>
    </AdminLayout>
  );
}
