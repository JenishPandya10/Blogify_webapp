import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/blogs/")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));

    // Check authentication
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/user/", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.log("Failed to fetch user data");
      }
    } catch (error) {
      console.log("Error fetching user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    setUser(null);
    navigate("/login");
    window.location.reload(); // Ensure navbar updates after logout
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <h1 className="logo">Blogify</h1>
        <input type="text" placeholder="Search" className="search-bar" />

        <div className="nav-buttons">
          {isAuthenticated && user ? (
            <>
              <span className="profile-name">Hello, {user.username}!</span>
              <Link to="/profile" className="profile-btn">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
          {isAuthenticated && (
            <Link to="/create-blog" className="write-btn">Write</Link>
          )}
        </div>
      </header>

      <main className="main-content">
        <section className="blog-list">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <article key={blog.id} className="blog-card">
                <span className="category">{blog.category}</span>
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-desc">{blog.content.substring(0, 100)}...</p>
                <span className="blog-meta">{blog.created_at}</span>
              </article>
            ))
          ) : (
            <p>Loading blogs...</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
