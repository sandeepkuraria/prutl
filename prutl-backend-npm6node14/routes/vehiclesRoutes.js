// // routes/vehiclesRoutes.js
const express = require('express');
const router = express.Router();
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle
} = require('../controllers/vehicleController ');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createVehicle); // Create a new vehicle
router.get('/', getAllVehicles); // Get all vehicles
router.get('/:id', getVehicleById); // Get a vehicle by ID
router.put('/:id', updateVehicle); // Update a vehicle by ID
router.delete('/:id', deleteVehicle); // Delete a vehicle by ID

module.exports = router;
