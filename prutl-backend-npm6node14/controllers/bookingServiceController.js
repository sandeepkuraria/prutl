// //controllers/bookingServiceController.js
const BookingService = require('../models/bookingServiceModel');

// Create a new booking service
const createBookingService = async (req, res, next) => {
  try {
    const service = await BookingService.createBookingService(req.body);
    res.status(201).json(service);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get all booking services
const getAllBookingServices = async (req, res, next) => {
  try {
    const services = await BookingService.getAllBookingServices();
    res.json(services);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get a booking service by ID
const getBookingServiceById = async (req, res, next) => {
  try {
    const service = await BookingService.getBookingServiceById(req.params.id);
    if (!service) {
      const error = new Error('Booking service not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(service);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Update a booking service
const updateBookingService = async (req, res, next) => {
  try {
    const service = await BookingService.updateBookingService(req.params.id, req.body);
    if (!service) {
      const error = new Error('Booking service not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(service);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Delete a booking service
const deleteBookingService = async (req, res, next) => {
  try {
    const service = await BookingService.deleteBookingService(req.params.id);
    if (!service) {
      const error = new Error('Booking service not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Booking service deleted successfully' });
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

module.exports = {
  createBookingService,
  getAllBookingServices,
  getBookingServiceById,
  updateBookingService,
  deleteBookingService,
};

// const BookingService = require('../models/bookingServiceModel');

// // Create a new booking service
// const createBookingService = async (req, res) => {
//   try {
//     const service = await BookingService.createBookingService(req.body);
//     res.status(201).json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all booking services
// const getAllBookingServices = async (req, res) => {
//   try {
//     const services = await BookingService.getAllBookingServices();
//     res.json(services);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a booking service by ID
// const getBookingServiceById = async (req, res) => {
//   try {
//     const service = await BookingService.getBookingServiceById(req.params.id);
//     if (!service) {
//       return res.status(404).json({ message: 'Booking service not found' });
//     }
//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a booking service
// const updateBookingService = async (req, res) => {
//   try {
//     const service = await BookingService.updateBookingService(req.params.id, req.body);
//     if (!service) {
//       return res.status(404).json({ message: 'Booking service not found' });
//     }
//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a booking service
// const deleteBookingService = async (req, res) => {
//   try {
//     const service = await BookingService.deleteBookingService(req.params.id);
//     if (!service) {
//       return res.status(404).json({ message: 'Booking service not found' });
//     }
//     res.json({ message: 'Booking service deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createBookingService,
//   getAllBookingServices,
//   getBookingServiceById,
//   updateBookingService,
//   deleteBookingService,
// };
