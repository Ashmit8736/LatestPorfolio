import { useState, useEffect } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function Enquiries() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/contact').then(res => res.json()).then(data => setItems(data.data || []));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/contact/${id}`, { method: 'DELETE' });
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-heading font-normal tracking-wider mb-6">Recruiter Enquiries</h1>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="border p-4 rounded-lg bg-gray-50">
            <div className="flex justify-between">
              <h3 className="font-heading font-normal tracking-wider text-lg">{item.name} ({item.email})</h3>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
            <p className="text-sm text-[#ff5a1f]/70 mb-2">{item.company || 'No company'}</p>
            <p className="text-gray-800">{item.message}</p>
          </div>
        ))}
        {items.length === 0 && <p>No enquiries yet.</p>}
      </div>
    </AdminLayout>
  );
}