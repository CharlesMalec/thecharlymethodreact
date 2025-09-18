import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth,db } from '../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null); // Add success state
    const navigate = useNavigate();
    const [user, loading] = useAuthState(auth);

    // useEffect(() => {
    //   if (user) navigate('/material');
    // }, [user, navigate]);

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    const signUp = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, 'users', user.uid), { premium: false });
            setSuccess('Account created successfully!');
            setError(null);
        } catch (err) {
            setError(err.message);
            setSuccess(null);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            {user ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-indigo-600 mb-4">Welcome, {user.email}</h2>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Login or Sign Up</h2>
                    {success && <p className="text-green-500 text-sm mb-4">{success}</p>} {/* Add success feedback here */}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-600 mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={signIn}
                            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
                        >
                            Login
                        </button>
                        <button
                            onClick={signUp}
                            className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700 transition"
                        >
                            Sign Up
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Login;