//routes/scoreRoutes.js
const express = require('express');
const router = express.Router();
const { createScore, getAllScores, getScoreById, updateScore, deleteScore } = require('../controllers/scoreController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createScore);
router.get('/', getAllScores);
router.get('/:id', getScoreById);
router.put('/:id', updateScore);
router.delete('/:id', deleteScore);

module.exports = router;
