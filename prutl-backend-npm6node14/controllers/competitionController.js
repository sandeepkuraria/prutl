const Competition = require('../models/competitionModel');

// Create a new competition
const createCompetition = async (req, res, next) => {
  try {
    const competition = await Competition.createCompetition(req.body);
    res.status(201).json(competition);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all competitions
const getAllCompetitions = async (req, res, next) => {
  try {
    const competitions = await Competition.getAllCompetitions();
    res.json(competitions);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a competition by ID
const getCompetitionById = async (req, res, next) => {
  try {
    const competition = await Competition.getCompetitionById(req.params.id);
    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(competition);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a competition
const updateCompetition = async (req, res, next) => {
  try {
    const competition = await Competition.updateCompetition(req.params.id, req.body);
    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(competition);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a competition
const deleteCompetition = async (req, res, next) => {
  try {
    const competition = await Competition.deleteCompetition(req.params.id);
    if (!competition) {
      const error = new Error('Competition not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Competition deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createCompetition,
  getAllCompetitions,
  getCompetitionById,
  updateCompetition,
  deleteCompetition,
};

// //controllers/competitionController.js
// const Competition = require('../models/competitionModel');

// // Create a new competition
// const createCompetition = async (req, res) => {
//   try {
//     const competition = await Competition.createCompetition(req.body);
//     res.status(201).json(competition);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all competitions
// const getAllCompetitions = async (req, res) => {
//   try {
//     const competitions = await Competition.getAllCompetitions();
//     res.json(competitions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a competition by ID
// const getCompetitionById = async (req, res) => {
//   try {
//     const competition = await Competition.getCompetitionById(req.params.id);
//     if (!competition) {
//       return res.status(404).json({ message: 'Competition not found' });
//     }
//     res.json(competition);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a competition
// const updateCompetition = async (req, res) => {
//   try {
//     const competition = await Competition.updateCompetition(req.params.id, req.body);
//     if (!competition) {
//       return res.status(404).json({ message: 'Competition not found' });
//     }
//     res.json(competition);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a competition
// const deleteCompetition = async (req, res) => {
//   try {
//     const competition = await Competition.deleteCompetition(req.params.id);
//     if (!competition) {
//       return res.status(404).json({ message: 'Competition not found' });
//     }
//     res.json({ message: 'Competition deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createCompetition,
//   getAllCompetitions,
//   getCompetitionById,
//   updateCompetition,
//   deleteCompetition,
// };
