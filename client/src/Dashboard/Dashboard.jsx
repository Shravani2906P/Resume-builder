import './Dashboard.css';
import { Link } from 'react-router-dom';
import Template1 from '../assets/Template1.jpeg';
import Template2 from '../assets/Template2.webp';
import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function Dashboard() {
  const [modalImg, setModalImg] = useState(null);
  const [savedResumes, setSavedResumes] = useState([]);
  const [viewResume, setViewResume] = useState(null);
  const previewRef = useRef();

  useEffect(() => {
    const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    setSavedResumes(resumes);
  }, []);

  const handleView = (img) => setModalImg(img);
  const closeModal = (e) => {
    if (e.target.className === 'img-modal-overlay' || e.target.className === 'img-modal-close') setModalImg(null);
  };

  // View saved resume modal
  const openResumeModal = (resume) => setViewResume(resume);
  const closeResumeModal = (e) => {
    if (e.target.className === 'resume-modal-overlay' || e.target.className === 'resume-modal-close') setViewResume(null);
  };

  // Download PDF for saved resume (now triggered from inside modal)
  const downloadPDF = async () => {
    if (previewRef.current && viewResume) {
      const canvas = await html2canvas(previewRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight > pageHeight ? pageHeight : pdfHeight);
      pdf.save(`${viewResume.name || 'resume'}.pdf`);
    }
  };

  return (
    <div className="dashboard-container" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <header className="dashboard-header">
        <div className="logo">Resumify</div>
        <Link to="/builder">
           <button className="create-btn">+ Create New Resume</button>
        </Link>
      </header>

      <section className="resume-grid">
        {[1, 2].map((item, idx) => (
          <div key={item} className="resume-card">
            {idx === 0 && <img src={Template1} alt="Template 1" className="template-img" />}
            {idx === 1 && <img src={Template2} alt="Template 2" className="template-img" />}
            <h3>Template #{item}</h3>
            <div className="actions">
              <button onClick={() => handleView(idx === 0 ? Template1 : Template2)}>View</button>
              <button>Download</button>
              <Link to="/builder"><button>Edit</button></Link>
            </div>
          </div>
        ))}
        {/* Saved resumes from localStorage */}
        {savedResumes.map((resume, idx) => (
          <div key={resume.name + idx} className="resume-card">
            <img src={Template1} alt="Resume" className="template-img" />
            <h3>{resume.name}</h3>
            <div className="actions">
              <button onClick={() => openResumeModal(resume)}>View</button>
              <button onClick={() => openResumeModal(resume)}>Download</button>
              <Link to={`/builder?id=${resume.id}`}><button>Edit</button></Link>
            </div>
          </div>
        ))}
      </section>

      {modalImg && (
        <div className="img-modal-overlay" onClick={closeModal}>
          <div className="img-modal-content">
            <button className="img-modal-close" onClick={closeModal}>&times;</button>
            <img src={modalImg} alt="Template Preview" className="img-modal-img" />
          </div>
        </div>
      )}

      {/* Resume View Modal */}
      {viewResume && (
        <div className="resume-modal-overlay" onClick={closeResumeModal}>
          <div className="resume-modal-content">
            <button className="resume-modal-close" onClick={closeResumeModal}>&times;</button>
            <div ref={previewRef} className="resume-preview-box" style={{margin:0}}>
              <div className="resume-header">
                <h1>{viewResume.details?.name || 'Your Name'}</h1>
                <div className="resume-contact">
                  {viewResume.details?.email && <span style={{color: '#222'}}>&#9993; {viewResume.details.email}</span>}
                  {viewResume.details?.phone && <span style={{color: '#222'}}>&#128222; {viewResume.details.phone}</span>}
                  {viewResume.details?.location && <span style={{color: '#222'}}>&#128205; {viewResume.details.location}</span>}
                </div>
                {viewResume.socials?.length > 0 && (
                  <div className="resume-socials">
                    {viewResume.socials.map((soc, i) => (
                      <span key={i}>
                        {soc.github && <span style={{marginRight: '12px'}}>
                          <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style={{verticalAlign: 'middle'}}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
                          <a href={soc.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>}
                        {soc.linkedin && <span>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle'}}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.599v5.597z"/></svg>
                          <a href={soc.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {viewResume.education?.length > 0 && (
                <div className="resume-section">
                  <h2>Education</h2>
                  <hr className="resume-divider" />
                  <ul>
                    {viewResume.education.map((edu, i) => (
                      <li key={i}>
                        <strong>{edu.degree}</strong>, {edu.school} <span className="resume-year">({edu.from} - {edu.till}{edu.cgpa ? `, CGPA: ${edu.cgpa}` : ''})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {viewResume.experience?.length > 0 && (
                <div className="resume-section">
                  <h2>Experience</h2>
                  <hr className="resume-divider" />
                  <ul>
                    {viewResume.experience.map((exp, i) => (
                      <li key={i}><strong>{exp.role}</strong>, {exp.company} <span className="resume-year">({exp.duration})</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {viewResume.projects?.length > 0 && (
                <div className="resume-section">
                  <h2>Projects</h2>
                  <hr className="resume-divider" />
                  <ul>
                    {viewResume.projects.map((proj, i) => (
                      <li key={i}>
                        <strong>{proj.title}</strong>: {proj.desc}
                        {proj.preview && (
                          proj.preview.match(/\.(jpeg|jpg|gif|png|svg)$/i)
                            ? <img src={proj.preview} alt="preview" style={{maxWidth:'40px',maxHeight:'40px',marginLeft:'8px',verticalAlign:'middle',borderRadius:'4px'}} />
                            : <a href={proj.preview} target="_blank" rel="noopener noreferrer" style={{marginLeft:'8px'}}>Preview</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {viewResume.skills?.length > 0 && (
                <div className="resume-section">
                  <h2>Skills</h2>
                  <hr className="resume-divider" />
                  <ul className="resume-skills">
                    {viewResume.skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
              {viewResume.customSections?.length > 0 && viewResume.customSections.map((section, idx) => (
                <div className="resume-section" key={idx}>
                  <h2>{section.name}</h2>
                  <hr className="resume-divider" />
                  {section.entries.map((entry, entryIdx) => (
                    <div key={entryIdx} style={{ marginBottom: '10px' }}>
                      <strong>{entry.title}</strong>
                      <div>{entry.description}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button className="download-pdf-btn" onClick={downloadPDF} style={{marginTop: '18px'}}>Download PDF</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;