// //controllers/hallController.js
const Hall = require('../models/hallModel');

// Create a new Hall
const createHall = async (req, res, next) => {
  try {
    const hall = await Hall.createHall(req.body);
    res.status(201).json(hall);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all Halls
const getAllHalls = async (req, res, next) => {
  try {
    const halls = await Hall.getAllHalls();
    res.json(halls);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a Hall by ID
const getHallById = async (req, res, next) => {
  try {
    const hall = await Hall.getHallById(req.params.id);
    if (!hall) {
      const error = new Error('Hall not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(hall);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a Hall
const updateHall = async (req, res, next) => {
  try {
    const hall = await Hall.updateHall(req.params.id, req.body);
    if (!hall) {
      const error = new Error('Hall not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(hall);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a Hall
const deleteHall = async (req, res, next) => {
  try {
    const hall = await Hall.deleteHall(req.params.id);
    if (!hall) {
      const error = new Error('Hall not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Hall deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createHall,
  getAllHalls,
  getHallById,
  updateHall,
  deleteHall,
};

// //controllers/hallController.js

// const Hall = require('../models/hallModel');

// const createHall = async (req, res) => {
//   try {
//     const hall = await Hall.createHall(req.body);
//     res.status(201).json(hall);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getAllHalls = async (req, res) => {
//   try {
//     const halls = await Hall.getAllHalls();
//     res.json(halls);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getHallById = async (req, res) => {
//   try {
//     const hall = await Hall.getHallById(req.params.id);
//     if (!hall) {
//       return res.status(404).json({ message: 'Hall not found' });
//     }
//     res.json(hall);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateHall = async (req, res) => {
//   try {
//     const hall = await Hall.updateHall(req.params.id, req.body);
//     if (!hall) {
//       return res.status(404).json({ message: 'Hall not found' });
//     }
//     res.json(hall);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteHall = async (req, res) => {
//   try {
//     const hall = await Hall.deleteHall(req.params.id);
//     if (!hall) {
//       return res.status(404).json({ message: 'Hall not found' });
//     }
//     res.json({ message: 'Hall deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createHall,
//   getAllHalls,
//   getHallById,
//   updateHall,
//   deleteHall,
// };
