import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle, Sparkles } from 'lucide-react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-banner" style={{ background: project.imageBg }}>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
          <span className="project-card-category">{project.category}</span>
        </div>

        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-subtitle">{project.subtitle}</p>

          <p className="modal-description">{project.description}</p>

          <h3 className="modal-section-title">
            <Sparkles size={18} color="var(--accent-primary)" />
            <span>Key Achievements & Features</span>
          </h3>

          <ul className="modal-highlights-list">
            {project.highlights?.map((highlight, idx) => (
              <li key={idx} className="modal-highlight-item">
                <CheckCircle size={16} color="var(--accent-secondary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <h3 className="modal-section-title">Technologies Used</h3>
          <div className="project-tags" style={{ marginBottom: '1.5rem' }}>
            {project.tags.map((tag, idx) => (
              <span key={idx} className="project-tag">{tag}</span>
            ))}
          </div>

          <div className="modal-actions">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <span>View Live Demo</span>
                <ExternalLink size={16} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Github size={16} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
