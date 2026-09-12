export default function SearchBar({ searchText, onSearchChange }) {
  return (
    <div className="search-bar-wrapper">
      <label htmlFor="product-search" className="visually-hidden">
        Search products
      </label>
      <div className="search-input-box">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          id="product-search"
          type="search"
          placeholder="Search products by title, category, description..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchText && (
          <button
            type="button"
            className="clear-search-btn"
            onClick={() => onSearchChange('')}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
