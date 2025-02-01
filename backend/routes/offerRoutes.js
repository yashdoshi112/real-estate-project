// backend/routes/offerRoutes.js
const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

// POST: Generate offer (PDF + Email) for a property
router.post('/:propertyId', offerController.generateOffer);

module.exports = router;
