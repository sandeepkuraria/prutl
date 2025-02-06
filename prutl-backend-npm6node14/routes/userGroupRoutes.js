//routes/userGroupRoutes.js
const express = require('express');
const router = express.Router();
const { createUserGroup, getAllUserGroups, getUserGroupById, updateUserGroup, deleteUserGroup } = require('../controllers/userGroupController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createUserGroup);
router.get('/', getAllUserGroups);
router.get('/:id', getUserGroupById);
router.put('/:id', updateUserGroup);
router.delete('/:id', deleteUserGroup);

module.exports = router;
