import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, languages } from '../data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      // Clear legacy storage key if it had English
      localStorage.removeItem('editing_crew_lang');
    } catch (e) {}

    const saved = localStorage.getItem('editing_crew_lang_v2');
    if (saved && translations[saved]) {
      return saved;
    }
    // Main default language is German ('de') for German ads & market
    return 'de';
  });

  useEffect(() => {
    localStorage.setItem('editing_crew_lang_v2', currentLang);
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const t = translations[currentLang] || translations.de;

  const currentLanguageObj = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <LanguageContext.Provider value={{ 
      currentLang, 
      setLanguage: setCurrentLang, 
      t, 
      languages,
      currentLanguageObj
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
