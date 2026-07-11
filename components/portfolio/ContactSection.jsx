import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', phone: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', phone: '', message: '' });
        window.location.href = '/thank-you';
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-5 md:py-24 bg-[#0a0a0a] relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 sm:p-10 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#050505] text-white px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#050505] text-white px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="john@example.com" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Company (Optional)</label>
              <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-[#050505] text-white px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="Tech Inc." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Number (Optional)</label>
              <input type="tel" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#050505] text-white px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all" placeholder="+91 9876543210" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
            <textarea required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-[#050505] text-white px-4 py-3 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all resize-none" placeholder="How can I help you?"></textarea>
          </div>
          {status === 'error' && <p className="text-red-400 text-sm font-medium">Something went wrong. Please try again.</p>}
          <button disabled={status === 'loading'} className="w-full bg-blue-600 text-white font-medium py-4 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/30 transition-all disabled:opacity-50 shadow-[0_0_20px_-5px_rgba(37,99,235,0.4)]">
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}