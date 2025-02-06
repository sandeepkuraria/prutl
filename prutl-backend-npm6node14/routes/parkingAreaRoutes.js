const express = require('express');
const router = express.Router();
const {
  createParkingArea,
  getAllParkingAreas,
  getParkingAreaById,
  updateParkingArea,
  deleteParkingArea
} = require('../controllers/parkingAreaController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Routes
router.post('/', createParkingArea); // Create a new parking area
router.get('/', getAllParkingAreas); // Get all parking areas
router.get('/:id', getParkingAreaById); // Get a parking area by ID
router.put('/:id', updateParkingArea); // Update a parking area by ID
router.delete('/:id', deleteParkingArea); // Delete a parking area by ID

module.exports = router;
