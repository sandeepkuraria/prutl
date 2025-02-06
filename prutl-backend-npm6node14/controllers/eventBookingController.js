// //controllers/eventBookingController.js

const EventBooking = require('../models/eventBookingModel');

// Create a new event booking
const createEventBooking = async (req, res, next) => {
  try {
    const eventBooking = await EventBooking.createEventBooking(req.body);
    res.status(201).json(eventBooking);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get all event bookings
const getAllEventBookings = async (req, res, next) => {
  try {
    const eventBookings = await EventBooking.getAllEventBookings();
    res.json(eventBookings);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get a specific event booking by ID
const getEventBookingById = async (req, res, next) => {
  try {
    const eventBooking = await EventBooking.getEventBookingById(req.params.id);
    if (!eventBooking) {
      const error = new Error('Event Booking not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(eventBooking);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Update an existing event booking
const updateEventBooking = async (req, res, next) => {
  try {
    const eventBooking = await EventBooking.updateEventBooking(req.params.id, req.body);
    if (!eventBooking) {
      const error = new Error('Event Booking not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(eventBooking);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Delete an event booking
const deleteEventBooking = async (req, res, next) => {
  try {
    const eventBooking = await EventBooking.deleteEventBooking(req.params.id);
    if (!eventBooking) {
      const error = new Error('Event Booking not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Event Booking deleted successfully' });
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

module.exports = {
  createEventBooking,
  getAllEventBookings,
  getEventBookingById,
  updateEventBooking,
  deleteEventBooking,
};

// const EventBooking = require('../models/eventBookingModel');

// const createEventBooking = async (req, res) => {
//   try {
//     const eventBooking = await EventBooking.createEventBooking(req.body);
//     res.status(201).json(eventBooking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getAllEventBookings = async (req, res) => {
//   try {
//     const eventBookings = await EventBooking.getAllEventBookings();
//     res.json(eventBookings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getEventBookingById = async (req, res) => {
//   try {
//     const eventBooking = await EventBooking.getEventBookingById(req.params.id);
//     if (!eventBooking) {
//       return res.status(404).json({ message: 'Event Booking not found' });
//     }
//     res.json(eventBooking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const updateEventBooking = async (req, res) => {
//   try {
//     const eventBooking = await EventBooking.updateEventBooking(req.params.id, req.body);
//     if (!eventBooking) {
//       return res.status(404).json({ message: 'Event Booking not found' });
//     }
//     res.json(eventBooking);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const deleteEventBooking = async (req, res) => {
//   try {
//     const eventBooking = await EventBooking.deleteEventBooking(req.params.id);
//     if (!eventBooking) {
//       return res.status(404).json({ message: 'Event Booking not found' });
//     }
//     res.json({ message: 'Event Booking deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createEventBooking,
//   getAllEventBookings,
//   getEventBookingById,
//   updateEventBooking,
//   deleteEventBooking,
// };
