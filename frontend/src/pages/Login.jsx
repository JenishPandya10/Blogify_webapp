import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "../Auth.css"; // Import CSS file

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log("Login Response:", response);
      console.log("Response Data:", data);

      if (response.ok) {
        if (data.access && data.refresh) {
          localStorage.setItem("access_token", data.access);
          localStorage.setItem("refresh_token", data.refresh);
          navigate("/"); // Redirect to homepage after login
          window.location.reload(); // Ensure navbar updates after login
        } else {
          setError("Invalid server response. No access token received.");
        }
      } else {
        setError(data.detail || "Invalid username or password.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log("Google Login Success:", response);
    // Implement backend verification of Google token if needed
    navigate("/");
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google Login Error:", error);
    setError("Google login failed.");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

        <div className="google-login">
          <p>Or login with</p>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            disabled={loading}
          />
        </div>

        <p className="auth-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};


export default Login;
