import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import the auth instance correctly
import Navbar from '../components/Navbar';
// import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Get the navigate instance
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Sign in the user with Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Extract the part of the email before the '@' symbol
            const emailPrefix = email.split('@')[0];
            // Save email to local storage
            localStorage.setItem('emailPrefix', emailPrefix);

            // Redirect to home page
            navigate('/');
        } catch (error) {
            // Handle errors here
            setError(error.message);
            console.error('Error signing in with password and email', error);
        }

    };
    // const auth = getAuth();
    // createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //         // Signed up 
    //         const user = userCredential.user;
    //         // ...
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ..
    //     });


    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    return (
        <div>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
                    <h2>Login</h2>
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
                    <button type="submit" style={{ padding: '10px', backgroundColor: '#6200ea', color: 'white', border: 'none', borderRadius: '5px' }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
