import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/pages.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGoogleSignIn = () => {
    // For now, this is a placeholder. In production, you'd integrate with Firebase or another auth provider
    console.log("Google Sign-In clicked");
    
    // Simulate successful Google login
    const userData = {
      email: "user@gmail.com",
      name: "Google User",
      provider: "google"
    };
    
    login(userData);
    setSuccess("Signed in with Google! Redirecting...");
    
    setTimeout(() => {
      navigate("/");
    }, 1000);
    
    // Example of what you'd do with Firebase:
    // const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider)
    //   .then((result) => { 
    //     login({ email: result.user.email, name: result.user.displayName });
    //     navigate("/");
    //   })
    //   .catch((error) => { /* handle error */ });
  };

  const handleEmailAuth = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // For now, this is a placeholder. In production, you'd integrate with Firebase or another auth provider
    console.log(isSignUp ? "Sign up" : "Sign in", { email, password });
    
    const userData = {
      email: email,
      name: email.split('@')[0],
      provider: "email"
    };
    
    login(userData);
    setSuccess(isSignUp ? "Account created successfully! Welcome to OctoPod!" : "Signed in successfully! Welcome back!");
    
    // Navigate to home after short delay
    setTimeout(() => {
      navigate("/");
    }, 1500);

    // Example of what you'd do with Firebase:
    // if (isSignUp) {
    //   createUserWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => { 
    //       login({ email: userCredential.user.email });
    //       navigate("/");
    //     })
    //     .catch((error) => { /* handle error */ });
    // } else {
    //   signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => { 
    //       login({ email: userCredential.user.email });
    //       navigate("/");
    //     })
    //     .catch((error) => { /* handle error */ });
    // }
  };

  return (
    <div className="page-container" style={{
      background: 'linear-gradient(-45deg, #1e3a8a, #3b82f6, #06b6d4, #0891b2)',
      backgroundSize: '400% 400%',
      animation: 'oceanWave 15s ease infinite',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style>
        {`
          @keyframes oceanWave {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          
          .bubble {
            position: absolute;
            bottom: -100px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            animation: rise 15s infinite ease-in;
          }
          
          @keyframes rise {
            to {
              bottom: 110%;
              opacity: 0;
            }
          }
        `}
      </style>
      
      {/* Floating bubbles */}
      <div className="bubble" style={{ left: '10%', width: '40px', height: '40px', animationDelay: '0s', animationDuration: '12s' }}></div>
      <div className="bubble" style={{ left: '20%', width: '20px', height: '20px', animationDelay: '2s', animationDuration: '10s' }}></div>
      <div className="bubble" style={{ left: '35%', width: '30px', height: '30px', animationDelay: '4s', animationDuration: '14s' }}></div>
      <div className="bubble" style={{ left: '50%', width: '25px', height: '25px', animationDelay: '0s', animationDuration: '11s' }}></div>
      <div className="bubble" style={{ left: '65%', width: '35px', height: '35px', animationDelay: '3s', animationDuration: '13s' }}></div>
      <div className="bubble" style={{ left: '80%', width: '20px', height: '20px', animationDelay: '5s', animationDuration: '9s' }}></div>
      <div className="bubble" style={{ left: '90%', width: '28px', height: '28px', animationDelay: '1s', animationDuration: '15s' }}></div>
      
      <div className="page-content" style={{ maxWidth: 400, margin: "0 auto", textAlign: "center", position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
          <h1 style={{ 
            fontFamily: '"Fredoka One", "Baloo 2", "Rounded Mplus 1c", "Comic Sans MS", cursive',
            fontWeight: '700',
            letterSpacing: '1px',
            margin: 0
          }}>Login</h1>
          <img src="/assets/Octopus.png" alt="Octopus" style={{ height: '4rem', width: 'auto' }} />
        </div>
        <p>Sign in to your OctoPod account</p>

        {/* Error and Success Messages */}
        {error && (
          <div style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #fcc'
          }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{
            backgroundColor: '#efe',
            color: '#3c3',
            padding: '0.75rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #cfc'
          }}>
            {success}
          </div>
        )}

        {!showEmailForm ? (
          <>
            {/* Google Sign-In Button */}
            <div style={{ margin: "2rem 0" }}>
              <button 
                onClick={handleGoogleSignIn}
                className="login-btn"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <img src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png" alt="Google" style={{ width: 24, height: 24 }} />
                Continue with Google
              </button>
            </div>

            <div style={{ 
              margin: '1.5rem 0', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              color: '#333'
            }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
              <span>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
            </div>

            {/* Email Sign-In Button */}
            <div style={{ margin: "2rem 0" }}>
              <button 
                onClick={() => setShowEmailForm(true)}
                className="login-btn"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem'
                }}
              >
                <img src="/assets/cropped_circle_image.png" alt="Email" style={{ width: 24, height: 24, borderRadius: "50%", objectFit: "cover" }} />
                Continue with Email
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Email Form */}
            <form onSubmit={handleEmailAuth} style={{ marginTop: '2rem' }}>
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>

              <button
                type="submit"
                className="login-btn"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  marginTop: '1rem'
                }}
              >
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div style={{ marginTop: '1.5rem' }}>
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1e3a8a',
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  textDecoration: 'underline',
                  fontWeight: '500'
                }}
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>

            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => {
                  setShowEmailForm(false);
                  setEmail("");
                  setPassword("");
                  setError("");
                  setIsSignUp(false);
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  textDecoration: 'underline'
                }}
              >
                ← Back to login options
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
