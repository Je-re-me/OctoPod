import React from "react";
import "../styles/pages.css";

const Features = () => {
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
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
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
          
          .features-content-wrapper {
            position: relative;
            z-index: 1;
          }
          
          .feature-bubble {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: riseInBox 6s infinite ease-in;
            bottom: -20px;
          }
          
          @keyframes riseInBox {
            0% {
              bottom: -20px;
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              bottom: 110%;
              opacity: 0;
            }
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
      
      <div className="page-content features-content-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
          <h1 style={{ 
            fontFamily: '"Fredoka One", "Baloo 2", "Rounded Mplus 1c", "Comic Sans MS", cursive',
            fontWeight: '700',
            letterSpacing: '1px',
            margin: 0
          }}>Features</h1>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
        </div>
        <h3 style={{ color: '#666', fontWeight: '400', marginTop: '0.5rem', textAlign: 'center' }}>Discover what makes OctoPod special!</h3>

        <div className="features-grid">
          <div className="feature-item" style={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(147, 197, 253, 0.95) 100%)', 
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(30, 58, 138, 0.4)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="feature-bubble" style={{ width: '15px', height: '15px', left: '15%', animationDelay: '0s', animationDuration: '7s' }}></div>
            <div className="feature-bubble" style={{ width: '10px', height: '10px', left: '50%', animationDelay: '2s', animationDuration: '5s' }}></div>
            <div className="feature-bubble" style={{ width: '12px', height: '12px', left: '80%', animationDelay: '4s', animationDuration: '6s' }}></div>
            <div className="feature-icon">📝</div>
            <h3 style={{ color: 'white' }}>Unlimited Practice</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Generate endless practice problems to test your knowledge!</p>
          </div>

          <div className="feature-item" style={{ 
            background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.95) 0%, rgba(125, 211, 252, 0.95) 100%)', 
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="feature-bubble" style={{ width: '13px', height: '13px', left: '20%', animationDelay: '1s', animationDuration: '6.5s' }}></div>
            <div className="feature-bubble" style={{ width: '11px', height: '11px', left: '55%', animationDelay: '3s', animationDuration: '5.5s' }}></div>
            <div className="feature-bubble" style={{ width: '9px', height: '9px', left: '75%', animationDelay: '0.5s', animationDuration: '7s' }}></div>
            <div className="feature-icon">🕓</div>
            <h3 style={{ color: 'white' }}>Timed Modes</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Improve your speed with intense time trials!</p>
          </div>

          <div className="feature-item" style={{ 
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.95) 0%, rgba(103, 232, 249, 0.95) 100%)', 
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(8, 145, 178, 0.4)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="feature-bubble" style={{ width: '14px', height: '14px', left: '25%', animationDelay: '2s', animationDuration: '6s' }}></div>
            <div className="feature-bubble" style={{ width: '10px', height: '10px', left: '60%', animationDelay: '0s', animationDuration: '5.5s' }}></div>
            <div className="feature-bubble" style={{ width: '12px', height: '12px', left: '85%', animationDelay: '3.5s', animationDuration: '6.5s' }}></div>
            <div className="feature-icon">🎯</div>
            <h3 style={{ color: 'white' }}>Personalized Learning</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Custom questions tailored to your desired subject!</p>
          </div>

          <div className="feature-item" style={{ 
            background: 'linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(96, 165, 250, 0.95) 100%)', 
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(37, 99, 235, 0.4)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="feature-bubble" style={{ width: '11px', height: '11px', left: '18%', animationDelay: '1.5s', animationDuration: '7s' }}></div>
            <div className="feature-bubble" style={{ width: '13px', height: '13px', left: '48%', animationDelay: '4s', animationDuration: '5s' }}></div>
            <div className="feature-bubble" style={{ width: '10px', height: '10px', left: '78%', animationDelay: '0s', animationDuration: '6s' }}></div>
            <div className="feature-icon">⌯⌲</div>
            <h3 style={{ color: 'white' }}>Streamline Studying</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Evaluate your knowledge base to focus on key areas for improvement!</p>
          </div>

          <div className="feature-item" style={{ 
            background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.95) 0%, rgba(34, 211, 238, 0.95) 100%)', 
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="feature-bubble" style={{ width: '12px', height: '12px', left: '22%', animationDelay: '2.5s', animationDuration: '6.5s' }}></div>
            <div className="feature-bubble" style={{ width: '14px', height: '14px', left: '52%', animationDelay: '0.5s', animationDuration: '5.5s' }}></div>
            <div className="feature-bubble" style={{ width: '11px', height: '11px', left: '82%', animationDelay: '3s', animationDuration: '7s' }}></div>
            <div className="feature-icon">💾</div>
            <h3 style={{ color: 'white' }}>Save Your Progress</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>OctoPod remembers your progress when you signup for a free account!</p>
          </div>

          <div className="feature-item" style={{ 
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(147, 197, 253, 0.95) 100%)', 
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px rgba(29, 78, 216, 0.4)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div className="feature-bubble" style={{ width: '13px', height: '13px', left: '28%', animationDelay: '1s', animationDuration: '6s' }}></div>
            <div className="feature-bubble" style={{ width: '10px', height: '10px', left: '58%', animationDelay: '3.5s', animationDuration: '5.5s' }}></div>
            <div className="feature-bubble" style={{ width: '12px', height: '12px', left: '88%', animationDelay: '0s', animationDuration: '6.5s' }}></div>
            <div className="feature-icon">🤸‍♂️</div>
            <h3 style={{ color: 'white' }}>Versatile</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>OctoPod can understand videos, audio, and even handwritten notes!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
