import React from 'react';
import './SignupPage.css';

function SignupPage() {
    return(
        <div className="signup-container" style={{ paddingTop: '80px', minHeight: '100vh' }}>
            <div className="signup-box">
              <h2 className="signup-title">Create your Resumify account</h2>
              <form className="signup-form">
                 <label htmlFor="name">Full Name</label>
                 <input type="text" id="name" placeholder="Your Name" required />

                 <label htmlFor="email">Email</label>
                 <input type="email" id="email" placeholder="you@example.com" required />

                 <label htmlFor="password">Password</label>
                 <input type="password" id="password" placeholder="Create a strong password" required />

                 <label htmlFor="confirmPassword">Confirm Password</label>
                 <input type="password" id="confirmPassword" placeholder="Re-enter password" required />

                 <button type="submit">Sign Up</button>

                 <p className="login-text">
                    Already have an account? <a href="/login">Log in</a>
                 </p>
              </form>
            </div>
        </div>
    );
}

export default SignupPage