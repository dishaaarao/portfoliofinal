import React, { useState, useRef } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check } from 'lucide-react';
import { contactDetails } from '../data/portfolioData';
import { useFormReveal } from '../hooks/useReveal';
import './Contact.css';

export default function Contact({ showToast }) {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitting, setSubmitting]   = useState(false);
  const formRef = useRef(null);

  /* Stagger form fields on scroll */
  useFormReveal(formRef);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactDetails.email);
    setCopiedEmail(true);
    showToast('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      showToast("Message sent — I'll be in touch within 24 hours.");
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="section">
      <div className="container">

        <div style={{ marginBottom: '3rem' }} data-reveal>
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Work<br />Together.</h2>
        </div>

        <div className="contact-layout">

          {/* ── Info panel ── */}
          <div className="contact-info" data-reveal="left">
            <p className="contact-subtext">
              Open to new projects, freelance work, and full-time opportunities.
              Drop me a line and I'll get back to you within 24 hours.
            </p>

            <div className="contact-methods">
              {/* Email */}
              <div className="contact-method" onClick={handleCopyEmail} title="Click to copy"
                   data-reveal data-reveal-delay="1">
                <div className="contact-method-icon"><Mail size={16} /></div>
                <div className="contact-method-text">
                  <span className="contact-method-label">Email</span>
                  <span className="contact-method-value">
                    {contactDetails.email}
                    {copiedEmail
                      ? <Check size={14} color="#22c55e" />
                      : <Copy  size={13} style={{ color: 'var(--text-muted)' }} />}
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-method" data-reveal data-reveal-delay="2">
                <div className="contact-method-icon"><Phone size={16} /></div>
                <div className="contact-method-text">
                  <span className="contact-method-label">Phone / WhatsApp</span>
                  <span className="contact-method-value">{contactDetails.phone}</span>
                </div>
              </div>

              {/* Location */}
              <div className="contact-method" data-reveal data-reveal-delay="3">
                <div className="contact-method-icon"><MapPin size={16} /></div>
                <div className="contact-method-text">
                  <span className="contact-method-label">Location</span>
                  <span className="contact-method-value">{contactDetails.location}</span>
                </div>
              </div>
            </div>

            <div className="contact-response-note" data-reveal data-reveal-delay="4">
              <span className="contact-response-dot" aria-hidden="true" />
              Avg. response time — under 24 hours
            </div>
          </div>

          {/* ── Form ── */}
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="c-name">Name *</label>
                <input type="text" id="c-name" className="form-input"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="c-email">Email *</label>
                <input type="email" id="c-email" className="form-input"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="c-subject">Subject</label>
              <input type="text" id="c-subject" className="form-input"
                placeholder="Project inquiry, collaboration..."
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="c-message">Message *</label>
              <textarea id="c-message" className="form-textarea"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary form-submit" disabled={submitting}>
                {submitting
                  ? 'Sending…'
                  : <><span>Send Message</span><Send size={15} /></>}
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}
