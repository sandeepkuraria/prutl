// routes/familyMemberRoutes.js

const express = require('express');
const router = express.Router();
const { createFamilyMember, getAllFamilyMembers, getFamilyMemberById, updateFamilyMember, deleteFamilyMember } = require('../controllers/familyMemberController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createFamilyMember);
router.get('/', getAllFamilyMembers);
router.get('/:id', getFamilyMemberById);
router.put('/:id', updateFamilyMember);
router.delete('/:id', deleteFamilyMember);

module.exports = router;
