import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import logo from '../images/logo-notext.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState(window.location.hash);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  const navigateToSection = (sectionId) => {
    closeMenu();
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${sectionId}`);
        setActiveHash(`#${sectionId}`);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
        setActiveHash('');
      }
    } else {
      if (sectionId) {
        navigate(`/#${sectionId}`);
      } else {
        navigate('/');
      }
    }
  };

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
          <button
            onClick={() => navigateToSection('')}
            className="flex items-center space-x-2.5 focus:outline-none hover:opacity-90 transition text-left cursor-pointer"
          >
            <img src={logo} alt="The Charly Method Logo" className="h-9 sm:h-11 w-auto rounded-full" />
            <span className="font-extrabold text-primary text-base sm:text-lg tracking-tight">The Charly Method</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm lg:text-base font-medium text-gray-700">
            <button
              onClick={() => navigateToSection('')}
              className={`hover:text-secondary transition py-1 cursor-pointer ${
                location.pathname === '/' && !activeHash ? 'text-secondary font-bold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateToSection('about')}
              className={`hover:text-secondary transition py-1 cursor-pointer ${
                activeHash === '#about' ? 'text-secondary font-bold' : ''
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigateToSection('journey')}
              className={`hover:text-secondary transition py-1 cursor-pointer ${
                activeHash === '#journey' ? 'text-secondary font-bold' : ''
              }`}
            >
              Your Journey
            </button>
            <button
              onClick={() => navigateToSection('services')}
              className={`hover:text-secondary transition py-1 cursor-pointer ${
                activeHash === '#services' ? 'text-secondary font-bold' : ''
              }`}
            >
              Services
            </button>
            <button
              onClick={() => navigateToSection('books')}
              className={`hover:text-secondary transition py-1 cursor-pointer ${
                activeHash === '#books' ? 'text-secondary font-bold' : ''
              }`}
            >
              Books
            </button>
            
            <NavLink 
              to="/resources" 
              onClick={closeMenu}
              className={({ isActive }) =>
                `hover:text-secondary transition py-1 ${
                  isActive ? 'text-secondary font-bold' : ''
                }`
              }
            >
              Resources
            </NavLink>

            <button
              onClick={() => navigateToSection('contact')}
              className="px-5 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-indigo-700 transition shadow-sm hover:shadow text-sm cursor-pointer"
            >
              Free 60-min Chat
            </button>
          </nav>

          {/* Mobile menu toggle */}
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
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-xl px-5 py-4 flex flex-col space-y-2.5 text-sm font-medium z-50">
              <button
                onClick={() => navigateToSection('')}
                className={`text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700 transition ${
                  location.pathname === '/' && !activeHash ? 'text-secondary font-bold bg-amber-50/50' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateToSection('about')}
                className={`text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700 transition ${
                  activeHash === '#about' ? 'text-secondary font-bold bg-amber-50/50' : ''
                }`}
              >
                About
              </button>
              <button
                onClick={() => navigateToSection('journey')}
                className={`text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700 transition ${
                  activeHash === '#journey' ? 'text-secondary font-bold bg-amber-50/50' : ''
                }`}
              >
                Your Journey
              </button>
              <button
                onClick={() => navigateToSection('services')}
                className={`text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700 transition ${
                  activeHash === '#services' ? 'text-secondary font-bold bg-amber-50/50' : ''
                }`}
              >
                Services
              </button>
              <button
                onClick={() => navigateToSection('books')}
                className={`text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700 transition ${
                  activeHash === '#books' ? 'text-secondary font-bold bg-amber-50/50' : ''
                }`}
              >
                Books
              </button>
              <NavLink 
                to="/resources" 
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-700 transition ${
                    isActive ? 'text-secondary font-bold bg-amber-50/50' : ''
                  }`
                }
              >
                Resources
              </NavLink>
              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => navigateToSection('contact')}
                  className="w-full py-3 px-4 bg-primary text-white text-center font-semibold rounded-full hover:bg-indigo-700 transition shadow-sm text-sm"
                >
                  Free 60-min Chat
                </button>
              </div>
            </div>
          )}

        </div>
      </header>
    </>
  );
};

export default Header;
