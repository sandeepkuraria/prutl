// //controllers/committeeController.js

const Committee = require('../models/committeeModel');

// Create a new committee entry
const createCommittee = async (req, res, next) => {
  try {
    const committee = await Committee.createCommittee(req.body);
    res.status(201).json(committee);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get all committees
const getAllCommittees = async (req, res, next) => {
  try {
    const committees = await Committee.getAllCommittees();
    res.json(committees);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get a committee by ID
const getCommitteeById = async (req, res, next) => {
  try {
    const committee = await Committee.getCommitteeById(req.params.id);
    if (!committee) {
      const error = new Error('Committee not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(committee);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Update a committee entry
const updateCommittee = async (req, res, next) => {
  try {
    const committee = await Committee.updateCommittee(req.params.id, req.body);
    if (!committee) {
      const error = new Error('Committee not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(committee);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Delete a committee entry
const deleteCommittee = async (req, res, next) => {
  try {
    const committee = await Committee.deleteCommittee(req.params.id);
    if (!committee) {
      const error = new Error('Committee not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Committee deleted successfully' });
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

module.exports = {
  createCommittee,
  getAllCommittees,
  getCommitteeById,
  updateCommittee,
  deleteCommittee,
};



// const Committee = require('../models/committeeModel');

// // Create a new committee entry
// const createCommittee = async (req, res) => {
//   try {
//     const committee = await Committee.createCommittee(req.body);
//     res.status(201).json(committee);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all committees
// const getAllCommittees = async (req, res) => {
//   try {
//     const committees = await Committee.getAllCommittees();
//     res.json(committees);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a committee by ID
// const getCommitteeById = async (req, res) => {
//   try {
//     const committee = await Committee.getCommitteeById(req.params.id);
//     if (!committee) {
//       return res.status(404).json({ message: 'Committee not found' });
//     }
//     res.json(committee);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a committee entry
// const updateCommittee = async (req, res) => {
//   try {
//     const committee = await Committee.updateCommittee(req.params.id, req.body);
//     if (!committee) {
//       return res.status(404).json({ message: 'Committee not found' });
//     }
//     res.json(committee);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a committee entry
// const deleteCommittee = async (req, res) => {
//   try {
//     const committee = await Committee.deleteCommittee(req.params.id);
//     if (!committee) {
//       return res.status(404).json({ message: 'Committee not found' });
//     }
//     res.json({ message: 'Committee deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createCommittee,
//   getAllCommittees,
//   getCommitteeById,
//   updateCommittee,
//   deleteCommittee,
// };
