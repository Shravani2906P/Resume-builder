import './AuthPage.css';
import React from 'react';
import { Link } from 'react-router-dom';

function AuthPage() {
    return(
        <div className="auth-container" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div className="auth-box">
                 <h2 className="auth-title">Login to Resumify</h2>
                    <form className="auth-form">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="you@example.com" required />

                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="••••••••" required />

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