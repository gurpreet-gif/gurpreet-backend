import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutScreen = () => {
    const [aboutContent, setAboutContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState('');

    useEffect(() => {
        const fetchAboutContent = async () => {
            try {
                const { data } = await axios.get('/api/about');
                setAboutContent(data.content);
                setEditedContent(data.content);
            } catch (error) {
                console.error('Error fetching about content:', error);
            }
        };
        fetchAboutContent();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const { data } = await axios.post('/api/about', { content: editedContent });
            setAboutContent(data.content);
            setIsEditing(false);
            alert('About content updated successfully!');
        } catch (error) {
            console.error('Error saving about content:', error);
            alert('Error saving about content.');
        }
    };

    const handleCancel = () => {
        setEditedContent(aboutContent); // Revert to original content
        setIsEditing(false);
    };

    return (
        <div className="container pt-4">
            <h1 className="text-center">About Me</h1>
            {isEditing ? (
                <div className="text-center">
                    <textarea
                        className="form-control mb-3"
                        rows="10"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                    ></textarea>
                    <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
                    <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div className="text-center">
                    <p className="lead">
                        {aboutContent}
                    </p>
                    <button className="btn btn-info" onClick={handleEdit}>Edit Text</button>
                </div>
            )}
        </div>
    );
};

export default AboutScreen;
