import React from "react";
import { Link } from "react-router-dom";
import "../styles/pages.css";
import GetStarted from "./GetStarted";

const Home = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Welcome to Octolearn</h1>
        <p>Your personal AI-powered study companion!</p>

        <div className="home-features">
            
          <div className="feature-card">
            <h3>📚 Learn Anywhere</h3>
            <p>Access your AI tutor anytime, anywhere on any device</p>
          </div>

          <div className="feature-card">
            <h3>🤖 Smart Assistance</h3>
            <p>Get instant answers to your questions powered by AI</p>
          </div>

          <div className="feature-card">
            <h3>⚡ Real-time Chat</h3>
            <p>Have interactive conversations with your study buddy</p>
          </div>
        </div>

        <Link to="/getstarted">
          <button className="cta-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
