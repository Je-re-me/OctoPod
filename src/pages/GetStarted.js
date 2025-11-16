import React, { useState } from "react";
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
        <p className="description">(Make sure to obey copyright laws when uploading materials!)</p>
        <p className="description">We are not liable for any damages </p>
        <p className="subtitle">Upload your academic materials to begin!</p>

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