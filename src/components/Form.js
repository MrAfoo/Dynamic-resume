
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Form = ({ onCreateResume }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [education, setEducation] = useState('');
    const [workExperience, setWorkExperience] = useState('');
    const [skills, setSkills] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

   
    useEffect(() => {
        if (location.state) {
            const { name, email, username, education, workExperience, skills } = location.state;
            setName(name);
            setEmail(email);
            setUsername(username);
            setEducation(education);
            setWorkExperience(workExperience);
            setSkills(skills);
        }
    }, [location.state]);

    const handleSubmit = (e) => {
        e.preventDefault(); 
        const resumeData = { name, email, username, education, workExperience, skills };
        onCreateResume(username, resumeData);
        navigate(`/resume/${username}`);
    };

    return (
        <div className="form-container">
            <h1>Create Your Resume</h1>
            <form onSubmit={handleSubmit}>
                <div className="personal-info-section">
                    <h2>Personal Information</h2>
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <hr className="separator" />
                </div>
                <div className="education-section">
                    <h2>Education</h2>
                    <textarea
                        placeholder="Enter your education details"
                        value={education}
                        onChange={(e) => setEducation(e.target.value)}
                        required
                    />
                </div>
                <div className="work-experience-section">
                    <h2>Work Experience</h2>
                    <textarea
                        placeholder="Enter your work experience details"
                        value={workExperience}
                        onChange={(e) => setWorkExperience(e.target.value)}
                        required
                    />
                </div>
                <div className="skills-section">
                    <h2>Skills</h2>
                    <textarea
                        placeholder="Enter your skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="create-resume-button">
                    {location.state ? 'Update Resume' : 'Create Resume'}
                </button>
            </form>
        </div>
    );
};

export default Form;
