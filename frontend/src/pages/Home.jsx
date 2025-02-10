import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/blogs/")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));

    // Check user authentication status
    const token = localStorage.getItem("access_token");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsAuthenticated(false);
    window.location.href = "/login"; // Redirect to login after logout
  };

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">Blogify</h1>
        <input type="text" placeholder="Search" className="search-bar" />

        <div className="nav-buttons">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="profile-btn">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
          <Link to="/create-blog" className="write-btn">Write</Link>
        </div>
      </header>

      {/* Main Content */}
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

        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Staff Picks</h3>
          <ul>
            <li>A Comprehensive Review of Rolling Stone’s ‘500 Greatest Albums of All Time’</li>
            <li>Notes on Twee</li>
            <li>As a New Manager, I Thought Everything Was an Emergency</li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default Home;
