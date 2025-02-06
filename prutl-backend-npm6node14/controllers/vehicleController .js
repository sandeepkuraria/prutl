// controllers/vehicleController.js

const Vehicle = require('../models/vehicleModel');

// Create a new vehicle
const createVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all vehicles
const getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.getAllVehicles();
    res.json(vehicles);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a vehicle by ID
const getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.getVehicleById(req.params.id);
    if (!vehicle) {
      const error = new Error('Vehicle not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(vehicle);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a vehicle
const updateVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.updateVehicle(req.params.id, req.body);
    if (!vehicle) {
      const error = new Error('Vehicle not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(vehicle);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a vehicle
const deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.deleteVehicle(req.params.id);
    if (!vehicle) {
      const error = new Error('Vehicle not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
