import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const ProjectCard = ({ title, description, link, handleDelete }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <div className="d-flex justify-content-start">
                    {link && (
                        <a href={link} className="btn btn-primary me-2" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faExternalLinkAlt} className="me-2" /> View Project
                        </a>
                    )}
                    <button className="btn btn-danger" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTrash} className="me-2" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
