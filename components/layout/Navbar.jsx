import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch('/api/check-ip')
      .then(res => res.json())
      .then(data => {
        if (data.allowed) {
          setShowAdmin(true);
        }
      })
      .catch(err => console.error('Error checking IP:', err));
  }, []);

  const navItems = ['About', 'Experience', 'Education', 'Projects', 'Skills', 'Contact'];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-[#111111]  border-b border-[#333] shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-heading font-normal tracking-widest bg-[#ff5a1f] bg-clip-text text-transparent uppercase tracking-tight">
            Portfolio
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-base font-semibold text-white hover:text-[#ff5a1f] transition-colors tracking-wide"
              >
                {item}
              </a>
            ))}
            {showAdmin && (
              <Link 
                href="/login" 
                className="ml-4 px-4 py-2 text-xs font-heading font-normal tracking-wider uppercase tracking-wider text-[#ff5a1f] border border-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
              >
                Only Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#ff5a1f] focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#111111]  border-b border-[#333] overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-5 flex flex-col">
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-semibold text-white hover:text-[#ff5a1f] transition-colors tracking-wide"
                >
                  {item}
                </a>
              ))}
              {showAdmin && (
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block mt-4 px-6 py-3 w-max text-sm font-heading font-normal tracking-wider uppercase tracking-wider text-[#ff5a1f] border border-purple-400 rounded-lg hover:bg-purple-600 hover:text-white transition-colors"
                >
                  Only Admin
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}