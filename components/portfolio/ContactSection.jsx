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
    <section id="contact" className="scroll-mt-20 py-5 md:py-24 bg-transparent relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-widest bg-[#ff5a1f] bg-clip-text text-transparent mb-4 uppercase tracking-tighter">Get In Touch</h2>
          <div className="w-20 h-1 bg-[#ff5a1f] mx-auto rounded-full"></div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#111111] p-8 sm:p-10 rounded-2xl border border-[#333]  shadow-xl  shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-white font-bold mb-2">Name</label>
              <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-transparent text-white px-4 py-3 border border-[#333]  shadow-xl rounded-xl focus:ring-2 focus:ring-[#ff5a1f]/50 focus:border-purple-400 outline-none transition-all" placeholder="Enter Name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-white font-bold mb-2">Email</label>
              <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-transparent text-white px-4 py-3 border border-[#333]  shadow-xl rounded-xl focus:ring-2 focus:ring-[#ff5a1f]/50 focus:border-purple-400 outline-none transition-all" placeholder="Enter Email" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-white font-bold mb-2">Company (Optional)</label>
              <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-transparent text-white px-4 py-3 border border-[#333]  shadow-xl rounded-xl focus:ring-2 focus:ring-[#ff5a1f]/50 focus:border-purple-400 outline-none transition-all" placeholder="Tech Inc." />
            </div>
            <div>
              <label className="block text-sm font-bold text-white font-bold mb-2">Mobile Number (Optional)</label>
              <input type="tel" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-transparent text-white px-4 py-3 border border-[#333]  shadow-xl rounded-xl focus:ring-2 focus:ring-[#ff5a1f]/50 focus:border-purple-400 outline-none transition-all" placeholder="+91 9876543210" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-white font-bold mb-2">Message</label>
            <textarea required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-transparent text-white px-4 py-3 border border-[#333]  shadow-xl rounded-xl focus:ring-2 focus:ring-[#ff5a1f]/50 focus:border-purple-400 outline-none transition-all resize-none" placeholder="How can I help you?"></textarea>
          </div>
          {status === 'error' && <p className="text-red-400 text-sm font-bold">Something went wrong. Please try again.</p>}
          <button disabled={status === 'loading'} className="w-full bg-[#ff5a1f] text-white font-bold py-4 rounded-xl hover:bg-[#e04d19] focus:ring-4 focus:ring-[#ff5a1f]/30 transition-all disabled:opacity-50 shadow-[0_0_20px_-5px_rgba(255,90,31,0.4)]">
            {status === 'loading' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}