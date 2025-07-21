import React from 'react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const togglerRef = React.useRef(null);
    const collapseRef = React.useRef(null);

    const handleNavLinkClick = () => {
        if (collapseRef.current.classList.contains('show')) {
            togglerRef.current.click();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#home">My Portfolio</a>
                <button ref={togglerRef} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div ref={collapseRef} className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#home" onClick={handleNavLinkClick}>Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#about" onClick={handleNavLinkClick}>About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#projects" onClick={handleNavLinkClick}>Projects</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#skills" onClick={handleNavLinkClick}>Skills</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contact" onClick={handleNavLinkClick}>Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#reviews" onClick={handleNavLinkClick}>Reviews</a>
                        </li>
                        <li className="nav-item">
                            <ThemeToggle />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
