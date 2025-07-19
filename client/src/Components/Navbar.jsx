
import './Navbar.css'; 
import logoLight from '../assets/logo-light.png';
import { Link } from 'react-router-dom';

function Navbar() {
return(
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
      <div className="logo-container">
        <img className="logo" src={logoLight} alt="Logo" style={{ height: '40px' }} />
        <p className="heading">Resumify</p>
      </div>
      </Link>

      <div className="buttons">
        <Link to="/login"><button className="login">_Login</button></Link>
        <button className="get-started">_Get Started</button>
      </div>
    </nav>

   );
}

export default Navbar