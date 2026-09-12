// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useCallback } from 'react';
import idTranslations from '../i18n/id';
import enTranslations from '../i18n/en';

const translations = { id: idTranslations, en: enTranslations };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('id');

  const toggleLanguage = useCallback(() => {
    setLang(prev => (prev === 'id' ? 'en' : 'id'));
  }, []);

  const setLanguage = useCallback((newLang) => {
    if (newLang === 'id' || newLang === 'en') setLang(newLang);
  }, []);

  // Deep-access helper: t('nav.home')
  const t = useCallback((key) => {
    const keys = key.split('.');
    let result = translations[lang];
    for (const k of keys) {
      if (result === undefined || result === null) return key;
      result = result[k];
    }
    return result ?? key;
  }, [lang]);

  // Helper for bilingual data objects: tObj({ id: '...', en: '...' })
  const tObj = useCallback((obj) => {
    if (!obj || typeof obj !== 'object') return '';
    return obj[lang] ?? obj['id'] ?? '';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, toggleLanguage, t, tObj }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
