import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dash'; // Make sure the correct component is imported
import AuthToken from './components/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<><AuthToken /><Dashboard /></>} /> {/* Ensure AuthToken is used here */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AuthProvider>
      </Router>
      <ToastContainer /> {/* ToastContainer should be here to handle all toasts */}
    </div>
  );
};

export default App;
