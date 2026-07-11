import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/portfolio/socials').then(res => res.json()).then(data => setItems(data.data || []));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/portfolio/socials/${id}`, { method: 'DELETE' });
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Social Links</h1>
        <Link href="/admin/socials/new" className="px-4 py-2 rounded bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90 transition-opacity border-0">Add New</Link>
      </div>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex justify-between items-center border p-4 rounded-lg bg-gray-50">
            <div>
              <p className="font-bold text-lg">{item.platform}</p>
              <p className="text-gray-600">{item.url}</p>
            </div>
            <div className="space-x-4">
              <Link href={`/admin/socials/${item.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>No items found.</p>}
      </div>
    </AdminLayout>
  );
}