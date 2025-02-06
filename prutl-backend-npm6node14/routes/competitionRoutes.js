//routes/competitionRoutes.js
const express = require('express');
const router = express.Router();
const { createCompetition, getAllCompetitions, getCompetitionById, updateCompetition, deleteCompetition } = require('../controllers/competitionController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createCompetition);
router.get('/', getAllCompetitions);
router.get('/:id', getCompetitionById);
router.put('/:id', updateCompetition);
router.delete('/:id', deleteCompetition);

module.exports = router;
