// backend/controllers/propertyController.js
const pool = require('../config/db');

// GET /api/properties?price=...&location=...&type=...
exports.getProperties = async (req, res) => {
  try {
    const { price, location, type } = req.query;
    let query = 'SELECT * FROM properties WHERE 1=1';
    const params = [];

    if (price) {
      params.push(price);
      query += ` AND price <= $${params.length}`;
    }
    if (location) {
      params.push(`%${location}%`);
      query += ` AND address ILIKE $${params.length}`; // using address for location demo
    }
    if (type) {
      params.push(type);
      query += ` AND type = $${params.length}`;
    }
    
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// GET /api/properties/:id
exports.getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query('SELECT * FROM properties WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};
