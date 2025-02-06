//routes/hallRoutes.js
const express = require('express');
const router = express.Router();
const { createHall, getAllHalls, getHallById, updateHall, deleteHall } = require('../controllers/hallController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createHall);
router.get('/', getAllHalls);
router.get('/:id', getHallById);
router.put('/:id', updateHall);
router.delete('/:id', deleteHall);

module.exports = router;
