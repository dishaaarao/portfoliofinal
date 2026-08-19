import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="#home" className="footer-brand">
              <span className="navbar-brand-symbol">&lt;</span>
              <span>{personalDetails.name}</span>
              <span className="navbar-brand-symbol"> /&gt;</span>
            </a>
            <p className="footer-description">
              {personalDetails.tagline} Focused on crafting modern, intuitive, and performant web applications.
            </p>
            <div className="footer-socials">
              <a href={personalDetails.github} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={personalDetails.twitter} target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href={`mailto:${personalDetails.email}`} className="social-icon-link" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Me</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#experience">Experience</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-title">Contact Info</h4>
            <ul className="footer-links">
              <li><a href={`mailto:${personalDetails.email}`}>{personalDetails.email}</a></li>
              <li><span>{personalDetails.location}</span></li>
              <li><a href="#contact">Send a Message</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {personalDetails.name}. All rights reserved.</p>
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
