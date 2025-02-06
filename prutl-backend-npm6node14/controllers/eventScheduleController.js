// controllers/eventScheduleController.js
const EventSchedule = require('../models/eventScheduleModel');

// Create a new event schedule entry
const createEventSchedule = async (req, res, next) => {
  try {
    const schedule = await EventSchedule.createEventSchedule(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all event schedule entries
const getAllEventSchedules = async (req, res, next) => {
  try {
    const schedules = await EventSchedule.getAllEventSchedules();
    res.json(schedules);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get an event schedule entry by ID
const getEventScheduleById = async (req, res, next) => {
  try {
    const schedule = await EventSchedule.getEventScheduleById(req.params.id);
    if (!schedule) {
      const error = new Error('Event Schedule not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(schedule);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update an event schedule entry
const updateEventSchedule = async (req, res, next) => {
  try {
    const schedule = await EventSchedule.updateEventSchedule(req.params.id, req.body);
    if (!schedule) {
      const error = new Error('Event Schedule not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(schedule);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete an event schedule entry
const deleteEventSchedule = async (req, res, next) => {
  try {
    const schedule = await EventSchedule.deleteEventSchedule(req.params.id);
    if (!schedule) {
      const error = new Error('Event Schedule not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Event Schedule deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createEventSchedule,
  getAllEventSchedules,
  getEventScheduleById,
  updateEventSchedule,
  deleteEventSchedule,
};


// //controllers/eventScheduleController.js
// const EventSchedule = require('../models/eventScheduleModel');

// // Create a new event schedule entry
// const createEventSchedule = async (req, res) => {
//   try {
//     const schedule = await EventSchedule.createEventSchedule(req.body);
//     res.status(201).json(schedule);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all event schedule entries
// const getAllEventSchedules = async (req, res) => {
//   try {
//     const schedules = await EventSchedule.getAllEventSchedules();
//     res.json(schedules);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get an event schedule entry by ID
// const getEventScheduleById = async (req, res) => {
//   try {
//     const schedule = await EventSchedule.getEventScheduleById(req.params.id);
//     if (!schedule) {
//       return res.status(404).json({ message: 'Event Schedule not found' });
//     }
//     res.json(schedule);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an event schedule entry
// const updateEventSchedule = async (req, res) => {
//   try {
//     const schedule = await EventSchedule.updateEventSchedule(req.params.id, req.body);
//     if (!schedule) {
//       return res.status(404).json({ message: 'Event Schedule not found' });
//     }
//     res.json(schedule);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete an event schedule entry
// const deleteEventSchedule = async (req, res) => {
//   try {
//     const schedule = await EventSchedule.deleteEventSchedule(req.params.id);
//     if (!schedule) {
//       return res.status(404).json({ message: 'Event Schedule not found' });
//     }
//     res.json({ message: 'Event Schedule deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createEventSchedule,
//   getAllEventSchedules,
//   getEventScheduleById,
//   updateEventSchedule,
//   deleteEventSchedule,
// };
