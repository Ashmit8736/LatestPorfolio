import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/layout/AdminLayout';

export default function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/portfolio/education/${id}`).then(res => res.json()).then(data => setFormData(data.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/portfolio/education/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) window.location.href = '/admin/education';
    else alert('Error saving');
  };

  if (!formData) return <AdminLayout>Loading...</AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Edit Education</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl p-6 rounded-lg bg-white/30 backdrop-blur-md border border-white/40 shadow-xl">
        <div><label className="block mb-1 font-medium">Institution</label><input required className="w-full border p-2 rounded" value={formData.institution || ''} onChange={e => setFormData({...formData, institution: e.target.value})} /></div>
        <div><label className="block mb-1 font-medium">Degree</label><input required className="w-full border p-2 rounded" value={formData.degree || ''} onChange={e => setFormData({...formData, degree: e.target.value})} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">Field of Study</label><input className="w-full border p-2 rounded" value={formData.fieldOfStudy || ''} onChange={e => setFormData({...formData, fieldOfStudy: e.target.value})} /></div>
          <div><label className="block mb-1 font-medium">Score / CGPA</label><input className="w-full border p-2 rounded" value={formData.score || ''} onChange={e => setFormData({...formData, score: e.target.value})} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">Start Year</label><input type="number" className="w-full border p-2 rounded" value={formData.startYear || ''} onChange={e => setFormData({...formData, startYear: parseInt(e.target.value)})} /></div>
          <div><label className="block mb-1 font-medium">End Year</label><input type="number" className="w-full border p-2 rounded" value={formData.endYear || ''} onChange={e => setFormData({...formData, endYear: parseInt(e.target.value)})} /></div>
        </div>
        <div><label className="block mb-1 font-medium">Description</label><textarea rows="3" className="w-full border p-2 rounded" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})}></textarea></div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full">Update</button>
      </form>
    </AdminLayout>
  );
}