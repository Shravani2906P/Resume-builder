import './AuthPage.css';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Make sure firebase.js is properly configured

function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // prevent form refresh

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); // or whatever page you want to redirect to
    } catch (err) {
      console.error(err.message);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="auth-container" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <div className="auth-box">
        <h2 className="auth-title">Login to Resumify</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            placeholder="you@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />

          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="••••••••" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button type="submit">Log In</button>

          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
