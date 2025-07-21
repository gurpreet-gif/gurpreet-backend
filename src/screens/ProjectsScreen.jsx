import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from '../components/ProjectCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ProjectsScreen = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        link: '',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const { data } = await axios.get('/api/projects');
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/projects', newProject);
            setNewProject({
                title: '',
                description: '',
                link: '',
            });
            fetchProjects(); // Refresh projects list
        } catch (error) {
            console.error('Error adding project:', error);
        }
    };

    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`/api/projects/${id}`);
            fetchProjects(); // Refresh projects list
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    

    return (
        <div className="container pt-4">
            <h1 className="text-start">My Projects</h1>

            <div className="card p-4 mb-4">
                <h2 className="text-center mb-4">Add New Project</h2>
                <form onSubmit={handleAddProject}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={newProject.title}
                            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            rows="3"
                            value={newProject.description}
                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="link" className="form-label">Link</label>
                        <input
                            type="url"
                            className="form-control"
                            id="link"
                            value={newProject.link}
                            onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary"><FontAwesomeIcon icon={faPlus} className="me-2" /> Add Project</button>
                </form>
            </div>

            <div className="row justify-content-center">
                {projects.map((project) => (
                    <div key={project._id} className="col-md-6 mb-4">
                        <ProjectCard
                            title={project.title}
                            description={project.description}
                            link={project.link}
                            handleDelete={() => handleDeleteProject(project._id)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectsScreen;
