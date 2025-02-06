// controllers/awardController.js
const Award = require('../models/awardModel');

// Create a new award
const createAward = async (req, res, next) => {
  try {
    const award = await Award.createAward(req.body);
    res.status(201).json(award);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all awards
const getAllAwards = async (req, res, next) => {
  try {
    const awards = await Award.getAllAwards();
    res.json(awards);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get an award by ID
const getAwardById = async (req, res, next) => {
  try {
    const award = await Award.getAwardById(req.params.id);
    if (!award) {
      const error = new Error('Award not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(award);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update an award
const updateAward = async (req, res, next) => {
  try {
    const award = await Award.updateAward(req.params.id, req.body);
    if (!award) {
      const error = new Error('Award not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(award);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete an award
const deleteAward = async (req, res, next) => {
  try {
    const award = await Award.deleteAward(req.params.id);
    if (!award) {
      const error = new Error('Award not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Award deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createAward,
  getAllAwards,
  getAwardById,
  updateAward,
  deleteAward,
};

// //controllers/awardController.js
// const Award = require('../models/awardModel');

// // Create a new award
// const createAward = async (req, res) => {
//   try {
//     const award = await Award.createAward(req.body);
//     res.status(201).json(award);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all awards
// const getAllAwards = async (req, res) => {
//   try {
//     const awards = await Award.getAllAwards();
//     res.json(awards);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get an award by ID
// const getAwardById = async (req, res) => {
//   try {
//     const award = await Award.getAwardById(req.params.id);
//     if (!award) {
//       return res.status(404).json({ message: 'Award not found' });
//     }
//     res.json(award);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an award
// const updateAward = async (req, res) => {
//   try {
//     const award = await Award.updateAward(req.params.id, req.body);
//     if (!award) {
//       return res.status(404).json({ message: 'Award not found' });
//     }
//     res.json(award);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete an award
// const deleteAward = async (req, res) => {
//   try {
//     const award = await Award.deleteAward(req.params.id);
//     if (!award) {
//       return res.status(404).json({ message: 'Award not found' });
//     }
//     res.json({ message: 'Award deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createAward,
//   getAllAwards,
//   getAwardById,
//   updateAward,
//   deleteAward,
// };
