import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/portfolio/skills').then(res => res.json()).then(data => setItems(data.data || []));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      const res = await fetch(`/api/portfolio/skills/${id}`, { method: 'DELETE' });
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-heading font-normal tracking-wider">Skills</h1>
        <Link href="/admin/skills/new" className="px-4 py-2 rounded bg-[#ff5a1f] text-white shadow-lg hover:bg-[#e04d19] text-white hover:opacity-90 transition-opacity border-0">Add New</Link>
      </div>
      <div className="overflow-x-auto rounded-lg bg-[#111111]  border border-[#333] shadow-2xl text-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100/80 border-b border-gray-300 text-black">
              <th className="p-4 font-semibold text-white font-semibold">Skill Name</th>
              <th className="p-4 font-semibold text-white font-semibold">Category</th>
              <th className="p-4 font-semibold text-white font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-[#111111]">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 text-sm text-gray-400">
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-semibold">{item.category}</span>
                </td>
                <td className="p-4 space-x-3 text-right">
                  <Link href={`/admin/skills/${item.id}/edit`} className="text-blue-600 hover:underline font-medium">Edit</Link>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline font-medium">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="3" className="p-8 text-center text-[#ff5a1f]/70">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}