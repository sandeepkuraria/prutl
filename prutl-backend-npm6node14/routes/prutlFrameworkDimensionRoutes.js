// routes/prutlFrameworkDimensionRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPrutlDimension,
  getAllPrutlDimensions,
  getPrutlDimensionById,
  updatePrutlDimension,
  deletePrutlDimension
} = require('../controllers/prutlFrameworkDimensionController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createPrutlDimension);
router.get('/', getAllPrutlDimensions);
router.get('/:id', getPrutlDimensionById);
router.put('/:id', updatePrutlDimension);
router.delete('/:id', deletePrutlDimension);

module.exports = router;
