import React from 'react';

const ContactScreen = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: 'calc(100vh - 150px)' }}>
            <h1 className="mb-4">Contact Me</h1>
            <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '100%' }}>
                <div className="mb-3">
                    <h5><i className="fab fa-instagram me-2"></i> Instagram:</h5>
                    <p><a href="https://www.instagram.com/its_ramgarhia.07?igsh=Mnk3dHNsM282cTkw" target="_blank" rel="noopener noreferrer">its_ramgarhia.07</a></p>
                </div>
                <div className="mb-3">
                    <h5><i className="fab fa-facebook me-2"></i> Facebook:</h5>
                    <p><a href="https://www.facebook.com/share/14FH9XubmyH/" target="_blank" rel="noopener noreferrer">Gurpreet Singh</a></p>
                </div>
                <div className="mb-3">
                    <h5><i className="fas fa-envelope me-2"></i> Email:</h5>
                    <p><a href="mailto:gurpreetvilkhu80@gmail.com">gurpreetvilkhu80@gmail.com</a></p>
                </div>
                <div className="mb-3">
                    <h5><i className="fas fa-phone me-2"></i> Phone:</h5>
                    <p><a href="tel:+918569086202">+91 85690 86202</a></p>
                </div>
            </div>
        </div>
    );
};

export default ContactScreen;
