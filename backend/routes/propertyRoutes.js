// backend/routes/propertyRoutes.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

// GET /api/properties?price=...&location=...&type=...
router.get('/', propertyController.getProperties);

// GET /api/properties/:id
router.get('/:id', propertyController.getPropertyById);

module.exports = router;
