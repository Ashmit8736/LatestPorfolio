import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/portfolio/projects').then(res => res.json()).then(data => setItems(data.data || []));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/portfolio/projects/${id}`, { method: 'DELETE' });
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/admin/projects/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add New</Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Project Name</th>
              <th className="p-4 font-semibold text-gray-700">Technology</th>
              <th className="p-4 font-semibold text-gray-700">Description</th>
              <th className="p-4 font-semibold text-gray-700">Live Link</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4 text-sm text-gray-600">{item.techStack}</td>
                <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={item.description}>{item.description}</td>
                <td className="p-4 text-sm">
                  {item.liveUrl ? <a href={item.liveUrl} target="_blank" className="text-blue-600 hover:underline">Link</a> : '-'}
                </td>
                <td className="p-4 space-x-3 text-right">
                  <Link href={`/admin/projects/${item.id}/edit`} className="text-blue-600 hover:underline font-medium">Edit</Link>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline font-medium">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">No items found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}