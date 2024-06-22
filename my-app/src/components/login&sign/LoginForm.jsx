import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../shared/navbar/Navbar';
import { getAuth } from "firebase/auth";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Get the navigate instance
  const [error, setError] = useState('');
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in the user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const emailPrefix = email.split('@')[0];
      localStorage.setItem('emailPrefix', emailPrefix);
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error('Error signing in with password and email', error);
    }
  };

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
