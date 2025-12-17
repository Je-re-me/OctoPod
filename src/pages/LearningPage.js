import React from "react";
import "../styles/pages.css";
import { Link } from "react-router-dom";

const LearningPage = () => {
  return (
    <div className="page-container" style={{
      background: 'linear-gradient(-45deg, #1e3a8a, #3b82f6, #06b6d4, #0891b2)',
      backgroundSize: '400% 400%',
      animation: 'oceanWave 15s ease infinite',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>
        {`
          @keyframes oceanWave {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .bubble {
            position: absolute;
            bottom: -100px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: rise 15s infinite ease-in;
          }
          
          @keyframes rise {
            to {
              bottom: 110%;
              opacity: 0;
            }
          }
          
          .learningpage-content-wrapper {
            position: relative;
            z-index: 1;
          }
        `}
      </style>
      
      {/* Floating bubbles */}
      <div className="bubble" style={{ left: '10%', width: '40px', height: '40px', animationDelay: '0s', animationDuration: '12s' }}></div>
      <div className="bubble" style={{ left: '20%', width: '20px', height: '20px', animationDelay: '2s', animationDuration: '10s' }}></div>
      <div className="bubble" style={{ left: '35%', width: '30px', height: '30px', animationDelay: '4s', animationDuration: '14s' }}></div>
      <div className="bubble" style={{ left: '50%', width: '25px', height: '25px', animationDelay: '0s', animationDuration: '11s' }}></div>
      <div className="bubble" style={{ left: '65%', width: '35px', height: '35px', animationDelay: '3s', animationDuration: '13s' }}></div>
      <div className="bubble" style={{ left: '80%', width: '20px', height: '20px', animationDelay: '5s', animationDuration: '9s' }}></div>
      <div className="bubble" style={{ left: '90%', width: '28px', height: '28px', animationDelay: '1s', animationDuration: '15s' }}></div>
      
      <div className="page-content learningpage-content-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
          <h1 style={{ 
            fontFamily: '"Fredoka One", "Baloo 2", "Rounded Mplus 1c", "Comic Sans MS", cursive',
            fontWeight: '700',
            letterSpacing: '1px',
            margin: 0
          }}>Choose Study Mode</h1>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
        </div>
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center' }}>
            <Link to="/learn">
              <button className="study-mode-btn big-btn">Evaluation</button>
            </Link>
            <div className="mode-desc">Study at your own pace and review material freely.</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/timed">
              <button className="study-mode-btn big-btn">Time Attack</button>
            </Link>
            <div className="mode-desc">Challenge yourself with a timed session for quick recall.</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Link to="/selfstudy">
              <button className="study-mode-btn big-btn">Self Study</button>
            </Link>
            <div className="mode-desc">Practice independently with your uploaded materials.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;
