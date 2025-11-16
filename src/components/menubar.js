import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./menubar.css";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
      <nav className="menubar">
        <div className="menubar-container">
          <div className="menu-left">
            <button 
              className="menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className={`menu-items ${isOpen ? "open" : ""}`}>
              <li>
                <Link 
                  to="/" 
                  onClick={handleMenuItemClick}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/features" 
                  onClick={handleMenuItemClick}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={handleMenuItemClick}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={handleMenuItemClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="logo">
            <h1 style={{ 
            fontFamily: '"Fredoka One", "Baloo 2", "Rounded Mplus 1c", "Comic Sans MS", cursive',
            fontWeight: '700',
            letterSpacing: '1px',
            margin: 0
          }}>OctoPod</h1>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '2rem', verticalAlign: 'middle', marginRight: '0.5rem' }} />
          </div>
          <div className="menu-right">
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ 
                  fontFamily: '"Fredoka One", "Baloo 2", "Rounded Mplus 1c", "Comic Sans MS", cursive',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  color: 'white'
                }}>
                  Hi! 👋
                </span>
                <button 
                  onClick={handleLogout}
                  className="login-btn"
                  style={{
                    background: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="login-btn">Login</Link>
            )}
          </div>
        </div>
      </nav>
  );
};

export default MenuBar;
