import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar'
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import AuthPage from './Auth/AuthPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
