import React, { useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        {/* Top bar */}
        <div className="modal-topbar">
          <span className="modal-category-label">{project.category}</span>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Accent stripe using project color */}
        <div
          className="modal-banner"
          style={{ background: project.imageBg }}
          aria-hidden="true"
        />

        {/* Body */}
        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-subtitle">{project.subtitle}</p>
          <p className="modal-description">{project.description}</p>

          {/* Highlights */}
          {project.highlights?.length > 0 && (
            <>
              <p className="modal-section-title">Key Features</p>
              <ul className="modal-highlights">
                {project.highlights.map((h, i) => (
                  <li key={i} className="modal-highlight-item">
                    <span className="modal-highlight-num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Tech tags */}
          <p className="modal-section-title">Technologies</p>
          <div className="modal-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="modal-actions">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Live Demo <ExternalLink size={14} />
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Github size={14} /> Source Code
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
