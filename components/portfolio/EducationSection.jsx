import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

export default function EducationSection({ education }) {
  if (!education || education.length === 0) return null;

  return (
    <section id="education" className="scroll-mt-20 py-5 md:py-24 bg-[#0a0a0a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#ff5a1f] to-orange-400 bg-clip-text text-transparent mb-4 uppercase tracking-tighter">Education</h2>
          <div className="w-20 h-1 bg-[#ff5a1f] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {education.map((edu, index) => (
            <motion.div 
              key={edu.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-[#ff5a1f]/20 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-6 h-6 text-[#ff5a1f]" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
              <h4 className="text-lg text-[#ff5a1f] mb-4">{edu.institution}</h4>
              
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-400">
                <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">{edu.startYear} - {edu.endYear}</span>
                {edu.score && <span className="bg-white/5 px-3 py-1 rounded-full border border-white/10">{edu.score}</span>}
              </div>
              
              {edu.description && (
                <p className="text-gray-400 leading-relaxed text-sm">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}