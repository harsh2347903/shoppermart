import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

export default function LoginPage({ onLogin }) {
  const [form, setForm] = useState({ email: 'user@test.in', password: 'user123!' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const session = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      if (typeof onLogin === 'function') {
        onLogin(session);
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  function fillDemo(email, password) {
    setForm({ email, password });
    setError('');
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Log in to manage your orders and account.</p>

        <form className="form auth-form" onSubmit={submit}>
          <div className="form-group">
            <label htmlFor="loginEmail">Email Address</label>
            <input
              id="loginEmail"
              type="email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              placeholder="e.g. user@test.in"
            />
          </div>

          <div className="form-group">
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              required
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" className="button btn-auth" disabled={loading}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          {error && <div className="error-banner">{error}</div>}
        </form>

        <div className="demo-accounts-box">
          <h3>Demo Accounts:</h3>
          <div className="demo-buttons">
            <button
              type="button"
              className="demo-pill"
              onClick={() => fillDemo('user@test.in', 'user123!')}
            >
              Demo User: <code>user@test.in</code>
            </button>
            <button
              type="button"
              className="demo-pill"
              onClick={() => fillDemo('admin@test.in', 'Admin123!')}
            >
              Admin: <code>admin@test.in</code>
            </button>
          </div>
        </div>

        <p className="auth-footer">
          <Link to="/">← Return to Store</Link>
        </p>
      </div>
    </div>
  );
}
