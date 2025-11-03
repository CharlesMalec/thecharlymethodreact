import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { loadStripe } from '@stripe/stripe-js';

// Publishable key Stripe (LIVE)
const pk = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
if (!pk) console.error('Missing REACT_APP_STRIPE_PUBLISHABLE_KEY');
const stripePromise = pk ? loadStripe(pk) : Promise.resolve(null);

// URLs directes vers tes Cloud Functions (pas de proxy Netlify)
const CFN_BASE = 'https://us-central1-thecharlymethodreact.cloudfunctions.net';

function CheckoutForm({ user, setError }) {
  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!user) return;
    try {
      const body = {
        uid: user.uid,
        email: (user.email || '').toLowerCase(),
      };
      const resp = await fetch(`${CFN_BASE}/createCheckoutSession`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!resp.ok) throw new Error('Checkout creation failed');
      const { id } = await resp.json();

      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe not initialized');
      const { error } = await stripe.redirectToCheckout({ sessionId: id });
      if (error) setError(error.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubscribe}>
      <button
        type="submit"
        className="w-full bg-indigo-400 text-white p-4 rounded-lg hover:bg-indigo-500 transition duration-300 font-semibold text-lg shadow-md flex items-center justify-center space-x-2"
      >
        <span>Support Charly Method’s Growth: €5/month for Premium Access!</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </form>
  );
}

function Payment() {
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);

  // 🔄 Suivi temps réel du flag premium
  useEffect(() => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    const unsub = onSnapshot(ref, (docSnap) => {
      const premium = !!docSnap.data()?.premium;
      setSubscriptionStatus(premium ? 'active' : 'inactive');
    });
    return () => unsub();
  }, [user]);

  // 🔁 Resync au retour du portail (success/canceled)
  useEffect(() => {
    (async () => {
      if (!user) return;
      const url = new URL(window.location.href);
      const fromPortal = url.searchParams.get('canceled') || url.searchParams.get('success');
      if (!fromPortal) return;
      try {
        const idToken = await auth.currentUser.getIdToken();
        await fetch(`${CFN_BASE}/syncPremium`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${idToken}`,
          }
        });
      } catch (_) {}
    })();
  }, [user]);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email.toLowerCase(), password);
      setSuccess('Logged in successfully!');
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const signUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email.toLowerCase(), password);
      await setDoc(doc(db, 'users', user.uid), {
        premium: false,
        email: email.toLowerCase(),
        emailLower: email.toLowerCase(),
      });
      setSuccess('Account created successfully!');
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const handleManageBilling = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const resp = await fetch(`${CFN_BASE}/createPortalSession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`Could not open billing portal (${resp.status}): ${txt}`);
      }
      const { url } = await resp.json();
      window.location.href = url;
    } catch (e) {
      setError(e.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSuccess('Logged out successfully!');
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        {user ? 'Manage Subscription' : 'Login or Subscribe'}
      </h2>
      {success && <p className="text-green-500 text-sm mb-4 text-center">{success}</p>}
      {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
      {user ? (
        <div className="space-y-4">
          <p className="text-gray-600 mb-4 text-center">Logged in as: {user.email}</p>
          {subscriptionStatus === 'active' ? (
            <div className="space-y-4">
              <p className="text-green-500 mb-4 text-center">Subscription Active (€5/month)</p>
              <button
                onClick={handleManageBilling}
                className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300 font-semibold"
              >
                Cancel Subscription
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <CheckoutForm user={user} setError={setError} />
              <button
                onClick={handleLogout}
                className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 placeholder-gray-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300 placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={signIn}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
            >
              Login
            </button>
            <button
              onClick={signUp}
              className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition duration-300 font-semibold"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
