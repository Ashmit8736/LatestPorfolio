import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';
import Loader3D from '../../../components/common/Loader3D';

export default function List() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/projects')
      .then(res => res.json())
      .then(data => setItems(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/portfolio/projects/${id}`, { method: 'DELETE' });
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
          <h1 className="admin-title">Projects</h1>
        </div>
        <Link href="/admin/projects/new" className="admin-btn admin-btn-primary">+ Add New</Link>
      </div>
      <div className="admin-card overflow-x-auto">
        {loading ? <Loader3D /> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project Name</th>
                <th>Technology</th>
                <th>Description</th>
                <th>Live Link</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td className="font-semibold">{item.title}</td>
                  <td className="admin-cell-muted">{item.techStack}</td>
                  <td className="admin-cell-muted max-w-[14rem] truncate" title={item.description}>{item.description}</td>
                  <td>
                    {item.liveUrl ? <a href={item.liveUrl} target="_blank" rel="noreferrer" className="admin-link">Link</a> : <span className="text-muted">-</span>}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/projects/${item.id}/edit`} className="admin-action">Edit</Link>
                      <button onClick={() => handleDelete(item.id)} className="admin-action admin-action-danger">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan="5" className="admin-empty">No items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
