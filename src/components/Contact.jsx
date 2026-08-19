import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, Check, Sparkles } from 'lucide-react';
import { contactDetails } from '../data/portfolioData';
import './Contact.css';

export default function Contact({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactDetails.email);
    setCopiedEmail(true);
    showToast('Email address copied to clipboard!');
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
      showToast('Thank you! Your message has been sent successfully.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">05. Get In Touch</span>
          <h2 className="section-title">Contact & Collaboration</h2>
          <p className="section-description">
            {contactDetails.subheading}
          </p>
        </div>

        <div className="contact-grid">
          {/* Contact Info Card */}
          <div className="contact-info-card glass-card">
            <div>
              <h3 className="contact-info-title">{contactDetails.headline}</h3>
              <p className="contact-info-sub">
                I'm always open to discussing new web development projects, freelance opportunities, or technical leadership roles.
              </p>
            </div>

            <div className="contact-methods">
              <div className="contact-method-item" onClick={handleCopyEmail} title="Click to copy email">
                <div className="contact-method-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="contact-method-label">Direct Email</div>
                  <div className="contact-method-value">
                    <span>{contactDetails.email}</span>
                    {copiedEmail ? <Check size={16} color="#10b981" /> : <Copy size={14} color="var(--text-muted)" />}
                  </div>
                </div>
              </div>

              <div className="contact-method-item">
                <div className="contact-method-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="contact-method-label">Phone / WhatsApp</div>
                  <div className="contact-method-value">{contactDetails.phone}</div>
                </div>
              </div>

              <div className="contact-method-item">
                <div className="contact-method-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="contact-method-label">Location</div>
                  <div className="contact-method-value">{contactDetails.location}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Sparkles size={20} color="var(--accent-primary)" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Response time: Usually within 24 hours.
              </span>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="contact-form-card glass-card">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="form-input"
                  placeholder="e.g. Project Inquiry / Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  className="form-textarea"
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%' }}>
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
