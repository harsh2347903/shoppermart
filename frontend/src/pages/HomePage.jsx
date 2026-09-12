import { useState, useMemo } from 'react';
import ShopProductCard from '../components/ShopProductCard';
import SearchBar from '../components/SearchBar';

export default function HomePage({ products = [] }) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase();
    return products.filter(product => {
      const matchesSearch = !query ||
        product.title?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchText, selectedCategory]);

  return (
    <section className="home-page">
      <div className="hero-banner">
        <h1>Discover Premium Products</h1>
        <p>Explore our curated catalog sourced directly from MongoDB Atlas.</p>
        <SearchBar searchText={searchText} onSearchChange={setSearchText} />
        {categories.length > 1 && (
          <div className="category-chips" role="group" aria-label="Filter by category">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'All Items' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="products-header">
        <h2>Available Products ({filteredProducts.length})</h2>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found matching &ldquo;{searchText}&rdquo;.</p>
          <button type="button" onClick={() => { setSearchText(''); setSelectedCategory('all'); }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid">
          {filteredProducts.map(product => (
            <ShopProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
