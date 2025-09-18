import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Adjust path to firebase.js
import logo from '../images/logo-notext.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAuthState(auth);
  const [isPremium, setIsPremium] = useState(false);

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

  return (
    <header className="bg-white shadow-md p-4 md:p-6 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="The Charly Method Logo" className="h-14 w-auto rounded-full" />
        </div>
        <nav className={`md:flex ${isOpen ? 'block' : 'hidden'} md:space-x-6 text-sm md:text-base font-medium`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
            }
          >
            Books
          </NavLink>
          {isPremium && (
            <NavLink
              to="/material"
              className={({ isActive }) =>
                `block text-gray-600 hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
              }
            >
              Material
            </NavLink>
          )}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `block text-gray-600 hover:text-indigo-600 ${isActive ? 'text-indigo-600' : ''}`
            }
          >
            Contact
          </NavLink>

        </nav>
        <NavLink
          to="/contact"
          className="hidden md:block bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 font-semibold"
        >
          Get in Touch
        </NavLink>
        <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;