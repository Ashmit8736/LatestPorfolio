import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';
import Loader3D from '../../../components/common/Loader3D';

export default function List() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/services')
      .then(res => res.json())
      .then(data => setItems(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/portfolio/services/${id}`, { method: 'DELETE' });
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
          <h1 className="admin-title">Services</h1>
          <p className="admin-subtitle">The "How I Bring Ideas to Life" list on the homepage.</p>
        </div>
        <Link href="/admin/services/new" className="admin-btn admin-btn-primary">+ Add New</Link>
      </div>
      <div className="admin-card overflow-x-auto">
        {loading ? <Loader3D /> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Title</th>
                <th>Tags</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.order}</td>
                  <td className="font-semibold">{item.title}</td>
                  <td className="admin-cell-muted">{item.tags}</td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/services/${item.id}/edit`} className="admin-action">Edit</Link>
                      <button onClick={() => handleDelete(item.id)} className="admin-action admin-action-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="admin-empty">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
