import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';
import Loader3D from '../../../components/common/Loader3D';

export default function List() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/socials')
      .then(res => res.json())
      .then(data => setItems(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/portfolio/socials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setItems(items.filter(i => i.id !== id));
      } else {
        const err = await res.json();
        alert('Failed to delete: ' + (err.message || 'Unknown error'));
      }
    } catch (e) {
      alert('Network error while deleting');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Manage</p>
          <h1 className="admin-title">Social Links</h1>
        </div>
        <Link href="/admin/socials/new" className="admin-btn admin-btn-primary">+ Add New</Link>
      </div>
      {loading ? (
        <div className="admin-card">
          <Loader3D />
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="admin-card p-5 flex flex-wrap justify-between items-center gap-4">
              <div className="min-w-0">
                <p className="font-heading font-bold text-lg text-ink">{item.platform}</p>
                <p className="text-sm text-ink-soft break-all">{item.url}</p>
              </div>
              <div className="admin-actions">
                <Link href={`/admin/socials/${item.id}/edit`} className="admin-action">Edit</Link>
                <button onClick={() => handleDelete(item.id)} className="admin-action admin-action-danger">Delete</button>
              </div>
            </div>
          ))}
          {items.length === 0 && <div className="admin-card admin-empty">No items found.</div>}
        </div>
      )}
    </AdminLayout>
  );
}
