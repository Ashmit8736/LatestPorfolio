import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';

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

  if (loading) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Manage Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">Full Name</label><input required value={formData.fullName || ''} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full border p-2 rounded" /></div>
          <div><label className="block mb-1 font-medium">Headline</label><input required value={formData.headline || ''} onChange={e => setFormData({...formData, headline: e.target.value})} className="w-full border p-2 rounded" /></div>
        </div>
        <div><label className="block mb-1 font-medium">Short Bio</label><textarea required rows="2" value={formData.shortBio || ''} onChange={e => setFormData({...formData, shortBio: e.target.value})} className="w-full border p-2 rounded" /></div>
        <div><label className="block mb-1 font-medium">About</label><textarea required rows="5" value={formData.about || ''} onChange={e => setFormData({...formData, about: e.target.value})} className="w-full border p-2 rounded" /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">Location</label><input value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full border p-2 rounded" /></div>
          <div><label className="block mb-1 font-medium">Email</label><input type="email" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border p-2 rounded" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">Phone</label><input value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border p-2 rounded" /></div>
          <div><label className="block mb-1 font-medium">Resume URL</label><input value={formData.resumeUrl || ''} onChange={e => setFormData({...formData, resumeUrl: e.target.value})} className="w-full border p-2 rounded" /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">GitHub URL</label><input value={formData.githubUrl || ''} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full border p-2 rounded" /></div>
          <div><label className="block mb-1 font-medium">LinkedIn URL</label><input value={formData.linkedinUrl || ''} onChange={e => setFormData({...formData, linkedinUrl: e.target.value})} className="w-full border p-2 rounded" /></div>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full">Save Profile</button>
      </form>
    </AdminLayout>
  );
}