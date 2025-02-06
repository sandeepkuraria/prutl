//routes/committeeMemberRoutes.js
const express = require('express');
const router = express.Router();
const { createCommitteeMember, getAllCommitteeMembers, getCommitteeMemberById, updateCommitteeMember, deleteCommitteeMember } = require('../controllers/committeeMemberController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createCommitteeMember);
router.get('/', getAllCommitteeMembers);
router.get('/:id', getCommitteeMemberById);
router.put('/:id', updateCommitteeMember);
router.delete('/:id', deleteCommitteeMember);

module.exports = router;
