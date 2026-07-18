import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProperty } from '../services/api';

function PropertyDetailPage() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProperty() {
      const data = await fetchProperty(id);
      setProperty(data);
      setLoading(false);
    }

    loadProperty();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
<Link
  to="/"
  style={{
    display: 'inline-block',
    marginBottom: '20px',
    textDecoration: 'none',
    color: '#0066cc'
  }}
>
  ← Back to Listings
</Link>
      <h1>{property.L_Address}</h1>

      <h2>
        {property.L_City}, {property.L_State}
      </h2>

      <h3>
        {Number(property.L_SystemPrice).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </h3>
<p><strong>Bedrooms:</strong> {property.BedroomsTotal}</p>

<p><strong>Bathrooms:</strong> {property.BathroomsTotalInteger}</p>

<p><strong>Living Area:</strong> {property.BuildingAreaTotal} sq ft</p>

<p><strong>Property Type:</strong> {property.PropertyType}</p>

      <p><strong>ZIP Code:</strong> {property.L_Zip}</p>

      <p><strong>Year Built:</strong> {property.YearBuilt}</p>

      <p><strong>Days on Market:</strong> {property.DaysOnMarket}</p>
    </div>
  );
}

export default PropertyDetailPage;