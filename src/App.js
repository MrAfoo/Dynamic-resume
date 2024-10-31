import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Form from './components/Form';
import Resume from './components/Resume';
import './App.css'; 

const App = () => {
    const [resumes, setResumes] = useState({});

    useEffect(() => {
        const storedResumes = JSON.parse(localStorage.getItem('resumes')) || {};
        setResumes(storedResumes);
    }, []);

    const handleCreateResume = (username, resumeData) => {
        const updatedResumes = { ...resumes, [username]: resumeData };
        setResumes(updatedResumes);
        localStorage.setItem('resumes', JSON.stringify(updatedResumes));
    };

    const handleEditResume = (username) => {
        return resumes[username];
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/form" />} />
                <Route path="/form" element={<Form onCreateResume={handleCreateResume} />} />
                <Route path="/resume/:username" element={<Resume resumes={resumes} onEditResume={handleEditResume} />} />
            </Routes>
        </Router>
    );
};

export default App;
