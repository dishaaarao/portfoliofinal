import React from 'react';
import { CircularTestimonials } from './ui/circular-testimonials';
import './Testimonials.css';

const testimonials = [
  {
    quote:
      "Disha delivered an exceptional UI design and Figma prototype for Yogurberry. Her attention to brand identity, component tokens, and mobile responsiveness made our digital menu experience stand out!",
    name: "Yogurberry Team",
    designation: "Client — Brand & Retail",
    src: "/yogurberry.png",
  },
  {
    quote:
      "Working with Disha on TechNova Solutions client apps was a smooth experience. She writes clean, performant React code and bridges the gap between design specs and engineering perfectly.",
    name: "Engineering Lead",
    designation: "TechNova Solutions",
    src: "/technova.png",
  },
  {
    quote:
      "Disha's work on LISA AI platform showed impressive frontend skills and rapid API integration. Her passion for creative technology and UI/UX design is evident in every feature she ships.",
    name: "LISA AI Product Team",
    designation: "LetsUpgrade — AI Learning Platform",
    src: "/lisa-ai.png",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section testimonials-s">
      <div className="container">
        <div className="testimonials-header" data-reveal>
          <span className="section-label">Endorsements &amp; Recommendations</span>
          <h2 className="testimonials-title">What Collaborators Say</h2>
        </div>
        <div data-reveal>
          <CircularTestimonials
            testimonials={testimonials}
            autoplay={true}
            colors={{
              name: "var(--text-primary)",
              designation: "#0d9488",
              testimony: "var(--text-secondary)",
              arrowBackground: "#111827",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#0d9488",
            }}
            fontSizes={{
              name: "1.4rem",
              designation: "0.9rem",
              quote: "1.05rem",
            }}
          />
        </div>
      </div>
    </section>
  );
}
