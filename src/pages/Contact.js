import React, { useState } from "react";
import "../styles/pages.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
          
          .contact-content-wrapper {
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
      
      <div className="page-content contact-content-wrapper">
        <h1 style={{ color: '#0c4a6e', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)' }}>Contact Us</h1>
        <p className="subtitle">We'd love to hear from you!</p>

        <div className="contact-container">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            
            <div className="info-item">
              <span className="icon">
                <img src="/assets/cropped_circle_image.png" alt="Email" style={{ width: '2rem', height: '2rem', borderRadius: '50%', objectFit: 'cover', verticalAlign: 'middle', position: 'relative', top: '0.1rem' }} />
              </span>
              <div>
                <h4>Email</h4>
                <p>support@OctoPod.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <span>
                <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '2rem', verticalAlign: 'middle', marginRight: '0.9rem', position: 'relative', top: '0.3rem' }} />
              </span>
              <div>
                <h4>Social Media</h4>
                <p>@OctoPod_</p>
              </div>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <img src="/assets/fish.png" alt="Fish" style={{ width: '15rem', height: 'auto', borderRadius: '20px', border: '3px solid #4449b7' }} />
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
