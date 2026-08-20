/**
 * GrainOverlay — fixed-position animated film-grain texture.
 * Purely CSS-driven via the .grain-overlay class in index.css.
 * Rendered once at the App level, pointer-events: none.
 */
export default function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
