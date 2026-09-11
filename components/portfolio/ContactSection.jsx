import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon, TwitterIcon, ThreadsIcon, InstagramIcon, YoutubeIcon, LinkIcon } from '../icons';

function socialIcon(platform) {
  const p = (platform || '').toLowerCase();
  if (p.includes('github')) return GithubIcon;
  if (p.includes('linkedin')) return LinkedinIcon;
  if (p.includes('facebook')) return FacebookIcon;
  if (p.includes('twitter') || p === 'x') return TwitterIcon;
  if (p.includes('threads')) return ThreadsIcon;
  if (p.includes('instagram')) return InstagramIcon;
  if (p.includes('youtube')) return YoutubeIcon;
  return LinkIcon;
}

export default function ContactSection({ profile, socials = [] }) {
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
    <section id="contact" className="scroll-mt-24 py-12 md:py-20 bg-[#F7F1E6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <div className="flex items-center gap-2 justify-center mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1C1712]"></span>
            <span className="text-sm font-semibold text-[#5C5346] uppercase tracking-wider">Contact Me</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-[#1C1712]">
            Let's Talk for Your <span className="text-[#F5A623]">Next Project</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-8">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-[#E8DFCE] shadow-[0_20px_50px_-20px_rgba(28,23,18,0.2)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1C1712] mb-2">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#F7F1E6] text-[#1C1712] placeholder-[#A69C89] px-4 py-3 border border-[#E8DFCE] rounded-xl focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623] outline-none transition-all" placeholder="Enter Name" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1712] mb-2">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[#F7F1E6] text-[#1C1712] placeholder-[#A69C89] px-4 py-3 border border-[#E8DFCE] rounded-xl focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623] outline-none transition-all" placeholder="Enter Email" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#1C1712] mb-2">Company (Optional)</label>
                <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-[#F7F1E6] text-[#1C1712] placeholder-[#A69C89] px-4 py-3 border border-[#E8DFCE] rounded-xl focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623] outline-none transition-all" placeholder="Tech Inc." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1C1712] mb-2">Mobile Number (Optional)</label>
                <input type="tel" value={formData.phone || ''} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[#F7F1E6] text-[#1C1712] placeholder-[#A69C89] px-4 py-3 border border-[#E8DFCE] rounded-xl focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623] outline-none transition-all" placeholder="+91 9876543210" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1C1712] mb-2">Message</label>
              <textarea required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-[#F7F1E6] text-[#1C1712] placeholder-[#A69C89] px-4 py-3 border border-[#E8DFCE] rounded-xl focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623] outline-none transition-all resize-none" placeholder="How can I help you?"></textarea>
            </div>
            {status === 'error' && <p className="text-red-500 text-sm font-semibold">Something went wrong. Please try again.</p>}
            <button disabled={status === 'loading'} className="w-full bg-[#F5A623] text-[#1C1712] font-heading font-bold py-4 rounded-full hover:bg-[#DB9015] focus:ring-4 focus:ring-[#F5A623]/30 transition-all disabled:opacity-50 shadow-[0_10px_30px_-10px_rgba(245,166,35,0.6)] uppercase tracking-wide">
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          <div className="flex flex-col gap-6">
            <div className="bg-[#1C1712] rounded-2xl p-6 sm:p-8 text-white flex-grow">
              {profile?.email && (
                <div className="mb-6">
                  <h4 className="text-[#F5A623] font-heading font-bold text-sm uppercase tracking-wide mb-2">Email</h4>
                  <p className="text-[#EFE7D6] text-sm flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0" /> {profile.email}</p>
                </div>
              )}
              {profile?.phone && (
                <div className="mb-6">
                  <h4 className="text-[#F5A623] font-heading font-bold text-sm uppercase tracking-wide mb-2">Phone</h4>
                  <p className="text-[#EFE7D6] text-sm flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0" /> {profile.phone}</p>
                </div>
              )}
              {profile?.location && (
                <div>
                  <h4 className="text-[#F5A623] font-heading font-bold text-sm uppercase tracking-wide mb-2">Location</h4>
                  <p className="text-[#EFE7D6] text-sm flex items-center gap-2"><MapPin className="w-4 h-4 flex-shrink-0" /> {profile.location}</p>
                </div>
              )}
            </div>

            {socials.filter(s => socialIcon(s.platform)).length > 0 && (
              <div className="bg-[#F5A623] rounded-2xl p-6 sm:p-8">
                <h4 className="text-[#1C1712] font-heading font-bold text-sm uppercase tracking-wide mb-4">Stay Connected</h4>
                <div className="flex gap-3">
                  {socials.filter(s => socialIcon(s.platform)).map(s => {
                    const Icon = socialIcon(s.platform);
                    return (
                      <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-[#1C1712] flex items-center justify-center text-white hover:bg-white hover:text-[#1C1712] transition-colors">
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
