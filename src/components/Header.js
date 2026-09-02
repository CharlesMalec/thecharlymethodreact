import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import logo from '../images/logo-notext.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { to: '/', label: t.nav.home, end: true },
    { to: '/about', label: t.nav.about },
    { to: '/journey', label: t.nav.journey },
    { to: '/services', label: t.nav.services },
    { to: '/books', label: t.nav.books },
    { to: '/resources', label: t.nav.resources },
  ];

  return (
    <>
      {/* Mobile backdrop overlay when menu is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 lg:h-18 flex justify-between items-center relative">
          
          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center space-x-2.5 focus:outline-none hover:opacity-90 transition text-left cursor-pointer shrink-0"
          >
            <img src={logo} alt="The Charly Method Logo" className="h-8 sm:h-9 w-auto rounded-full shrink-0" />
            <span className="font-extrabold text-primary text-base sm:text-lg tracking-tight whitespace-nowrap">
              The Charly Method
            </span>
          </NavLink>

          {/* Desktop Navigation (compact & aligned) */}
          <nav className="hidden lg:flex items-center space-x-3.5 xl:space-x-5 text-[13px] xl:text-[14px] font-medium text-gray-700 shrink-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `transition py-1 px-1 cursor-pointer hover:text-secondary whitespace-nowrap ${
                    isActive ? 'text-secondary font-bold border-b-2 border-secondary' : 'text-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Language Switcher Pill (Desktop) */}
            <div className="inline-flex items-center bg-gray-100/90 rounded-full p-0.5 border border-gray-200/80 shadow-2xs shrink-0">
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2 py-0.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  language === 'fr'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-gray-600 hover:text-primary'
                }`}
                title="Passer en Français"
                aria-label="Passer en Français"
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-gray-600 hover:text-primary'
                }`}
                title="Switch to English"
                aria-label="Switch to English"
              >
                EN
              </button>
            </div>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-3.5 xl:px-4.5 py-1.5 xl:py-2 rounded-full transition shadow-xs hover:shadow text-xs xl:text-sm font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-secondary text-slate-900 font-bold'
                    : 'bg-primary text-white hover:bg-indigo-700'
                }`
              }
            >
              {t.nav.cta}
            </NavLink>
          </nav>

          {/* Mobile / Tablet Controls: Language switcher + Hamburger */}
          <div className="flex items-center space-x-2 lg:hidden">
            {/* Language Switcher Pill (Mobile Header) */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-0.5 border border-gray-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLanguage('fr')}
                className={`px-2 py-0.5 rounded-full transition ${
                  language === 'fr' ? 'bg-primary text-white' : 'text-gray-600'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-full transition ${
                  language === 'en' ? 'bg-primary text-white' : 'text-gray-600'
                }`}
              >
                EN
              </button>
            </div>

            {/* Mobile menu toggle button */}
            <button
              className="p-2 text-gray-700 hover:text-secondary transition focus:outline-none rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile dropdown menu */}
          {isOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl px-5 py-4 flex flex-col space-y-2 text-sm font-medium z-50">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-left py-2.5 px-3.5 rounded-xl transition ${
                      isActive 
                        ? 'text-secondary font-bold bg-amber-50/80 border border-amber-200/50' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Language selection inside mobile menu */}
              <div className="py-2.5 px-3.5 flex items-center justify-between border-t border-gray-100 mt-2 text-xs">
                <span className="text-gray-500 font-semibold flex items-center space-x-1.5">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span>Langue / Language:</span>
                </span>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setLanguage('fr')}
                    className={`px-3 py-1 rounded-lg font-bold ${
                      language === 'fr' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    Français (FR)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 rounded-lg font-bold ${
                      language === 'en' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    English (EN)
                  </button>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-100">
                <NavLink
                  to="/contact"
                  onClick={closeMenu}
                  className="w-full py-3 px-4 bg-primary text-white text-center font-semibold rounded-full hover:bg-indigo-700 transition shadow-xs text-sm block"
                >
                  {t.nav.cta}
                </NavLink>
              </div>
            </div>
          )}

        </div>
      </header>
    </>
  );
};

export default Header;
