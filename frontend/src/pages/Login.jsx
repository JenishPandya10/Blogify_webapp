import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import Google Login

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // Changed username to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 Handle normal login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", { // ✅ Fixed URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // Changed username to email
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        navigate("/");  
        window.location.reload();
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Google Login Success
  const handleGoogleLoginSuccess = async (response) => {
    console.log("Google Login Success:", response);

    if (!response.credential) {
      console.error("Google token is missing");
      setError("Google token is missing.");
      return;
    }

    try {
      const backendResponse = await fetch("http://127.0.0.1:8000/api/auth/google-login/", { // ✅ Fixed URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await backendResponse.json();
      console.log("Backend Response:", data);

      if (backendResponse.ok) {
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);
        navigate("/");
        window.location.reload();
      } else {
        setError(data.error || "Google login failed.");
      }
    } catch (error) {
      console.error("Google Login Error:", error);
      setError("Something went wrong.");
    }
  };

  // ✅ Handle Google Login Failure
  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Error:", error);
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}

        {/* 🔹 Normal Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label> {/* Changed Username to Email */}
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🔹 Google Login Button */}
        <div className="google-login">
          <p>Or login with</p>
          <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginFailure} />
        </div>

        <p className="auth-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
