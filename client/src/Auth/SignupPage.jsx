import React, { useState } from 'react';
import './SignupPage.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/dashboard'); // Redirect after sign up
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signup-container" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div className="signup-box">
                <h2 className="signup-title">Create your Resumify account</h2>
                <form className="signup-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" placeholder="Your Name" required value={name} onChange={(e) => setName(e.target.value)} />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="you@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Create a strong password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="Re-enter password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                    <button type="submit">Sign Up</button>

                    <p className="login-text">
                        Already have an account? <a href="/login">Log in</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignupPage;
