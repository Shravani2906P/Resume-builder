import './Footer.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Footer() {
    const [showContact, setShowContact] = useState(false);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleContactChange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };
    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        // SheetDB expects { data: { ...fields } }
        await fetch('https://sheetdb.io/api/v1/ogm8k968d56hq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: contactForm }),
        });
        setTimeout(() => setSubmitted(false), 2000);
        setContactForm({ name: '', email: '', message: '' });
        setShowContact(false);
    };

    return (
        <>
        <footer className="footer">
            <div className="footer-section footer-nav">
                <a href="/" className="footer-link">Home</a>
                <Link to="/dashboard" className="footer-link">Templates</Link>
                <button className="footer-link " onClick={() => setShowContact(true)} style={{background:'none',border:'none',padding:0,cursor:'pointer'}}>Contact</button>
            </div>
        
            <div className="footer-section footer-github">
                <a href="https://github.com/Shravani2906P/Resume-builder" className="footer-github-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg className="footer-github-icon" height="20" width="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                </a>
                <div className="footer-copyright">© 2025  All rights reserved.</div>
            </div>
        </footer>
        {showContact && (
            <div className="contact-modal-overlay" onClick={e => { if (e.target.className === 'contact-modal-overlay') setShowContact(false); }}>
                <div className="contact-modal-content">
                    <button className="contact-modal-close" onClick={() => setShowContact(false)}>&times;</button>
                    <h3 className="footer-link">Contact Us</h3>
                    <form className="contact-form" onSubmit={handleContactSubmit}>
                        <input name="name" type="text" placeholder="Your Name" value={contactForm.name} onChange={handleContactChange} required />
                        <input name="email" type="email" placeholder="Your Email" value={contactForm.email} onChange={handleContactChange} required />
                        <textarea name="message" placeholder="Your Message" value={contactForm.message} onChange={handleContactChange} rows={12} required />
                        <button type="submit">Send</button>
                    </form>
                    {submitted && <div className="contact-success">Thank you! Your message has been sent.</div>}
                </div>
            </div>
        )}
        </>
    );
}

export default Footer;