
import './Navbar.css'; 
import logoLight from '../assets/logo-light.png';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  return(
    <nav className="navbar">
      <div className="logo-container">
        <img className="logo" src={logoLight} alt="Logo" style={{ height: '40px' }} />
        <p className="heading">Resumify</p>
      </div>

      <div className="buttons">
        {!user ? (
          <>
            <Link to="/login"><button className="login">Login</button></Link>
            <Link to="/dashboard"><button className="get-started">Get Started</button></Link>
          </>
        ) : (
          <>
            <button className="profile-btn" onClick={() => navigate('/dashboard')}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="Profile" className="profile-avatar" />
              ) : (
                <span>Profile</span>
              )}
            </button>
            <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar