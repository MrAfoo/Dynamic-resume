
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2pdf from 'html-to-pdf-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faGraduationCap, faBriefcase, faUser, faLink, faTools} from '@fortawesome/free-solid-svg-icons';

const Resume = ({ resumes, onEditResume }) => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [resumeData, setResumeData] = useState(null);

    useEffect(() => {
        if (resumes[username]) {
            setResumeData(resumes[username]);
        }
    }, [username, resumes]);

    const downloadPDF = () => {
        const element = document.getElementById('resume');
        html2pdf()
            .from(element)
            .save(`${resumeData.name}_resume.pdf`);
    };

    const handleEditClick = () => {
        const existingResumeData = onEditResume(username);
        navigate('/form', { state: { ...existingResumeData, username } });
    };

    const handleShareLink = () => {
        const shareableLink = `${window.location.origin}/resume/${username}`;
        navigator.clipboard.writeText(shareableLink)
            .then(() => alert('Shareable link copied to clipboard!'))
            .catch(err => console.error('Failed to copy: ', err));
    };

    if (!resumeData) return <p>Loading...</p>;

    return (
        <div id="resume">
            <header className="resume-header">
                <h1><FontAwesomeIcon icon={faUser} /> {resumeData.name}'s Resume</h1>
                <p><FontAwesomeIcon icon={faUser} /> {resumeData.name}</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> {resumeData.email}</p>
                
            </header>

            <h2 className="section-title"><FontAwesomeIcon icon={faGraduationCap} /> Education</h2>
            <p>{resumeData.education}</p>
            <hr />

            <h2 className="section-title"><FontAwesomeIcon icon={faBriefcase} /> Work Experience</h2>
            <p>{resumeData.workExperience}</p>
            <hr />

            <h2 className="section-title">
    <FontAwesomeIcon icon={faTools} /> Skills
</h2>
            <p>{resumeData.skills}</p>

            <div className="button-group">
                <button onClick={downloadPDF}>Download PDF</button>
                <button onClick={handleEditClick}>Edit Resume</button>
                <button onClick={handleShareLink}><FontAwesomeIcon icon={faLink} /> Share Link</button>
            </div>
        </div> 
    );
};

export default Resume;
