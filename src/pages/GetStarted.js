import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/pages.css";

const GetStarted = () => {
  const [file, getFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      // Handle file upload logic here
      console.log("File uploaded:", file.name);
    }

    //MORE SHIT

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
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => getFile(e.target.files[0])}
          />
          <button type="submit" disabled={!file}>
            Upload and Start Learning
          </button>
        </form>
      </div>
    </div>
  );
}       

export default GetStarted;