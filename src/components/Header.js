import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import logo from '../images/logo-notext.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPremium = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        setIsPremium(userDoc.exists() && userDoc.data().premium);
      } else {
        setIsPremium(false);
      }
    };
    checkPremium();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-white shadow-md p-4 md:p-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="The Charly Method Logo" className="h-14 w-auto rounded-full" />
        </div>

        {/* Navigation links */}
        <nav
          className={`md:flex ${isOpen ? 'block' : 'hidden'} md:space-x-6 text-sm md:text-base font-medium
          md:static absolute left-0 right-0 top-full bg-white md:bg-transparent px-4 md:px-0 pb-4 md:pb-0`}
        >
          <NavLink to="/" onClick={closeMenu}
            className={({ isActive }) =>
              `block py-2 text-gray-600 hover:text-secondary ${isActive ? 'text-secondary' : ''}`
            }>
            Home
          </NavLink>
          <NavLink to="/about" onClick={closeMenu}
            className={({ isActive }) =>
              `block py-2 text-gray-600 hover:text-secondary ${isActive ? 'text-secondary' : ''}`
            }>
            About
          </NavLink>
          <NavLink to="/services" onClick={closeMenu}
            className={({ isActive }) =>
              `block py-2 text-gray-600 hover:text-secondary ${isActive ? 'text-secondary' : ''}`
            }>
            Services
          </NavLink>
          <NavLink to="/books" onClick={closeMenu}
            className={({ isActive }) =>
              `block py-2 text-gray-600 hover:text-secondary ${isActive ? 'text-secondary' : ''}`
            }>
            Books
          </NavLink>
          {isPremium && (
            <NavLink to="/material" onClick={closeMenu}
              className={({ isActive }) =>
                `block py-2 text-gray-600 hover:text-secondary ${isActive ? 'text-secondary' : ''}`
              }>
              Material
            </NavLink>
          )}
          <NavLink to="/contact" onClick={closeMenu}
            className={({ isActive }) =>
              `block py-2 text-gray-600 hover:text-secondary ${isActive ? 'text-secondary' : ''}`
            }>
            Contact
          </NavLink>

          {/* 🔽 Mobile-only auth actions inside the dropdown */}
          <div className="mt-3 space-y-2 md:hidden">
            {user ? (
              <>
                <NavLink
                  to="/payment"
                  onClick={closeMenu}
                  className="block text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-washedprimary font-medium"
                >
                  Manage Subscription
                </NavLink>
                <button
                  onClick={() => { handleLogout(); closeMenu(); }}
                  className="block w-full text-center bg-washedprimary text-white px-4 py-2 rounded-lg hover:bg-washedprimary font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="block text-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-washedprimary font-medium"
              >
                Login / Subscribe
              </NavLink>
            )}
          </div>
        </nav>

        {/* Right-side button (desktop only) */}
        <div className="hidden md:flex space-x-3 items-center">
          {user ? (
            <>
              <NavLink
                to="/payment"
                className="bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-washedprimary font-medium text-sm"
              >
                Manage Subscription
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-washedprimary text-white px-4 py-1.5 rounded-lg hover:bg-washedprimary font-medium text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-washedprimary font-medium text-sm"
            >
              Login / Subscribe
            </NavLink>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
