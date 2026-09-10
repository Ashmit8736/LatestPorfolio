import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'What technologies do you specialize in?',
    a: 'I mainly work with the MERN stack (MongoDB, Express.js, React.js, Node.js) along with MySQL, PostgreSQL, and Next.js for full-stack projects.',
  },
  {
    q: 'Do you build both frontend and backend?',
    a: 'Yes — I handle end-to-end development, from responsive React interfaces to secure REST APIs and database design.',
  },
  {
    q: 'Do you work with SQL and NoSQL databases?',
    a: 'Yes, I work with both — MongoDB for flexible schemas and MySQL / PostgreSQL for relational data, including stored procedures.',
  },
  {
    q: 'Do you take up freelance or contract projects?',
    a: 'I\'m open to freelance, contract, and full-time opportunities. Reach out through the contact form and let\'s discuss your project.',
  },
  {
    q: 'What is your typical development process?',
    a: 'Requirement gathering, planning the schema and API structure, iterative development with regular testing, and deployment with clean, documented code.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(1);

  return (
    <section className="scroll-mt-24 py-16 md:py-24 bg-[#1C1712] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]"></span>
            <span className="text-sm font-semibold text-[#C9BFAE] uppercase tracking-wider">FAQs</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-extrabold text-white">
            Question? <span className="text-[#F5A623]">Look here.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-[280px_1fr] gap-6 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#252019] border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <div className="w-11 h-11 rounded-full bg-[#F5A623] flex items-center justify-center mb-4">
              <MessageCircle className="w-5 h-5 text-[#1C1712]" />
            </div>
            <h3 className="text-lg font-heading font-bold text-white mb-2">Have a different question? Ask away!</h3>
            <p className="text-sm text-[#C9BFAE] mb-6">Your Questions, My Answers. Quick responses guaranteed.</p>
            <a href="#contact" className="inline-block px-6 py-3 bg-[#F5A623] text-[#1C1712] rounded-full font-heading font-bold text-sm hover:bg-[#DB9015] transition-colors">
              Contact Me
            </a>
          </motion.div>

          <div className="flex flex-col gap-3">
            {FAQS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className={`rounded-2xl px-5 sm:px-6 py-4 cursor-pointer transition-colors ${
                    isOpen ? 'bg-[#F5A623]' : 'bg-[#252019] border border-white/10 hover:border-[#F5A623]/40'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h4 className={`font-heading font-bold text-sm sm:text-base ${isOpen ? 'text-[#1C1712]' : 'text-white'}`}>
                      {item.q}
                    </h4>
                    <span className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full ${
                      isOpen ? 'bg-[#1C1712] text-[#F5A623]' : 'bg-white/10 text-white'
                    }`}>
                      {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </span>
                  </div>
                  {isOpen && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="text-sm text-[#1C1712]/80 mt-3 leading-relaxed"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
