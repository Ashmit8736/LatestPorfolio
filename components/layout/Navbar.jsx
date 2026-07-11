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
      className="fixed top-0 w-full z-50 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="text-2xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Ashmit.Singh
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-wide"
              >
                {item}
              </a>
            ))}
            {showAdmin && (
              <Link 
                href="/login" 
                className="ml-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/10 transition-colors"
              >
                Only Admin
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
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
            className="md:hidden bg-[#0a0a0a] border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-5 flex flex-col">
              {navItems.map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-gray-300 hover:text-white transition-colors tracking-wide"
                >
                  {item}
                </a>
              ))}
              {showAdmin && (
                <Link 
                  href="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block mt-4 px-6 py-3 w-max text-sm font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/50 rounded-lg hover:bg-emerald-500/10 transition-colors"
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