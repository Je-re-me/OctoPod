import React from "react";
import "../styles/pages.css";

const About = () => {
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
          
          .about-content-wrapper {
            position: relative;
            z-index: 1;
          }
          
          .about-bubble {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: riseInAboutBox 6s infinite ease-in;
            bottom: -20px;
          }
          
          @keyframes riseInAboutBox {
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
      
      <div className="page-content about-content-wrapper">
        <h1 style={{ 
          color: '#0c4a6e', 
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)'
        }}>About OctoPod</h1>

        <div className="about-section" style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.95) 0%, rgba(147, 197, 253, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(30, 58, 138, 0.4)',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="about-bubble" style={{ width: '15px', height: '15px', left: '15%', animationDelay: '0s', animationDuration: '7s' }}></div>
          <div className="about-bubble" style={{ width: '10px', height: '10px', left: '50%', animationDelay: '2s', animationDuration: '5s' }}></div>
          <div className="about-bubble" style={{ width: '12px', height: '12px', left: '80%', animationDelay: '4s', animationDuration: '6s' }}></div>
          <h2 style={{ color: 'white' }}>What is OctoPod?</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            OctoPod is an innovative educational platform that leverages artificial intelligence
            to provide personalized tutoring and academic support. Our mission is to make quality
            education accessible to everyone, everywhere.
          </p>
        </div>

        <div className="about-section" style={{
          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.95) 0%, rgba(125, 211, 252, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(6, 182, 212, 0.4)',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="about-bubble" style={{ width: '13px', height: '13px', left: '20%', animationDelay: '1s', animationDuration: '6.5s' }}></div>
          <div className="about-bubble" style={{ width: '11px', height: '11px', left: '55%', animationDelay: '3s', animationDuration: '5.5s' }}></div>
          <div className="about-bubble" style={{ width: '9px', height: '9px', left: '75%', animationDelay: '0.5s', animationDuration: '7s' }}></div>
          <h2 style={{ color: 'white' }}>Our Mission</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            We believe in the power of technology to transform education. By combining AI with
            interactive learning, we're breaking down barriers to quality tutoring and making it
            affordable and accessible for all students.
          </p>
        </div>

        <div className="about-section" style={{
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.95) 0%, rgba(103, 232, 249, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(8, 145, 178, 0.4)',
          padding: '2rem',
          borderRadius: '12px',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div className="about-bubble" style={{ width: '14px', height: '14px', left: '25%', animationDelay: '2s', animationDuration: '6s' }}></div>
          <div className="about-bubble" style={{ width: '10px', height: '10px', left: '60%', animationDelay: '0s', animationDuration: '5.5s' }}></div>
          <div className="about-bubble" style={{ width: '12px', height: '12px', left: '85%', animationDelay: '3.5s', animationDuration: '6.5s' }}></div>
          <h2 style={{ color: 'white' }}>Why Choose Us?</h2>
          <ul className="about-list" style={{ color: 'white' }}>
            <li style={{ color: 'white' }}>✓ Personalized learning experience</li>
            <li style={{ color: 'white' }}>✓ Fast and accurate responses</li>
            <li style={{ color: 'white' }}>✓ User-friendly interface</li>
            <li style={{ color: 'white' }}>✓ Completely free to use</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default About;
