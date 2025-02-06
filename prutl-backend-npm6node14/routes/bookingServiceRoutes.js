//routes/bookingServiceRoutes.js
const express = require('express');
const router = express.Router();
const { createBookingService, getAllBookingServices, getBookingServiceById, updateBookingService, deleteBookingService } = require('../controllers/bookingServiceController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createBookingService);
router.get('/', getAllBookingServices);
router.get('/:id', getBookingServiceById);
router.put('/:id', updateBookingService);
router.delete('/:id', deleteBookingService);

module.exports = router;
