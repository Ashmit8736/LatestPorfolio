import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function New() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio/education', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) window.location.href = '/admin/education';
    else alert('Error saving');
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Add Education</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl bg-white p-6 rounded-lg shadow-sm border">
        <div><label className="block mb-1 font-medium">Institution</label><input required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, institution: e.target.value})} /></div>
        <div><label className="block mb-1 font-medium">Degree</label><input required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, degree: e.target.value})} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">Field of Study</label><input className="w-full border p-2 rounded" onChange={e => setFormData({...formData, fieldOfStudy: e.target.value})} /></div>
          <div><label className="block mb-1 font-medium">Score / CGPA</label><input className="w-full border p-2 rounded" onChange={e => setFormData({...formData, score: e.target.value})} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">Start Year</label><input type="number" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, startYear: parseInt(e.target.value)})} /></div>
          <div><label className="block mb-1 font-medium">End Year</label><input type="number" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, endYear: parseInt(e.target.value)})} /></div>
        </div>
        <div><label className="block mb-1 font-medium">Description</label><textarea rows="3" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, description: e.target.value})}></textarea></div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full">Save</button>
      </form>
    </AdminLayout>
  );
}