import React from "react";
import "../styles/pages.css";

const Features = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Features</h1>
        <p className="subtitle">Discover what makes OctoPod special!</p>

        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">💬</div>
            <h3>AI-Powered Chat</h3>
            <p>Get instant responses to your academic questions</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📝</div>
            <h3>Study Notes</h3>
            <p>Generate and organize study materials</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🎯</div>
            <h3>Personalized Learning</h3>
            <p>Tailored recommendations based on your learning style</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Learn on the go with full mobile support</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your data is protected with enterprise-grade security</p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Get answers in seconds, not minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
