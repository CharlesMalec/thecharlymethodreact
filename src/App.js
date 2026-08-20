import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import CustomerJourney from './components/CustomerJourney';
import Services from './components/Services';
import Books from './components/Books';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Resources from './components/Resources';
import ThankYou from './components/ThankYou';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const scrollToTarget = () => {
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // Retry briefly if element is mounting
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    scrollToTarget();
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="text-gray-800 bg-[#f4f7f9]">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <CustomerJourney />
                <Services />
                <Books />
                <Contact />
              </>
            } />
            {/* Redirect old standalone sub-pages to homepage sections with anchors */}
            <Route path="/about" element={<Navigate to="/#about" replace />} />
            <Route path="/journey" element={<Navigate to="/#journey" replace />} />
            <Route path="/services" element={<Navigate to="/#services" replace />} />
            <Route path="/books" element={<Navigate to="/#books" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/resources" element={<Resources />} />
            {/* Redirect legacy material route to the new Resources view */}
            <Route path="/material" element={<Navigate to="/resources" replace />} />
            {/* Fallback route for any other legacy paths */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;