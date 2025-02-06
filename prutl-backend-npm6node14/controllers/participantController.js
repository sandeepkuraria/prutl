// //controllers/participantController.js
const Participant = require('../models/participantModel');

// Create a new participant entry
const createParticipant = async (req, res, next) => {
  try {
    const participant = await Participant.createParticipant(req.body);
    res.status(201).json(participant);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Get all participants
const getAllParticipants = async (req, res, next) => {
  try {
    const participants = await Participant.getAllParticipants();
    res.json(participants);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Get a participant by ID
const getParticipantById = async (req, res, next) => {
  try {
    const participant = await Participant.getParticipantById(req.params.id);
    if (!participant) {
      const error = new Error('Participant not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(participant);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Update a participant entry
const updateParticipant = async (req, res, next) => {
  try {
    const participant = await Participant.updateParticipant(req.params.id, req.body);
    if (!participant) {
      const error = new Error('Participant not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(participant);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Delete a participant entry
const deleteParticipant = async (req, res, next) => {
  try {
    const participant = await Participant.deleteParticipant(req.params.id);
    if (!participant) {
      const error = new Error('Participant not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Participant deleted successfully' });
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
};

// const Participant = require('../models/participantModel');

// // Create a new participant entry
// const createParticipant = async (req, res) => {
//   try {
//     const participant = await Participant.createParticipant(req.body);
//     res.status(201).json(participant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all participants
// const getAllParticipants = async (req, res) => {
//   try {
//     const participants = await Participant.getAllParticipants();
//     res.json(participants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a participant by ID
// const getParticipantById = async (req, res) => {
//   try {
//     const participant = await Participant.getParticipantById(req.params.id);
//     if (!participant) {
//       return res.status(404).json({ message: 'Participant not found' });
//     }
//     res.json(participant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a participant entry
// const updateParticipant = async (req, res) => {
//   try {
//     const participant = await Participant.updateParticipant(req.params.id, req.body);
//     if (!participant) {
//       return res.status(404).json({ message: 'Participant not found' });
//     }
//     res.json(participant);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a participant entry
// const deleteParticipant = async (req, res) => {
//   try {
//     const participant = await Participant.deleteParticipant(req.params.id);
//     if (!participant) {
//       return res.status(404).json({ message: 'Participant not found' });
//     }
//     res.json({ message: 'Participant deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createParticipant,
//   getAllParticipants,
//   getParticipantById,
//   updateParticipant,
//   deleteParticipant,
// };
