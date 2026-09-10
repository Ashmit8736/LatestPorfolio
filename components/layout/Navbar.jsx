import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { Menu, X, Mail } from 'lucide-react';

export default function Navbar() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        if (currentY > lastScrollY.current && currentY > 100) {
          setHidden(true);
        } else {
          setHidden(false);
        }
        lastScrollY.current = currentY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['About', 'Services', 'Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <motion.nav
      animate={{ y: hidden ? -140 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-4 left-0 right-0 z-50 px-4 transform-gpu will-change-transform">
      <div className="max-w-6xl mx-auto bg-[#1C1712] rounded-full shadow-[0_10px_40px_-10px_rgba(28,23,18,0.5)] px-3 sm:px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 pl-2 text-lg font-heading font-extrabold tracking-wide text-[#F7F1E6]">
            <span className="w-8 h-8 rounded-full bg-[#F5A623] flex items-center justify-center text-[#1C1712] text-sm">A</span>
            Ashmit.
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-semibold text-[#EFE7D6] hover:text-[#F5A623] transition-colors tracking-wide rounded-full hover:bg-white/5"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {showAdmin && (
              <Link
                href="/login"
                className="px-4 py-2 text-xs font-heading font-semibold tracking-wider uppercase text-[#F5A623] border border-[#F5A623]/50 rounded-full hover:bg-[#F5A623] hover:text-[#1C1712] transition-colors"
              >
                Admin
              </Link>
            )}
            <a
              href="#contact"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#F7F1E6] text-[#1C1712] rounded-full font-heading font-bold text-sm hover:bg-[#F5A623] transition-colors"
            >
              <Mail className="w-4 h-4" /> Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#F7F1E6] hover:text-[#F5A623] focus:outline-none"
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-white/10"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 flex flex-col">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base font-semibold text-[#EFE7D6] hover:text-[#F5A623] transition-colors tracking-wide"
                  >
                    {item}
                  </a>
                ))}
                {showAdmin && (
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-block mt-2 px-6 py-3 w-max text-sm font-heading font-semibold tracking-wider uppercase text-[#F5A623] border border-[#F5A623]/50 rounded-full hover:bg-[#F5A623] hover:text-[#1C1712] transition-colors"
                  >
                    Only Admin
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
