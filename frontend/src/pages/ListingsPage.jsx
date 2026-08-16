
import { useEffect, useState } from 'react';
import { fetchProperties } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import '../styles/ListingsPage.css';

function ListingsPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('ASC');
const [page, setPage] = useState(1);

const limit = 20;
  async function loadProperties(filters = {}) {
    try {
      setLoading(true);

    const data = await fetchProperties({
  limit,
  offset: (page - 1) * limit,
  ...filters,
  ...(sortBy && { sortBy, sortOrder })
});

      setProperties(data.results);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to load properties.');
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  loadProperties();
}, [sortBy, sortOrder, page]);

  if (loading) {
    return <h2>Loading properties...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="page-container">

      <h1
        className="page-title"
        style={{ color: '#222' }}
      >
        IDX Property Search
      </h1>

      <p className="page-subtitle">
        Browse available homes from the MLS database.
      </p>

      <SearchBar onSearch={loadProperties} />

      <div style={{ marginBottom: '20px' }}>
        <label>Sort by: </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Default</option>
          <option value="L_SystemPrice">Price</option>
          <option value="BedroomsTotal">Bedrooms</option>
          <option value="BathroomsTotalInteger">Bathrooms</option>
          <option value="YearBuilt">Year Built</option>
        </select>

        {sortBy && (
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="ASC">Low to High</option>
            <option value="DESC">High to Low</option>
          </select>
        )}
      </div>

      <p>
        <strong>Total Properties Loaded:</strong>{' '}
        {properties.length}
      </p>

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.L_ListingID}
            property={property}
          />
        ))}
      </div>
<div
  style={{
    marginTop: '30px',
    display: 'flex',
    gap: '10px',
    justifyContent: 'center'
  }}
>
  <button
    onClick={() => setPage((p) => Math.max(1, p - 1))}
    disabled={page === 1}
  >
    Previous
  </button>

  <span>
    Page {page}
  </span>

  <button
    onClick={() => setPage((p) => p + 1)}
  >
    Next
  </button>
</div>

    </div>
  );
}

export default ListingsPage;