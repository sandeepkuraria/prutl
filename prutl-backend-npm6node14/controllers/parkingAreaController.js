const ParkingArea = require('../models/parkingAreaModel');

// Create a new parking area
const createParkingArea = async (req, res, next) => {
  try {
    const parkingArea = await ParkingArea.createParkingArea(req.body);
    res.status(201).json(parkingArea);
  } catch (error) {
    next(error);
  }
};

// Get all parking areas
const getAllParkingAreas = async (req, res, next) => {
  try {
    const parkingAreas = await ParkingArea.getAllParkingAreas();
    res.json(parkingAreas);
  } catch (error) {
    next(error);
  }
};

// Get a parking area by ID
const getParkingAreaById = async (req, res, next) => {
  try {
    const parkingArea = await ParkingArea.getParkingAreaById(req.params.id);
    if (!parkingArea) {
      const error = new Error('Parking area not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(parkingArea);
  } catch (error) {
    next(error);
  }
};

// Update a parking area
const updateParkingArea = async (req, res, next) => {
  try {
    const parkingArea = await ParkingArea.updateParkingArea(req.params.id, req.body);
    if (!parkingArea) {
      const error = new Error('Parking area not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(parkingArea);
  } catch (error) {
    next(error);
  }
};

// Delete a parking area
const deleteParkingArea = async (req, res, next) => {
  try {
    const parkingArea = await ParkingArea.deleteParkingArea(req.params.id);
    if (!parkingArea) {
      const error = new Error('Parking area not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Parking area deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createParkingArea,
  getAllParkingAreas,
  getParkingAreaById,
  updateParkingArea,
  deleteParkingArea,
};
