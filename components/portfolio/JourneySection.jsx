import { motion } from 'framer-motion';
import { GraduationCap, Briefcase } from 'lucide-react';

function formatExpRange(exp) {
  const start = new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const end = exp.isCurrent ? 'Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';
  return `${start} - ${end}`;
}

export default function JourneySection({ experiences, education }) {
  const hasExperience = experiences && experiences.length > 0;
  const hasEducation = education && education.length > 0;
  if (!hasExperience && !hasEducation) return null;

  return (
    <section id="experience" className="scroll-mt-24 py-12 md:py-20 bg-[#F7F1E6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-16"
        >
          <div className="flex items-center gap-2 justify-center mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1C1712]"></span>
            <span className="text-sm font-semibold text-[#5C5346] uppercase tracking-wider">Education & Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-[#1C1712] leading-tight">
            My <span className="text-[#F5A623]">Academic and</span><br className="hidden sm:block" /> Professional <span className="text-[#F5A623]">Journey</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto items-start">
          {hasEducation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-[#E8DFCE] rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_-15px_rgba(28,23,18,0.15)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-[#F5A623] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#1C1712]" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-[#1C1712]">Education</h3>
              </div>
              <div className="border-t border-dashed border-[#E8DFCE] mb-2"></div>
              <div>
                {education.map((edu, i) => (
                  <div key={edu.id || i} className="flex items-start justify-between gap-3 py-4 border-b border-[#F1E9D8] last:border-0">
                    <div>
                      <h4 className="font-heading font-bold text-[#1C1712] text-base sm:text-lg">{edu.institution}</h4>
                      <p className="text-sm text-[#5C5346]">{edu.degree}</p>
                    </div>
                    <span className="flex-shrink-0 bg-[#1C1712] text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {hasExperience && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white border border-[#E8DFCE] rounded-2xl p-6 sm:p-8 shadow-[0_10px_30px_-15px_rgba(28,23,18,0.15)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-[#F5A623] flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-[#1C1712]" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-[#1C1712]">Work & Internship Experience</h3>
              </div>
              <div className="border-t border-dashed border-[#E8DFCE] mb-2"></div>
              <div>
                {experiences.map((exp, i) => (
                  <div key={exp.id || i} className="py-4 border-b border-[#F1E9D8] last:border-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="font-heading font-bold text-[#1C1712] text-base sm:text-lg">{exp.companyName}</h4>
                        <p className="text-sm text-[#5C5346]">{exp.role}</p>
                      </div>
                      <span className="flex-shrink-0 bg-[#1C1712] text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full whitespace-nowrap">
                        {formatExpRange(exp)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
