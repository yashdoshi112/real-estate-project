// backend/config/db.js
const { Pool } = require('pg');

// Configure these settings with your local or cloud PostgreSQL credentials
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'yash_doshi01',
  port: 5432,
  connectionString: process.env.DATABASE_URL || 'postgres://u1okb793060lns:p25359bd2132785017495406133f27957e7d53de2ed2315af26bc89e617bfbf5c@c5p86clmevrg5s.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/dcd5nu1p2efp4o'
});

module.exports = pool;
