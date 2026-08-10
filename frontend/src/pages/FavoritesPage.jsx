import { useEffect, useState } from 'react';
import { fetchProperty } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import { getFavorites } from '../utils/favorites';

function FavoritesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      const favoriteIds = getFavorites();

      try {
        const favoriteProperties = await Promise.all(
          favoriteIds.map((id) => fetchProperty(id))
        );

        setProperties(favoriteProperties);
      } catch (error) {
        console.error('Failed to load favorites:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  if (loading) {
    return <h2>Loading favorites...</h2>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">My Favorites</h1>

      {properties.length === 0 ? (
        <p>You haven't saved any properties yet.</p>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.L_ListingID}
              property={property}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;