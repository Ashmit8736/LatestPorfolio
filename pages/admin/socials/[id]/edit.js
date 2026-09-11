import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/layout/AdminLayout';
import Loader3D from '../../../../components/common/Loader3D';

const PLATFORMS = ['GitHub', 'LinkedIn', 'Facebook', 'Twitter', 'Instagram', 'Threads', 'YouTube', 'Other'];

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/portfolio/socials/${id}`).then(res => res.json()).then(data => setFormData(data.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/portfolio/socials/${id}`, {
      method: 'PUT',
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

  if (!formData) return <AdminLayout><div className="admin-card"><Loader3D /></div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Social Links</p>
          <h1 className="admin-title">Edit Social Link</h1>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="admin-card admin-form max-w-2xl">
        <div>
          <label className="admin-label">Platform</label>
          <select required className="admin-input" value={formData.platform || ''} onChange={e => setFormData({ ...formData, platform: e.target.value })}>
            <option value="" disabled>Select a platform</option>
            {PLATFORMS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div>
          <label className="admin-label">Profile URL</label>
          <input required type="url" className="admin-input" value={formData.url || ''} onChange={e => setFormData({ ...formData, url: e.target.value })} />
        </div>
        <button type="submit" className="admin-btn admin-btn-primary self-start">Update</button>
      </form>
    </AdminLayout>
  );
}
