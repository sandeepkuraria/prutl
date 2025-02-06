// //controllers/guestServiceController.js
const GuestService = require('../models/guestServiceModel');

// Create a new guest service
const createGuestService = async (req, res, next) => {
  try {
    const service = await GuestService.createGuestService(req.body);
    res.status(201).json(service);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Get all guest services
const getAllGuestServices = async (req, res, next) => {
  try {
    const services = await GuestService.getAllGuestServices();
    res.json(services);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Get a guest service by ID
const getGuestServiceById = async (req, res, next) => {
  try {
    const service = await GuestService.getGuestServiceById(req.params.id);
    if (!service) {
      const error = new Error('Guest service not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(service);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Update a guest service
const updateGuestService = async (req, res, next) => {
  try {
    const service = await GuestService.updateGuestService(req.params.id, req.body);
    if (!service) {
      const error = new Error('Guest service not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(service);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Delete a guest service
const deleteGuestService = async (req, res, next) => {
  try {
    const service = await GuestService.deleteGuestService(req.params.id);
    if (!service) {
      const error = new Error('Guest service not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Guest service deleted successfully' });
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

module.exports = {
  createGuestService,
  getAllGuestServices,
  getGuestServiceById,
  updateGuestService,
  deleteGuestService,
};

// const GuestService = require('../models/guestServiceModel');

// // Create a new guest service
// const createGuestService = async (req, res) => {
//   try {
//     const service = await GuestService.createGuestService(req.body);
//     res.status(201).json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all guest services
// const getAllGuestServices = async (req, res) => {
//   try {
//     const services = await GuestService.getAllGuestServices();
//     res.json(services);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a guest service by ID
// const getGuestServiceById = async (req, res) => {
//   try {
//     const service = await GuestService.getGuestServiceById(req.params.id);
//     if (!service) {
//       return res.status(404).json({ message: 'Guest service not found' });
//     }
//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a guest service
// const updateGuestService = async (req, res) => {
//   try {
//     const service = await GuestService.updateGuestService(req.params.id, req.body);
//     if (!service) {
//       return res.status(404).json({ message: 'Guest service not found' });
//     }
//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a guest service
// const deleteGuestService = async (req, res) => {
//   try {
//     const service = await GuestService.deleteGuestService(req.params.id);
//     if (!service) {
//       return res.status(404).json({ message: 'Guest service not found' });
//     }
//     res.json({ message: 'Guest service deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createGuestService,
//   getAllGuestServices,
//   getGuestServiceById,
//   updateGuestService,
//   deleteGuestService,
// };
