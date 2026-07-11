import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function New() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio/socials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) window.location.href = '/admin/socials';
    else alert('Error saving');
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Add Social Link</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-medium text-gray-900 font-semibold">JSON Data</label>
          <textarea required rows="10" className="w-full border p-2 rounded font-mono text-sm" placeholder="{}" onChange={e => {
            try { setFormData(JSON.parse(e.target.value)) } catch {}
          }}></textarea>
          <p className="text-xs text-gray-500 mt-1">Please enter raw JSON corresponding to the Prisma model fields for simplicity in this generated view.</p>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Save</button>
      </form>
    </AdminLayout>
  );
}