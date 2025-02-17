import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/blogs/${id}/`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!blog) return <p>Loading...</p>;
  

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
    </div>
  );
};

export default BlogDetail;
