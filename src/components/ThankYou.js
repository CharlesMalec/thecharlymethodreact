import React from "react";
import { NavLink } from "react-router-dom";

const ThankYou = () => (
  <section className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-4">
    <div className="max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
        Thank You for Reaching Out!
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
        Your message has been received — and I truly appreciate you taking the first step
        toward <strong>authentic, human-centered leadership</strong>.
      </p>
      <p className="text-gray-600 mb-10">
        I respond personally to every inquiry within 24 hours.
        In the meantime, feel free to explore more about The Charly Method or connect with me on LinkedIn.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <NavLink
          to="/about"
          className="px-8 py-3 bg-primary text-white font-semibold rounded-full shadow hover:bg-indigo-700 transition"
        >
          Learn More About the Method
        </NavLink>

        <a
          href="https://www.linkedin.com/company/the-charly-method/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-full hover:bg-gray-100 transition"
        >
          Connect on LinkedIn
        </a>
      </div>

      <p className="text-gray-400 text-sm mt-10">— The Charly Method</p>
    </div>
  </section>
);

export default ThankYou;
