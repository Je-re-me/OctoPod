import React from "react";
import "../styles/pages.css";

const Login = () => {
  return (
    <div className="page-container">
      <div className="page-content" style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
        <h1>Login</h1>
        <p>Sign in to your Pocket Prof account</p>
        <div style={{ margin: "2rem 0" }}>
          <a href="#" className="login-google-btn">
            <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="Google" style={{ width: 24, marginRight: 8, verticalAlign: "middle" }} />
            Continue with Google
          </a>
        </div>
        <div style={{ margin: "2rem 0" }}>
          <a href="#" className="login-email-btn">
            <img src="https://e7.pngegg.com/pngimages/595/778/png-clipart-blue-triangle-area-symbol-aqua-mail-round-blue-and-white-mail-icon-blue-angle.png" alt="Google" style={{ width: 24, marginRight: 8, verticalAlign: "middle" }} />
            Continue with Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
