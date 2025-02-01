// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const fetchProperties = (filters) => {
  // Axios automatically serializes the filters object into query parameters
  return axios.get(`${API_BASE_URL}/properties`, { params: filters });
};

export const fetchPropertyById = (id) => {
  return axios.get(`${API_BASE_URL}/properties/${id}`);
};

export const generateOffer = (propertyId, recipientEmail) => {
  return axios.post(`${API_BASE_URL}/offers/${propertyId}`, { recipientEmail });
};
