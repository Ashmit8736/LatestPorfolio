import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

export default function ExperienceSection({ experiences }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="scroll-mt-20 py-5 md:py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#ff5a1f] to-orange-400 bg-clip-text text-transparent mb-4 uppercase tracking-tighter">Professional Experience</h2>
          <div className="w-20 h-1 bg-[#ff5a1f] mx-auto rounded-full"></div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-10 sm:pl-48 py-6 group"
            >
              {/* Timeline Line */}
              <div className="absolute left-[19px] sm:left-[160px] top-0 bottom-0 w-px bg-white/10 group-last:bottom-auto group-last:h-full"></div>
              
              {/* Timeline Dot */}
              <div className="flex absolute left-[11px] sm:left-[152px] top-8 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#ff5a1f] items-center justify-center z-10">
                <div className="w-1.5 h-1.5 bg-[#ff5a1f] rounded-full"></div>
              </div>

              {/* Date */}
              <div className="sm:absolute left-0 top-7 sm:w-[140px] sm:text-right sm:pr-4 text-sm font-medium text-[#ff5a1f] mb-2 sm:mb-0">
                {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                {exp.isCurrent ? ' Present' : exp.endDate ? ` ${new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''}
              </div>

              {/* Content Card */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                <h3 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#ff5a1f]" />
                  {exp.role}
                </h3>
                <h4 className="text-lg text-gray-400 mb-4">{exp.companyName} {exp.location && `• ${exp.location}`}</h4>
                
                <div className="text-gray-400 leading-relaxed space-y-2 text-sm sm:text-base">
                  {exp.description.split('\n').map((line, i) => (
                    <p key={i}>{line.trim()}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}