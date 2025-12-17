import React, { useState } from "react";
import "../styles/pages.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useFile } from "../context/FileContext";
import ReactMarkdown from "react-markdown";

const apiKey = process.env.REACT_APP_API_KEY;

const Learn = () => {
  const { fileContent, uploadedFile } = useFile();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [wrongQuestions, setWrongQuestions] = useState([]);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [summary, setSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const generateQuestion = async () => {
    if (!fileContent) {
      alert("Please upload a file first in our Get Started page!");
      return;
    }

    setLoading(true);
    setSelectedAnswer(null);
    setShowResult(false);
    
    try {
      console.log("API Key exists:", !!apiKey);
      console.log("File content length:", fileContent?.length);
      
      const genai = new GoogleGenerativeAI(apiKey);
      const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Limit file content to prevent API issues
      const truncatedContent = fileContent.length > 10000 
        ? fileContent.substring(0, 10000) + "...(truncated)"
        : fileContent;

      const prompt = `Based on the following content, generate exactly 1 multiple choice question to test understanding. 
      
Format the question EXACTLY as follows (use this exact format):
QUESTION: [question text]
A: [option]
B: [option]
C: [option]
D: [option]
ANSWER: [letter only, A, B, C, or D]

Content:
${truncatedContent}

Please create an educational question that tests a key concept from this material. Make sure it's different from previous questions if possible.`;

      console.log("Sending request to Gemini...");
      const result = await model.generateContent(prompt);
      const res = await result.response;
      const text = await res.text();
      console.log("Response received:", text);
      
      // Parse the response
      const lines = text.trim().split('\n').filter(line => line.trim());
      const questionLine = lines.find(l => l.startsWith('QUESTION:'));
      const optionA = lines.find(l => l.trim().startsWith('A:'));
      const optionB = lines.find(l => l.trim().startsWith('B:'));
      const optionC = lines.find(l => l.trim().startsWith('C:'));
      const optionD = lines.find(l => l.trim().startsWith('D:'));
      const answerLine = lines.find(l => l.startsWith('ANSWER:'));
      
      if (questionLine && optionA && optionB && optionC && optionD && answerLine) {
        setQuestionData({
          question: questionLine.replace('QUESTION:', '').trim(),
          options: {
            A: optionA.replace('A:', '').trim(),
            B: optionB.replace('B:', '').trim(),
            C: optionC.replace('C:', '').trim(),
            D: optionD.replace('D:', '').trim()
          },
          correctAnswer: answerLine.replace('ANSWER:', '').trim().toUpperCase()
        });
      } else {
        console.error("Failed to parse question format");
        alert("Error parsing question. Please try again.");
      }
    } catch (error) {
      console.error("Error generating question:", error);
      alert(`Error: ${error.message || "Failed to generate question. Please check your API key and try again."}`);
    }
    setLoading(false);
  };

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true);
      const isCorrect = selectedAnswer === questionData.correctAnswer;
      
      // Update stats
      setStats(prev => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1
      }));
      
      // Track wrong questions
      if (!isCorrect) {
        setWrongQuestions(prev => [...prev, {
          question: questionData.question,
          options: questionData.options,
          correctAnswer: questionData.correctAnswer,
          userAnswer: selectedAnswer
        }]);
      }
    } else {
      alert("Please select an answer first!");
    }
  };

  const generateSummary = async () => {
    if (wrongQuestions.length === 0) {
      alert("No wrong questions to analyze yet!");
      return;
    }

    setLoadingSummary(true);
    setSummary("");
    
    try {
      const genai = new GoogleGenerativeAI(apiKey);
      const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Format wrong questions for analysis
      const wrongQuestionsText = wrongQuestions.map((q, idx) => 
        `Question ${idx + 1}: ${q.question}\nCorrect Answer: ${q.correctAnswer}) ${q.options[q.correctAnswer]}\nUser's Answer: ${q.userAnswer}) ${q.options[q.userAnswer]}`
      ).join('\n\n');

      const prompt = `Analyze these incorrect answers and provide a brief study summary (3-4 sentences max):

${wrongQuestionsText}

Provide a concise response with:
1. Main weak areas (1-2 topics)
2. One key recommendation
3. Talking in second person to the user
4. List out the key points to focus on

Keep it brief and actionable.`;

      console.log("Generating summary...");
      const result = await model.generateContent(prompt);
      const res = await result.response;
      const text = await res.text();
      console.log("Summary received");
      setSummary(text);
    } catch (error) {
      console.error("Error generating summary:", error);
      alert(`Error: ${error.message || "Failed to generate summary. Please try again."}`);
    }
    setLoadingSummary(false);
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
          
          .learn-content-wrapper {
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
      
      <div className="page-content learn-content-wrapper">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
          <h1 style={{ 
            fontFamily: '"Fredoka One", "Baloo 2", "Rounded Mplus 1c", "Comic Sans MS", cursive',
            fontWeight: '700',
            letterSpacing: '1px',
            margin: 0
          }}>Evaluation Mode</h1>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
        </div>
        <p style={{ color: '#000', fontWeight: '400', marginTop: '0.5rem', textAlign: 'center' }}>Welcome to Evaluation Mode! Here you can study at your own pace and review material freely.</p>
        
        {uploadedFile && (
          <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f0f4ff', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: '#4449b7', fontWeight: 600 }}>
              📄 File loaded: {uploadedFile.name}
            </p>
          </div>
        )}

        {/* Stats Display */}
        {stats.total > 0 && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f4ff', borderRadius: '8px', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#4449b7' }}>{stats.total}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Questions Answered</p>
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#4caf50' }}>{stats.correct}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Correct</p>
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#f44336' }}>{wrongQuestions.length}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Wrong</p>
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#4449b7' }}>
                {Math.round((stats.correct / stats.total) * 100)}%
              </h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Accuracy</p>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={generateQuestion}
            className="cta-button"
            disabled={loading || !fileContent}
          >
            {loading ? "Generating Question..." : questionData ? "Generate New Question" : "Generate Question"}
          </button>

          {/* Loading View for Question Generation */}
          {loading && (
            <div style={{ 
              marginTop: '2rem',
              padding: '2rem',
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <style>
                {`
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
              <div style={{ 
                width: '50px', 
                height: '50px', 
                border: '5px solid #e0e7ff',
                borderTop: '5px solid #4449b7',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 1rem auto'
              }}></div>
              <p style={{ color: '#4449b7', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                Generating your question...
              </p>
              <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                Creating a question from your study material
              </p>
            </div>
          )}

          {questionData && !loading && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <h3 style={{ color: '#4449b7', marginBottom: '1rem' }}>{questionData.question}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {Object.entries(questionData.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleAnswerSelect(key)}
                    style={{
                      padding: '1rem',
                      border: `2px solid ${
                        showResult 
                          ? key === questionData.correctAnswer 
                            ? '#4caf50' 
                            : key === selectedAnswer 
                              ? '#f44336' 
                              : '#ddd'
                          : selectedAnswer === key 
                            ? '#4449b7' 
                            : '#ddd'
                      }`,
                      borderRadius: '8px',
                      background: selectedAnswer === key ? '#f0f4ff' : '#fff',
                      cursor: showResult ? 'default' : 'pointer',
                      textAlign: 'left',
                      fontSize: '1rem',
                      transition: 'all 0.2s'
                    }}
                    disabled={showResult}
                  >
                    <strong>{key}:</strong> {value}
                  </button>
                ))}
              </div>

              {!showResult && (
                <button
                  onClick={handleSubmit}
                  className="cta-button"
                  style={{ marginTop: '1.5rem', width: '100%' }}
                >
                  Submit Answer
                </button>
              )}

              {showResult && (
                <div style={{ 
                  marginTop: '1.5rem', 
                  padding: '1rem', 
                  borderRadius: '8px',
                  background: selectedAnswer === questionData.correctAnswer ? '#e8f5e9' : '#ffebee',
                  border: `2px solid ${selectedAnswer === questionData.correctAnswer ? '#4caf50' : '#f44336'}`
                }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: selectedAnswer === questionData.correctAnswer ? '#2e7d32' : '#c62828' }}>
                    {selectedAnswer === questionData.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                  </h4>
                  <p style={{ margin: 0 }}>
                    {selectedAnswer === questionData.correctAnswer 
                      ? 'Great job! You got it right.'
                      : `The correct answer is ${questionData.correctAnswer}: ${questionData.options[questionData.correctAnswer]}`
                    }
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Wrong Questions Review Section */}
        {wrongQuestions.length > 0 && (
          <div style={{ marginTop: '3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ color: '#4449b7', margin: 0 }}>Questions You Got Wrong ({wrongQuestions.length})</h2>
              <button
                onClick={generateSummary}
                className="cta-button"
                disabled={loadingSummary}
                style={{ margin: 0, padding: '0.75rem 1.5rem', fontSize: '0.95rem' }}
              >
                {loadingSummary ? "Generating Summary..." : "📊 Generate Study Summary"}
              </button>
            </div>

            {/* Loading View */}
            {loadingSummary && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '1rem', 
                marginBottom: '1.5rem',
                padding: '2rem',
                background: '#f0f4ff',
                borderRadius: '8px',
                border: '2px solid #4449b7'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '50px', 
                    height: '50px', 
                    border: '5px solid #e0e7ff',
                    borderTop: '5px solid #4449b7',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto 1rem auto'
                  }}></div>
                  <style>
                    {`
                      @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                      }
                    `}
                  </style>
                  <p style={{ color: '#4449b7', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                    Analyzing your answers...
                  </p>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                    Generating personalized study recommendations
                  </p>
                </div>
              </div>
            )}

            {/* AI Summary Section */}
            {summary && !loadingSummary && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '7rem' }}>🐟</span>
                <div style={{ 
                  padding: '1.25rem', 
                  background: '#f0f4ff', 
                  borderRadius: '8px', 
                  boxShadow: '0 2px 8px rgba(68, 73, 183, 0.1)',
                  border: '2px solid #4449b7',
                  maxWidth: '700px',
                  flex: '0 1 auto'
                }}>
                  <h4 style={{ color: '#4449b7', marginTop: 0, marginBottom: '0.75rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    🎯 Study Summary
                  </h4>
                  <div style={{ color: '#333', fontSize: '1.05rem', lineHeight: '1.6' }}>
                    <ReactMarkdown>{summary}</ReactMarkdown>
                  </div>
                </div>
                <span style={{ fontSize: '7rem' }}>🐟</span>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {wrongQuestions.map((item, index) => (
                <div key={index} style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '2px solid #ffebee' }}>
                  <h4 style={{ color: '#4449b7', marginBottom: '1rem' }}>Question {index + 1}: {item.question}</h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    {Object.entries(item.options).map(([key, value]) => (
                      <div 
                        key={key}
                        style={{
                          padding: '0.75rem',
                          borderRadius: '8px',
                          border: `2px solid ${
                            key === item.correctAnswer ? '#4caf50' : key === item.userAnswer ? '#f44336' : '#ddd'
                          }`,
                          background: key === item.correctAnswer ? '#e8f5e9' : key === item.userAnswer ? '#ffebee' : '#fff'
                        }}
                      >
                        <strong>{key}:</strong> {value}
                        {key === item.correctAnswer && <span style={{ marginLeft: '0.5rem', color: '#4caf50', fontWeight: 700 }}>✓ Correct Answer</span>}
                        {key === item.userAnswer && key !== item.correctAnswer && <span style={{ marginLeft: '0.5rem', color: '#f44336', fontWeight: 700 }}>✗ Your Answer</span>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learn;
