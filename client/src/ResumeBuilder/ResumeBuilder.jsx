import React, { useState } from 'react';
import './ResumeBuilder.css';
import { useLocation } from 'react-router-dom';

function ResumeBuilder() {
  // Main details state
  const [details, setDetails] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });

  // Section states
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  // Socials state
  const [socials, setSocials] = useState([]);
  // Custom sections state (now supports multiple entries per section)
  const [customSections, setCustomSections] = useState([]); // [{name, entries: [{title, description}]}]
  const [addingSection, setAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [customEntryForms, setCustomEntryForms] = useState({}); // {sectionIdx: {title, description}}

  // Dropdown open/close state
  const [openSection, setOpenSection] = useState('');

  // Temp form states for each section
  const [eduForm, setEduForm] = useState({ school: '', degree: '', from: '', till: '', cgpa: '' });
  const [expForm, setExpForm] = useState({ company: '', role: '', duration: '' });
  const [projForm, setProjForm] = useState({ title: '', desc: '', preview: '' });
  const [skillInput, setSkillInput] = useState('');
  // Socials state
  const [socialForm, setSocialForm] = useState({ github: '', linkedin: '' });
  // Custom sections state
  const [customForm, setCustomForm] = useState({ title: '', description: '' });
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [resumeName, setResumeName] = useState('');

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const editingId = query.get('id');

  // Load resume for editing if id is present
  React.useEffect(() => {
    if (editingId) {
      const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      const found = resumes.find(r => r.id === editingId);
      if (found) {
        setDetails(found.details || {});
        setEducation(found.education || []);
        setExperience(found.experience || []);
        setProjects(found.projects || []);
        setSkills(found.skills || []);
        setSocials(found.socials || []);
        setCustomSections(found.customSections || []);
      }
    }
  }, [editingId]);

  // Handlers for main details
  const handleDetailChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  // Handlers for dropdowns
  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  // Handlers for Education
  const handleEduChange = (e) => {
    setEduForm({ ...eduForm, [e.target.name]: e.target.value });
  };
  const addEducation = (e) => {
    e.preventDefault();
    if (eduForm.school && eduForm.degree && eduForm.from && eduForm.till) {
      setEducation([...education, eduForm]);
      setEduForm({ school: '', degree: '', from: '', till: '', cgpa: '' });
    }
  };

  // Handlers for Experience
  const handleExpChange = (e) => {
    setExpForm({ ...expForm, [e.target.name]: e.target.value });
  };
  const addExperience = (e) => {
    e.preventDefault();
    if (expForm.company && expForm.role && expForm.duration) {
      setExperience([...experience, expForm]);
      setExpForm({ company: '', role: '', duration: '' });
    }
  };

  // Handlers for Projects
  const handleProjChange = (e) => {
    setProjForm({ ...projForm, [e.target.name]: e.target.value });
  };
  const addProject = (e) => {
    e.preventDefault();
    if (projForm.title && projForm.desc) {
      setProjects([...projects, projForm]);
      setProjForm({ title: '', desc: '', preview: '' });
    }
  };

  // Handlers for Skills
  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  // Socials handlers
  const handleSocialChange = (e) => {
    setSocialForm({ ...socialForm, [e.target.name]: e.target.value });
  };
  const addSocial = (e) => {
    e.preventDefault();
    if (socialForm.github || socialForm.linkedin) {
      setSocials([...socials, { ...socialForm }]);
      setSocialForm({ github: '', linkedin: '' });
    }
  };
  const deleteSocial = (idx) => setSocials(socials.filter((_, i) => i !== idx));

  // Custom sections handlers
  const handleCustomChange = (e) => {
    setCustomForm({ ...customForm, [e.target.name]: e.target.value });
  };
  const addCustomSection = (e) => {
    e.preventDefault();
    if (customForm.title && customForm.description) {
      setCustomSections([...customSections, { ...customForm }]);
      setCustomForm({ title: '', description: '' });
    }
  };
  // Add a new custom section
  const handleAddSection = () => {
    if (newSectionName.trim()) {
      setCustomSections([...customSections, { name: newSectionName.trim(), entries: [] }]);
      setNewSectionName('');
      setAddingSection(false);
    }
  };
  // Remove a custom section
  const deleteCustomSection = (idx) => {
    const updated = [...customSections];
    updated.splice(idx, 1);
    setCustomSections(updated);
    // Remove entry form state for this section
    const forms = { ...customEntryForms };
    delete forms[idx];
    setCustomEntryForms(forms);
  };
  // Add entry to a custom section
  const addCustomEntry = (idx) => {
    const form = customEntryForms[idx] || { title: '', description: '' };
    if (form.title && form.description) {
      const updated = [...customSections];
      updated[idx].entries.push({ ...form });
      setCustomSections(updated);
      setCustomEntryForms({ ...customEntryForms, [idx]: { title: '', description: '' } });
    }
  };
  // Remove entry from a custom section
  const deleteCustomEntry = (sectionIdx, entryIdx) => {
    const updated = [...customSections];
    updated[sectionIdx].entries.splice(entryIdx, 1);
    setCustomSections(updated);
  };

  // Add delete handlers for each section
  const deleteEducation = (idx) => setEducation(education.filter((_, i) => i !== idx));
  const deleteExperience = (idx) => setExperience(experience.filter((_, i) => i !== idx));
  const deleteProject = (idx) => setProjects(projects.filter((_, i) => i !== idx));
  const deleteSkill = (idx) => setSkills(skills.filter((_, i) => i !== idx));

  // Skill suggestions
  const skillSuggestions = [
    'React', 'JavaScript', 'Python', 'CSS', 'HTML', 'Node.js', 'TypeScript', 'Java', 'C++', 'SQL', 'Git', 'Redux', 'Figma', 'Tailwind', 'Express', 'MongoDB', 'Django', 'Flutter', 'AWS', 'Docker'
  ];

  // Add skill from suggestion
  const addSuggestedSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  // SVG icons
  const githubIcon = (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" style={{verticalAlign: 'middle'}}><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.01.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.11.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.19 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>
  );
  const linkedinIcon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{verticalAlign: 'middle'}}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.036 0 3.6 2.001 3.6 4.599v5.597z"/></svg>
  );

  // Save to Dashboard handler
  const handleSave = () => {
    setShowSavePrompt(true);
  };
  const confirmSave = () => {
    if (!resumeName.trim()) return;
    const resumeData = {
      id: editingId || (Date.now() + '-' + Math.random().toString(36).substr(2, 9)),
      name: resumeName.trim(),
      details,
      education,
      experience,
      projects,
      skills,
      socials,
      customSections
    };
    let prev = JSON.parse(localStorage.getItem('resumes') || '[]');
    if (editingId) {
      prev = prev.map(r => r.id === editingId ? resumeData : r);
    } else {
      prev.push(resumeData);
    }
    localStorage.setItem('resumes', JSON.stringify(prev));
    setShowSavePrompt(false);
    setResumeName('');
    alert('Resume saved to dashboard!');
  };
  const cancelSave = () => {
    setShowSavePrompt(false);
    setResumeName('');
  };

  return (
    <div className="resume-builder" style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <header className="builder-header">
        <button className="back-button">← Back</button>
        <h2>Resume Builder</h2>
      </header>

      <div className="builder-body">
        <div className="left-form">
          <h3>Enter Details</h3>
          <input name="name" type="text" placeholder="Name" value={details.name} onChange={handleDetailChange} />
          <input name="email" type="email" placeholder="Email" value={details.email} onChange={handleDetailChange} />
          <input name="phone" type="number" placeholder="Phone" value={details.phone} onChange={handleDetailChange} />
          <input name="location" type="text" placeholder="Location" value={details.location} onChange={handleDetailChange} />

          {/* Education Dropdown */}
          <button type="button" onClick={() => toggleSection('education')}>Education ▼</button>
          {openSection === 'education' && (
            <>
              <form className="section-form" onSubmit={addEducation}>
                <input name="school" type="text" placeholder="School/College" value={eduForm.school} onChange={handleEduChange} />
                <input name="degree" type="text" placeholder="Degree" value={eduForm.degree} onChange={handleEduChange} />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input name="from" type="text" placeholder="From (year)" value={eduForm.from} onChange={handleEduChange} style={{ flex: 1 }} />
                  <input name="till" type="text" placeholder="Till (year)" value={eduForm.till} onChange={handleEduChange} style={{ flex: 1 }} />
                </div>
                <input name="cgpa" type="text" placeholder="CGPA (optional)" value={eduForm.cgpa} onChange={handleEduChange} />
                <button type="submit">Add</button>
              </form>
              {education.length > 0 && (
                <ul className="form-list">
                  {education.map((edu, i) => (
                    <li key={i}>
                      <span>{edu.degree}, {edu.school} ({edu.from} - {edu.till}{edu.cgpa ? `, CGPA: ${edu.cgpa}` : ''})</span>
                      <button type="button" className="delete-btn" onClick={() => deleteEducation(i)} title="Delete">🗑️</button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* Experience Dropdown */}
          <button type="button" onClick={() => toggleSection('experience')}>Experience ▼</button>
          {openSection === 'experience' && (
            <>
              <form className="section-form" onSubmit={addExperience}>
                <input name="company" type="text" placeholder="Company" value={expForm.company} onChange={handleExpChange} />
                <input name="role" type="text" placeholder="Role" value={expForm.role} onChange={handleExpChange} />
                <input name="duration" type="text" placeholder="Duration" value={expForm.duration} onChange={handleExpChange} />
                <button type="submit">Add</button>
              </form>
              {experience.length > 0 && (
                <ul className="form-list">
                  {experience.map((exp, i) => (
                    <li key={i}>
                      <span>{exp.role}, {exp.company} ({exp.duration})</span>
                      <button type="button" className="delete-btn" onClick={() => deleteExperience(i)} title="Delete">🗑️</button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* Projects Dropdown */}
          <button type="button" onClick={() => toggleSection('projects')}>Projects ▼</button>
          {openSection === 'projects' && (
            <>
              <form className="section-form" onSubmit={addProject}>
                <input name="title" type="text" placeholder="Project Title" value={projForm.title} onChange={handleProjChange} />
                <input name="desc" type="text" placeholder="Description" value={projForm.desc} onChange={handleProjChange} />
                <input name="preview" type="text" placeholder="Project Preview (link or image URL, optional)" value={projForm.preview} onChange={handleProjChange} />
                <button type="submit">Add</button>
              </form>
              {projects.length > 0 && (
                <ul className="form-list">
                  {projects.map((proj, i) => (
                    <li key={i}>
                      <span>
                        {proj.title}: {proj.desc}
                        {proj.preview && (
                          proj.preview.match(/\.(jpeg|jpg|gif|png|svg)$/i)
                            ? <img src={proj.preview} alt="preview" style={{maxWidth:'40px',maxHeight:'40px',marginLeft:'8px',verticalAlign:'middle',borderRadius:'4px'}} />
                            : <a href={proj.preview} target="_blank" rel="noopener noreferrer" style={{marginLeft:'8px'}}>Preview</a>
                        )}
                      </span>
                      <button type="button" className="delete-btn" onClick={() => deleteProject(i)} title="Delete">🗑️</button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* Add a Section Dropdown */}
          <button type="button" onClick={() => toggleSection('custom')}>Add a Section ▼</button>
          {openSection === 'custom' && (
            <>
              <form className="section-form" onSubmit={addCustomSection}>
                <input name="title" type="text" placeholder="Section Title" value={customForm.title} onChange={handleCustomChange} />
                <textarea name="description" placeholder="Section Description" value={customForm.description} onChange={handleCustomChange} rows={3} style={{resize:'vertical'}} />
                <button type="submit">Add</button>
              </form>
              {customSections.length > 0 && (
                <ul className="form-list">
                  {customSections.map((sec, i) => (
                    <li key={i}>
                      <span><strong>{sec.title}:</strong> {sec.description}</span>
                      <button type="button" className="delete-btn" onClick={() => deleteCustomSection(i)} title="Delete">🗑️</button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* Skills Dropdown */}
          <button type="button" onClick={() => toggleSection('skills')}>Skills ▼</button>
          {openSection === 'skills' && (
            <>
              <form className="section-form" onSubmit={addSkill}>
                <input name="skill" type="text" placeholder="Skill" value={skillInput} onChange={e => setSkillInput(e.target.value)} />
                <button type="submit">Add</button>
              </form>
              {/* Skill Suggestions */}
              <div className="skill-suggestions">
                {skillSuggestions.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    className="skill-suggestion-chip"
                    onClick={() => addSuggestedSkill(suggestion)}
                    disabled={skills.includes(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              {skills.length > 0 && (
                <ul className="form-list">
                  {skills.map((skill, i) => (
                    <li key={i}>
                      <span>{skill}</span>
                      <button type="button" className="delete-btn" onClick={() => deleteSkill(i)} title="Delete">🗑️</button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* Socials Dropdown */}
          <button type="button" onClick={() => toggleSection('socials')}>Socials ▼</button>
          {openSection === 'socials' && (
            <>
              <form className="section-form" onSubmit={addSocial}>
                <input name="github" type="text" placeholder="GitHub URL" value={socialForm.github} onChange={handleSocialChange} />
                <input name="linkedin" type="text" placeholder="LinkedIn URL" value={socialForm.linkedin} onChange={handleSocialChange} />
                <button type="submit">Add</button>
              </form>
              {socials.length > 0 && (
                <ul className="form-list">
                  {socials.map((soc, i) => (
                    <li key={i}>
                      <span>
                        {soc.github && <span style={{marginRight: '8px'}}>{githubIcon} <a href={soc.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>}
                        {soc.linkedin && <span>{linkedinIcon} <a href={soc.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>}
                      </span>
                      <button type="button" className="delete-btn" onClick={() => deleteSocial(i)} title="Delete">🗑️</button>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}

          {/* +Add Custom Section Button */}
          <div style={{ marginTop: '24px', marginBottom: '8px' }}>
            {!addingSection ? (
              <button type="button" className="add-section-btn" onClick={() => setAddingSection(true)}>+ Add</button>
            ) : (
              <div className="add-section-form">
                <input
                  type="text"
                  placeholder="Section Name"
                  value={newSectionName}
                  onChange={e => setNewSectionName(e.target.value)}
                  className="add-section-name-input"
                />
                <button type="button" className="add-section-confirm" onClick={handleAddSection}>Add Section</button>
                <button type="button" className="add-section-cancel" onClick={() => { setAddingSection(false); setNewSectionName(''); }}>Cancel</button>
              </div>
            )}
          </div>

          {/* Custom Sections Entry Forms */}
          {customSections.map((section, idx) => (
            <div key={idx} className="custom-section-form-block">
              <div className="custom-section-header">
                <strong>{section.name}</strong>
                <button type="button" className="delete-btn" onClick={() => deleteCustomSection(idx)} title="Delete Section">🗑️</button>
              </div>
              <div className="custom-section-entry-form">
                <input
                  type="text"
                  placeholder="Title"
                  value={customEntryForms[idx]?.title || ''}
                  onChange={e => setCustomEntryForms({ ...customEntryForms, [idx]: { ...customEntryForms[idx], title: e.target.value } })}
                  className="custom-entry-input"
                />
                <textarea
                  placeholder="Description"
                  value={customEntryForms[idx]?.description || ''}
                  onChange={e => setCustomEntryForms({ ...customEntryForms, [idx]: { ...customEntryForms[idx], description: e.target.value } })}
                  rows={2}
                  className="custom-entry-textarea"
                />
                <button type="button" className="custom-entry-add-btn" onClick={() => addCustomEntry(idx)}>Add</button>
              </div>
              {section.entries.length > 0 && (
                <ul className="form-list">
                  {section.entries.map((entry, entryIdx) => (
                    <li key={entryIdx}>
                      <span><strong>{entry.title}:</strong> {entry.description}</span>
                      <button type="button" className="delete-btn" onClick={() => deleteCustomEntry(idx, entryIdx)} title="Delete">🗑️</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="right-preview">
          <div className="template-box">
            <h3>Live Preview</h3>
            <div className="resume-preview-box">
              {/* Resume Header */}
              <div className="resume-header">
                <h1>{details.name || 'Your Name'}</h1>
                <div className="resume-contact">
                  {details.email && <span style={{color: '#222'}}>&#9993; {details.email}</span>}
                  {details.phone && <span style={{color: '#222'}}>&#128222; {details.phone}</span>}
                  {details.location && <span style={{color: '#222'}}>&#128205; {details.location}</span>}
                </div>
                {/* Socials in preview */}
                {socials.length > 0 && (
                  <div className="resume-socials">
                    {socials.map((soc, i) => (
                      <span key={i}>
                        {soc.github && <span style={{marginRight: '12px'}}>{githubIcon} <a href={soc.github} target="_blank" rel="noopener noreferrer">GitHub</a></span>}
                        {soc.linkedin && <span>{linkedinIcon} <a href={soc.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              {/* Education */}
              {education.length > 0 && (
                <div className="resume-section">
                  <h2>Education</h2>
                  <hr className="resume-divider" />
                  <ul>
                    {education.map((edu, i) => (
                      <li key={i}>
                        <strong>{edu.degree}</strong>, {edu.school} <span className="resume-year">({edu.from} - {edu.till}{edu.cgpa ? `, CGPA: ${edu.cgpa}` : ''})</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Experience */}
              {experience.length > 0 && (
                <div className="resume-section">
                  <h2>Experience</h2>
                  <hr className="resume-divider" />
                  <ul>
                    {experience.map((exp, i) => (
                      <li key={i}><strong>{exp.role}</strong>, {exp.company} <span className="resume-year">({exp.duration})</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Projects */}
              {projects.length > 0 && (
                <div className="resume-section">
                  <h2>Projects</h2>
                  <hr className="resume-divider" />
                  <ul>
                    {projects.map((proj, i) => (
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
              {/* Custom Sections in Preview */}
              {customSections.length > 0 && customSections.map((section, idx) => (
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
              {/* Skills */}
              {skills.length > 0 && (
                <div className="resume-section">
                  <h2>Skills</h2>
                  <hr className="resume-divider" />
                  <ul className="resume-skills">
                    {skills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="preview-actions">
              <button>Download PDF</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
          {showSavePrompt && (
            <div className="save-modal-overlay">
              <div className="save-modal-content">
                <h3>Name your resume</h3>
                <input
                  type="text"
                  value={resumeName}
                  onChange={e => setResumeName(e.target.value)}
                  placeholder="e.g. Shravani's Resume"
                  className="save-modal-input"
                />
                <div className="save-modal-actions">
                  <button onClick={confirmSave} className="save-modal-confirm">Save</button>
                  <button onClick={cancelSave} className="save-modal-cancel">Cancel</button>
                </div>
              </div>
            </div>
          )}
          <select>
            <option>Basic</option>
            <option>Modern</option>
            <option>Minimal</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
