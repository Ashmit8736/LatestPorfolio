import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin, FacebookIcon, TwitterIcon, ThreadsIcon, InstagramIcon } from '../icons';

const STICKERS = [
  { label: 'React.js', className: 'top-6 -left-4 sm:-left-10 bg-[#1C1712] text-white -rotate-6' },
  { label: 'Node.js', className: 'top-24 -right-6 sm:-right-14 bg-[#F5A623] text-[#1C1712] rotate-6' },
  { label: 'MongoDB', className: 'bottom-32 -left-8 sm:-left-16 bg-[#1C1712] text-white rotate-3' },
  { label: 'MySQL', className: 'bottom-8 -right-4 sm:-right-10 bg-[#F5A623] text-[#1C1712] -rotate-3' },
];

const FOLLOW_PLATFORMS = [
  { key: 'facebook', match: 'facebook', Icon: FacebookIcon },
  { key: 'twitter', match: 'twitter', Icon: TwitterIcon },
  { key: 'threads', match: 'threads', Icon: ThreadsIcon },
  { key: 'instagram', match: 'instagram', Icon: InstagramIcon },
];

export default function HeroSection({ profile, socials = [] }) {
  if (!profile || Object.keys(profile).length === 0) return null;

  const followLinks = FOLLOW_PLATFORMS.map(p => ({
    ...p,
    url: socials.find(s => (s.platform || '').toLowerCase().includes(p.match))?.url,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-16 sm:pt-40 sm:pb-10 overflow-hidden bg-[#F7F1E6]">
      <div className="absolute top-0 -left-4 w-96 h-96 bg-[#F5A623] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-blob"></div>
      <div className="absolute -bottom-8 right-20 w-96 h-96 bg-[#F5A623] rounded-full mix-blend-multiply filter blur-[150px] opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 py-2 px-5 rounded-full bg-white text-[#1C1712] text-sm font-heading font-semibold tracking-wider mb-6 border border-[#E8DFCE] shadow-sm uppercase">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse"></span>
            Available for Work
          </span>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight leading-[1.1] flex flex-col items-center">
            <span className="text-[#1C1712]">I'm {profile.fullName}</span>
            <span className="text-[#F5A623] mt-1">{profile.headline}</span>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-[180px_1fr_220px] gap-6 items-center">
          {/* Follow Me */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:flex flex-col items-start gap-4"
          >
            <span className="text-sm font-semibold text-[#5C5346]">Follow Me On</span>
            <div className="flex gap-3">
              {followLinks.map(({ key, Icon, url }) => (
                <a
                  key={key}
                  href={url || '#'}
                  target={url ? '_blank' : undefined}
                  rel={url ? 'noreferrer' : undefined}
                  aria-disabled={!url}
                  onClick={e => { if (!url) e.preventDefault(); }}
                  className={`w-10 h-10 rounded-full bg-white border border-[#E8DFCE] flex items-center justify-center text-[#1C1712] transition-colors ${url ? 'hover:bg-[#1C1712] hover:text-white cursor-pointer' : 'opacity-40 cursor-not-allowed'}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto w-full max-w-[340px] aspect-[4/5]"
          >
            <div className="absolute inset-0 bg-[#F5A623] rounded-[48px] transform translate-x-3 translate-y-3"></div>
            <div className="relative w-full h-full overflow-hidden rounded-[48px] border-4 border-white shadow-2xl z-10">
              <img
                src={profile.profileImage || "/profile.jpg"}
                alt={profile.fullName || "Profile"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
            {STICKERS.map(s => (
              <span key={s.label} className={`hidden lg:flex absolute ${s.className} px-4 py-2 rounded-full text-xs font-heading font-bold shadow-lg z-20`}>
                {s.label}
              </span>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block bg-white border border-[#E8DFCE] rounded-2xl p-5 shadow-sm text-sm text-[#5C5346] leading-relaxed"
          >
            "{profile.shortBio}"
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12"
        >
          <a
            href="#contact"
            className="px-8 py-4 bg-[#F5A623] hover:bg-[#DB9015] text-[#1C1712] rounded-full font-heading font-bold tracking-wide uppercase text-sm transition-all shadow-[0_10px_30px_-10px_rgba(245,166,35,0.6)] hover:shadow-[0_15px_40px_-10px_rgba(245,166,35,0.8)] flex items-center gap-2"
          >
            <Mail className="w-5 h-5" /> Let's Talk
          </a>
          <a
            href={profile.githubUrl || "#"}
            target="_blank" rel="noreferrer"
            className="px-8 py-4 bg-[#1C1712] hover:bg-[#332B22] text-[#F7F1E6] rounded-full font-heading font-bold tracking-wide uppercase text-sm transition-all shadow-md flex items-center gap-2"
          >
            <Github className="w-5 h-5" /> GitHub
          </a>
          <a
            href={profile.linkedinUrl || "#"}
            target="_blank" rel="noreferrer"
            className="px-8 py-4 bg-white hover:bg-[#F1E9D8] text-[#1C1712] rounded-full font-heading font-bold tracking-wide uppercase text-sm transition-all border border-[#E8DFCE] shadow-md flex items-center gap-2"
          >
            <Linkedin className="w-5 h-5" /> LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  );
}
