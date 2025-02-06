// routes/membershipRoutes.js
const express = require('express');
const router = express.Router();
const { createMembership, getAllMemberships, getMembershipById, updateMembership, deleteMembership } = require('../controllers/membershipController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

router.post('/', createMembership);
router.get('/', getAllMemberships);
router.get('/:id', getMembershipById);
router.put('/:id', updateMembership);
router.delete('/:id', deleteMembership);

module.exports = router;
