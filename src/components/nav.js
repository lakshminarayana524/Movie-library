import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import './styles/nav.css';

const Nav = ({isLoggedIn,setIsLoggedIn}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Check token status when the component mounts
    checkTokenStatus();
  }, []);

  const checkTokenStatus = async () => {
    try {
      // const response = await axios.get('http://localhost:5000/findtoken');
      const response = await axios.get('https://movie-library-backend-kxe0.onrender.com/findtoken');

      setIsLoggedIn(response.data.tokenFound);
    } catch (error) {
      console.error('Error checking token:', error);
      setIsLoggedIn(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    try {
      // Immediately update UI
      setIsLoggedIn(false);
      
      // Send logout request
      // await axios.post('http://localhost:5000/logout');
      await axios.post('https://movie-library-backend-kxe0.onrender.com/logout');

      localStorage.removeItem('userId');
      navigate('/');
    } catch (error) {
      // Handle errors, if any
      console.error('Logout failed:', error);
      // Revert UI state on error
      setIsLoggedIn(true);
    }
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          MLB
        </Link>
        <div className="nav-icon" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={toggleMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/public_playlist" className="nav-links" onClick={toggleMenu}>
              Public
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/private_playlist" className="nav-links" onClick={toggleMenu}>
              Private
            </Link>
          </li>
          <li className="nav-item">
            {isLoggedIn ? (
              <button className="nav-links logout-button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-links" onClick={toggleMenu}>
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
