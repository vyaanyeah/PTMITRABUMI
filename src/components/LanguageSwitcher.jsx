// src/components/LanguageSwitcher.jsx
import { useLanguage } from '../context/LanguageContext';

export default function LanguageSwitcher({ light = false, className = '' }) {
  const { lang, setLanguage } = useLanguage();

  const base   = 'text-xs font-semibold tracking-wider transition-colors duration-200 px-1.5 py-0.5';
  const active = 'text-brand-gold font-bold';
  const inactive = light ? 'text-white/60 hover:text-white' : 'text-brand-gray hover:text-brand-black';

  return (
    <div className={`flex items-center gap-1 select-none ${className}`} aria-label="Language switcher">
      <button
        onClick={() => setLanguage('id')}
        className={`${base} ${lang === 'id' ? active : inactive}`}
        aria-pressed={lang === 'id'}
      >
        ID
      </button>
      <span className={`text-[10px] ${light ? 'text-white/30' : 'text-brand-gray/40'}`}>|</span>
      <button
        onClick={() => setLanguage('en')}
        className={`${base} ${lang === 'en' ? active : inactive}`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  );
}
