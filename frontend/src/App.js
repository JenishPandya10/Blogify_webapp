import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Import Routes instead of Switch
import Login from './pages/Login';  // Login page component
import Signup from './pages/Signup'; // Signup page component
import { GoogleOAuthProvider } from '@react-oauth/google';  // For Google OAuth
import './App.css';

function App() {
  return (
    <GoogleOAuthProvider clientId="846204416661-ojdh7p7938c8qo7oep54p3tojc5ltld7.apps.googleusercontent.com">
      <Router>
        <div className="App">
          {/* Use Routes instead of Switch */}
          <Routes>
            {/* Define Routes for Login and Signup Pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* Default route (home page) */}
            <Route path="/" element={<h1>Welcome to the Blog App</h1>} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
