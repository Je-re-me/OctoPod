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
    <div className="page-container">
      <div className="page-content">
        <h1>Get Started</h1>
        <p className="subtitle">Upload your academic materials to begin!</p>
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <Link to="/terms" style={{ color: "#4449b7", fontWeight: 600, textDecoration: "underline" }}>
            View Terms of Use
          </Link>
        </div>

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
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Note: Currently only .txt files are supported
        </p>
      </div>
    </div>
  );
}       

export default GetStarted;