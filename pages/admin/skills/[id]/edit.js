import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/layout/AdminLayout';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/portfolio/skills/${id}`).then(res => res.json()).then(data => setFormData(data.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/portfolio/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) window.location.href = '/admin/skills';
    else alert('Error saving');
  };

  if (!formData) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Skill</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl p-6 rounded-lg bg-white/30 backdrop-blur-md border border-white/40 shadow-xl">
        <div><label className="block mb-1 font-medium">Skill Name</label><input required className="w-full border p-2 rounded" placeholder="e.g. React.js" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
        <div>
          <label className="block mb-1 font-medium">Category (Optional)</label>
          <input className="w-full border p-2 rounded" placeholder="e.g. Frontend, Backend, Database" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full">Update</button>
      </form>
    </AdminLayout>
  );
}