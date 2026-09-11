import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function New() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio/experiences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) window.location.href = '/admin/experiences';
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
          <p className="admin-eyebrow">Experiences</p>
          <h1 className="admin-title">Add Experience</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-2xl">
        <div><label className="admin-label">Company Name</label><input required className="admin-input" onChange={e => setFormData({...formData, companyName: e.target.value})} /></div>
        <div><label className="admin-label">Role</label><input required className="admin-input" onChange={e => setFormData({...formData, role: e.target.value})} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Employment Type</label><input className="admin-input" onChange={e => setFormData({...formData, employmentType: e.target.value})} /></div>
          <div><label className="admin-label">Location</label><input className="admin-input" onChange={e => setFormData({...formData, location: e.target.value})} /></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className="admin-label">Start Date</label><input type="date" required className="admin-input" onChange={e => setFormData({...formData, startDate: new Date(e.target.value).toISOString()})} /></div>
          <div><label className="admin-label">End Date</label><input type="date" className="admin-input" onChange={e => setFormData({...formData, endDate: e.target.value ? new Date(e.target.value).toISOString() : null})} /></div>
        </div>
        <div className="flex items-center gap-2.5">
          <input type="checkbox" id="isCurrent" className="admin-check" onChange={e => setFormData({...formData, isCurrent: e.target.checked})} />
          <label htmlFor="isCurrent" className="text-sm font-semibold text-ink cursor-pointer">Currently Working Here</label>
        </div>
        <div><label className="admin-label">Description</label><textarea required rows="4" className="admin-input" onChange={e => setFormData({...formData, description: e.target.value})}></textarea></div>
        <button type="submit" className="admin-btn admin-btn-primary admin-btn-block">Save</button>
      </form>
    </AdminLayout>
  );
}
