// //controllers/venueController.js

const Venue = require('../models/venueModel');

// Create a new venue
const createVenue = async (req, res, next) => {
  try {
    const venue = await Venue.createVenue(req.body);
    res.status(201).json(venue);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all venues
const getAllVenues = async (req, res, next) => {
  try {
    const venues = await Venue.getAllVenues();
    res.json(venues);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a venue by ID
const getVenueById = async (req, res, next) => {
  try {
    const venue = await Venue.getVenueById(req.params.id);
    if (!venue) {
      const error = new Error('Venue not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(venue);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a venue
const updateVenue = async (req, res, next) => {
  try {
    const venue = await Venue.updateVenue(req.params.id, req.body);
    if (!venue) {
      const error = new Error('Venue not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(venue);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a venue
const deleteVenue = async (req, res, next) => {
  try {
    const venue = await Venue.deleteVenue(req.params.id);
    if (!venue) {
      const error = new Error('Venue not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Venue deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
};

// //controllers/venueController.js
// const Venue = require('../models/venueModel');

// // Create a new venue
// const createVenue = async (req, res) => {
//   try {
//     const venue = await Venue.createVenue(req.body);
//     res.status(201).json(venue);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all venues
// const getAllVenues = async (req, res) => {
//   try {
//     const venues = await Venue.getAllVenues();
//     res.json(venues);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a venue by ID
// const getVenueById = async (req, res) => {
//   try {
//     const venue = await Venue.getVenueById(req.params.id);
//     if (!venue) {
//       return res.status(404).json({ message: 'Venue not found' });
//     }
//     res.json(venue);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a venue
// const updateVenue = async (req, res) => {
//   try {
//     const venue = await Venue.updateVenue(req.params.id, req.body);
//     if (!venue) {
//       return res.status(404).json({ message: 'Venue not found' });
//     }
//     res.json(venue);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a venue
// const deleteVenue = async (req, res) => {
//   try {
//     const venue = await Venue.deleteVenue(req.params.id);
//     if (!venue) {
//       return res.status(404).json({ message: 'Venue not found' });
//     }
//     res.json({ message: 'Venue deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createVenue,
//   getAllVenues,
//   getVenueById,
//   updateVenue,
//   deleteVenue,
// };
