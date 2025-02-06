// //controllers/committeeMemberController.js

const CommitteeMember = require('../models/committeeMemberModel');

// Create a new committee member
const createCommitteeMember = async (req, res, next) => {
  try {
    const committeeMember = await CommitteeMember.createCommitteeMember(req.body);
    res.status(201).json(committeeMember);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all committee members
const getAllCommitteeMembers = async (req, res, next) => {
  try {
    const committeeMembers = await CommitteeMember.getAllCommitteeMembers();
    res.json(committeeMembers);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a committee member by ID
const getCommitteeMemberById = async (req, res, next) => {
  try {
    const committeeMember = await CommitteeMember.getCommitteeMemberById(req.params.id);
    if (!committeeMember) {
      const error = new Error('Committee member not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(committeeMember);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a committee member
const updateCommitteeMember = async (req, res, next) => {
  try {
    const committeeMember = await CommitteeMember.updateCommitteeMember(req.params.id, req.body);
    if (!committeeMember) {
      const error = new Error('Committee member not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(committeeMember);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a committee member
const deleteCommitteeMember = async (req, res, next) => {
  try {
    const committeeMember = await CommitteeMember.deleteCommitteeMember(req.params.id);
    if (!committeeMember) {
      const error = new Error('Committee member not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Committee member deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createCommitteeMember,
  getAllCommitteeMembers,
  getCommitteeMemberById,
  updateCommitteeMember,
  deleteCommitteeMember,
};


// //controllers/committeeMemberController.js
// const CommitteeMember = require('../models/committeeMemberModel');

// // Create a new committee member
// const createCommitteeMember = async (req, res) => {
//   try {
//     const committeeMember = await CommitteeMember.createCommitteeMember(req.body);
//     res.status(201).json(committeeMember);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all committee members
// const getAllCommitteeMembers = async (req, res) => {
//   try {
//     const committeeMembers = await CommitteeMember.getAllCommitteeMembers();
//     res.json(committeeMembers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a committee member by ID
// const getCommitteeMemberById = async (req, res) => {
//   try {
//     const committeeMember = await CommitteeMember.getCommitteeMemberById(req.params.id);
//     if (!committeeMember) {
//       return res.status(404).json({ message: 'Committee member not found' });
//     }
//     res.json(committeeMember);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a committee member
// const updateCommitteeMember = async (req, res) => {
//   try {
//     const committeeMember = await CommitteeMember.updateCommitteeMember(req.params.id, req.body);
//     if (!committeeMember) {
//       return res.status(404).json({ message: 'Committee member not found' });
//     }
//     res.json(committeeMember);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a committee member
// const deleteCommitteeMember = async (req, res) => {
//   try {
//     const committeeMember = await CommitteeMember.deleteCommitteeMember(req.params.id);
//     if (!committeeMember) {
//       return res.status(404).json({ message: 'Committee member not found' });
//     }
//     res.json({ message: 'Committee member deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createCommitteeMember,
//   getAllCommitteeMembers,
//   getCommitteeMemberById,
//   updateCommitteeMember,
//   deleteCommitteeMember,
// };
