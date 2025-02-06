//routes/committeeRoutes.js
const express = require('express');
const router = express.Router();
const { createCommittee, getAllCommittees, getCommitteeById, updateCommittee, deleteCommittee } = require('../controllers/committeeController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createCommittee);
router.get('/', getAllCommittees);
router.get('/:id', getCommitteeById);
router.put('/:id', updateCommittee);
router.delete('/:id', deleteCommittee);

module.exports = router;
