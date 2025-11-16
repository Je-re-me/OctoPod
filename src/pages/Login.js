import React from "react";
import "../styles/pages.css";

const Login = () => {
  return (
    <div className="page-container">
      <div className="page-content" style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
        <h1>Login</h1>
        <p>Sign in to your OctoPod account</p>
        <div style={{ margin: "2rem 0" }}>
          <a href="#" className="login-btn">
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="Google" style={{ width: 24, marginRight: 8, verticalAlign: "middle" }} />
            Continue with Google
          </a>
        </div>
        <div style={{ margin: "2rem 0" }}>
          <a href="#" className="login-btn">
            <img src="/assets/cropped_circle_image.png" alt="Email" style={{ width: 24, height: 24, borderRadius: "50%", marginRight: 8, verticalAlign: "middle", objectFit: "cover" }} />
            Continue with Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
