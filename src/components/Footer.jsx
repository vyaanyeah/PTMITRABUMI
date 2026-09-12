// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { company } from '../data/company';
import logoImg from '../assets/logo-gold.jpeg';

const navLinks = [
  { key: 'home',      href: '/' },
  { key: 'about',     href: '/about' },
  { key: 'services',  href: '/services' },
  { key: 'portfolio', href: '/portfolio' },
  { key: 'contact',   href: '/contact' },
];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-darkblack text-white" role="contentinfo">
      {/* Main footer — matching header margins & compact padding */}
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img src={logoImg} alt="PT Mitra Bumi Rejeki" className="h-10 md:h-11 w-auto rounded-sm" />
              <div className="flex flex-col leading-none">
                <span className="font-cinzel font-bold italic text-brand-gold text-base md:text-lg tracking-[0.08em] uppercase">
                  MITRA BUMI REJEKI
                </span>
                <span className="text-white/30 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mt-0.5 font-sans">General Contractor</span>
              </div>
            </div>
            <p className="text-brand-gold text-xs md:text-sm tracking-[0.18em] uppercase mb-2.5 font-semibold">
              {t('footer.tagline')}
            </p>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-md text-justify">
              {t('intro.body').split('.')[0]}.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base tracking-wider uppercase mb-3.5">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    to={href}
                    className="text-white/65 hover:text-brand-gold text-sm md:text-base font-medium transition-colors duration-200"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-base tracking-wider uppercase mb-3.5">
              {t('footer.contactUs')}
            </h3>
            <ul className="space-y-2.5">
              {company.contact.phones.map(({ label, number, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/65 hover:text-brand-gold text-sm md:text-base font-medium transition-colors duration-200 flex items-start gap-2.5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-brand-gold/70 shrink-0 mt-0.5">↗</span>
                    <span>{number}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-white/65 hover:text-brand-gold text-sm md:text-base font-medium transition-colors duration-200 flex items-start gap-2.5"
                >
                  <span className="text-brand-gold/70 shrink-0 mt-0.5">✉</span>
                  <span className="break-all">{company.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/65 text-sm md:text-base">
                <span className="text-brand-gold/70 shrink-0 mt-0.5">◎</span>
                <span>{company.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 text-xs md:text-sm text-center sm:text-left">
            © {year} PT Mitra Bumi Rejeki. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/admin/login"
              className="text-white/30 hover:text-brand-gold text-xs transition-colors flex items-center gap-1.5 py-1 px-2.5 rounded bg-white/[0.03] hover:bg-white/[0.08] border border-white/5"
              title="Portal Khusus Administrator"
            >
              <ShieldCheck size={13} className="text-brand-gold/70" />
              <span>Portal Admin</span>
            </Link>
            <p className="text-brand-gold/60 text-xs md:text-sm tracking-widest uppercase">
              General Contractor & Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
