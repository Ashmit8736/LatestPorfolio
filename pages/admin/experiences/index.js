import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function List() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/portfolio/experiences').then(res => res.json()).then(data => setItems(data.data || []));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/portfolio/experiences/${id}`, { method: 'DELETE' });
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Experiences</h1>
        <Link href="/admin/experiences/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add New</Link>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-semibold text-gray-700">Company Name</th>
              <th className="p-4 font-semibold text-gray-700">Role</th>
              <th className="p-4 font-semibold text-gray-700">Duration</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{item.companyName}</td>
                <td className="p-4 text-sm text-gray-600">{item.role}</td>
                <td className="p-4 text-sm text-gray-600">
                  {new Date(item.startDate).toLocaleDateString()} - {item.isCurrent ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString() : ''}
                </td>
                <td className="p-4 space-x-3 text-right">
                  <Link href={`/admin/experiences/${item.id}/edit`} className="text-blue-600 hover:underline font-medium">Edit</Link>
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