import React from 'react';
import axios from 'axios';

const ProfilePhotoUpload = ({ onPhotoChange, fileInputRef }) => {

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('profileImage', file);

            try {
                const response = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                onPhotoChange(response.data.filePath); // Pass the uploaded file path to parent
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('Error uploading image.');
            }
        }
    };

    return (
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: 'none' }} // Hide the input
        />
    );
};

export default ProfilePhotoUpload;