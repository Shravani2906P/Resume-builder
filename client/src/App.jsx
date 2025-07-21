import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar'
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import AuthPage from './Auth/AuthPage';
import SignupPage from './Auth/SignupPage';
import Dashboard from './Dashboard/Dashboard'; 
import ResumeBuilder from './ResumeBuilder/ResumeBuilder';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/builder" element={<PrivateRoute><ResumeBuilder /></PrivateRoute>} />
        <Route path="/Resume-builder" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
