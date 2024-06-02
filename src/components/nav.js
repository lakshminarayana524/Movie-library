import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './styles/nav.css'; // You'll need to create this CSS file for styling

const Nav = ({ isLoggedIn, handleLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
              <span className="nav-links" onClick={() => { handleLogout(); toggleMenu(); }}>
                Logout
              </span>
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
