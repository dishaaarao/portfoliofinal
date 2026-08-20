import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import MultilingualName from './MultilingualName';
import './Footer.css';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-top">
          {/* Brand col */}
          <div data-reveal>
            <a href="#home" className="footer-brand-name">
              <span className="footer-brand-accent">D</span>isha&nbsp;
              <MultilingualName
                frameDelay={55}
                restDuration={3500}
                showScript={false}
                className="footer-multilingual"
              />
            </a>
            <p className="footer-desc">{personalDetails.tagline}</p>
            <div className="footer-socials">
              {[
                { href: personalDetails.github,            icon: <Github   size={16} />, label: 'GitHub'   },
                { href: personalDetails.linkedin,           icon: <Linkedin size={16} />, label: 'LinkedIn' },
                { href: personalDetails.twitter,            icon: <Twitter  size={16} />, label: 'Twitter'  },
                { href: `mailto:${personalDetails.email}`,  icon: <Mail     size={16} />, label: 'Email'    },
              ].map(({ href, icon, label }) => (
                <a key={label} href={href}
                   target={href.startsWith('mailto') ? undefined : '_blank'}
                   rel="noopener noreferrer"
                   className="social-icon-link" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav col */}
          <div data-reveal data-reveal-delay="2">
            <p className="footer-col-title">Navigation</p>
            <ul className="footer-links">
              {['about','skills','projects','experience','contact'].map((id) => (
                <li key={id}>
                  <a href={`#${id}`}>{id.charAt(0).toUpperCase() + id.slice(1)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact col */}
          <div data-reveal data-reveal-delay="3">
            <p className="footer-col-title">Contact</p>
            <ul className="footer-links">
              <li><a href={`mailto:${personalDetails.email}`}>{personalDetails.email}</a></li>
              <li><span>{personalDetails.location}</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom" data-reveal data-reveal-delay="4">
          <span>© {new Date().getFullYear()} {personalDetails.name}. All rights reserved.</span>
          <button className="back-to-top-btn" onClick={scrollToTop} aria-label="Back to top">
            Back to top <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
}
