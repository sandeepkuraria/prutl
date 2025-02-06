// //controllers/teamMemberController.js

// const TeamMember = require('../models/teamMemberModel');

// // // Create a new Team Member in the database, passing the profile picture URL
// // const createTeamMember = async (req, res, next) => {
// //   try {
// //     // If a profile picture is uploaded, get its URL
// //  const profilePictureUrl = req.file
// //  ? `/uploads/profile_pictures/${req.file.filename}`
// //  : null;

// //     const teamMember = await TeamMember.createTeamMember({...req.body, profile_picture_url: profilePictureUrl});
// //     res.status(201).json(teamMember);
// //   } catch (error) {
// //     next(error); // Forward error to error-handling middleware
// //   }
// // };

// // Create a new Team Member
// const createTeamMember = async (req, res, next) => {
//   try {
//     const teamMember = await TeamMember.createTeamMember(req.body);
//     res.status(201).json(teamMember);
//   } catch (error) {
//     next(error); // Forward error to error-handling middleware
//   }
// };

// // Get all Team Members
// const getAllTeamMembers = async (req, res, next) => {
//   try {
//     const teamMembers = await TeamMember.getAllTeamMembers();
//     res.json(teamMembers);
//   } catch (error) {
//     next(error); // Forward error to error-handling middleware
//   }
// };

// // Get a Team Member by ID
// const getTeamMemberById = async (req, res, next) => {
//   try {
//     const teamMember = await TeamMember.getTeamMemberById(req.params.id);
//     if (!teamMember) {
//       const error = new Error('Team Member not found');
//       error.statusCode = 404;
//       throw error;
//     }
//     res.json(teamMember);
//   } catch (error) {
//     next(error); // Forward error to error-handling middleware
//   }
// };

// // Update a Team Member
// const updateTeamMember = async (req, res, next) => {
//   try {
//     const teamMember = await TeamMember.updateTeamMember(req.params.id, req.body);
//     if (!teamMember) {
//       const error = new Error('Team Member not found');
//       error.statusCode = 404;
//       throw error;
//     }
//     res.json(teamMember);
//   } catch (error) {
//     next(error); // Forward error to error-handling middleware
//   }
// };

// // Delete a Team Member
// const deleteTeamMember = async (req, res, next) => {
//   try {
//     const teamMember = await TeamMember.deleteTeamMember(req.params.id);
//     if (!teamMember) {
//       const error = new Error('Team Member not found');
//       error.statusCode = 404;
//       throw error;
//     }
//     res.json({ message: 'Team Member deleted successfully' });
//   } catch (error) {
//     next(error); // Forward error to error-handling middleware
//   }
// };

// module.exports = {
//   createTeamMember,
//   getAllTeamMembers,
//   getTeamMemberById,
//   updateTeamMember,
//   deleteTeamMember,
// };

const TeamMember = require("../models/teamMemberModel");

// Create a new Team Member
const createTeamMember = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.createTeamMember(req.body);
    res.status(201).json(teamMember);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

// Get all Team Members
const getAllTeamMembers = async (req, res, next) => {
  try {
    const teamMembers = await TeamMember.getAllTeamMembers();
    res.json(teamMembers);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

// Get a Team Member by ID
const getTeamMemberById = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.getTeamMemberById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: "Team Member not found" });
    }
    res.json(teamMember);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

// Update a Team Member
const updateTeamMember = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.updateTeamMember(
      req.params.id,
      req.body
    );
    if (!teamMember) {
      return res.status(404).json({ message: "Team Member not found" });
    }
    res.json(teamMember);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a Team Member
const deleteTeamMember = async (req, res, next) => {
  try {
    const teamMember = await TeamMember.deleteTeamMember(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: "Team Member not found" });
    }
    res.json({ message: "Team Member deleted successfully" });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
};
