// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const propertyRoutes = require('./routes/propertyRoutes');
const offerRoutes = require('./routes/offerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use('/api/properties', propertyRoutes);
app.use('/api/offers', offerRoutes);

app.get('/', (req, res) => {
  res.send('US Real Estate Platform API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
