// import React, { useEffect, useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "../Home.css"; // Your styles

// const Home = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const handleLogout = useCallback(() => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     setIsAuthenticated(false);
//     setUser(null);
//     navigate("/login");
//     window.location.reload();
//   }, [navigate]);

//   const fetchUserData = useCallback(async () => {
//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       setIsAuthenticated(false);
//       return;
//     }

//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/auth/user/", {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setUser(data);
//         setIsAuthenticated(true);
//       } else {
//         handleLogout();
//       }
//     } catch (error) {
//       console.log("Error fetching user:", error);
//       handleLogout();
//     }
//   }, [handleLogout]);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/blogs/")
//       .then((res) => res.json())
//       .then((data) => setBlogs(data))
//       .catch((err) => console.log(err));

//     fetchUserData();
//   }, [fetchUserData]);

//   return (
//     <div className="home-container">
//       <header className="navbar">
//         <h1 className="logo">Blogify</h1>
//         <input type="text" placeholder="Search" className="search-bar" />

//         <div className="nav-buttons">
//           {isAuthenticated && user ? (
//             <>
//               <span className="profile-name">Hello, {user.username}!</span>
//               <Link to="/profile" className="profile-btn">Profile</Link>
//               <button onClick={handleLogout} className="logout-btn">Logout</button>
//             </>
//           ) : (
//             <Link to="/login" className="login-btn">Login</Link>
//           )}

//           {/* Show the "Write" button only if authenticated */}
//           {isAuthenticated && (
//             <Link to="/create-blog" className="write-btn">Write</Link>
//           )}
//         </div>
//       </header>

//       <main className="main-content">
//         <section className="blog-list">
//           {blogs.length > 0 ? (
//             blogs.map((blog) => (
//               <article key={blog.id} className="blog-card">
//                 <h2 className="blog-title">{blog.title}</h2>
//                 <p className="blog-desc">{blog.content.substring(0, 100)}...</p>
//                 <span className="blog-meta">{blog.created_at}</span>
//               </article>
//             ))
//           ) : (
//             <p>Loading blogs...</p>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated by checking the access token
  const checkAuthentication = () => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true); // User is logged in
    } else {
      setIsAuthenticated(false); // User is not logged in
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    // Check authentication when the page loads 
    checkAuthentication();

    // Fetch blogs
    fetch("http://127.0.0.1:8000/api/blogs/")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-container">
      <header className="navbar">
        <h1 className="logo">Blogify</h1>
        <input type="text" placeholder="Search" className="search-bar" />

        <div className="nav-buttons">
          {isAuthenticated ? (
            <>
              <span className="profile-name">Welcome!</span>
              <Link to="/profile" className="profile-btn">Profile</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
              {/* "Write" button only visible when authenticated */}
              <Link to="/CreateBlog" className="write-btn">Write</Link>
            </>
          ) : (
            <Link to="/login" className="login-btn">Login</Link>
          )}
        </div>
      </header>

      <main className="main-content">
        <section className="blog-list">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <article key={blog.id} className="blog-card">
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
