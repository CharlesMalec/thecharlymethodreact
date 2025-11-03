import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Added Navigate to imports
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import './index.css';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Books from './components/Books';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Payment from './components/Payment';
import Material from './components/Material';
import Login from './components/Login';
import ThankYou from './components/ThankYou';

function App() {
  const [user, loading] = useAuthState(auth);
  const [premium, setPremium] = useState(null);

  useEffect(() => {
    const checkPremium = async () => {
      if (loading) {
        console.log('App.js: Waiting for auth to resolve...');
        return;
      }
      if (user) {
        console.log('App.js:23 Checking premium for user:', user.uid);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('App.js:27 Premium status:', userData.premium);
            setPremium(userData.premium);
          } else {
            console.log('App.js: No user doc found');
          }
        } catch (err) {
          console.error('App.js: Premium check error:', err);
        }
      } else {
        console.log('App.js:38 No user logged in');
      }
    };

    checkPremium();
  }, [user, loading]);

  return (
    <Router>
      <div className="text-gray-800">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/books" element={<Books />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/login" element={<Login />} />
            <Route path="/success" element={<div>Payment Successful!</div>} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/material" element={premium ? <Material /> : <Navigate to="/payment" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;