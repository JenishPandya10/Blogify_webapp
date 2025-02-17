import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  
import { GoogleOAuthProvider } from "@react-oauth/google";  
import Login from "./pages/Login";  
import Signup from "./pages/Signup";  
import Home from "./pages/Home";  
import "./App.css";
import CreateBlog from './components/CreateBlog';

function App() {
  const [blogs, setBlogs] = useState([]); // State to store blogs

  // Function to add a new blog instantly without reloading
  const addBlogInstantly = (newBlog) => {
    setBlogs([newBlog, ...blogs]); // Add the new blog at the top
  };

  return (
    <GoogleOAuthProvider clientId="846204416661-ojdh7p7938c8qo7oep54p3tojc5ltld7.apps.googleusercontent.com">
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home blogs={blogs} setBlogs={setBlogs} />} />  
            <Route path="/login" element={<Login />} />  
            <Route path="/signup" element={<Signup />} />  
            <Route path="/create-blog" element={<CreateBlog addBlogInstantly={addBlogInstantly} />} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
