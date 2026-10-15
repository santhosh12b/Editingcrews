import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from '../data/translations';

const LanguageContext = createContext();

const checkIsSingaporePath = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  return path.startsWith('/singapore') || path === '/sg';
};

export function LanguageProvider({ children }) {
  const [isSingapore, setIsSingapore] = useState(checkIsSingaporePath);

  const [currentLang, setCurrentLang] = useState(() => {
    if (checkIsSingaporePath()) {
      return 'sg';
    }

    try {
      localStorage.removeItem('editing_crew_lang');
    } catch (e) {}

    const saved = localStorage.getItem('editing_crew_lang_v2');
    if (saved && saved !== 'sg' && translations[saved]) {
      return saved;
    }
    // Default language for global / European root is German ('de')
    return 'de';
  });

  // Listen to popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const isSg = checkIsSingaporePath();
      setIsSingapore(isSg);
      if (isSg) {
        setCurrentLang('sg');
      } else {
        const saved = localStorage.getItem('editing_crew_lang_v2');
        setCurrentLang(saved && saved !== 'sg' && translations[saved] ? saved : 'de');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update HTML lang & document title
  useEffect(() => {
    if (currentLang !== 'sg') {
      localStorage.setItem('editing_crew_lang_v2', currentLang);
    }
    document.documentElement.lang = currentLang === 'sg' ? 'en' : currentLang;

    if (isSingapore) {
      document.title = "The Editing Crew — AI Video Production & Video Editing Singapore";
    } else {
      document.title = "The Editing Crew — Professionelle KI-Videoproduktion & Videoschnitt";
    }
  }, [currentLang, isSingapore]);

  // Navigate between Singapore (/singapore) and Global/European (/)
  const navigateToMarket = (targetMarket) => {
    if (targetMarket === 'singapore') {
      if (window.location.pathname !== '/singapore') {
        window.history.pushState({}, '', '/singapore');
      }
      setIsSingapore(true);
      setCurrentLang('sg');
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      setIsSingapore(false);
      const saved = localStorage.getItem('editing_crew_lang_v2');
      setCurrentLang(saved && saved !== 'sg' && translations[saved] ? saved : 'de');
    }
  };

  const t = isSingapore 
    ? (translations[currentLang] || translations.sg || translations.en)
    : (translations[currentLang] || translations.de);

  const currentLanguageObj = languages.find(l => l.code === currentLang) || languages[0];

  const currency = isSingapore ? 'S$' : '€';
  const pricePerMinute = isSingapore ? 94 : 69;
  const priceFormatted = isSingapore ? 'S$94' : '69 €';
  const rateText = isSingapore ? 'S$94/Min.' : '69 €/Min.';

  return (
    <LanguageContext.Provider value={{ 
      currentLang, 
      setLanguage: setCurrentLang, 
      t, 
      languages,
      currentLanguageObj,
      isSingapore,
      region: isSingapore ? 'singapore' : 'global',
      currency,
      pricePerMinute,
      priceFormatted,
      rateText,
      navigateToMarket
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
