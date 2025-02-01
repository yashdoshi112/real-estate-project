// frontend/src/components/OfferForm.js
import React, { useState } from 'react';
import { generateOffer } from '../services/api';

function OfferForm({ propertyId, propertyAddress }) {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await generateOffer(propertyId, recipientEmail);
      setMessage(`Offer for ${propertyAddress} sent to ${recipientEmail}`);
    } catch (error) {
      console.error(error);
      setMessage('Failed to send offer');
    }
  };

  return (
    <div>
      <h3>Generate Offer</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Recipient Email:
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Send Offer</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default OfferForm;
