 // controllers/prutlFrameworkDimensionController.js

const PrutlDimension = require('../models/prutlFrameworkDimensionModel');

// Create a new PRUTL Framework Dimension
const createPrutlDimension = async (req, res, next) => {
  try {
 // Assume some validation logic here, if validation fails:
 if (!req.body.prutl_name) {
  const error = new Error('PRUTL name is required');
  error.statusCode = 400;  // Bad Request
  throw error;
}
 if (!req.body.description) {
  const error = new Error('Description is required');
  error.statusCode = 400;  // Bad Request
  throw error;
}

    const dimension = await PrutlDimension.createPrutlDimension(req.body);
    res.status(201).json(dimension);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all PRUTL Framework Dimensions
const getAllPrutlDimensions = async (req, res, next) => {
  try {
    const dimensions = await PrutlDimension.getAllPrutlDimensions();
    res.json(dimensions);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a PRUTL Framework Dimension by ID
const getPrutlDimensionById = async (req, res, next) => {
  try {
    const dimension = await PrutlDimension.getPrutlDimensionById(req.params.id);
    if (!dimension) {
      const error = new Error('PRUTL Framework Dimension not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(dimension);
  } catch (error) {
    next(error);
  }
};

// Update a PRUTL Framework Dimension
const updatePrutlDimension = async (req, res, next) => {
  try {
    const dimension = await PrutlDimension.updatePrutlDimension(req.params.id, req.body);
    if (!dimension) {
      const error = new Error('PRUTL Framework Dimension not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(dimension);
  } catch (error) {
    next(error);
  }
};

// Delete a PRUTL Framework Dimension
const deletePrutlDimension = async (req, res, next) => {
  try {
    const dimension = await PrutlDimension.deletePrutlDimension(req.params.id);
    if (!dimension) {
      const error = new Error('PRUTL Framework Dimension not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'PRUTL Framework Dimension deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPrutlDimension,
  getAllPrutlDimensions,
  getPrutlDimensionById,
  updatePrutlDimension,
  deletePrutlDimension,
};

// // controllers/prutlFrameworkDimensionController.js

// const PrutlDimension = require('../models/prutlFrameworkDimensionModel');

// // Create a new PRUTL Framework Dimension
// const createPrutlDimension = async (req, res) => {
//   try {
//     const dimension = await PrutlDimension.createPrutlDimension(req.body);
//     res.status(201).json(dimension);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all PRUTL Framework Dimensions
// const getAllPrutlDimensions = async (req, res) => {
//   try {
//     const dimensions = await PrutlDimension.getAllPrutlDimensions();
//     res.json(dimensions);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a PRUTL Framework Dimension by ID
// const getPrutlDimensionById = async (req, res) => {
//   try {
//     const dimension = await PrutlDimension.getPrutlDimensionById(req.params.id);
//     if (!dimension) {
//       return res.status(404).json({ message: 'PRUTL Framework Dimension not found' });
//     }
//     res.json(dimension);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a PRUTL Framework Dimension
// const updatePrutlDimension = async (req, res) => {
//   try {
//     const dimension = await PrutlDimension.updatePrutlDimension(req.params.id, req.body);
//     if (!dimension) {
//       return res.status(404).json({ message: 'PRUTL Framework Dimension not found' });
//     }
//     res.json(dimension);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a PRUTL Framework Dimension
// const deletePrutlDimension = async (req, res) => {
//   try {
//     const dimension = await PrutlDimension.deletePrutlDimension(req.params.id);
//     if (!dimension) {
//       return res.status(404).json({ message: 'PRUTL Framework Dimension not found' });
//     }
//     res.json({ message: 'PRUTL Framework Dimension deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createPrutlDimension,
//   getAllPrutlDimensions,
//   getPrutlDimensionById,
//   updatePrutlDimension,
//   deletePrutlDimension,
// };
