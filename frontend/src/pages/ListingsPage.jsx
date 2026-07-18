import { useEffect, useState } from 'react';
import { fetchProperties } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import SearchBar from '../components/SearchBar';
import '../styles/ListingsPage.css';

function ListingsPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadProperties(filters = {}) {
    try {
      const data = await fetchProperties(filters);
      setProperties(data.results);
      setError('');
    } catch (err) {
      setError('Failed to load properties.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  if (loading) {
    return <h2>Loading properties...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">
        IDX Property Search
      </h1>

      <p className="page-subtitle">
        Browse available homes from the MLS database.
      </p>

      <SearchBar onSearch={loadProperties} />

      <p>
        <strong>Total Properties Loaded:</strong> {properties.length}
      </p>

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.L_ListingID}
            property={property}
          />
        ))}
      </div>
    </div>
  );
}

export default ListingsPage;