import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Loader3D from '../../components/common/Loader3D';

export default function Profile() {
  const [formData, setFormData] = useState({ fullName: '', headline: '', shortBio: '', about: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/profile').then(res => res.json()).then(data => {
      if (data.data) setFormData(data.data);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/portfolio/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    alert('Profile saved!');
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
        <button type="submit" className="admin-btn admin-btn-primary admin-btn-block">Save Profile</button>
      </form>
    </AdminLayout>
  );
}
