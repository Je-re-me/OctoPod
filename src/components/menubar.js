import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./menubar.css";

const MenuBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = () => {
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
            <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '2rem', verticalAlign: 'middle', marginRight: '0.5rem' }} />
            <h1 style={{ display: 'inline', verticalAlign: 'middle' }}>OctoPod</h1>
          </div>
          <div className="menu-right">
            <Link to="/login" className="login-btn">Login</Link>
          </div>
        </div>
      </nav>
  );
};

export default MenuBar;
