import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Layers } from 'lucide-react';
import { projects, projectCategories } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import './Projects.css';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">03. Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-description">
            A selection of recent applications, design systems, and software engineering projects.
          </p>
        </div>

        {/* Category Filters */}
        <div className="projects-filter-bar">
          {projectCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card glass-card">
              <div className="project-card-header" style={{ background: project.imageBg }}>
                <div className="project-card-pattern"></div>
                <span className="project-card-category">{project.category}</span>
                <div className="project-card-icon-preview">
                  <Layers size={28} />
                </div>
              </div>

              <div className="project-card-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-desc">{project.description}</p>

                <div className="project-tags">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="project-tag">{tag}</span>
                  ))}
                </div>

                <div className="project-card-footer">
                  <div className="project-links">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="GitHub Source">
                        <Github size={18} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="project-link-btn" title="Live Preview">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>

                  <button className="details-trigger-btn" onClick={() => setSelectedProject(project)}>
                    <span>Details</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
