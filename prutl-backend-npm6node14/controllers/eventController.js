// //controllers/eventController.js

const Event = require('../models/eventModel');

// Create a new event
const createEvent = async (req, res, next) => {
  try {
    const event = await Event.createEvent(req.body);
    res.status(201).json(event);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all events
const getAllEvents = async (req, res, next) => {
  try {
    const events = await Event.getAllEvents();
    res.json(events);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get an event by ID
const getEventById = async (req, res, next) => {
  try {
    const event = await Event.getEventById(req.params.id);
    if (!event) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(event);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update an event
const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.updateEvent(req.params.id, req.body);
    if (!event) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(event);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete an event
const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.deleteEvent(req.params.id);
    if (!event) {
      const error = new Error('Event not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};

// //controllers/eventController.js
// const Event = require('../models/eventModel');

// // Create a new event
// const createEvent = async (req, res) => {
//   try {
//     const event = await Event.createEvent(req.body);
//     res.status(201).json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all events
// const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.getAllEvents();
//     res.json(events);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get an event by ID
// const getEventById = async (req, res) => {
//   try {
//     const event = await Event.getEventById(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an event
// const updateEvent = async (req, res) => {
//   try {
//     const event = await Event.updateEvent(req.params.id, req.body);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.json(event);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete an event
// const deleteEvent = async (req, res) => {
//   try {
//     const event = await Event.deleteEvent(req.params.id);
//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }
//     res.json({ message: 'Event deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   updateEvent,
//   deleteEvent,
// };
