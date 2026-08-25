import React from 'react';
import { DeviceScrollShowcase } from './ui/device-scroll-showcase';
import './Projects.css';

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        {/* 3D Device Scroll Showcase */}
        <DeviceScrollShowcase />
      </div>
    </section>
  );
}
