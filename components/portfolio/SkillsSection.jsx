import { motion } from 'framer-motion';
import { Code2, Layout, Server, Database, Wrench, TestTube2, Braces } from 'lucide-react';

const CATEGORY_ICONS = {
  Languages: Braces,
  Frontend: Layout,
  Backend: Server,
  Databases: Database,
  'DevOps / Tools': Wrench,
  Testing: TestTube2,
};

function getIcon(category) {
  return CATEGORY_ICONS[category] || Code2;
}

export default function SkillsSection({ skills }) {
  if (!skills || skills.length === 0) return null;

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="scroll-mt-24 py-12 md:py-20 bg-[#F7F1E6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex items-center gap-2 justify-center mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1C1712]"></span>
            <span className="text-sm font-semibold text-[#5C5346] uppercase tracking-wider">My Skillset</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-[#1C1712]">
            <span className="text-[#F5A623]">Skills</span> & Technologies
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(groupedSkills).map(([category, items], idx) => {
            const Icon = getIcon(category);
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white border border-[#E8DFCE] rounded-2xl p-6 sm:p-7 shadow-[0_10px_25px_-15px_rgba(28,23,18,0.15)] hover:-translate-y-1 hover:border-[#F5A623]/60 transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-[#F7F1E6] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1C1712]" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-[#1C1712]">{category}</h3>
                </div>
                <div className="h-1 w-full bg-[#F1E9D8] rounded-full overflow-hidden mb-5">
                  <div className="h-full bg-[#F5A623] rounded-full w-full"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map(skill => (
                    <span
                      key={skill.id}
                      className="px-3.5 py-2 bg-[#F7F1E6] hover:bg-[#F5A623] hover:text-[#1C1712] text-[#5C5346] font-semibold rounded-lg text-sm transition-colors cursor-default"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
