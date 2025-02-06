//routes/passionFrameworkDimensionRoutes.js
const express = require('express');
const router = express.Router();
const { createDimension, getAllDimensions, getDimensionById, updateDimension, deleteDimension } = require('../controllers/passionFrameworkDimensionController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createDimension);
router.get('/', getAllDimensions);
router.get('/:id', getDimensionById);
router.put('/:id', updateDimension);
router.delete('/:id', deleteDimension);

module.exports = router;
