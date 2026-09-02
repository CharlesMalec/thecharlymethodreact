import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../translations/translations';

const LanguageContext = createContext();

const STORAGE_KEY = 'thecharlymethod_language';

export const LanguageProvider = ({ children }) => {
  // Default to French as requested (primary target)
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'fr' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      console.warn('Unable to access localStorage', e);
    }
    return 'fr';
  });

  const setLanguage = (lang) => {
    if (lang === 'fr' || lang === 'en') {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch (e) {
        console.warn('Unable to save to localStorage', e);
      }
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  useEffect(() => {
    // Update html lang attribute dynamically
    document.documentElement.lang = language;
  }, [language]);

  const t = translations[language] || translations.fr;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
