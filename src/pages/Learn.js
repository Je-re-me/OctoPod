import React, { useState } from "react";
import "../styles/pages.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useFile } from "../context/FileContext";
import ReactMarkdown from "react-markdown";

const apiKey = process.env.REACT_APP_API_KEY;

const Learn = () => {
  const { fileContent, uploadedFile } = useFile();
  const [questions, setQuestions] = useState("");
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!fileContent) {
      alert("Please upload a file first in Get Started page!");
      return;
    }

    setLoading(true);
    try {
      console.log("API Key exists:", !!apiKey);
      console.log("File content length:", fileContent?.length);
      
      const genai = new GoogleGenerativeAI(apiKey);
      const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Limit file content to prevent API issues
      const truncatedContent = fileContent.length > 10000 
        ? fileContent.substring(0, 10000) + "...(truncated)"
        : fileContent;

      const prompt = `Based on the following content, generate exactly 5 multiple choice questions to test understanding. 
      
Format each question as:
**Question [number]:** [question text]
A) [option]
B) [option]
C) [option]
D) [option]
**Correct Answer:** [letter]

Content:
${truncatedContent}

Please create educational questions that test key concepts from this material.`;

      console.log("Sending request to Gemini...");
      const result = await model.generateContent(prompt);
      const res = await result.response;
      const text = await res.text();
      console.log("Response received");
      setQuestions(text);
    } catch (error) {
      console.error("Error generating questions:", error);
      alert(`Error: ${error.message || "Failed to generate questions. Please check your API key and try again."}`);
    }
    setLoading(false);
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1>Learn Mode</h1>
        <p>Welcome to Learn Mode! Here you can study at your own pace and review material freely.</p>
        
        {uploadedFile && (
          <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#f0f4ff', borderRadius: '8px' }}>
            <p style={{ margin: 0, color: '#4449b7', fontWeight: 600 }}>
              📄 File loaded: {uploadedFile.name}
            </p>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={generateQuestions}
            className="cta-button"
            disabled={loading || !fileContent}
          >
            {loading ? "Generating Questions..." : "Generate 5 Practice Questions"}
          </button>

          {questions && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <ReactMarkdown>{questions}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Learn;
