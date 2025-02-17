import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBlog = ({ addBlogInstantly }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');

        try {
            const response = await fetch("http://127.0.0.1:8000/api/blogs/create/", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Blog created successfully!');
                addBlogInstantly(data); // Add new blog to Home without reloading
                navigate('/');
            } else {
                setError(data.error || 'Failed to create blog');
            }
        } catch (error) {
            setError('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="create-blog-container">
            <div className="editor-header">
                <button className="publish-btn" onClick={handleSubmit}>Publish</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="editor">
                    <input 
                        type="text" 
                        className="title-input" 
                        placeholder="Title" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea 
                        className="content-input" 
                        placeholder="Tell your story..." 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
