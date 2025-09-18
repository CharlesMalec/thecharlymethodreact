import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { doc, onSnapshot } from 'firebase/firestore';
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

function App() {
  const [user] = useAuthState(auth);
  const [premium, setPremium] = useState(false);

  useEffect(() => {
    if (user) {
      console.log('Checking premium for user:', user.uid);
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
        if (docSnap.exists()) {
          const isPremium = docSnap.data().premium || false;
          console.log('Premium status:', isPremium);
          setPremium(isPremium);
        } else {
          console.log('User document not found');
          setPremium(false);
        }
      }, (error) => {
        console.error('Firestore error:', error);
      });
      return () => unsubscribe();
    } else {
      console.log('No user logged in');
      setPremium(false);
    }
  }, [user]);

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
            <Route path="/login" element={<Navigate to="/payment" />} />
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