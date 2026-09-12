import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <section className="about-page">
      <div className="about-card">
        <h1>About ShopperMart</h1>
        <p className="lead">
          A modern full-stack e-commerce application powered by Express, MongoDB, and React.
        </p>

        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <h3>React + Vite</h3>
            <p>Lightning-fast frontend with client-side routing, responsive UI, and instant search.</p>
          </div>

          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <h3>Express REST API</h3>
            <p>Modular architecture featuring separated routes, controllers, middleware, and schemas.</p>
          </div>

          <div className="feature-item">
            <span className="feature-icon">🍃</span>
            <h3>MongoDB & Mongoose</h3>
            <p>Robust database modeling with data validation, indexing, and seed automation.</p>
          </div>

          <div className="feature-item">
            <span className="feature-icon">🔐</span>
            <h3>JWT Authentication</h3>
            <p>Secure token-based auth with encrypted passwords using bcrypt and route protection.</p>
          </div>
        </div>

        <div className="about-action">
          <Link to="/" className="button">Browse Catalog</Link>
        </div>
      </div>
    </section>
  );
}
