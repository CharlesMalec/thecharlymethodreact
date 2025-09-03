import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12">
    <div className="container mx-auto px-4 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} The Charly Method. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;