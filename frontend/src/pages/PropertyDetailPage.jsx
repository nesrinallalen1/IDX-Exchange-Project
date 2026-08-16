
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProperty } from '../services/api';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    async function loadProperty() {
      try {
        const data = await fetchProperty(id);
        setProperty(data);
      } catch (error) {
        console.error('Failed to load property:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProperty();
  }, [id]);

  if (loading) {
    return <h2>Loading property...</h2>;
  }

  if (!property) {
    return <h2>Property not found.</h2>;
  }

  let photos = [];

  try {
    photos = property.L_Photos
      ? JSON.parse(property.L_Photos)
      : [];
  } catch (error) {
    console.error('Failed to parse property photos:', error);
  }
const latitude = parseFloat(
  property.LMD_MP_Latitude
);

const longitude = parseFloat(
  property.LMD_MP_Longitude
);
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>

      <Link to="/">
        ← Back to Listings
      </Link>

      <h1>
        {property.L_Address}
      </h1>

      <h2>
        {property.L_City}, {property.L_State} {property.L_Zip}
      </h2>

      {/* Main Photo */}
      {photos.length > 0 && (
        <div>
          <img
            src={photos[selectedPhoto]}
            alt={property.L_Address}
            style={{
              width: '100%',
              height: '500px',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />

          {/* Photo thumbnails */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '10px',
              overflowX: 'auto'
            }}
          >
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`${property.L_Address} ${index + 1}`}
                onClick={() => setSelectedPhoto(index)}
                style={{
                  width: '100px',
                  height: '70px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border:
                    selectedPhoto === index
                      ? '3px solid #333'
                      : '2px solid #ddd'
                }}
              />
            ))}
          </div>
        </div>
      )}

      <h2>
        {Number(property.L_SystemPrice).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })}
      </h2>

      <p>
        <strong>ZIP Code:</strong> {property.L_Zip}
      </p>

      <p>
        <strong>Year Built:</strong> {property.YearBuilt}
      </p>

      <p>
        <strong>Days on Market:</strong> {property.DaysOnMarket}
      </p>

<h3>Description</h3>

<p>
  {property.L_Remarks}
</p>
<h3>Location</h3>

<a
  href={`https://www.google.com/maps?q=${property.LMD_MP_Latitude},${property.LMD_MP_Longitude}`}
  target="_blank"
  rel="noreferrer"
>
  View Directions on Google Maps
</a>
<h3>Location</h3>

<MapContainer
  center={[latitude, longitude]}
  zoom={15}
  style={{
    height: '400px',
    width: '100%',
    borderRadius: '10px'
  }}
>
  <TileLayer
    attribution='&copy; OpenStreetMap contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

  <Marker position={[latitude, longitude]}>
    <Popup>
      {property.L_Address}
    </Popup>
  </Marker>
</MapContainer>
    </div>
  );
}

export default PropertyDetailPage;