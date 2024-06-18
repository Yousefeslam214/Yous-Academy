import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import the auth instance correctly
import Navbar from '../components/Navbar';
import { GoogleAuthProvider } from "firebase/auth";



const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Get the navigate instance
    const [error, setError] = useState('');
`const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create a new user with Firebase Authentication
            await createUserWithEmailAndPassword(auth, email, password);

            // Extract the part of the email before the '@' symbol
            const emailPrefix = email.split('@')[0];
            // Save email to local storage
            localStorage.setItem('emailPrefix', emailPrefix);

            // Redirect to home page
            navigate('/');
        } catch (error) {
            // Handle errors here
            setError(error.message);
            console.error('Error creating new user with password and email', error);
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
                </form>
            </div>
        </div>
    );
};

export default SignUpForm;
