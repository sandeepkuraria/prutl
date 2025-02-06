// //controllers/teamController.js
const fs = require("fs");
const path = require("path");
const Team = require("../models/teamModel");

// // Create a new team entry
// const createTeam = async (req, res, next) => {
//   try {
//     const team = await Team.createTeam(req.body);
//     res.status(201).json(team);
//   } catch (error) {
//     next(error); // Forward error to error-handling middleware
//   }
// };

// Create a new Team in the database, passing the team icon URL
const createTeam = async (req, res, next) => {
  try {
    // If a profile picture is uploaded, get its URL
    const teamIconUrl = req.file
      ? `/uploads/profile_pictures/${req.file.filename}`
      : null;

    const team = await Team.createTeam({
      ...req.body,
      team_icon_url: teamIconUrl,
    });
    res.status(201).json(team);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all teams
const getAllTeams = async (req, res, next) => {
  try {
    const teams = await Team.getAllTeams();
    res.json(teams);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a team by ID
const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.getTeamById(req.params.id);
    if (!team) {
      const error = new Error("Team not found");
      error.statusCode = 404;
      throw error;
    }
    res.json(team);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a team entry
const updateTeam = async (req, res, next) => {
  try {
    console.log("Request body in updateTeam:", req.body);
    console.log("Uploaded file in updateTeam:", req.file);
    const team = await Team.getTeamById(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });

    if (team.team_icon_url && req.file) {
      const oldPicturePath = path.join(__dirname, "..", team.team_icon_url);
      if (fs.existsSync(oldPicturePath)) fs.unlinkSync(oldPicturePath);
    }

const teamIconUrl = req.file?`/uploads/profile_pictures/${req.file.filename}`
      : team.team_icon_url;

    const updatedTeam = await Team.updateTeam(req.params.id, {...req.body,team_icon_url:teamIconUrl});
   
    res.status(201).json(updatedTeam);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a team entry
const deleteTeam = async (req, res, next) => {
  try {
    const team = await Team.deleteTeam(req.params.id);
    if (!team) {
      const error = new Error("Team not found");
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: "Team deleted successfully" });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};

// const Team = require('../models/teamModel');

// // Create a new team entry
// const createTeam = async (req, res) => {
//   try {
//     const team = await Team.createTeam(req.body);
//     res.status(201).json(team);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all teams
// const getAllTeams = async (req, res) => {
//   try {
//     const teams = await Team.getAllTeams();
//     res.json(teams);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a team by ID
// const getTeamById = async (req, res) => {
//   try {
//     const team = await Team.getTeamById(req.params.id);
//     if (!team) {
//       return res.status(404).json({ message: 'Team not found' });
//     }
//     res.json(team);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a team entry
// const updateTeam = async (req, res) => {
//   try {
//     const team = await Team.updateTeam(req.params.id, req.body);
//     if (!team) {
//       return res.status(404).json({ message: 'Team not found' });
//     }
//     res.json(team);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a team entry
// const deleteTeam = async (req, res) => {
//   try {
//     const team = await Team.deleteTeam(req.params.id);
//     if (!team) {
//       return res.status(404).json({ message: 'Team not found' });
//     }
//     res.json({ message: 'Team deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createTeam,
//   getAllTeams,
//   getTeamById,
//   updateTeam,
//   deleteTeam,
// };
