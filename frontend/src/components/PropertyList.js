// frontend/src/components/PropertyList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProperties } from '../services/api';

function PropertyList() {
  // State for storing properties and filters
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({
    price: '',
    type: ''
  });

  // Fetch properties when filters change
  useEffect(() => {
    fetchProperties(filters)
      .then(response => {
        setProperties(response.data);
      })
      .catch(err => console.error(err));
  }, [filters]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Optional: handle form submission if you want to trigger additional logic.
  const handleSubmit = (e) => {
    e.preventDefault();
    // In this simple example, updating state triggers the useEffect fetch.
    // You could also validate input or do other processing here.
    console.log("Filters applied:", filters);
  };

  return (
    <div>
      <h2>Properties</h2>
      {/* Filtering Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label>
            Maximum Price:
            <input
              type="number"
              name="price"
              value={filters.price}
              onChange={handleInputChange}
              placeholder="Enter max price"
            />
          </label>
        </div>
        <div>
          <label>
            Property Type:
            <input
              type="text"
              name="type"
              value={filters.type}
              onChange={handleInputChange}
              placeholder="Enter type (e.g., Condo, House)"
            />
          </label>
        </div>
        <button type="submit">Apply Filters</button>
      </form>

      <ul>
        {properties.map(prop => (
          <li key={prop.id}>
            <Link to={`/property/${prop.id}`}>
              {prop.address} - ${prop.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PropertyList;
