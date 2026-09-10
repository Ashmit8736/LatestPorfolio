import { motion } from 'framer-motion';
import { ShoppingCart, HeartPulse, Building2, GraduationCap, Landmark, Hotel, Dumbbell, Trophy, CheckCircle2 } from 'lucide-react';

const INDUSTRIES = [
  { title: 'E-Commerce', desc: 'Seamless online shopping with smooth user experience', icon: ShoppingCart },
  { title: 'Healthcare', desc: 'Easy healthcare portals with user-friendly experiences', icon: HeartPulse },
  { title: 'Real Estate', desc: 'Modern property search with smooth browsing experience', icon: Building2 },
  { title: 'Education', desc: 'Interactive learning platforms for better engagement', icon: GraduationCap },
  { title: 'Finance', desc: 'Secure finance solutions with easy management', icon: Landmark },
  { title: 'Hospitality', desc: 'Smooth booking experiences for hotels and travel', icon: Hotel },
  { title: 'Fitness', desc: 'Smart fitness tracking for healthier routines', icon: Dumbbell },
  { title: 'Sports', desc: 'Live sports updates with engaging experiences', icon: Trophy },
];

const BENEFITS = [
  'Improved user experience with intuitive navigation and responsive layouts for seamless browsing across all devices.',
  'Stronger performance through clean, optimized code that builds trust and creates a professional impression.',
  'Better user engagement with well-structured APIs and smooth data flow that support conversions and business growth.',
];

export default function IndustriesSection() {
  return (
    <section className="scroll-mt-24 py-16 md:py-24 bg-[#F7F1E6] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#1C1712] mb-4">
            Top 8 Industries I Cover <span className="text-[#F5A623]">in App Development</span>
          </h2>
          <p className="text-[#5C5346] max-w-3xl leading-relaxed">
            Building user-friendly and reliable web applications across a wide range of industries with a strong focus on usability, performance, and business goals. Each project is tailored to industry-specific needs, ensuring smooth data flow, secure APIs, and a great user experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
          {INDUSTRIES.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white border border-[#E8DFCE] rounded-2xl p-5 shadow-[0_10px_25px_-15px_rgba(28,23,18,0.15)] hover:-translate-y-1 transition-transform"
              >
                <div className="w-11 h-11 rounded-full bg-[#F7F1E6] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-[#1C1712]" />
                </div>
                <h3 className="font-heading font-bold text-[#1C1712] mb-1">{ind.title}</h3>
                <p className="text-sm text-[#5C5346] leading-snug">{ind.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#E8DFCE] rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-2xl font-heading font-bold text-[#1C1712] mb-5">Services Benefits</h3>
          <div className="space-y-3">
            {BENEFITS.map(b => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                <p className="text-[#5C5346] text-sm sm:text-base leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
