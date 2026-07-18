import { Link } from 'react-router-dom';

function PropertyCard({ property }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '20px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Link
        to={`/property/${property.L_ListingID}`}
        style={{
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        <h3>{property.L_Address}</h3>

        <p>
          {property.L_City}, {property.L_State} {property.L_Zip}
        </p>

        <p>
          <strong>Price:</strong>{' '}
          {Number(property.L_SystemPrice).toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </p>

        <p>
          <strong>Year Built:</strong> {property.YearBuilt}
        </p>

        <p>
          <strong>Days on Market:</strong> {property.DaysOnMarket}
        </p>
      </Link>
    </div>
  );
}

export default PropertyCard;