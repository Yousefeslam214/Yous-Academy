import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebaseConfig'; // Import the auth instance correctly
import Navbar from '../components/Navbar';
import { collection, addDoc } from 'firebase/firestore';

const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Get the navigate instance
    const [error, setError] = useState('');
    const usersCollectionRef = collection(db, 'users'); // Reference to the 'users' collection in Firestore

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create a new user with Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Extract the part of the email before the '@' symbol
            const emailPrefix = email.split('@')[0];
            // Save email to local storage
            localStorage.setItem('emailPrefix', emailPrefix);

            // Save user data to Firestore
            await addDoc(usersCollectionRef, {
                email: email,
                password: password,
                uid: userCredential.user.uid // Include the user's UID from authentication
            });

            // Redirect to home page
            navigate('/');
        } catch (error) {
            // Handle errors here
            setError(error.message);
            console.error('Error creating new user with password and email', error);
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            const email = user.email;
            // Extract the part of the email before the '@' symbol
            const emailPrefix = email.split('@')[0];
            // Save email to local storage
            localStorage.setItem('emailPrefix', emailPrefix);
            // Save user data to Firestore
            await addDoc(usersCollectionRef, {
                email: email,
                // password: password,
                uid: user.uid // Include the user's UID from authentication
            });
            // Redirect to home page
            navigate('/');
        } catch (error) {
            if (error.code === 'auth/popup-closed-by-user') {
                setError('The popup was closed before completing the sign-in. Please try again.');
            } else {
                setError(error.message);
                console.error('Error signing in with Google', error);
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                    <h2>Sign Up</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ padding: '10px', marginBottom: '10px' }}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ padding: '10px', marginBottom: '10px' }}
                        required
                    />
                    <p>
                        If you already have an account, please{' '}
                        <button type="button" onClick={() => navigate('/login')} style={{ background: 'none', color: 'blue', border: 'none', padding: '0', textDecoration: 'underline', cursor: 'pointer' }}>
                            login
                        </button>
                    </p>
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#6200ea', color: 'white', border: 'none', borderRadius: '5px' }}>
                        Sign Up
                    </button>
                    <button type="button" onClick={handleGoogleSignIn} style={{ padding: '10px', backgroundColor: '#db4437', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px' }}>
                        Sign Up with Google
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
