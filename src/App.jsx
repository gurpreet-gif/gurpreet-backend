import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // For custom styles

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import ProjectsScreen from './screens/ProjectsScreen';
import SkillsScreen from './screens/SkillsScreen';
import ContactScreen from './screens/ContactScreen';
import ReviewsScreen from './screens/ReviewsScreen';

import { ThemeProvider } from './context/ThemeProvider.jsx';

function App() {
    return (
        <ThemeProvider>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <div className="hero">
                    <div className="hero-content">
                        <h1>Gurpreet Singh</h1>
                        <p>Software Engineer | Web Developer</p>
                    </div>
                </div>
                <main className="py-3 flex-grow-1">
                    <div id="home">
                        <HomeScreen />
                    </div>
                    <div id="about">
                        <AboutScreen />
                    </div>
                    <div id="projects">
                        <ProjectsScreen />
                    </div>
                    <div id="skills">
                        <SkillsScreen />
                    </div>
                    <div id="contact">
                        <ContactScreen />
                    </div>
                    <div id="reviews">
                        <ReviewsScreen />
                    </div>
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default App;
