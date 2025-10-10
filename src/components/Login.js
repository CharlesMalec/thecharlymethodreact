import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [user, loading, authError] = useAuthState(auth);

  useEffect(() => {
    if (!loading) {
      console.log('Login.js - Auth state changed:', user);
    }
  }, [loading, user]);

  const signIn = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Login.js: Sign-in successful, user:', auth.currentUser);
      setSuccess('Logged in successfully!');
      setError(null);
      navigate('/payment'); // redirect after login
    } catch (err) {
      setError(err.message);
      setSuccess(null);
      console.error('Login.js: Sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    setIsLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), { premium: false });
      console.log('Login.js: Sign-up successful for user:', user.uid);
      setSuccess('Account created successfully!');
      setError(null);
      navigate('/payment'); // redirect after sign up
    } catch (err) {
      setError(err.message);
      setSuccess(null);
      console.error('Login.js: Sign-up error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setSuccess('Logged out successfully!');
      setError(null);
      navigate('/');
      console.log('Login.js: Logout successful');
    } catch (err) {
      setError(err.message);
      console.error('Login.js: Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading authentication state...</div>;
  }

  if (authError) {
    return <div className="text-center text-red-500">Authentication error: {authError.message}</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      {user ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">Welcome, {user.email}</h2>
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className={`w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          <h2 className="text-2xl font-bold text-center text-primary mb-6">Login or Sign Up</h2>
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 bg-primary text-white p-3 rounded-lg hover:bg-indigo-700 transition ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={signUp}
              disabled={isLoading}
              className={`flex-1 bg-washedprimary text-white p-3 rounded-lg hover:bg-gray-700 transition ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
