import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/menubar.css";

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
        <div className="logo">
          <h1>Pocket Prof</h1>
        </div>

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
              to="/about" 
              onClick={handleMenuItemClick}
            >
              About
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
              to="/contact" 
              onClick={handleMenuItemClick}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MenuBar;
