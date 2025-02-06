//routes/aiInsightRoutes.js
const express = require('express');
const router = express.Router();
const {
  createAIInsight,
  getAllAIInsights,
  getAIInsightById,
  updateAIInsight,
  deleteAIInsight
} = require('../controllers/aiInsightController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createAIInsight);
router.get('/', getAllAIInsights);
router.get('/:id', getAIInsightById);
router.put('/:id', updateAIInsight);
router.delete('/:id', deleteAIInsight);

module.exports = router;
