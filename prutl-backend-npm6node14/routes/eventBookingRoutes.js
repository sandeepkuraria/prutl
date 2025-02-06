//routes/eventBookingRoutes.js
const express = require('express');
const router = express.Router();
const { createEventBooking, getAllEventBookings, getEventBookingById, updateEventBooking, deleteEventBooking } = require('../controllers/eventBookingController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createEventBooking);
router.get('/', getAllEventBookings);
router.get('/:id', getEventBookingById);
router.put('/:id', updateEventBooking);
router.delete('/:id', deleteEventBooking);

module.exports = router;
