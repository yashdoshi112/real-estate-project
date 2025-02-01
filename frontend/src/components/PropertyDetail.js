// frontend/src/components/PropertyDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPropertyById } from '../services/api';
import OfferForm from './OfferForm';

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchPropertyById(id)
      .then(response => {
        setProperty(response.data);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{property.address}</h2>
      <p>Price: ${property.price}</p>
      <p>Type: {property.type}</p>
      <p>Net Operating Income: {property.netOperatingIncome}</p>
      <OfferForm propertyId={id} propertyAddress={property.address} />
    </div>
  );
}

export default PropertyDetail;
