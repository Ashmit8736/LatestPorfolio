import { useState } from 'react';
import AdminLayout from '../../../components/layout/AdminLayout';

export default function New() {
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/portfolio/experiences', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) window.location.href = '/admin/experiences';
    else alert('Error saving');
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Add Experience</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl p-6 rounded-lg bg-white/85 backdrop-blur-xl border border-white/50 shadow-2xl text-gray-900">
        <div><label className="block mb-1 font-medium">Company Name</label><input required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, companyName: e.target.value})} /></div>
        <div><label className="block mb-1 font-medium">Role</label><input required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, role: e.target.value})} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">Employment Type</label><input className="w-full border p-2 rounded" onChange={e => setFormData({...formData, employmentType: e.target.value})} /></div>
          <div><label className="block mb-1 font-medium">Location</label><input className="w-full border p-2 rounded" onChange={e => setFormData({...formData, location: e.target.value})} /></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className="block mb-1 font-medium">Start Date</label><input type="date" required className="w-full border p-2 rounded" onChange={e => setFormData({...formData, startDate: new Date(e.target.value).toISOString()})} /></div>
          <div><label className="block mb-1 font-medium">End Date</label><input type="date" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, endDate: e.target.value ? new Date(e.target.value).toISOString() : null})} /></div>
        </div>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="isCurrent" onChange={e => setFormData({...formData, isCurrent: e.target.checked})} />
          <label htmlFor="isCurrent" className="font-medium">Currently Working Here</label>
        </div>
        <div><label className="block mb-1 font-medium">Description</label><textarea required rows="4" className="w-full border p-2 rounded" onChange={e => setFormData({...formData, description: e.target.value})}></textarea></div>
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full">Save</button>
      </form>
    </AdminLayout>
  );
}