import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo-notext.png';

const Footer = () => (
  <footer className="bg-slate-900 text-white pt-12 sm:pt-16 pb-10 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand & Purpose */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <img src={logo} alt="The Charly Method" className="h-10 w-auto rounded-full bg-white p-0.5" />
            <span className="font-extrabold text-lg text-white">The Charly Method</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Human-centered coaching and mentorship for life, career decisions, and team leadership. 
            Grounding choices in clarity, empathy, and real-world experience.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center text-xs font-semibold text-secondary bg-amber-950/60 border border-amber-800/60 px-3 py-1 rounded-full">
              ☕ First 60-Minute Conversation Free
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Pages</h3>
          <ul className="space-y-2.5 text-sm">
            <li>
              <NavLink to="/" className="text-gray-300 hover:text-secondary transition">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="text-gray-300 hover:text-secondary transition">
                About & Philosophy
              </NavLink>
            </li>
            <li>
              <NavLink to="/journey" className="text-gray-300 hover:text-secondary transition">
                Your Journey
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className="text-gray-300 hover:text-secondary transition">
                Services & Pricing
              </NavLink>
            </li>
            <li>
              <NavLink to="/books" className="text-gray-300 hover:text-secondary transition">
                Recommended Books
              </NavLink>
            </li>
            <li>
              <NavLink to="/resources" className="text-gray-300 hover:text-secondary transition">
                Toolbox & Resources
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact & Legal */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Get in Touch</h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
            Ready to talk through your next step or team challenge?
          </p>
          <NavLink
            to="/contact"
            className="inline-block px-5 py-2.5 bg-secondary text-slate-900 font-bold text-xs sm:text-sm rounded-full hover:bg-amber-400 transition"
          >
            Book Free Chat
          </NavLink>
          <div className="mt-4">
            <a
              href="https://www.linkedin.com/company/the-charly-method/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-400 hover:text-white transition inline-block"
            >
              Connect on LinkedIn →
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <p>&copy; {new Date().getFullYear()} The Charly Method. All rights reserved.</p>
        <p className="font-mono text-gray-400">Honest conversations • Real-world mentorship</p>
      </div>
    </div>
  </footer>
);

export default Footer;
