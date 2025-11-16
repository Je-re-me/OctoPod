import React from "react";
import "../styles/pages.css";

const About = () => {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1>About OctoPod</h1>

        <div className="about-section">
          <h2>What is OctoPod?</h2>
          <p>
            OctoPod is an innovative educational platform that leverages artificial intelligence
            to provide personalized tutoring and academic support. Our mission is to make quality
            education accessible to everyone, everywhere.
          </p>
        </div>

        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We believe in the power of technology to transform education. By combining AI with
            interactive learning, we're breaking down barriers to quality tutoring and making it
            affordable and accessible for all students.
          </p>
        </div>

        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul className="about-list">
            <li>✓ Personalized learning experience</li>
            <li>✓ Fast and accurate responses</li>
            <li>✓ User-friendly interface</li>
            <li>✓ Completely free to use</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default About;
