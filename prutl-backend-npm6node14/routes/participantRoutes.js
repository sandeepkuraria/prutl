//routes/participantRoutes.js
const express = require('express');
const router = express.Router();
const { createParticipant, getAllParticipants, getParticipantById, updateParticipant, deleteParticipant } = require('../controllers/participantController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createParticipant);
router.get('/', getAllParticipants);
router.get('/:id', getParticipantById);
router.put('/:id', updateParticipant);
router.delete('/:id', deleteParticipant);

module.exports = router;
