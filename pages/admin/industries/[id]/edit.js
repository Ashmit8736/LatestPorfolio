import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/layout/AdminLayout';
import Loader3D from '../../../../components/common/Loader3D';
import { INDUSTRY_ICONS } from '../../../../lib/iconRegistry';

const ICON_NAMES = Object.keys(INDUSTRY_ICONS);

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/portfolio/industries/${id}`).then(res => res.json()).then(data => setFormData(data.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/portfolio/industries/${id}`, {
      method: 'PUT',
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

  if (!formData) return <AdminLayout><div className="admin-card"><Loader3D /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Industries</p>
          <h1 className="admin-title">Edit Industry</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-2xl">
        <div>
          <label className="admin-label">Title</label>
          <input required className="admin-input" value={formData.title || ''} onChange={e => setFormData({ ...formData, title: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="admin-label">Icon</label>
            <select className="admin-input" value={formData.icon || 'Building2'} onChange={e => setFormData({ ...formData, icon: e.target.value })}>
              {ICON_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>
          <div>
            <label className="admin-label">Display Order</label>
            <input type="number" className="admin-input" value={formData.order ?? 0} onChange={e => setFormData({ ...formData, order: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="admin-label">Description</label>
          <textarea required rows="3" className="admin-input" value={formData.description || ''} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
        </div>
        <button type="submit" className="admin-btn admin-btn-primary self-start">Update</button>
      </form>
    </AdminLayout>
  );
}
