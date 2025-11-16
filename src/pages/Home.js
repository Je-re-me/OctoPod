import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/pages.css";
import GetStarted from "./GetStarted";

const Home = () => {
  const funFacts = [
    "🐙 Octopuses have three hearts and blue blood!",
    "🧠 Octopuses are considered the most intelligent invertebrates!",
    "🎨 Octopuses can change color in less than a second!",
    "👀 Octopuses have rectangular pupils!",
    "💪 An octopus can squeeze through any hole larger than its beak!",
    "🌊 There are around 300 species of octopus in the ocean!",
    "🦑 Octopuses can taste with their arms!",
    "🧬 Octopuses have about 500 million neurons, with two-thirds in their arms!",
    "🏃 The fastest octopus can reach speeds of 40 km/h!",
    "🎭 Octopuses can solve complex puzzles and use tools!",
    "💙 An octopus's blood contains copper instead of iron!",
    "🌟 Some octopuses can regenerate lost arms!",
    "🎪 Octopuses can change both their color and texture!",
    "🔬 Each octopus arm can act independently!",
    "🌈 Octopuses are color blind but can still match their surroundings!"
  ];

  const [currentFact, setCurrentFact] = useState("");

  useEffect(() => {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    setCurrentFact(randomFact);
  }, []);
  
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
          
          .home-content-wrapper {
            position: relative;
            z-index: 1;
          }

          .feature-card {
            perspective: 1000px;
            position: relative;
          }

          .flip-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 200px;
            text-align: center;
            transition: transform 0.6s;
            transform-style: preserve-3d;
          }

          .feature-card:hover .flip-card-inner {
            transform: rotateY(180deg);
          }

          .flip-card-front, .flip-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 8px;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }

          .flip-card-front {
            background: linear-gradient(135deg, #5ac1eaff 0%, #3494edff 100%);
            color: white;
          }

          .flip-card-back {
            background: linear-gradient(135deg, #3494edff 0%, #5ac1eaff 100%);
            color: white;
            transform: rotateY(180deg);
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
      
      <div className="page-content home-content-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
          <h1 style={{ 
            fontFamily: '"Fredoka One", "Baloo 2", "Rounded Mplus 1c", "Comic Sans MS", cursive',
            fontWeight: '700',
            letterSpacing: '1px',
            margin: 0
          }}>Welcome to OctoPod!</h1>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
        </div>
        <h3 style={{ color: '#000', fontWeight: '400', marginTop: '0.5rem', textAlign: 'center' }}>Your personal study companion!</h3>

        <div className="home-features">
            
          <div className="feature-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>📚 Learn Anywhere</h3>
                <p>Access your AI tutor anytime, anywhere on any device</p>
              </div>
              <div className="flip-card-back">
                <h3>📚 Learn Anywhere</h3>
                <p>Whether you're at home or in a cafe, OctoPod is always ready to help. Our cloud-based platform syncs across all your devices, so you can pick up right where you left off!</p>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>🤖 Smart Assistance</h3>
                <p>Get instant answers to your questions powered by AI</p>
              </div>
              <div className="flip-card-back">
                <h3>🤖 Smart Assistance</h3>
                <p>Our advanced AI understands and learns your study style. From math problems to essays, get personalized help that adapts to your needs!</p>
              </div>
            </div>
          </div>

          <div className="feature-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>⚡ Real-time Chat</h3>
                <p>Have interactive conversations with your study buddy</p>
              </div>
              <div className="flip-card-back">
                <h3>⚡ Real-time Chat</h3>
                <p>Experience dynamic questions that feel like they are from a real tutor. Explore topics deeper, and get explanations in the way that makes sense to you!</p>
              </div>
            </div>
          </div>
        </div>

        <Link to="/getstarted">
          <button className="cta-button">Get Started</button>
        </Link>

        
      </div>
      <div style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '15px',
          backdropFilter: 'blur(10px)',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ 
            color: '#fff', 
            marginBottom: '0.5rem',
            fontSize: '1.2rem',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
          }}>🎉 Fun Fact!</h3>
          <p style={{ 
            color: '#fff', 
            fontSize: '1.1rem',
            margin: 0,
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)'
          }}>{currentFact}</p>
        </div>
    </div>
  );
};

export default Home;
