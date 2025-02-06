// routes/dimensionScoreRoutes.js
const express = require('express');
const router = express.Router();
const { createDimensionScore, getAllDimensionScores, getDimensionScoreById, updateDimensionScore, deleteDimensionScore } = require('../controllers/dimensionScoreController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createDimensionScore);
router.get('/', getAllDimensionScores);
router.get('/:id', getDimensionScoreById);
router.put('/:id', updateDimensionScore);
router.delete('/:id', deleteDimensionScore);

module.exports = router;
