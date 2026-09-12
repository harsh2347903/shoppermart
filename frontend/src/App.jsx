import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { api } from './services/api';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [session, setSessionState] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('shopSession') || 'null');
    } catch {
      return null;
    }
  });

  useEffect(() => {
    api('/products')
      .then(data => {
        setProducts(data.products || []);
      })
      .catch((err) => {
        console.error('Failed to load products:', err);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function login(sessionData) {
    localStorage.setItem('shopSession', JSON.stringify(sessionData));
    setSessionState(sessionData);
  }

  function logout() {
    localStorage.removeItem('shopSession');
    setSessionState(null);
  }

  return (
    <div className="app-container">
      <Header session={session} onLogout={logout} />
      <main className="main-content">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage products={products} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<LoginPage onLogin={login} />} />
            <Route
              path="/products/:id"
              element={
                <ProductPage
                  products={products}
                  user={session?.user}
                  token={session?.token}
                />
              }
            />
          </Routes>
        )}
      </main>
    </div>
  );
}
