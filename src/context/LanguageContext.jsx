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

const getDefaultLanguageForMarket = (mkt) => {
  if (mkt === 'singapore' || mkt === 'malaysia') return 'en';
  return 'de';
};

// Deeply adapts any translation tree to strictly match the active market's pricing and regional context
function adaptTranslationForMarket(obj, targetMarket) {
  if (!obj) return obj;

  if (targetMarket === 'singapore') {
    const transformStr = (str) => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/2[\s\u00A0]*[×x*][\s\u00A0]*(?:€[\s\u00A0]*69|69[\s\u00A0]*€|69[\s\u00A0]*欧元|RM[\s\u00A0]*299|S\$[\s\u00A0]*94)[\s\u00A0]*=[\s\u00A0]*(?:€[\s\u00A0]*138|138[\s\u00A0]*€|138[\s\u00A0]*欧元|RM[\s\u00A0]*598|S\$[\s\u00A0]*188)/gi, '2 × S$94 = S$188')
        .replace(/(?:€[\s\u00A0]*69|69[\s\u00A0]*€|69[\s\u00A0]*欧元|RM[\s\u00A0]*299)/gi, 'S$94')
        .replace(/(?:€[\s\u00A0]*138|138[\s\u00A0]*€|138[\s\u00A0]*欧元|RM[\s\u00A0]*598)/gi, 'S$188')
        .replace(/European campaigns/gi, 'Singapore & APAC campaigns')
        .replace(/European brands/gi, 'Singapore & APAC brands')
        .replace(/Europe\b/gi, 'Singapore & APAC')
        .replace(/Europas/gi, 'Singapurs')
        .replace(/Europa/gi, 'Singapur')
        .replace(/European/gi, 'Singapore & APAC');
    };

    const deepTransform = (val) => {
      if (typeof val === 'string') return transformStr(val);
      if (Array.isArray(val)) return val.map(deepTransform);
      if (val && typeof val === 'object') {
        const next = {};
        for (const k of Object.keys(val)) {
          next[k] = deepTransform(val[k]);
        }
        return next;
      }
      return val;
    };

    const adapted = deepTransform(obj);
    if (adapted?.pricing) {
      adapted.pricing.price = 'S$94';
      if (adapted.pricing.rate) adapted.pricing.rate = 'S$94/min';
    }
    return adapted;
  }

  if (targetMarket === 'malaysia') {
    const transformStr = (str) => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/2[\s\u00A0]*[×x*][\s\u00A0]*(?:€[\s\u00A0]*69|69[\s\u00A0]*€|69[\s\u00A0]*欧元|S\$[\s\u00A0]*94|RM[\s\u00A0]*299)[\s\u00A0]*=[\s\u00A0]*(?:€[\s\u00A0]*138|138[\s\u00A0]*€|138[\s\u00A0]*欧元|S\$[\s\u00A0]*188|RM[\s\u00A0]*598)/gi, '2 × RM299 = RM598')
        .replace(/(?:€[\s\u00A0]*69|69[\s\u00A0]*€|69[\s\u00A0]*欧元|S\$[\s\u00A0]*94)/gi, 'RM299')
        .replace(/(?:€[\s\u00A0]*138|138[\s\u00A0]*€|138[\s\u00A0]*欧元|S\$[\s\u00A0]*188)/gi, 'RM598')
        .replace(/European campaigns/gi, 'Southeast Asian campaigns')
        .replace(/European brands/gi, 'Malaysian brands')
        .replace(/Europe\b/gi, 'Southeast Asia')
        .replace(/Europas/gi, 'Malaysias')
        .replace(/Europa/gi, 'Malaysia')
        .replace(/European/gi, 'Southeast Asian');
    };

    const deepTransform = (val) => {
      if (typeof val === 'string') return transformStr(val);
      if (Array.isArray(val)) return val.map(deepTransform);
      if (val && typeof val === 'object') {
        const next = {};
        for (const k of Object.keys(val)) {
          next[k] = deepTransform(val[k]);
        }
        return next;
      }
      return val;
    };

    const adapted = deepTransform(obj);
    if (adapted?.pricing) {
      adapted.pricing.price = 'RM299';
      if (adapted.pricing.rate) adapted.pricing.rate = 'RM299/min';
    }
    return adapted;
  }

  // Global / Germany version
  if (targetMarket === 'global') {
    const transformStr = (str) => {
      if (typeof str !== 'string') return str;
      return str
        .replace(/2[\s\u00A0]*[×x*][\s\u00A0]*(?:RM[\s\u00A0]*299|S\$[\s\u00A0]*94)[\s\u00A0]*=[\s\u00A0]*(?:RM[\s\u00A0]*598|S\$[\s\u00A0]*188)/gi, '2 × 69 € = 138 €')
        .replace(/(?:RM[\s\u00A0]*299|S\$[\s\u00A0]*94)/gi, '69 €')
        .replace(/(?:RM[\s\u00A0]*598|S\$[\s\u00A0]*188)/gi, '138 €');
    };

    const deepTransform = (val) => {
      if (typeof val === 'string') return transformStr(val);
      if (Array.isArray(val)) return val.map(deepTransform);
      if (val && typeof val === 'object') {
        const next = {};
        for (const k of Object.keys(val)) {
          next[k] = deepTransform(val[k]);
        }
        return next;
      }
      return val;
    };

    const adapted = deepTransform(obj);
    if (adapted?.pricing) {
      adapted.pricing.price = '69 €';
      if (adapted.pricing.rate) adapted.pricing.rate = '69 €/Min.';
    }
    return adapted;
  }

  return obj;
}

export function LanguageProvider({ children }) {
  const [market, setMarket] = useState(getMarketFromPath);

  const isSingapore = market === 'singapore';
  const isMalaysia = market === 'malaysia';

  const [currentLang, setCurrentLang] = useState(() => {
    const currentMarket = getMarketFromPath();
    try {
      const saved = localStorage.getItem('editing_crew_lang_' + currentMarket);
      if (saved && (translations[saved] || saved === 'en')) {
        return saved;
      }
    } catch (e) {}
    return getDefaultLanguageForMarket(currentMarket);
  });

  // Listen to popstate (back/forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const currentMarket = getMarketFromPath();
      setMarket(currentMarket);
      try {
        const saved = localStorage.getItem('editing_crew_lang_' + currentMarket);
        setCurrentLang(saved && (translations[saved] || saved === 'en') ? saved : getDefaultLanguageForMarket(currentMarket));
      } catch (e) {
        setCurrentLang(getDefaultLanguageForMarket(currentMarket));
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update HTML lang, document title & persist selection for current market
  useEffect(() => {
    try {
      localStorage.setItem('editing_crew_lang_' + market, currentLang);
    } catch (e) {}

    document.documentElement.lang = currentLang;

    if (isMalaysia) {
      document.title = "The Editing Crew — AI Video Production & Video Editing Malaysia";
    } else if (isSingapore) {
      document.title = "The Editing Crew — AI Video Production & Video Editing Singapore";
    } else {
      document.title = "The Editing Crew — Professionelle KI-Videoproduktion & Videoschnitt";
    }
  }, [currentLang, market, isSingapore, isMalaysia]);

  // Navigate between Malaysia (/malaysia), Singapore (/singapore) and Global/European (/)
  const navigateToMarket = (targetMarket) => {
    if (targetMarket === 'malaysia') {
      if (window.location.pathname !== '/malaysia') {
        window.history.pushState({}, '', '/malaysia');
      }
      setMarket('malaysia');
      try {
        const saved = localStorage.getItem('editing_crew_lang_malaysia');
        setCurrentLang(saved && (translations[saved] || saved === 'en') ? saved : 'en');
      } catch (e) {
        setCurrentLang('en');
      }
    } else if (targetMarket === 'singapore') {
      if (window.location.pathname !== '/singapore') {
        window.history.pushState({}, '', '/singapore');
      }
      setMarket('singapore');
      try {
        const saved = localStorage.getItem('editing_crew_lang_singapore');
        setCurrentLang(saved && (translations[saved] || saved === 'en') ? saved : 'en');
      } catch (e) {
        setCurrentLang('en');
      }
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
      }
      setMarket('global');
      try {
        const saved = localStorage.getItem('editing_crew_lang_global');
        setCurrentLang(saved && (translations[saved] || saved === 'de') ? saved : 'de');
      } catch (e) {
        setCurrentLang('de');
      }
    }
  };

  // Determine base translations depending on market & language
  let rawTranslations;
  if (isSingapore) {
    if (currentLang === 'en' || currentLang === 'sg') {
      rawTranslations = translations.sg || translations.en;
    } else {
      rawTranslations = translations[currentLang] || translations.sg || translations.en;
    }
  } else if (isMalaysia) {
    if (currentLang === 'en' || currentLang === 'my') {
      rawTranslations = translations.my || translations.en;
    } else if (currentLang === 'ms') {
      rawTranslations = translations.ms || translations.my || translations.en;
    } else {
      rawTranslations = translations[currentLang] || translations.my || translations.en;
    }
  } else {
    // Global / Germany version
    if (currentLang === 'de') {
      rawTranslations = translations.de;
    } else if (currentLang === 'en') {
      rawTranslations = translations.en;
    } else {
      rawTranslations = translations[currentLang] || translations.de;
    }
  }

  // Deeply adapt for the active market
  const t = adaptTranslationForMarket(rawTranslations, market);

  // Normalise currentLanguageObj for display
  const currentLanguageObj = languages.find(l => l.code === currentLang) || 
    (isSingapore || isMalaysia ? { code: 'en', label: 'English', short: 'EN' } : { code: 'de', label: 'Deutsch', short: 'DE' });

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
