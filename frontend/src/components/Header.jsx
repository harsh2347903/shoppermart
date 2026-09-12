import { NavLink } from 'react-router-dom';

export default function Header({ session, onLogout }) {
  return (
    <header className="site-header">
      <NavLink className="logo" to="/">
        <span className="logo-icon">🛍️</span> ShopperMart
      </NavLink>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Products</NavLink>
        <NavLink to="/about">About</NavLink>
        {session?.user ? (
          <div className="user-nav">
            <span className="user-badge" title={session.user.email}>
              👤 {session.user.name || 'User'}
            </span>
            <button type="button" className="btn-logout" onClick={onLogout}>
              Log out
            </button>
          </div>
        ) : (
          <NavLink className="btn-login-link" to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}
