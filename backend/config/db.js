// backend/config/db.js
const { Pool } = require('pg');

// Configure these settings with your local or cloud PostgreSQL credentials
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'yash_doshi01',
  port: 5432,
});

module.exports = pool;
