import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function New() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio/education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) window.location.href = '/admin/education';
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
          <p className="admin-eyebrow">Education</p>
          <h1 className="admin-title">Add Education</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-2xl">
        <div><label className="admin-label">Institution</label><input required className="admin-input" onChange={e => setFormData({...formData, institution: e.target.value})} /></div>
        <div><label className="admin-label">Degree</label><input required className="admin-input" onChange={e => setFormData({...formData, degree: e.target.value})} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Field of Study</label><input className="admin-input" onChange={e => setFormData({...formData, fieldOfStudy: e.target.value})} /></div>
          <div><label className="admin-label">Score / CGPA</label><input className="admin-input" onChange={e => setFormData({...formData, score: e.target.value})} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Start Year</label><input type="number" className="admin-input" onChange={e => setFormData({...formData, startYear: parseInt(e.target.value)})} /></div>
          <div><label className="admin-label">End Year</label><input type="number" className="admin-input" onChange={e => setFormData({...formData, endYear: parseInt(e.target.value)})} /></div>
        </div>
        <div><label className="admin-label">Description</label><textarea rows="3" className="admin-input" onChange={e => setFormData({...formData, description: e.target.value})}></textarea></div>
        <button type="submit" className="admin-btn admin-btn-primary admin-btn-block">Save</button>
      </form>
    </AdminLayout>
  );
}
