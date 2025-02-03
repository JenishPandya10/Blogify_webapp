import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Import the styles

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blog posts from Django API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/posts/")
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">Blogify</h1>
        <input type="text" placeholder="Search" className="search-bar" />
        <button className="write-btn">Write</button>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Blog List */}
        <section className="blog-list">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <article className="blog-card" key={blog.id}>
                <span className="category">{blog.category}</span>
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-desc">{blog.description}</p>
                <span className="blog-meta">Published on {new Date(blog.created_at).toDateString()}</span>
              </article>
            ))
          ) : (
            <p>No blog posts available.</p>
          )}
        </section>

        {/* Sidebar */}
        <aside className="sidebar">
          <h3>Staff Picks</h3>
          <ul>
            <li><Link to="#">A Comprehensive Review of Rolling Stone’s ‘500 Greatest Albums of All Time’</Link></li>
            <li><Link to="#">Notes on Twee</Link></li>
            <li><Link to="#">As a New Manager, I Thought Everything Was an Emergency</Link></li>
          </ul>
        </aside>
      </main>
    </div>
  );
};

export default Home;
