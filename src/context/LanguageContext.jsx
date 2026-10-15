import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from '../data/translations';

const LanguageContext = createContext();

const getMarketFromPath = () => {
  if (typeof window === 'undefined') return 'global';
  const path = window.location.pathname.toLowerCase();
  if (path.startsWith('/singapore') || path === '/sg') return 'singapore';
  if (path.startsWith('/malaysia') || path === '/my') return 'malaysia';
  return 'global';
};

export function LanguageProvider({ children }) {
  const [market, setMarket] = useState(getMarketFromPath);

  const isSingapore = market === 'singapore';
  const isMalaysia = market === 'malaysia';

  const [currentLang, setCurrentLang] = useState(() => {
    const currentMarket = getMarketFromPath();
    if (currentMarket === 'singapore') return 'sg';
    if (currentMarket === 'malaysia') return 'my';

    try {
      localStorage.removeItem('editing_crew_lang');
    } catch (e) {}

    const saved = localStorage.getItem('editing_crew_lang_v2');
    if (saved && saved !== 'sg' && saved !== 'my' && translations[saved]) {
      return saved;
    }
    // Default language for global / European root is German ('de')
    return 'de';
  });

  // Listen to popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const currentMarket = getMarketFromPath();
      setMarket(currentMarket);
      if (currentMarket === 'singapore') {
        setCurrentLang('sg');
      } else if (currentMarket === 'malaysia') {
        setCurrentLang('my');
      } else {
        const saved = localStorage.getItem('editing_crew_lang_v2');
        setCurrentLang(saved && saved !== 'sg' && saved !== 'my' && translations[saved] ? saved : 'de');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update HTML lang & document title
  useEffect(() => {
    if (currentLang !== 'sg' && currentLang !== 'my') {
      localStorage.setItem('editing_crew_lang_v2', currentLang);
    }
    document.documentElement.lang = (currentLang === 'sg' || currentLang === 'my') ? 'en' : currentLang;

    if (isMalaysia) {
      document.title = "The Editing Crew — AI Video Production & Video Editing Malaysia";
    } else if (isSingapore) {
      document.title = "The Editing Crew — AI Video Production & Video Editing Singapore";
    } else {
      document.title = "The Editing Crew — Professionelle KI-Videoproduktion & Videoschnitt";
    }
  }, [currentLang, isSingapore, isMalaysia]);

  // Navigate between Malaysia (/malaysia), Singapore (/singapore) and Global/European (/)
  const navigateToMarket = (targetMarket) => {
    if (targetMarket === 'malaysia') {
      if (window.location.pathname !== '/malaysia') {
        window.history.pushState({}, '', '/malaysia');
      }
      setMarket('malaysia');
      setCurrentLang('my');
    } else if (targetMarket === 'singapore') {
      if (window.location.pathname !== '/singapore') {
        window.history.pushState({}, '', '/singapore');
      }
      setMarket('singapore');
      setCurrentLang('sg');
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      setMarket('global');
      const saved = localStorage.getItem('editing_crew_lang_v2');
      setCurrentLang(saved && saved !== 'sg' && saved !== 'my' && translations[saved] ? saved : 'de');
    }
  };

  const t = isMalaysia
    ? (translations[currentLang] || translations.my || translations.en)
    : isSingapore 
      ? (translations[currentLang] || translations.sg || translations.en)
      : (translations[currentLang] || translations.de);

  const currentLanguageObj = languages.find(l => l.code === currentLang) || languages[0];

  const currency = isMalaysia ? 'RM' : (isSingapore ? 'S$' : '€');
  const pricePerMinute = isMalaysia ? 299 : (isSingapore ? 94 : 69);
  const priceFormatted = isMalaysia ? 'RM299' : (isSingapore ? 'S$94' : '69 €');
  const rateText = isMalaysia ? 'RM299/Min.' : (isSingapore ? 'S$94/Min.' : '69 €/Min.');

  return (
    <LanguageContext.Provider value={{ 
      currentLang, 
      setLanguage: setCurrentLang, 
      t, 
      languages,
      currentLanguageObj,
      market,
      isSingapore,
      isMalaysia,
      region: market,
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
