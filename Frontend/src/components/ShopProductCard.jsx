import { Link } from 'react-router-dom';

export default function ShopProductCard({ product }) {
  const targetId = product._id || product.sourceId;

  return (
    <article className="card">
      <div className="card-image-wrapper">
        {product.thumbnail ? (
          <img src={product.thumbnail} alt={product.title} loading="lazy" />
        ) : (
          <div className="placeholder-image">🛍️</div>
        )}
        {product.discountPercentage > 0 && (
          <span className="card-discount-badge">{Math.round(product.discountPercentage)}% OFF</span>
        )}
      </div>
      <div className="card-content">
        <div className="card-meta">
          <span className="category-pill">{product.category}</span>
          <span className="rating-pill">★ {product.rating || '4.0'}</span>
        </div>
        <h2 className="card-title" title={product.title}>{product.title}</h2>
        <p className="card-description">{product.description}</p>
        <div className="card-footer">
          <div className="card-price">
            <span className="currency">₹</span>
            <span className="price-val">{product.price}</span>
          </div>
          <Link className="button card-button" to={`/products/${targetId}`}>
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
