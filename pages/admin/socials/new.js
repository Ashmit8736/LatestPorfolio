import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function New() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio/socials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) window.location.href = '/admin/socials';
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
          <p className="admin-eyebrow">Social Links</p>
          <h1 className="admin-title">Add Social Link</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-2xl">
        <div>
          <label className="admin-label">JSON Data</label>
          <textarea required rows="10" className="admin-input admin-code" placeholder="{}" onChange={e => {
            try { setFormData(JSON.parse(e.target.value)) } catch {}
          }}></textarea>
          <p className="text-xs text-muted mt-2">Please enter raw JSON corresponding to the Prisma model fields for simplicity in this generated view.</p>
        </div>
        <button type="submit" className="admin-btn admin-btn-primary self-start">Save</button>
      </form>
    </AdminLayout>
  );
}
