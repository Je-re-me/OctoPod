import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useEffect} from "react";
import ReactMarkdown from "react-markdown";
import { useFile } from "../context/FileContext";

const apiKey = process.env.REACT_APP_API_KEY;

function Gemini() {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");
  const { uploadedFile, fileContent } = useFile();

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const genai = new GoogleGenerativeAI(apiKey);
    const model = genai.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Include file content in the prompt if available
    let fullPrompt = userInput;
    if (fileContent) {
      fullPrompt = `Uploaded file content:\n${fileContent}\n\nUser request: ${userInput}`;
    }

    const result = await model.generateContent(fullPrompt);
    const res = await result.response;
    const text = await res.text();
    setResponse(text);
  };

  return (
    <div>
      {uploadedFile && (
        <div style={{ marginBottom: '1rem', padding: '0.5rem', background: '#f0f4ff', borderRadius: '8px' }}>
          <p style={{ margin: 0, color: '#4449b7', fontWeight: 600 }}>
            📄 File loaded: {uploadedFile.name}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={userInput}
          onChange={handleChange}
          placeholder="Ask about your uploaded file..."
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h3>Response:</h3>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );

}

export default Gemini;
