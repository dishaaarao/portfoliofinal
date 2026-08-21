import React from 'react';
import './Skills.css';

const SKILLS = {
  Frontend:  ['HTML5','CSS3','JavaScript','React.js','Next.js','Tailwind CSS','TypeScript'],
  Backend:   ['Node.js','Express.js','MongoDB','MySQL','REST APIs','Firebase'],
  'AI / ML': ['Python','NumPy','Pandas','Scikit-learn','TensorFlow (learning)'],
  Tools:     ['Git','GitHub','Figma','VS Code','Vite','Postman'],
};

export default function Skills() {
  return (
    <section id="skills" className="section skills-s">
      <div className="container">
        <div data-reveal>
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">Technical Skills</h2>
        </div>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat} className="skills-col" data-reveal>
              <h3 className="skills-col__head">{cat}</h3>
              <div className="skills-col__tags">
                {items.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
