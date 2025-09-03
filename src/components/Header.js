import React from 'react';
import logo from '../images/logo-notext.png';

const Header = () => (
  <header className="bg-white shadow-md p-4 md:p-6 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="The Charly Method Logo" className="h-14 w-auto rounded-full" />
      </div>
      <nav className="hidden md:flex space-x-6 text-sm md:text-base font-medium">
        <a href="#about" className="text-gray-600 hover:text-indigo-600">About</a>
        <a href="#services" className="text-gray-600 hover:text-indigo-600">Services</a>
        <a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact</a>
      </nav>
      <a href="#contact" className="hidden md:block bg-indigo-600 text-white px-5 py-2.5 rounded-full hover:bg-indigo-700 font-semibold">Get in Touch</a>
      <button className="md:hidden text-gray-600">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </header>
);

export default Header;