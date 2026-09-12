// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AOS from 'aos';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Re-initialise AOS on every route change so new-page elements animate in
    setTimeout(() => AOS.refresh(), 100);
  }, [pathname]);
  return null;
}

