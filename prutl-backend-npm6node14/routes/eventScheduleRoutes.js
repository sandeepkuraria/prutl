//routes/eventScheduleRoutes.js
const express = require('express');
const router = express.Router();
const { createEventSchedule, getAllEventSchedules, getEventScheduleById, updateEventSchedule, deleteEventSchedule } = require('../controllers/eventScheduleController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createEventSchedule);
router.get('/', getAllEventSchedules);
router.get('/:id', getEventScheduleById);
router.put('/:id', updateEventSchedule);
router.delete('/:id', deleteEventSchedule);

module.exports = router;
