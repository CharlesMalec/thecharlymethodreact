import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import CustomerJourney from './components/CustomerJourney';
import Services from './components/Services';
import Books from './components/Books';
import Resources from './components/Resources';
import Contact from './components/Contact';
import ThankYou from './components/ThankYou';
import Footer from './components/Footer';

// Automatically scrolls window to top whenever the pathname changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen text-gray-800 bg-[#f8fafc] selection:bg-amber-100 selection:text-amber-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/journey" element={<CustomerJourney />} />
            <Route path="/services" element={<Services />} />
            <Route path="/books" element={<Books />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            
            {/* Legacy alias redirects */}
            <Route path="/material" element={<Navigate to="/resources" replace />} />
            <Route path="/toolbox" element={<Navigate to="/resources" replace />} />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
