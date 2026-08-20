import React, { useRef, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/portfolioData';
import './Blogs.css';

const CATEGORY_COLORS = {
  Frontend:     '#e63946',
  'UI/UX':      '#7c3aed',
  DSA:          '#00b4d8',
  Cybersecurity:'#22c55e',
  Project:      '#f97316',
};

function BlogCard({ post, index }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setTimeout(() => setVisible(true), index * 80); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  const color = CATEGORY_COLORS[post.category] || 'var(--accent)';

  return (
    <a
      ref={ref}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`blog-card${visible ? ' blog-card--in' : ''}${post.featured ? ' blog-card--featured' : ''}`}
      style={{ '--card-accent': color, '--card-delay': `${index * 0.08}s` }}
      aria-label={post.title}
    >
      {/* Top accent line */}
      <div className="blog-card__line" />

      {/* Header row */}
      <div className="blog-card__head">
        <span className="blog-card__cat" style={{ color, borderColor: color }}>
          {post.category}
        </span>
        <span className="blog-card__meta">
          {post.date} · {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h3 className="blog-card__title">{post.title}</h3>

      {/* Excerpt */}
      <p className="blog-card__excerpt">{post.excerpt}</p>

      {/* Footer */}
      <div className="blog-card__footer">
        <span className="blog-card__read">
          Read article
          <ArrowUpRight size={14} className="blog-card__arrow" />
        </span>
        {post.featured && (
          <span className="blog-card__featured-badge">Featured</span>
        )}
      </div>
    </a>
  );
}

export default function Blogs() {
  const headerRef = useRef(null);
  const [headerIn, setHeaderIn] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeaderIn(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="blogs" className="section blogs-section">
      <div className="container">

        {/* Header */}
        <div ref={headerRef} className={`blogs-header${headerIn ? ' blogs-header--in' : ''}`}>
          <span className="section-label">Writing</span>
          <h2 className="blogs-heading">
            <span className="blogs-heading__line">Thoughts</span>
            <span className="blogs-heading__line blogs-heading__line--outline">&amp; Articles</span>
          </h2>
          <p className="blogs-subhead">
            I write about frontend development, UI/UX, DSA, cybersecurity and the stuff I'm building.
          </p>
        </div>

        {/* Featured row — larger cards */}
        <div className="blogs-featured-row">
          {blogPosts.filter(p => p.featured).map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        {/* Divider */}
        <div className="blogs-divider">
          <span>More articles</span>
        </div>

        {/* Regular grid */}
        <div className="blogs-grid">
          {blogPosts.filter(p => !p.featured).map((post, i) => (
            <BlogCard key={post.id} post={post} index={i + 3} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className={`blogs-cta${headerIn ? ' blogs-cta--in' : ''}`}>
          <a
            href="https://dev.to"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
          >
            View all articles <ArrowUpRight size={14} />
          </a>
        </div>

      </div>
    </section>
  );
}
