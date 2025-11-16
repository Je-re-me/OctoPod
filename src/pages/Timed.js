import React, { useState, useEffect } from "react";
import "../styles/pages.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useFile } from "../context/FileContext";
import ReactMarkdown from "react-markdown";

const apiKey = process.env.REACT_APP_API_KEY;

const Timed = () => {
  const { fileContent, uploadedFile } = useFile();
  const [questionData, setQuestionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [totalTime, setTotalTime] = useState(300); // Total session time in seconds (default 5 min)
  const [timeLeft, setTimeLeft] = useState(300);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [selectedMinutes, setSelectedMinutes] = useState(5); // Default 5 minutes (1-10 range)

  // Timer countdown
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      // Time's up for entire session!
      handleSessionTimeUp();
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  const handleSessionTimeUp = () => {
    setIsTimerActive(false);
    setGameOver(true);
  };

  const generateQuestion = async () => {
    if (!fileContent) {
      alert("Please upload a file first in Get Started page!");
      return;
    }

    setLoading(true);
    setSelectedAnswer(null);
    setShowResult(false);
    
    // Start timer on first question
    if (!sessionStarted) {
      setSessionStarted(true);
      setIsTimerActive(true);
    }
    
    try {
      console.log("API Key exists:", !!apiKey);
      console.log("File content length:", fileContent?.length);
      
      const genai = new GoogleGenerativeAI(apiKey);
      const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });

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

Please create an educational question that tests a key concept from this material.`;

      console.log("Sending request to Gemini...");
      const result = await model.generateContent(prompt);
      const res = await result.response;
      const text = await res.text();
      console.log("Response received:", text);
      
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

  const startSession = () => {
    const timeInSeconds = selectedMinutes * 60;
    setTotalTime(timeInSeconds);
    setTimeLeft(timeInSeconds);
    generateQuestion();
  };

  const handleAnswerSelect = (option) => {
    if (!showResult) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowResult(true);
      // Keep timer running during the session
      const isCorrect = selectedAnswer === questionData.correctAnswer;
      
      setStats(prev => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1
      }));
    } else {
      alert("Please select an answer first!");
    }
  };

  const handleEndSession = () => {
    setGameOver(true);
    setIsTimerActive(false);
  };

  const resetSession = () => {
    setGameOver(false);
    setSessionStarted(false);
    setStats({ correct: 0, total: 0 });
    setQuestionData(null);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsTimerActive(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameOver) {
    return (
      <div className="page-container">
        <div className="page-content">
          <h1>Timed Mode - Results</h1>
          <div style={{ marginTop: '2rem', padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h2 style={{ color: '#4449b7', marginBottom: '2rem' }}>Session Complete! 🎉</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '2rem' }}>
              <div>
                <h3 style={{ fontSize: '3rem', margin: 0, color: '#4449b7' }}>{stats.total}</h3>
                <p style={{ margin: 0, color: '#666' }}>Total Questions</p>
              </div>
              <div>
                <h3 style={{ fontSize: '3rem', margin: 0, color: '#4caf50' }}>{stats.correct}</h3>
                <p style={{ margin: 0, color: '#666' }}>Correct</p>
              </div>
              <div>
                <h3 style={{ fontSize: '3rem', margin: 0, color: '#f44336' }}>{stats.total - stats.correct}</h3>
                <p style={{ margin: 0, color: '#666' }}>Wrong</p>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#f0f4ff', borderRadius: '8px', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '2.5rem', margin: 0, color: '#4449b7' }}>
                {stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0}%
              </h3>
              <p style={{ margin: 0, color: '#666', fontSize: '1.1rem' }}>Accuracy</p>
            </div>

            <button 
              onClick={() => {
                resetSession();
              }}
              className="cta-button"
            >
              Start New Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Timed Mode ⏱️</h1>
        <p>Answer as many questions as you can within the time limit!</p>
        
        {uploadedFile && (
          <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f0f4ff', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: '#4449b7', fontWeight: 600 }}>
              📄 File loaded: {uploadedFile.name}
            </p>
          </div>
        )}

        {/* Timer Selection (before starting) */}
        {!sessionStarted && (
          <div style={{ marginTop: '2rem', padding: '2rem', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#4449b7', marginBottom: '1rem', textAlign: 'center' }}>Select Session Duration</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <label style={{ fontSize: '1.1rem', color: '#666' }}>Time Limit:</label>
              <input
                type="number"
                min="1"
                max="10"
                value={selectedMinutes}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value >= 1 && value <= 10) {
                    setSelectedMinutes(value);
                  }
                }}
                style={{
                  padding: '0.75rem',
                  fontSize: '1.2rem',
                  width: '80px',
                  textAlign: 'center',
                  border: '2px solid #4449b7',
                  borderRadius: '8px'
                }}
              />
              <span style={{ fontSize: '1.1rem', color: '#666' }}>minutes</span>
            </div>
            <p style={{ textAlign: 'center', color: '#999', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Choose between 1 and 10 minutes
            </p>
            <button 
              onClick={startSession}
              className="cta-button"
              disabled={!fileContent}
              style={{ width: '100%' }}
            >
              {!fileContent ? "Please upload a file first in Get Started page!" : "Start Session"}
            </button>
          </div>
        )}

        {/* Stats Display */}
        {stats.total > 0 && sessionStarted && (
          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0f4ff', borderRadius: '8px', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#4449b7' }}>{stats.total}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Questions</p>
            </div>
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#4caf50' }}>{stats.correct}</h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>Correct</p>
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
          {!questionData && sessionStarted ? (
            <button 
              onClick={generateQuestion}
              className="cta-button"
              disabled={loading || !fileContent}
            >
              {loading ? "Generating Question..." : "Loading First Question..."}
            </button>
          ) : sessionStarted && questionData ? (
            <>
              {/* Timer Display */}
              <div style={{ 
                marginBottom: '1.5rem', 
                padding: '1rem', 
                background: timeLeft <= 10 ? '#ffebee' : '#f0f4ff', 
                borderRadius: '8px',
                border: `3px solid ${timeLeft <= 10 ? '#f44336' : '#4449b7'}`,
                textAlign: 'center',
                transition: 'all 0.3s'
              }}>
                <h2 style={{ 
                  margin: 0, 
                  color: timeLeft <= 10 ? '#f44336' : '#4449b7',
                  fontSize: '3rem',
                  fontWeight: 700
                }}>
                  {formatTime(timeLeft)}
                </h2>
                <p style={{ margin: 0, color: '#666' }}>Time Remaining</p>
              </div>

              <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
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
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button
                      onClick={handleSubmit}
                      className="cta-button"
                      style={{ flex: 1 }}
                      disabled={!selectedAnswer}
                    >
                      Submit Answer
                    </button>
                    <button
                      onClick={handleEndSession}
                      style={{ 
                        flex: 0.5,
                        padding: '1rem',
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      End Session
                    </button>
                  </div>
                )}

                {showResult && (
                  <>
                    <div style={{ 
                      marginTop: '1.5rem', 
                      padding: '1rem', 
                      borderRadius: '8px',
                      background: selectedAnswer === questionData.correctAnswer ? '#e8f5e9' : timeLeft === 0 ? '#fff3e0' : '#ffebee',
                      border: `2px solid ${selectedAnswer === questionData.correctAnswer ? '#4caf50' : timeLeft === 0 ? '#ff9800' : '#f44336'}`
                    }}>
                      <h4 style={{ margin: '0 0 0.5rem 0', color: selectedAnswer === questionData.correctAnswer ? '#2e7d32' : timeLeft === 0 ? '#e65100' : '#c62828' }}>
                        {timeLeft === 0 ? '⏰ Time\'s Up!' : selectedAnswer === questionData.correctAnswer ? '✓ Correct!' : '✗ Incorrect'}
                      </h4>
                      <p style={{ margin: 0 }}>
                        {selectedAnswer === questionData.correctAnswer 
                          ? 'Great job! You got it right.'
                          : timeLeft === 0
                            ? `Time ran out! The correct answer is ${questionData.correctAnswer}: ${questionData.options[questionData.correctAnswer]}`
                            : `The correct answer is ${questionData.correctAnswer}: ${questionData.options[questionData.correctAnswer]}`
                        }
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                      <button
                        onClick={generateQuestion}
                        className="cta-button"
                        style={{ flex: 1 }}
                      >
                        Next Question
                      </button>
                      <button
                        onClick={handleEndSession}
                        style={{ 
                          flex: 0.5,
                          padding: '1rem',
                          background: '#4449b7',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '1rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        End Session
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Timed;
