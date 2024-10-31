
import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleCreateResume = () => {
        navigate('/form'); // Redirect to the form page
    };

    return (
        <div className="welcome-page">
            <h1>Welcome to Resume Builder</h1>
            <button className="create-resume-button" onClick={handleCreateResume}>
                Create Resume
            </button>
        </div>
    );
};

export default WelcomePage;
