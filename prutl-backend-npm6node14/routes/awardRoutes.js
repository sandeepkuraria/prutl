//routes/awardRoutes.js
const express = require('express');
const router = express.Router();
const { createAward, getAllAwards, getAwardById, updateAward, deleteAward } = require('../controllers/awardController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createAward);
router.get('/', getAllAwards);
router.get('/:id', getAwardById);
router.put('/:id', updateAward);
router.delete('/:id', deleteAward);

module.exports = router;
