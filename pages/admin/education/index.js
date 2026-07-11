import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/portfolio/education').then(res => res.json()).then(data => setItems(data.data || []));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/portfolio/education/${id}`, { method: 'DELETE' });
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Educations</h1>
        <Link href="/admin/education/new" className="px-4 py-2 rounded bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white hover:opacity-90 transition-opacity border-0">Add New</Link>
      </div>
      <div className="overflow-x-auto rounded-lg bg-white/30 backdrop-blur-md border border-white/40 shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/40 border-b border-white/30">
              <th className="p-4 font-semibold text-gray-700">Institution</th>
              <th className="p-4 font-semibold text-gray-700">Degree</th>
              <th className="p-4 font-semibold text-gray-700">Duration</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b border-white/20 hover:bg-white/20">
                <td className="p-4 font-medium">{item.institution}</td>
                <td className="p-4 text-sm text-gray-600">{item.degree}</td>
                <td className="p-4 text-sm text-gray-600">
                  {item.startYear} - {item.endYear || 'Present'}
                </td>
                <td className="p-4 space-x-3 text-right">
                  <Link href={`/admin/education/${item.id}/edit`} className="text-blue-600 hover:underline font-medium">Edit</Link>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline font-medium">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-gray-500">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}