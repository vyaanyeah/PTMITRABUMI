// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
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
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-12 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <img src={logoImg} alt="PT Mitra Bumi Rejeki" className="h-8 md:h-9 w-auto rounded-sm" />
              <div className="flex flex-col leading-none">
                <span className="font-cinzel font-bold italic text-brand-gold text-xs md:text-sm tracking-[0.08em] uppercase">
                  MITRA BUMI REJEKI
                </span>
                <span className="text-white/30 text-[7.5px] md:text-[8.5px] tracking-[0.25em] uppercase mt-0.5 font-sans">General Contractor</span>
              </div>
            </div>
            <p className="text-brand-gold text-[11px] md:text-xs tracking-[0.16em] uppercase mb-2 font-semibold">
              {t('footer.tagline')}
            </p>
            <p className="text-white/60 text-xs md:text-sm leading-relaxed max-w-md text-justify">
              {t('intro.body').split('.')[0]}.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase mb-3">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {navLinks.map(({ key, href }) => (
                <li key={key}>
                  <Link
                    to={href}
                    className="text-white/65 hover:text-brand-gold text-xs md:text-sm font-medium transition-colors duration-200"
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xs md:text-sm tracking-wider uppercase mb-3">
              {t('footer.contactUs')}
            </h3>
            <ul className="space-y-3">
              {company.contact.phones.map(({ label, number, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-white/65 hover:text-brand-gold text-xs md:text-sm font-medium transition-colors duration-200 flex items-center gap-2.5 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5 text-brand-gold" strokeWidth={1.5} />
                    </div>
                    <span>{number}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-white/65 hover:text-brand-gold text-xs md:text-sm font-medium transition-colors duration-200 flex items-center gap-2.5 group"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <span className="break-all">{company.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/65 text-xs md:text-sm">
                <div className="w-6 h-6 rounded-full bg-brand-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-gold" strokeWidth={1.5} />
                </div>
                <span className="leading-snug">{company.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-12 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="text-white/40 text-[11px] md:text-xs text-center sm:text-left">
            © {year} PT Mitra Bumi Rejeki. {t('footer.rights')}
          </p>
          <p className="text-brand-gold/60 text-[11px] md:text-xs tracking-widest uppercase">
            General Contractor & Developer
          </p>
        </div>
      </div>
    </footer>
  );
}
