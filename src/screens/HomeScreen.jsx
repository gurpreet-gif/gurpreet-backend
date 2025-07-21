import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';

const SIZE_OPTIONS = {
    Small: 100,
    Medium: 180,
    Large: 250,
};

const HomeScreen = () => {
    const [profile, setProfile] = useState({
        profilePhoto: '',
        description: '',
        jobTitle: '',
        profilePhotoSize: SIZE_OPTIONS.Medium, // Default size
    });
    const [isEditingJobTitle, setIsEditingJobTitle] = useState(false);
    const [isEditingDescription, setIsEditingDescription] = useState(false);
    const [isEditingProfilePhotoSize, setIsEditingProfilePhotoSize] = useState(false);
    const [editedJobTitle, setEditedJobTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedProfilePhotoSize, setEditedProfilePhotoSize] = useState(SIZE_OPTIONS.Medium);

    const fileInputRef = useRef(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/api/profile');
                setProfile(data);
                setEditedJobTitle(data.jobTitle);
                setEditedDescription(data.description);
                setEditedProfilePhotoSize(data.profilePhotoSize || SIZE_OPTIONS.Medium); // Initialize with fetched size or default
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleSaveJobTitle = async () => {
        try {
            const { data } = await axios.post('/api/profile', { jobTitle: editedJobTitle });
            setProfile(data);
            setIsEditingJobTitle(false);
            alert('Job Title updated successfully!');
        } catch (error) {
            console.error('Error saving job title:', error);
            alert('Error saving job title.');
        }
    };

    const handleCancelJobTitle = () => {
        setEditedJobTitle(profile.jobTitle);
        setIsEditingJobTitle(false);
    };

    const handleSaveDescription = async () => {
        try {
            const { data } = await axios.post('/api/profile', { description: editedDescription });
            setProfile(data);
            setIsEditingDescription(false);
            alert('Description updated successfully!');
        } catch (error) {
            console.error('Error saving description:', error);
            alert('Error saving description.');
        }
    };

    const handleCancelDescription = () => {
        setEditedDescription(profile.description);
        setIsEditingDescription(false);
    };

    const handleSaveProfilePhotoSize = async () => {
        try {
            const { data } = await axios.post('/api/profile', { profilePhotoSize: editedProfilePhotoSize });
            setProfile(data);
            setIsEditingProfilePhotoSize(false);
            alert('Profile photo size updated successfully!');
        } catch (error) {
            console.error('Error saving profile photo size:', error);
            alert('Error saving profile photo size.');
        }
    };

    const handleCancelProfilePhotoSize = () => {
        setEditedProfilePhotoSize(profile.profilePhotoSize);
        setIsEditingProfilePhotoSize(false);
    };

    const handlePhotoChange = async (filePath) => {
        try {
            const { data } = await axios.post('/api/profile', { profilePhoto: filePath });
            setProfile(data);
            alert('Profile photo updated successfully!');
        } catch (error) {
            console.error('Error updating profile photo:', error);
            alert('Error updating profile photo.');
        }
    };

    const handleRemovePhoto = async () => {
        try {
            const { data } = await axios.post('/api/profile', { profilePhoto: '' }); // Set photo to empty string
            setProfile(data);
            alert('Profile photo removed successfully!');
        } catch (error) {
            console.error('Error removing profile photo:', error);
            alert('Error removing profile photo.');
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    // Helper to get size name from pixel value
    const getSizeName = (sizePx) => {
        for (const name in SIZE_OPTIONS) {
            if (SIZE_OPTIONS[name] === sizePx) {
                return name;
            }
        }
        return `${sizePx}px`; // Fallback if not a predefined size
    };

    return (
        <div className="container pt-4">
            <div className="row align-items-center">
                {/* Right Column: Profile Photo and Buttons */}
                <div className="col-md-4 text-center d-flex flex-column align-items-center justify-content-center mb-3">
                    <div className="position-relative d-inline-block">
                        <div onClick={triggerFileInput} style={{ cursor: 'pointer' }}>
                            {profile.profilePhoto ? (
                                <img
                                    src={`http://localhost:5000${profile.profilePhoto}`}
                                    alt="Profile"
                                    className="img-fluid rounded-circle border border-secondary"
                                    style={{ width: `${profile.profilePhotoSize}px`, height: `${profile.profilePhotoSize}px`, objectFit: 'cover' }}
                                />
                            ) : (
                                <div
                                    className="bg-secondary rounded-circle d-flex justify-content-center align-items-center border border-secondary"
                                    style={{ width: `${profile.profilePhotoSize}px`, height: `${profile.profilePhotoSize}px`, margin: '0 auto' }}
                                >
                                    <span className="text-white fs-1">+</span>
                                </div>
                            )}
                        </div>
                        {/* Hidden file input */}
                        <ProfilePhotoUpload onPhotoChange={handlePhotoChange} fileInputRef={fileInputRef} />
                    </div>

                    {/* Profile Photo Size Adjustment */}
                    <div className="d-flex align-items-center justify-content-center mt-3">
                        {isEditingProfilePhotoSize ? (
                            <select
                                className="form-select me-2"
                                value={editedProfilePhotoSize}
                                onChange={(e) => setEditedProfilePhotoSize(Number(e.target.value))}
                                style={{ width: '120px' }}
                            >
                                {Object.entries(SIZE_OPTIONS).map(([name, value]) => (
                                    <option key={name} value={value}>{name}</option>
                                ))}
                            </select>
                        ) : (
                            <p className="mb-0 me-2">Size: {getSizeName(profile.profilePhotoSize)}</p>
                        )}
                        {isEditingProfilePhotoSize ? (
                            <>
                                <button className="btn btn-sm btn-success me-1" onClick={handleSaveProfilePhotoSize}>Save</button>
                                <button className="btn btn-sm btn-secondary" onClick={handleCancelProfilePhotoSize}>Cancel</button>
                            </>
                        ) : (
                            <button className="btn btn-sm btn-light" onClick={() => setIsEditingProfilePhotoSize(true)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        )}
                    </div>
                    {/* Buttons container */}
                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-danger me-2" onClick={handleRemovePhoto} disabled={!profile.profilePhoto}>Remove Photo</button>
                        <button className="btn btn-primary" onClick={triggerFileInput}>Select Photo</button>
                    </div>
                </div>

                {/* Left Column: Job Title and Description */}
                <div className="col-md-8 text-md-start text-center mb-4 mb-md-0">
                    <div className="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
                        {isEditingJobTitle ? (
                            <input
                                type="text"
                                className="form-control me-2"
                                value={editedJobTitle}
                                onChange={(e) => setEditedJobTitle(e.target.value)}
                            />
                        ) : (
                            <h2 className="mb-0 me-2">{profile.jobTitle || 'Your Job Title'}</h2>
                        )}
                        {isEditingJobTitle ? (
                            <>
                                <button className="btn btn-sm btn-success me-1" onClick={handleSaveJobTitle}>Save</button>
                                <button className="btn btn-sm btn-secondary" onClick={handleCancelJobTitle}>Cancel</button>
                            </>
                        ) : (
                            <button className="btn btn-sm btn-light" onClick={() => setIsEditingJobTitle(true)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        )}
                    </div>

                    <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                        {isEditingDescription ? (
                            <textarea
                                className="form-control me-2"
                                rows="3"
                                value={editedDescription}
                                onChange={(e) => setEditedDescription(e.target.value)}
                            ></textarea>
                        ) : (
                            <p className="lead mb-0 me-2">{profile.description || 'Your description goes here.'}</p>
                        )}
                        {isEditingDescription ? (
                            <>
                                <button className="btn btn-sm btn-success me-1" onClick={handleSaveDescription}>Save</button>
                                <button className="btn btn-sm btn-secondary" onClick={handleCancelDescription}>Cancel</button>
                            </>
                        ) : (
                            <button className="btn btn-sm btn-light" onClick={() => setIsEditingDescription(true)}>
                                <FontAwesomeIcon icon={faEdit} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;
