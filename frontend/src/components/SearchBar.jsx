import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [filters, setFilters] = useState({
    city: '',
    zipcode: '',
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: ''
  });

  function handleChange(e) {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(filters);
  }

  function handleClear() {
    const emptyFilters = {
      city: '',
      zipcode: '',
      minPrice: '',
      maxPrice: '',
      beds: '',
      baths: ''
    };

    setFilters(emptyFilters);
    onSearch(emptyFilters);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        name="city"
        placeholder="City"
        value={filters.city}
        onChange={handleChange}
      />

      <input
        name="zipcode"
        placeholder="ZIP Code"
        value={filters.zipcode}
        onChange={handleChange}
      />

      <input
        name="minPrice"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={handleChange}
      />

      <input
        name="maxPrice"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={handleChange}
      />

      <input
        name="beds"
        placeholder="Bedrooms"
        value={filters.beds}
        onChange={handleChange}
      />

      <input
        name="baths"
        placeholder="Bathrooms"
        value={filters.baths}
        onChange={handleChange}
      />

      <button type="submit">Search</button>

      <button
        type="button"
        onClick={handleClear}
        style={{ marginLeft: '10px' }}
      >
        Clear
      </button>
    </form>
  );
}

export default SearchBar;