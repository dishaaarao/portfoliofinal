import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalDetails } from '../data/portfolioData';
import './Navbar.css';

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections  = ['home', 'about', 'skills', 'projects', 'experience', 'blogs', 'contact'];
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { name: 'About',      href: '#about'      },
    { name: 'Skills',     href: '#skills'     },
    { name: 'Projects',   href: '#projects'   },
    { name: 'Experience', href: '#experience' },
    { name: 'Blogs',      href: '#blogs'      },
    { name: 'Contact',    href: '#contact'    },
  ];

  return (
    <header className={`navbar-header${scrolled ? ' scrolled' : ''}`}>
      <div className="container navbar-container">

        {/* Brand */}
        <a href="#home" className="navbar-brand">
          <span className="navbar-brand-accent">D</span>isha&nbsp;
          <span className="navbar-brand-accent">R</span>ao
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation">
          <ul className={`navbar-menu${mobileOpen ? ' open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`navbar-link${activeSection === link.href.slice(1) ? ' active' : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          <a
            href="#contact"
            className="btn btn-primary hidden-mobile"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.82rem' }}
          >
            Hire Me <ArrowUpRight size={14} />
          </a>

          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>
    </header>
  );
}
