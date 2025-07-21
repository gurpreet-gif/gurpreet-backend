import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SkillsScreen = () => {
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditingAllSkills, setIsEditingAllSkills] = useState(false);
    const [tempSkills, setTempSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get('/api/profile');
                if (res.data) {
                    setSkills(res.data.skills || []);
                    setTempSkills(res.data.skills || []); // Initialize tempSkills
                } else {
                    setSkills([]);
                    setTempSkills([]);
                }
            } catch (err) {
                setError('Failed to fetch skills.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSkills();
    }, []);

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (newSkill.trim() === '') return;

        const updatedSkills = [...skills, newSkill.trim()];
        try {
            const res = await axios.post('/api/profile', { skills: updatedSkills });
            setSkills(res.data.skills || []);
            setTempSkills(res.data.skills || []); // Update tempSkills after adding
            setNewSkill('');
        } catch (err) {
            setError('Failed to add skill.');
            console.error(err);
        }
    };

    const handleEditAllClick = () => {
        setIsEditingAllSkills(true);
        setTempSkills([...skills]); // Copy current skills to temp for editing
    };

    const handleSkillChange = (index, value) => {
        const updatedTempSkills = [...tempSkills];
        updatedTempSkills[index] = value;
        setTempSkills(updatedTempSkills);
    };

    const handleSaveAllSkills = async () => {
        try {
            const res = await axios.post('/api/profile', { skills: tempSkills.filter(skill => skill.trim() !== '') });
            setSkills(res.data.skills || []);
            setTempSkills(res.data.skills || []); // Update tempSkills after saving
            setIsEditingAllSkills(false);
        } catch (err) {
            setError('Failed to save skills.');
            console.error(err);
        }
    };

    if (loading) return <div className="container text-center mt-5">Loading skills...</div>;
    if (error) return <div className="container text-center mt-5 text-danger">Error: {error}</div>;

    return (
        <div className="container d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
            <h1>My Skills</h1>
            <div className="mt-4 w-100">
                {skills.length > 0 ? (
                    <div className="row justify-content-center">
                        {skills.map((skill, index) => (
                            <div key={index} className="col-md-4 col-sm-6 mb-3">
                                <div className="card bg-light shadow-sm">
                                    <div className="card-body">
                                        {isEditingAllSkills ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={tempSkills[index] || ''}
                                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                            />
                                        ) : (
                                            <h5 className="card-title text-dark">{skill}</h5>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No skills added yet.</p>
                )}
            </div>
            <form onSubmit={handleAddSkill} className="mt-4 w-50">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add new skill"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                    />
                    <button className="btn btn-primary" type="submit">Add Skill</button>
                    {skills.length > 0 && (
                        isEditingAllSkills ? (
                            <button className="btn btn-success ms-2" type="button" onClick={handleSaveAllSkills}>Save All Skills</button>
                        ) : (
                            <button className="btn btn-info ms-2" type="button" onClick={handleEditAllClick}>Edit Skills</button>
                        )
                    )}
                </div>
            </form>
        </div>
    );
};

export default SkillsScreen;
