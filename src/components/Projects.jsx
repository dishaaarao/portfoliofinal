import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { projects, projectCategories } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import { DeviceScrollShowcase } from './ui/device-scroll-showcase';
import './Projects.css';

/* Stagger-reveal project rows when the list enters viewport */
function useRowReveal(listRef, deps) {
  useEffect(() => {
    if (!listRef.current) return;

    const rows = listRef.current.querySelectorAll('.project-row');
    rows.forEach((r) => {
      r.classList.remove('row-in');
      r.style.opacity   = '0';
      r.style.transform = 'translateY(22px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            rows.forEach((row, i) => {
              setTimeout(() => {
                row.style.transition =
                  `opacity 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s,
                   transform 0.55s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s`;
                row.style.opacity   = '1';
                row.style.transform = 'none';
              }, i * 60);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(listRef.current);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const listRef = useRef(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  /* Re-run stagger whenever filter changes */
  useRowReveal(listRef, [activeCategory]);

  return (
    <section id="projects" className="section">
      <div className="container">

        {/* 3D Device Scroll Showcase */}
        <DeviceScrollShowcase />

        {/* Project rows header */}
        <div
          style={{ display: 'flex', justifyContent: 'space-between',
                   alignItems: 'flex-end', marginBottom: '2rem', marginTop: '4rem',
                   flexWrap: 'wrap', gap: '1.5rem' }}
          data-reveal
        >
          <div>
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Selected Work</h2>
          </div>

          {/* Filter pills */}
          <div className="projects-filter" data-reveal data-reveal-delay="2">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project rows */}
        <ol ref={listRef} className="projects-list" aria-label="Projects">
          {filtered.map((project, idx) => (
            <li
              key={project.id}
              className="project-row"
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(project)}
              aria-label={`View details for ${project.title}`}
            >
              <span className="project-num" aria-hidden="true">
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="project-body">
                <div className="project-title-row">
                  <span className="project-title">{project.title}</span>
                  <span className="project-category-pill">{project.category}</span>
                </div>
                <p className="project-subtitle">{project.subtitle}</p>
                <div className="project-tags-row">
                  {project.tags.slice(0, 4).map((tag, ti) => (
                    <span key={ti} className="project-tag-chip">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="project-actions" onClick={(e) => e.stopPropagation()}>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                     className="project-icon-link" aria-label="GitHub" title="GitHub">
                    <Github size={15} />
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                     className="project-icon-link" aria-label="Live demo" title="Live Demo">
                    <ExternalLink size={15} />
                  </a>
                )}
                <button
                  className="project-details-btn"
                  onClick={(e) => { e.stopPropagation(); setSelectedProject(project); }}
                  aria-label={`Details for ${project.title}`}
                >
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </li>
          ))}
        </ol>

      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
