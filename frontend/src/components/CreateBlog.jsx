import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CreateBlog.css';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access');

        try {
            const response = await fetch('http://127.0.0.1:8000/blogs/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, content }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Blog created successfully!');
                navigate('/');
            } else {
                setError(data.error || 'Failed to create blog');
            }
        } catch (error) {
            setError('Something went wrong. Try again.');
        }
    };

    return (
        <div className="create-blog-container">
            <div className="editor-header">
                <button className="publish-btn" onClick={handleSubmit}>Publish</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <div className="editor">
                <input 
                    type="text" 
                    className="title-input" 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea 
                    className="content-input" 
                    placeholder="Tell your story..." 
                    value={content} 
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>
        </div>
    );
};

export default CreateBlog;
