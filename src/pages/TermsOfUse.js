import React from "react";
import "../styles/pages.css";

const TermsOfUse = () => (
  <div className="page-container">
    <div className="page-content" style={{ maxWidth: 800, margin: "0 auto" }}>
      <h1>Terms of Use</h1>
      <p>Welcome to Octolearn! By using our platform, you agree to the following terms:</p>
      <ul style={{ textAlign: "left", margin: "2rem auto", maxWidth: 700 }}>
        <li><strong>Legal Use:</strong> You agree to use Octolearn for lawful purposes only.</li>
        <li><strong>Copyright:</strong> You must only upload materials you have the right to use. Do not upload copyrighted content without permission.</li>
        <li><strong>Privacy:</strong> We respect your privacy and do not share your uploaded materials with third parties.</li>
        <li><strong>Liability:</strong> Octolearn is not liable for any damages resulting from misuse of the platform or uploaded content.</li>
        <li><strong>Changes:</strong> We may update these terms at any time. Continued use of the platform means you accept the new terms.</li>
      </ul>
      <p>If you have questions about these terms, please contact us via the Contact page.</p>
    </div>
  </div>
);

export default TermsOfUse;
