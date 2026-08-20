import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo-notext.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/journey', label: 'Your Journey' },
    { to: '/services', label: 'Services' },
    { to: '/books', label: 'Books' },
    { to: '/resources', label: 'Resources' },
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex justify-between items-center relative">
          
          {/* Logo */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center space-x-2.5 focus:outline-none hover:opacity-90 transition text-left cursor-pointer"
          >
            <img src={logo} alt="The Charly Method Logo" className="h-9 sm:h-11 w-auto rounded-full" />
            <span className="font-extrabold text-primary text-base sm:text-lg tracking-tight">The Charly Method</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7 text-sm lg:text-base font-medium text-gray-700">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `transition py-1 cursor-pointer hover:text-secondary ${
                    isActive ? 'text-secondary font-bold border-b-2 border-secondary' : 'text-gray-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-5 py-2.5 rounded-full transition shadow-xs hover:shadow text-sm font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-secondary text-slate-900 font-bold'
                    : 'bg-primary text-white hover:bg-indigo-700'
                }`
              }
            >
              Free 60-min Chat
            </NavLink>
          </nav>

          {/* Mobile menu toggle button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-secondary transition focus:outline-none rounded-lg hover:bg-gray-100 cursor-pointer"
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

          {/* Mobile dropdown menu */}
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl px-5 py-4 flex flex-col space-y-2 text-sm font-medium z-50">
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
              
              <div className="pt-2 border-t border-gray-100">
                <NavLink
                  to="/contact"
                  onClick={closeMenu}
                  className="w-full py-3 px-4 bg-primary text-white text-center font-semibold rounded-full hover:bg-indigo-700 transition shadow-xs text-sm block"
                >
                  Free 60-min Chat
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
