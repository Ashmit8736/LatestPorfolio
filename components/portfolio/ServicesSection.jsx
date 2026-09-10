import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Smartphone, TestTube2, Database, PenTool } from 'lucide-react';

const SERVICES = [
  {
    title: 'Website Design',
    icon: Globe,
    tags: ['Responsive Design', 'Landing Pages', 'Next.js', 'Tailwind CSS'],
    description: 'Designing and building fast, responsive websites focused on clean UI, smooth navigation, and seamless usability across all devices.',
  },
  {
    title: 'App Development',
    icon: Smartphone,
    tags: ['MERN Stack', 'REST APIs', 'Node.js', 'Express.js'],
    description: 'Building full-stack web applications end-to-end — from RESTful APIs and authentication to responsive React front-ends.',
  },
  {
    title: 'Testing',
    icon: TestTube2,
    tags: ['Manual Testing', 'API Testing (Postman)', 'Debugging'],
    description: 'Performing manual and API testing to catch bugs early, verify functionality, and ensure application reliability before release.',
  },
  {
    title: 'Database Management',
    icon: Database,
    tags: ['MongoDB', 'MySQL', 'Stored Procedures', 'PostgreSQL'],
    description: 'Designing and optimizing database schemas, queries, and stored procedures for performance, consistency, and scale.',
  },
  {
    title: 'UI & UX',
    icon: PenTool,
    tags: ['Responsive UI', 'Tailwind CSS', 'Design to Code'],
    description: 'Translating designs into pixel-accurate, accessible interfaces with attention to spacing, hierarchy, and interaction detail.',
  },
];

export default function ServicesSection() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section id="services" className="scroll-mt-24 py-16 md:py-24 bg-[#F7F1E6] relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 justify-center mb-4"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#1C1712]"></span>
          <span className="text-sm font-semibold text-[#5C5346] uppercase tracking-wider">My Services</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-heading font-extrabold text-[#1C1712] text-center mb-12"
        >
          How I Bring <span className="text-[#F5A623]">Ideas to Life</span>
        </motion.h2>

        <div className="flex flex-col gap-3">
          {SERVICES.map((service, index) => {
            const isOpen = openIndex === index;
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className={`rounded-2xl px-6 sm:px-8 py-5 cursor-pointer transition-colors ${
                  isOpen ? 'bg-[#1C1712]' : 'bg-white border border-[#E8DFCE] hover:border-[#F5A623]/60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={`text-sm font-heading font-bold ${isOpen ? 'text-[#F5A623]' : 'text-[#A69C89]'}`}>
                    {String(index + 1).padStart(2, '0')}.
                  </span>
                  <Icon className={`w-5 h-5 ${isOpen ? 'text-[#F5A623]' : 'text-[#1C1712]'}`} />
                  <h3 className={`flex-grow text-xl sm:text-2xl font-heading font-bold ${isOpen ? 'text-white' : 'text-[#1C1712]'}`}>
                    {service.title}
                  </h3>
                  <span className={`w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 transition-transform ${
                    isOpen ? 'bg-[#F5A623] text-[#1C1712] rotate-45' : 'bg-[#F7F1E6] text-[#1C1712]'
                  }`}>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="pl-9 sm:pl-16 pt-4 pr-4"
                  >
                    <div className="flex flex-wrap gap-2 mb-4">
                      {service.tags.map(tag => (
                        <span key={tag} className="text-xs font-semibold text-[#EFE7D6] bg-white/10 border border-white/10 px-3 py-1.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-[#C9BFAE] text-sm sm:text-base leading-relaxed">{service.description}</p>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
