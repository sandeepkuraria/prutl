// //controllers/sponsorshipController.js

const Sponsorship = require('../models/sponsorshipModel');

// Create a new sponsorship
const createSponsorship = async (req, res, next) => {
  try {
    const sponsorship = await Sponsorship.createSponsorship(req.body);
    res.status(201).json(sponsorship);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all sponsorships
const getAllSponsorships = async (req, res, next) => {
  try {
    const sponsorships = await Sponsorship.getAllSponsorships();
    res.json(sponsorships);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a sponsorship by ID
const getSponsorshipById = async (req, res, next) => {
  try {
    const sponsorship = await Sponsorship.getSponsorshipById(req.params.id);
    if (!sponsorship) {
      const error = new Error('Sponsorship not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(sponsorship);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a sponsorship
const updateSponsorship = async (req, res, next) => {
  try {
    const sponsorship = await Sponsorship.updateSponsorship(req.params.id, req.body);
    if (!sponsorship) {
      const error = new Error('Sponsorship not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(sponsorship);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a sponsorship
const deleteSponsorship = async (req, res, next) => {
  try {
    const sponsorship = await Sponsorship.deleteSponsorship(req.params.id);
    if (!sponsorship) {
      const error = new Error('Sponsorship not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Sponsorship deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createSponsorship,
  getAllSponsorships,
  getSponsorshipById,
  updateSponsorship,
  deleteSponsorship,
};

// const Sponsorship = require('../models/sponsorshipModel');

// // Create a new sponsorship
// const createSponsorship = async (req, res) => {
//   try {
//     const sponsorship = await Sponsorship.createSponsorship(req.body);
//     res.status(201).json(sponsorship);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all sponsorships
// const getAllSponsorships = async (req, res) => {
//   try {
//     const sponsorships = await Sponsorship.getAllSponsorships();
//     res.json(sponsorships);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a sponsorship by ID
// const getSponsorshipById = async (req, res) => {
//   try {
//     const sponsorship = await Sponsorship.getSponsorshipById(req.params.id);
//     if (!sponsorship) {
//       return res.status(404).json({ message: 'Sponsorship not found' });
//     }
//     res.json(sponsorship);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a sponsorship
// const updateSponsorship = async (req, res) => {
//   try {
//     const sponsorship = await Sponsorship.updateSponsorship(req.params.id, req.body);
//     if (!sponsorship) {
//       return res.status(404).json({ message: 'Sponsorship not found' });
//     }
//     res.json(sponsorship);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a sponsorship
// const deleteSponsorship = async (req, res) => {
//   try {
//     const sponsorship = await Sponsorship.deleteSponsorship(req.params.id);
//     if (!sponsorship) {
//       return res.status(404).json({ message: 'Sponsorship not found' });
//     }
//     res.json({ message: 'Sponsorship deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createSponsorship,
//   getAllSponsorships,
//   getSponsorshipById,
//   updateSponsorship,
//   deleteSponsorship,
// };
