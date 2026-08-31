import { motion } from 'framer-motion';

export default function SkillsSection({ skills }) {
  if (!skills || skills.length === 0) return null;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="scroll-mt-20 py-5 md:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-widest bg-[#ff5a1f] bg-clip-text text-transparent mb-4 uppercase tracking-tighter">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-[#ff5a1f] mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Object.entries(groupedSkills).map(([category, items], idx) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#111111] border border-[#333]  shadow-xl p-8 rounded-2xl "
            >
              <h3 className="text-xl font-heading font-bold tracking-wider text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                {category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map(skill => (
                  <span 
                    key={skill.id} 
                    className="px-4 py-2 bg-[#111111] hover:bg-[#ff5a1f] hover:text-[#ff5a1f] border border-[#333]  shadow-xl text-white font-bold rounded-lg text-sm font-bold transition-colors cursor-default"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}