import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

function computeYears(experiences) {
  if (!experiences || experiences.length === 0) return null;
  const dates = experiences.map(e => new Date(e.startDate).getTime());
  const earliest = new Date(Math.min(...dates));
  const years = Math.max(1, new Date().getFullYear() - earliest.getFullYear());
  return years;
}

export default function AboutSection({ profile, experiences = [], projects = [], skills = [] }) {
  if (!profile || (!profile.about && !profile.shortBio)) return null;

  const years = computeYears(experiences);
  const stats = [
    projects.length > 0 && { label: 'Projects Built', value: `${projects.length}+` },
    experiences.length > 0 && { label: 'Companies Worked', value: `${experiences.length}` },
    skills.length > 0 && { label: 'Technologies', value: `${skills.length}+` },
    years && { label: 'Years Experience', value: `${years}+` },
  ].filter(Boolean);

  return (
    <section id="about" className="scroll-mt-24 py-12 md:py-20 bg-[#1C1712] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-8 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center h-[400px] order-2 md:order-1"
          >
            <div className="absolute inset-0 bg-[#F5A623] rounded-bl-[120px] rounded-tr-[40px] transform -translate-x-4 translate-y-4"></div>
            <div className="relative w-full h-full overflow-hidden rounded-bl-[120px] rounded-tr-[40px] border-4 border-[#252019] shadow-2xl z-10">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 md:order-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]"></span>
              <span className="text-sm font-semibold text-[#C9BFAE] uppercase tracking-wider">About Me</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-6">
              Who is <span className="text-[#F5A623]">{profile.fullName}?</span>
            </h2>
            <p className="text-[#C9BFAE] text-base sm:text-lg leading-relaxed mb-6">
              {profile.about || profile.shortBio}
            </p>
            {profile.location && (
              <div className="flex items-center text-white mb-8">
                <span className="font-semibold mr-2">Based in:</span> {profile.location}
              </div>
            )}
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F5A623] text-[#1C1712] rounded-full font-heading font-bold text-sm hover:bg-[#DB9015] transition-colors"
              >
                Download CV <Download className="w-4 h-4" />
              </a>
            )}
          </motion.div>
        </div>

        {stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-6 pt-10 border-t border-white/10"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-10">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-[#C9BFAE]">{stat.label}</div>
                </div>
                {i < stats.length - 1 && <span className="hidden sm:block w-px h-10 bg-white/10"></span>}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
