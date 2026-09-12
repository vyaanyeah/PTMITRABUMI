// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import logoImg from '../assets/logo-gold.jpeg';

const navLinks = [
  { key: 'home',      href: '/' },
  { key: 'about',     href: '/about' },
  { key: 'services',  href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'contact',   href: '/contact' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-darkblack/95 backdrop-blur-md shadow-lg shadow-black/30 border-b border-white/5'
            : 'bg-transparent'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="PT Mitra Bumi Rejeki Home">
            <img src={logoImg} alt="PT Mitra Bumi Rejeki" className="h-10 md:h-12 w-auto rounded-sm" />
            <div className="flex flex-col leading-none">
              <span className="font-cinzel font-bold italic text-brand-gold text-base md:text-lg tracking-[0.08em] uppercase group-hover:text-brand-lightgold transition-colors duration-200">
                MITRA BUMI REJEKI
              </span>
              <span className="text-white/40 text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-medium mt-0.5 font-sans">
                General Contractor
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="Desktop navigation">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                to={href}
                className={`text-base xl:text-[17px] font-semibold tracking-wide transition-colors duration-200 py-1 ${
                  isActive(href)
                    ? 'text-brand-gold'
                    : 'text-white/75 hover:text-brand-gold'
                }`}
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {t(`nav.${key}`)}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <LanguageSwitcher light />
            <Link to="/contact" className="btn-gold text-sm font-bold px-6 py-3">
              {t('nav.cta')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <LanguageSwitcher light />
            <button
              id="mobile-menu-toggle"
              onClick={() => setMenuOpen(v => !v)}
              className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 focus:outline-none"
              aria-label="Toggle mobile menu"
              aria-expanded={menuOpen}
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-brand-darkblack flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
              {/* Logo in mobile menu */}
              <div className="mb-12 flex items-center gap-3">
                <img src={logoImg} alt="PT Mitra Bumi Rejeki" className="h-12 w-auto rounded-sm" />
                <div>
                  <span className="font-cinzel font-bold italic text-brand-gold text-base tracking-[0.08em] uppercase block">MITRA BUMI REJEKI</span>
                  <span className="text-white/40 text-[9px] tracking-[0.3em] uppercase font-sans">General Contractor</span>
                </div>
              </div>

              {navLinks.map(({ key, href }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: 32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    to={href}
                    className={`block text-3xl font-bold py-2 transition-colors duration-200 ${
                      isActive(href) ? 'text-brand-gold' : 'text-white hover:text-brand-gold'
                    }`}
                    aria-current={isActive(href) ? 'page' : undefined}
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10"
              >
                <Link to="/contact" className="btn-gold" onClick={() => setMenuOpen(false)}>
                  {t('nav.cta')}
                </Link>
              </motion.div>
            </div>

            {/* Bottom border accent */}
            <div className="px-8 pb-10 border-t border-white/5 pt-6">
              <p className="text-white/30 text-xs tracking-widest uppercase">
                PT Mitra Bumi Rejeki
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
