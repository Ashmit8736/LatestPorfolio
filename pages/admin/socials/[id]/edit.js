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
          <label className="admin-label">JSON Data</label>
          <textarea required rows="10" className="admin-input admin-code" defaultValue={JSON.stringify(formData, null, 2)} onChange={e => {
            try { setFormData(JSON.parse(e.target.value)) } catch {}
          }}></textarea>
        </div>
        <button type="submit" className="admin-btn admin-btn-primary self-start">Update</button>
      </form>
    </AdminLayout>
  );
}
