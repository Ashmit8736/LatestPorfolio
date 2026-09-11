import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';
import Loader3D from '../../../components/common/Loader3D';

export default function List() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/portfolio/experiences')
      .then(res => res.json())
      .then(data => setItems(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/portfolio/experiences/${id}`, { method: 'DELETE' });
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
          <h1 className="admin-title">Experiences</h1>
        </div>
        <Link href="/admin/experiences/new" className="admin-btn admin-btn-primary">+ Add New</Link>
      </div>
      <div className="admin-card overflow-x-auto">
        {loading ? <Loader3D /> : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Role</th>
                <th>Duration</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td className="font-semibold">{item.companyName}</td>
                  <td className="admin-cell-muted">{item.role}</td>
                  <td className="admin-cell-muted">
                    {new Date(item.startDate).toLocaleDateString()} - {item.isCurrent ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString() : ''}
                  </td>
                  <td>
                    <div className="admin-actions">
                      <Link href={`/admin/experiences/${item.id}/edit`} className="admin-action">Edit</Link>
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
