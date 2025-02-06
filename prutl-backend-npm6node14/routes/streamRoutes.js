//routes/streamRoutes.js
const express = require('express');
const router = express.Router();
const { createStream, getAllStreams, getStreamById, updateStream, deleteStream } = require('../controllers/streamController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createStream);
router.get('/', getAllStreams);
router.get('/:id', getStreamById);
router.put('/:id', updateStream);
router.delete('/:id', deleteStream);

module.exports = router;
