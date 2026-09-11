import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';
import Loader3D from '../../../components/common/Loader3D';

export default function Enquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(data => setItems(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <AdminLayout>
      <div className="admin-header">
        <div>
          <p className="admin-eyebrow">Inbox</p>
          <h1 className="admin-title">Recruiter Enquiries</h1>
        </div>
      </div>
      {loading ? (
        <div className="admin-card">
          <Loader3D />
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="admin-card p-5 sm:p-6">
              <div className="flex flex-wrap justify-between items-start gap-3">
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-lg text-ink">{item.name}</h3>
                  <p className="text-sm text-ink-soft break-all">{item.email}</p>
                </div>
                <button onClick={() => handleDelete(item.id)} className="admin-action admin-action-danger">Delete</button>
              </div>
              <div className="mt-3">
                <span className="admin-chip">{item.company || 'No company'}</span>
              </div>
              <p className="mt-3 text-ink leading-relaxed whitespace-pre-line">{item.message}</p>
            </div>
          ))}
          {items.length === 0 && <div className="admin-card admin-empty">No enquiries yet.</div>}
        </div>
      )}
    </AdminLayout>
  );
}
