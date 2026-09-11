import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Loader3D from '../../components/common/Loader3D';

export default function ServiceDetail() {
  const [formData, setFormData] = useState({ heading: '', paragraph1: '', paragraph2: '', checklist: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/service-detail').then(res => res.json()).then(data => {
      if (data.data) setFormData({ heading: '', paragraph1: '', paragraph2: '', checklist: '', ...data.data });
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <button type="submit" className="admin-btn admin-btn-primary admin-btn-block">Save</button>
      </form>
    </AdminLayout>
  );
}
