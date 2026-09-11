import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function New() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) window.location.href = '/admin/skills';
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
          <p className="admin-eyebrow">Skills</p>
          <h1 className="admin-title">Add Skill</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-2xl">
        <div><label className="admin-label">Skill Name</label><input required className="admin-input" placeholder="e.g. React.js" onChange={e => setFormData({...formData, name: e.target.value})} /></div>
        <div>
          <label className="admin-label">Category (Optional)</label>
          <input className="admin-input" placeholder="e.g. Frontend, Backend, Database" onChange={e => setFormData({...formData, category: e.target.value})} />
        </div>
        <button type="submit" className="admin-btn admin-btn-primary admin-btn-block">Save</button>
      </form>
    </AdminLayout>
  );
}
