import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Components/Navbar'
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import AuthPage from './Auth/AuthPage';
import SignupPage from './Auth/SignupPage';
import Dashboard from './Dashboard/Dashboard'; 
import ResumeBuilder from './ResumeBuilder/ResumeBuilder';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/builder" element={<ResumeBuilder />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
