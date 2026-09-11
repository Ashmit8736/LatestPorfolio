import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import { INDUSTRY_ICONS } from '../../../lib/iconRegistry';

const ICON_NAMES = Object.keys(INDUSTRY_ICONS);

export default function New() {
  const [formData, setFormData] = useState({ title: '', icon: 'Building2', description: '', order: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio/industries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, order: Number(formData.order) || 0 })
    });
    if (res.ok) window.location.href = '/admin/industries';
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
          <p className="admin-eyebrow">Industries</p>
          <h1 className="admin-title">Add Industry</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-2xl">
        <div>
          <label className="admin-label">Title</label>
          <input required className="admin-input" placeholder="e.g. E-Commerce" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Icon</label>
            <select className="admin-input" value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })}>
              {ICON_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div>
            <label className="admin-label">Display Order</label>
            <input type="number" className="admin-input" value={formData.order} onChange={e => setFormData({ ...formData, order: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="admin-label">Description</label>
          <textarea required rows="3" className="admin-input" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
        </div>
        <button type="submit" className="admin-btn admin-btn-primary self-start">Save</button>
      </form>
    </AdminLayout>
  );
}
