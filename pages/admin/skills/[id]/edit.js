import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/layout/AdminLayout';
import Loader3D from '../../../../components/common/Loader3D';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/portfolio/skills/${id}`).then(res => res.json()).then(data => setFormData(data.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/portfolio/skills/${id}`, {
      method: 'PUT',
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

  if (!formData) return <AdminLayout><div className="admin-card"><Loader3D /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Skills</p>
          <h1 className="admin-title">Edit Skill</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-2xl">
        <div><label className="admin-label">Skill Name</label><input required className="admin-input" placeholder="e.g. React.js" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
        <div>
          <label className="admin-label">Category (Optional)</label>
          <input className="admin-input" placeholder="e.g. Frontend, Backend, Database" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
        </div>
        <button type="submit" className="admin-btn admin-btn-primary admin-btn-block">Update</button>
      </form>
    </AdminLayout>
  );
}
