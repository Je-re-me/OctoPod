import React, { useState } from "react";
import "../styles/pages.css";
import { useFile } from "../context/FileContext";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.REACT_APP_API_KEY;

const SelfStudy = () => {
  const { fileContent, uploadedFile } = useFile();
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      return;
    }

    console.log("Asking question:", question);

    // Add user question to chat history
    const userMessage = { role: "user", text: question };
    setChatHistory(prev => [...prev, userMessage]);
    
    const currentQuestion = question; // Save question before clearing
    setIsLoading(true);
    setQuestion("");

    try {
      console.log("API Key exists:", !!apiKey);
      const genai = new GoogleGenerativeAI(apiKey);
      const model = genai.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

      const prompt = `You are a helpful study assistant. The student is studying the following material:

${fileContent}

The student's question is: ${currentQuestion}

Please provide a helpful, clear answer based on the study material provided.`;

      console.log("Sending request to Gemini...");
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const botReply = response.text();
      console.log("Received response:", botReply);

      // Add bot response to chat history
      const botMessage = { role: "bot", text: botReply };
      setChatHistory(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error asking question:", error);
      const errorMessage = { role: "bot", text: "Sorry, I encountered an error: " + error.message };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
          
          .selfstudy-content-wrapper {
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
      
      <div className="page-content selfstudy-content-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
          <h1 style={{ 
            fontFamily: '"Fredoka One", "Baloo 2", "Rounded Mplus 1c", "Comic Sans MS", cursive',
            fontWeight: '700',
            letterSpacing: '1px',
            margin: 0
          }}>Self Study</h1>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
        </div>
        <p style={{ color: '#fff', fontWeight: '400', marginTop: '0.5rem', textAlign: 'center', fontSize: '1.1rem' }}>
          Review your materials and ask questions
        </p>

        {uploadedFile && fileContent ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
            {/* File Content Section */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              maxHeight: '600px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h2 style={{ 
                color: '#1e3a8a', 
                marginBottom: '1rem',
                fontFamily: '"Fredoka One", "Baloo 2", cursive',
                fontSize: '1.3rem'
              }}>
                📄 {uploadedFile.name}
              </h2>
              <div style={{
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '10px',
                border: '1px solid #e5e7eb',
                overflowY: 'auto',
                flex: 1,
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                lineHeight: '1.5',
                color: '#333'
              }}>
                {fileContent}
              </div>
            </div>

            {/* Chat Section */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              maxHeight: '600px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h2 style={{ 
                color: '#1e3a8a', 
                marginBottom: '1rem',
                fontFamily: '"Fredoka One", "Baloo 2", cursive',
                fontSize: '1.3rem'
              }}>
                💬 Ask Questions
              </h2>
              
              {/* Chat History */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                marginBottom: '1rem',
                padding: '1rem',
                background: '#f9fafb',
                borderRadius: '10px',
                border: '1px solid #e5e7eb'
              }}>
                {chatHistory.length === 0 ? (
                  <p style={{ color: '#666', textAlign: 'center', fontStyle: 'italic' }}>
                    Ask a question about your study material!
                  </p>
                ) : (
                  chatHistory.map((message, index) => (
                    <div key={index} style={{
                      marginBottom: '1rem',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      background: message.role === 'user' ? '#e0f2fe' : '#f0fdf4',
                      border: message.role === 'user' ? '1px solid #bae6fd' : '1px solid #bbf7d0'
                    }}>
                      <div style={{ 
                        fontWeight: 'bold', 
                        marginBottom: '0.25rem',
                        color: message.role === 'user' ? '#0369a1' : '#15803d',
                        fontSize: '0.9rem'
                      }}>
                        {message.role === 'user' ? '👤 You' : '🤖 Assistant'}
                      </div>
                      <div style={{ color: '#333', fontSize: '0.95rem', lineHeight: '1.5' }}>
                        {message.text}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && (
                  <div style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
                    Thinking...
                  </div>
                )}
              </div>

              {/* Question Input */}
              <form onSubmit={handleAskQuestion} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Type your question here..."
                  disabled={isLoading}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !question.trim()}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: isLoading || !question.trim() ? 'not-allowed' : 'pointer',
                    opacity: isLoading || !question.trim() ? 0.6 : 1
                  }}
                >
                  {isLoading ? '...' : 'Ask'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div style={{
            marginTop: '3rem',
            padding: '2rem',
            background: 'rgba(255, 255, 255, 0.15)',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}>
            <p style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }}>
              No file uploaded yet! 📚
            </p>
            <p style={{ color: '#fff', fontSize: '1rem' }}>
              Please go back and upload a file to start studying.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelfStudy;
