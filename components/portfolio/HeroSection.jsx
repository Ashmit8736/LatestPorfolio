import { motion } from 'framer-motion';
import { Mail, Download } from 'lucide-react';
import { GithubIcon as Github, LinkedinIcon as Linkedin } from '../icons';

export default function HeroSection({ profile }) {
  if (!profile || Object.keys(profile).length === 0) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0a0a0a]">
      {/* Background Gradients - Adjusted to match the dark/orange theme */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-[#ff5a1f] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-blob"></div>
      <div className="absolute -bottom-8 right-20 w-96 h-96 bg-[#ff5a1f] rounded-full mix-blend-multiply filter blur-[150px] opacity-10 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-[#ff5a1f]/10 text-[#ff5a1f] text-sm font-bold tracking-widest mb-8 border border-[#ff5a1f]/20 uppercase">
            Available for Work
          </span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-[1.1] flex flex-col items-center uppercase">
            <span className="text-white">{profile.fullName}</span>
            <span className="text-[#ff5a1f]">{profile.headline}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
            {profile.shortBio}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a 
              href="#contact" 
              className="px-8 py-4 bg-[#ff5a1f] hover:bg-[#e04d19] text-white rounded-xl font-bold uppercase tracking-wide transition-all shadow-[0_0_40px_-10px_rgba(255,90,31,0.5)] hover:shadow-[0_0_60px_-15px_rgba(255,90,31,0.7)] flex items-center gap-2"
            >
              <Mail className="w-5 h-5" /> Let's Talk
            </a>
            <a 
              href={profile.githubUrl || "#"} 
              target="_blank" rel="noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-wide transition-all border border-white/10 flex items-center gap-2"
            >
              <Github className="w-5 h-5" /> GitHub
            </a>
            <a 
              href={profile.linkedinUrl || "#"} 
              target="_blank" rel="noreferrer"
              className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-bold uppercase tracking-wide transition-all border border-white/10 flex items-center gap-2"
            >
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}