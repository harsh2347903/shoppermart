import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { api } from '../services/api';

export default function ProductPage({ products = [], user, token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const propProduct = products.find(item => item._id === id || String(item.sourceId) === id);
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [error, setError] = useState('');
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    addressLine: '',
    city: '',
    pincode: ''
  });
  const [orderMessage, setOrderMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const product = propProduct || fetchedProduct;
  const loading = !product && !error;

  useEffect(() => {
    if (propProduct) {
      return;
    }

    let isMounted = true;
    api(`/products/${id}`)
      .then(data => {
        if (isMounted) {
          setFetchedProduct(data);
          setError('');
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message || 'Product not found');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id, propProduct]);

  async function placeOrder(event) {
    event.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    setOrderMessage('');

    try {
      await api(
        '/orders',
        {
          method: 'POST',
          body: JSON.stringify({
            product: product._id || id,
            shippingAddress: address
          })
        },
        token
      );
      setOrderMessage('🎉 Order placed successfully! This demo does not collect real payment.');
      setAddress({ fullName: user?.name || '', addressLine: '', city: '', pincode: '' });
    } catch (err) {
      setOrderMessage(`❌ ${err.message || 'Failed to place order'}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <section className="product-detail error-page">
        <Link to="/" className="back-link">← Back to Products</Link>
        <div className="error-box">
          <h2>Product Not Found</h2>
          <p>{error || 'The requested product does not exist or has been removed.'}</p>
          <Link to="/" className="button">Browse Catalog</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="product-detail">
      <Link to="/" className="back-link">← Back to Products</Link>

      <div className="detail-layout">
        <div className="detail-media">
          {product.images?.[0] ? (
            <img className="detail-image" src={product.images[0]} alt={product.title} />
          ) : product.thumbnail ? (
            <img className="detail-image" src={product.thumbnail} alt={product.title} />
          ) : (
            <div className="image-placeholder">No image available</div>
          )}
        </div>

        <div className="detail-info">
          <span className="category-tag">{product.category}</span>
          <h1>{product.title}</h1>
          <div className="rating-row">
            <span className="stars">★ {product.rating || 'N/A'}</span>
            {product.brand && <span className="brand-name">Brand: {product.brand}</span>}
            {product.sku && <span className="sku-code">SKU: {product.sku}</span>}
          </div>

          <div className="price-tag">
            <span className="currency">₹</span>
            <span className="amount">{product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="discount-badge">{product.discountPercentage}% OFF</span>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="meta-info-grid">
            {product.warrantyInformation && (
              <div className="meta-card">
                <span className="meta-icon">🛡️</span>
                <span>{product.warrantyInformation}</span>
              </div>
            )}
            {product.shippingInformation && (
              <div className="meta-card">
                <span className="meta-icon">🚚</span>
                <span>{product.shippingInformation}</span>
              </div>
            )}
            {product.returnPolicy && (
              <div className="meta-card">
                <span className="meta-icon">🔄</span>
                <span>{product.returnPolicy}</span>
              </div>
            )}
            {product.availabilityStatus && (
              <div className="meta-card">
                <span className="meta-icon">📦</span>
                <span>{product.availabilityStatus}</span>
              </div>
            )}
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <div className="reviews-section">
              <h3>Customer Reviews ({product.reviews.length})</h3>
              <div className="reviews-list">
                {product.reviews.slice(0, 3).map((review, index) => (
                  <blockquote key={index} className="review-quote">
                    <div className="review-header">
                      <span className="review-rating">★ {review.rating}</span>
                      <cite className="review-author">— {review.reviewerName}</cite>
                    </div>
                    <p className="review-text">{review.comment}</p>
                  </blockquote>
                ))}
              </div>
            </div>
          )}

          <div className="order-box">
            <h2>Order Product</h2>
            {!user && (
              <p className="auth-prompt">
                Please <Link to="/login">log in</Link> to complete your order.
              </p>
            )}
            <form className="form checkout-form" onSubmit={placeOrder}>
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  id="fullName"
                  required
                  placeholder="e.g. John Doe"
                  value={address.fullName}
                  onChange={e => setAddress({ ...address, fullName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="addressLine">Street Address</label>
                <input
                  id="addressLine"
                  required
                  placeholder="e.g. 123 Main Street"
                  value={address.addressLine}
                  onChange={e => setAddress({ ...address, addressLine: e.target.value })}
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    required
                    placeholder="e.g. Mumbai"
                    value={address.city}
                    onChange={e => setAddress({ ...address, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="pincode">PIN / Postal Code</label>
                  <input
                    id="pincode"
                    required
                    placeholder="e.g. 400001"
                    value={address.pincode}
                    onChange={e => setAddress({ ...address, pincode: e.target.value })}
                  />
                </div>
              </div>
              <button type="submit" className="button btn-submit-order" disabled={isSubmitting}>
                {isSubmitting ? 'Placing order...' : 'Place Order'}
              </button>
              {orderMessage && (
                <p className={`order-status-msg ${orderMessage.startsWith('🎉') ? 'success' : 'error'}`}>
                  {orderMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
