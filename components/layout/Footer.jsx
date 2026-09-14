import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowUpRight, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon, TwitterIcon, ThreadsIcon, InstagramIcon, YoutubeIcon, PinterestIcon, LinkIcon } from '../icons';

function socialIcon(platform) {
  const p = (platform || '').toLowerCase();
  if (p.includes('github')) return GithubIcon;
  if (p.includes('linkedin')) return LinkedinIcon;
  if (p.includes('facebook')) return FacebookIcon;
  if (p.includes('twitter') || p === 'x') return TwitterIcon;
  if (p.includes('threads')) return ThreadsIcon;
  if (p.includes('instagram')) return InstagramIcon;
  if (p.includes('youtube')) return YoutubeIcon;
  if (p.includes('pinterest')) return PinterestIcon;
  return LinkIcon;
}

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About Me', href: '#about' },
  { label: 'FAQs', href: '#faq' },
];

export default function Footer() {
  const [profile, setProfile] = useState(null);
  const [socials, setSocials] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio/profile').then(res => res.json()).then(data => setProfile(data.data || null)).catch(() => {});
    fetch('/api/portfolio/socials').then(res => res.json()).then(data => setSocials(data.data || [])).catch(() => {});
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  const visibleSocials = socials.filter(s => socialIcon(s.platform));

  return (
    <footer className="bg-[#F7F1E6] pt-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1C1712]">
            Let's <span className="text-[#F5A623]">Connect</span> there
          </h2>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-[#1C1712] text-[#F7F1E6] rounded-full font-heading font-bold text-sm hover:bg-[#332B22] transition-colors w-fit"
          >
            Contact Me
            <span className="w-9 h-9 rounded-full bg-[#F5A623] text-[#1C1712] flex items-center justify-center flex-shrink-0">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </a>
        </div>

        <div className="border-t border-[#E0D6C0] mb-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4 text-lg font-heading font-extrabold tracking-wide text-[#1C1712]">
              <span className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center text-[#1C1712] text-sm">
                {(profile?.fullName || 'A').charAt(0)}
              </span>
              {profile?.fullName ? `${profile.fullName.split(' ')[0]}.` : 'Ashmit.'}
            </Link>
            <p className="text-sm text-[#5C5346] leading-relaxed mb-5 max-w-xs">
              {profile?.footerTagline || (profile?.fullName ? `I'm ${profile.fullName} — ${profile.headline || 'building reliable, user-friendly digital products'}.` : '')}
            </p>
            {visibleSocials.length > 0 && (
              <div className="flex gap-3">
                {visibleSocials.map(s => {
                  const Icon = socialIcon(s.platform);
                  return (
                    <a key={s.id} href={s.url} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-[#F5A623] text-[#1C1712] flex items-center justify-center hover:bg-[#1C1712] hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold text-[#F5A623] uppercase tracking-wide mb-4">Navigation</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-[#5C5346] hover:text-[#1C1712] transition-colors">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold text-[#F5A623] uppercase tracking-wide mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-[#5C5346]">
              {profile?.phone && (
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0" /> {profile.phone}</li>
              )}
              {profile?.email && (
                <li className="flex items-center gap-2 break-all"><Mail className="w-4 h-4 flex-shrink-0" /> {profile.email}</li>
              )}
              {profile?.location && (
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" /> {profile.location}</li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-bold text-[#F5A623] uppercase tracking-wide mb-4">Get Latest Updates</h3>
            {subscribed ? (
              <p className="text-sm text-[#5C5346]">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center bg-white border border-[#E8DFCE] rounded-full pl-4 pr-1.5 py-1.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 min-w-0 bg-transparent text-sm text-[#1C1712] placeholder-[#A69C89] outline-none"
                />
                <button type="submit" aria-label="Subscribe" className="w-8 h-8 rounded-full bg-[#1C1712] text-[#F5A623] flex items-center justify-center flex-shrink-0 hover:bg-[#332B22] transition-colors">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-[#332B22] bg-[#1C1712] py-6 text-center">
        <p className="text-[#B7AC98] text-sm font-medium">
          © {new Date().getFullYear()} <span className="text-[#F5A623] font-semibold">{profile?.fullName || 'Ashmit Singh'}</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
