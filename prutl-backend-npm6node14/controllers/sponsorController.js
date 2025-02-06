// //controllers/sponsorController.js

const Sponsor = require('../models/sponsorModel');

// Create a new sponsor entry
const createSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.createSponsor(req.body);
    res.status(201).json(sponsor);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all sponsors
const getAllSponsors = async (req, res, next) => {
  try {
    const sponsors = await Sponsor.getAllSponsors();
    res.json(sponsors);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a sponsor by ID
const getSponsorById = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.getSponsorById(req.params.id);
    if (!sponsor) {
      const error = new Error('Sponsor not found');
      error.statusCode = 404;
      throw error; // This will be caught and sent to the error handler middleware
    }
    res.json(sponsor);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a sponsor entry
const updateSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.updateSponsor(req.params.id, req.body);
    if (!sponsor) {
      const error = new Error('Sponsor not found');
      error.statusCode = 404;
      throw error; // This will be caught and sent to the error handler middleware
    }
    res.json(sponsor);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a sponsor entry
const deleteSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.deleteSponsor(req.params.id);
    if (!sponsor) {
      const error = new Error('Sponsor not found');
      error.statusCode = 404;
      throw error; // This will be caught and sent to the error handler middleware
    }
    res.json({ message: 'Sponsor deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createSponsor,
  getAllSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
};


// //controllers/sponsorController.js
// const Sponsor = require('../models/sponsorModel');

// // Create a new sponsor entry
// const createSponsor = async (req, res) => {
//   try {
//     const sponsor = await Sponsor.createSponsor(req.body);
//     res.status(201).json(sponsor);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all sponsors
// const getAllSponsors = async (req, res) => {
//   try {
//     const sponsors = await Sponsor.getAllSponsors();
//     res.json(sponsors);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a sponsor by ID
// const getSponsorById = async (req, res) => {
//   try {
//     const sponsor = await Sponsor.getSponsorById(req.params.id);
//     if (!sponsor) {
//       return res.status(404).json({ message: 'Sponsor not found' });
//     }
//     res.json(sponsor);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a sponsor entry
// const updateSponsor = async (req, res) => {
//   try {
//     const sponsor = await Sponsor.updateSponsor(req.params.id, req.body);
//     if (!sponsor) {
//       return res.status(404).json({ message: 'Sponsor not found' });
//     }
//     res.json(sponsor);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a sponsor entry
// const deleteSponsor = async (req, res) => {
//   try {
//     const sponsor = await Sponsor.deleteSponsor(req.params.id);
//     if (!sponsor) {
//       return res.status(404).json({ message: 'Sponsor not found' });
//     }
//     res.json({ message: 'Sponsor deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createSponsor,
//   getAllSponsors,
//   getSponsorById,
//   updateSponsor,
//   deleteSponsor,
// };
