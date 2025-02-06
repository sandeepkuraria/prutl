// // controllers/dimensionScoreController.js
const DimensionScore = require('../models/dimensionScoreModel');

// Create a new dimension score
const createDimensionScore = async (req, res, next) => {
  try {
    const dimensionScore = await DimensionScore.createDimensionScore(req.body);
    res.status(201).json(dimensionScore);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get all dimension scores
const getAllDimensionScores = async (req, res, next) => {
  try {
    const dimensionScores = await DimensionScore.getAllDimensionScores();
    res.json(dimensionScores);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get a dimension score by ID
const getDimensionScoreById = async (req, res, next) => {
  try {
    const dimensionScore = await DimensionScore.getDimensionScoreById(req.params.id);
    if (!dimensionScore) {
      const error = new Error('Dimension score not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(dimensionScore);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Update a dimension score
const updateDimensionScore = async (req, res, next) => {
  try {
    const dimensionScore = await DimensionScore.updateDimensionScore(req.params.id, req.body);
    if (!dimensionScore) {
      const error = new Error('Dimension score not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(dimensionScore);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Delete a dimension score
const deleteDimensionScore = async (req, res, next) => {
  try {
    const dimensionScore = await DimensionScore.deleteDimensionScore(req.params.id);
    if (!dimensionScore) {
      const error = new Error('Dimension score not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Dimension score deleted successfully' });
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

module.exports = {
  createDimensionScore,
  getAllDimensionScores,
  getDimensionScoreById,
  updateDimensionScore,
  deleteDimensionScore,
};

// const DimensionScore = require('../models/dimensionScoreModel');

// // Create a new dimension score
// const createDimensionScore = async (req, res) => {
//   try {
//     const dimensionScore = await DimensionScore.createDimensionScore(req.body);
//     res.status(201).json(dimensionScore);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all dimension scores
// const getAllDimensionScores = async (req, res) => {
//   try {
//     const dimensionScores = await DimensionScore.getAllDimensionScores();
//     res.json(dimensionScores);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a dimension score by ID
// const getDimensionScoreById = async (req, res) => {
//   try {
//     const dimensionScore = await DimensionScore.getDimensionScoreById(req.params.id);
//     if (!dimensionScore) {
//       return res.status(404).json({ message: 'Dimension score not found' });
//     }
//     res.json(dimensionScore);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a dimension score
// const updateDimensionScore = async (req, res) => {
//   try {
//     const dimensionScore = await DimensionScore.updateDimensionScore(req.params.id, req.body);
//     if (!dimensionScore) {
//       return res.status(404).json({ message: 'Dimension score not found' });
//     }
//     res.json(dimensionScore);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a dimension score
// const deleteDimensionScore = async (req, res) => {
//   try {
//     const dimensionScore = await DimensionScore.deleteDimensionScore(req.params.id);
//     if (!dimensionScore) {
//       return res.status(404).json({ message: 'Dimension score not found' });
//     }
//     res.json({ message: 'Dimension score deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createDimensionScore,
//   getAllDimensionScores,
//   getDimensionScoreById,
//   updateDimensionScore,
//   deleteDimensionScore,
// };
