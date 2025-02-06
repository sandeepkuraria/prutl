// controllers/scoreController.js
const Score = require('../models/scoreModel');

// Create a new score
const createScore = async (req, res, next) => {
  try {
    const score = await Score.createScore(req.body);
    res.status(201).json(score);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all scores
const getAllScores = async (req, res, next) => {
  try {
    const scores = await Score.getAllScores();
    res.json(scores);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a score by ID
const getScoreById = async (req, res, next) => {
  try {
    const score = await Score.getScoreById(req.params.id);
    if (!score) {
      const error = new Error('Score not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(score);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a score
const updateScore = async (req, res, next) => {
  try {
    const score = await Score.updateScore(req.params.id, req.body);
    if (!score) {
      const error = new Error('Score not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(score);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a score
const deleteScore = async (req, res, next) => {
  try {
    const score = await Score.deleteScore(req.params.id);
    if (!score) {
      const error = new Error('Score not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Score deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createScore,
  getAllScores,
  getScoreById,
  updateScore,
  deleteScore,
};

// //controllers/scoreController.js
// const Score = require('../models/scoreModel');

// // Create a new score
// const createScore = async (req, res) => {
//   try {
//     const score = await Score.createScore(req.body);
//     res.status(201).json(score);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all scores
// const getAllScores = async (req, res) => {
//   try {
//     const scores = await Score.getAllScores();
//     res.json(scores);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a score by ID
// const getScoreById = async (req, res) => {
//   try {
//     const score = await Score.getScoreById(req.params.id);
//     if (!score) {
//       return res.status(404).json({ message: 'Score not found' });
//     }
//     res.json(score);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a score
// const updateScore = async (req, res) => {
//   try {
//     const score = await Score.updateScore(req.params.id, req.body);
//     if (!score) {
//       return res.status(404).json({ message: 'Score not found' });
//     }
//     res.json(score);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a score
// const deleteScore = async (req, res) => {
//   try {
//     const score = await Score.deleteScore(req.params.id);
//     if (!score) {
//       return res.status(404).json({ message: 'Score not found' });
//     }
//     res.json({ message: 'Score deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createScore,
//   getAllScores,
//   getScoreById,
//   updateScore,
//   deleteScore,
// };
