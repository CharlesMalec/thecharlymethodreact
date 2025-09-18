import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { stripePromise } from '../stripe';

function CheckoutForm({ user, setError, setSuccess }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !user) return;
    try {
      const response = await fetch(`https://us-central1-thecharlymethodreact.cloudfunctions.net/createCheckoutSession?email=${user.email}`);
      const { id } = await response.json();
      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId: id });
      if (stripeError) setError(stripeError.message);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubscribe}>
      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-semibold mb-2">Card Details</label>
        <div className="p-3 border rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-600 transition duration-300">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
      >
        Subscribe (€5/month)
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

  useEffect(() => {
    if (user) {
      getDoc(doc(db, 'users', user.uid)).then(docSnap => {
        if (docSnap.exists()) setSubscriptionStatus(docSnap.data().premium ? 'active' : 'inactive');
      });
    }
  }, [user]);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess('Logged in successfully!');
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const signUp = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), { premium: false, email });
      setSuccess('Account created successfully!');
      setError(null);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  const handleCancel = async () => {
    window.location.href = 'https://billing.stripe.com/p/login/your-portal-link'; // Replace with Stripe Customer Portal URL
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
        <div>
          <p className="text-gray-600 mb-4 text-center">Logged in as: {user.email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300 font-semibold mb-4"
          >
            Logout
          </button>
          {subscriptionStatus === 'active' ? (
            <div>
              <p className="text-green-500 mb-4 text-center">Subscription Active (€5/month)</p>
              <button
                onClick={handleCancel}
                className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition duration-300 font-semibold"
              >
                Cancel Subscription
              </button>
            </div>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm user={user} setError={setError} setSuccess={setSuccess} />
            </Elements>
          )}
        </div>
      ) : (
        <div>
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