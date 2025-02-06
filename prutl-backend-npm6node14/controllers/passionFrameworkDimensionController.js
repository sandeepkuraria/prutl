// //controllers/passionFrameworkDimensionController.js
const Dimension = require('../models/passionFrameworkDimensionModel');

// Create a new dimension
const createDimension = async (req, res, next) => {
  try {
    const dimension = await Dimension.createDimension(req.body);
    res.status(201).json(dimension);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all dimensions
const getAllDimensions = async (req, res, next) => {
  try {
    const dimensions = await Dimension.getAllDimensions();
    res.json(dimensions);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a dimension by ID
const getDimensionById = async (req, res, next) => {
  try {
    const dimension = await Dimension.getDimensionById(req.params.id);
    if (!dimension) {
      const error = new Error('Dimension not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(dimension);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a dimension
const updateDimension = async (req, res, next) => {
  try {
    const dimension = await Dimension.updateDimension(req.params.id, req.body);
    if (!dimension) {
      const error = new Error('Dimension not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(dimension);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a dimension
const deleteDimension = async (req, res, next) => {
  try {
    const dimension = await Dimension.deleteDimension(req.params.id);
    if (!dimension) {
      const error = new Error('Dimension not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Dimension deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createDimension,
  getAllDimensions,
  getDimensionById,
  updateDimension,
  deleteDimension,
};

// const Dimension = require('../models/passionFrameworkDimensionModel');

// // Create a new dimension
// const createDimension = async (req, res) => {
//   try {
//     const dimension = await Dimension.createDimension(req.body);
//     res.status(201).json(dimension);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all dimensions
// const getAllDimensions = async (req, res) => {
//   try {
//     const dimensions = await Dimension.getAllDimensions();
//     res.json(dimensions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a dimension by ID
// const getDimensionById = async (req, res) => {
//   try {
//     const dimension = await Dimension.getDimensionById(req.params.id);
//     if (!dimension) {
//       return res.status(404).json({ message: 'Dimension not found' });
//     }
//     res.json(dimension);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a dimension
// const updateDimension = async (req, res) => {
//   try {
//     const dimension = await Dimension.updateDimension(req.params.id, req.body);
//     if (!dimension) {
//       return res.status(404).json({ message: 'Dimension not found' });
//     }
//     res.json(dimension);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a dimension
// const deleteDimension = async (req, res) => {
//   try {
//     const dimension = await Dimension.deleteDimension(req.params.id);
//     if (!dimension) {
//       return res.status(404).json({ message: 'Dimension not found' });
//     }
//     res.json({ message: 'Dimension deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createDimension,
//   getAllDimensions,
//   getDimensionById,
//   updateDimension,
//   deleteDimension,
// };
