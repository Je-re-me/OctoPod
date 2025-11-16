import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages.css";
import { useFile } from "../context/FileContext";

const GetStarted = () => {
  const [file, getFile] = useState(null);
  const navigate = useNavigate();
  const { setUploadedFile, setFileContent } = useFile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      // Handle file upload logic here
      console.log("File uploaded:", file.name);
      
      // For now, only support .txt files to ensure content can be read
      if (file.type !== "text/plain" && !file.name.endsWith('.txt')) {
        alert("Please upload a .txt file for now. PDF and DOC support coming soon!");
        return;
      }
      
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        console.log("File content loaded, length:", content.length);
        setFileContent(content);
        setUploadedFile(file);
        // Redirect to LearningPage after upload
        navigate("/learningpage");
      };
      
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
        alert("Error reading file. Please try again.");
      };
      
      // Read as text
      reader.readAsText(file);
    }
  }
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
          
          .getstarted-content-wrapper {
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
      
      <div className="page-content getstarted-content-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
          <h1 style={{ 
            fontFamily: '"Fredoka One", "Baloo 2", "Rounded Mplus 1c", "Comic Sans MS", cursive',
            fontWeight: '700',
            letterSpacing: '1px',
            margin: 0
          }}>Input your notes!</h1>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
        </div>
        <p className="subtitle" style={{ color: '#fff', fontWeight: '400', marginTop: '0.5rem', textAlign: 'center' }}>Upload your academic materials to begin!</p>

        <form className="upload-form" onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".txt"
            onChange={(e) => getFile(e.target.files[0])}
          />
          <button type="submit" disabled={!file}>
            Upload and Start Learning
          </button>
        </form>
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <Link to="/terms" style={{ color: "#4449b7", fontWeight: 600, textDecoration: "underline" }}>
            View Terms of Use
          </Link>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Note: Currently only .txt files are supported
        </p>
      </div>
    </div>
  );
}       

export default GetStarted;