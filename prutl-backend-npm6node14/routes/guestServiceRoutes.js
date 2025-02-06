//routes/guestServiceRoutes.js
const express = require('express');
const router = express.Router();
const { createGuestService, getAllGuestServices, getGuestServiceById, updateGuestService, deleteGuestService } = require('../controllers/guestServiceController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createGuestService);
router.get('/', getAllGuestServices);
router.get('/:id', getGuestServiceById);
router.put('/:id', updateGuestService);
router.delete('/:id', deleteGuestService);

module.exports = router;
