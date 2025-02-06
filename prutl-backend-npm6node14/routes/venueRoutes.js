//routes/venueRoutes.js
const express = require('express');
const router = express.Router();
const { createVenue, getAllVenues, getVenueById, updateVenue, deleteVenue } = require('../controllers/venueController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createVenue);
router.get('/', getAllVenues);
router.get('/:id', getVenueById);
router.put('/:id', updateVenue);
router.delete('/:id', deleteVenue);

module.exports = router;
