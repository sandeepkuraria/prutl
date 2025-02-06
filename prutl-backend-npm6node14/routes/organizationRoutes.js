// routes/organizationRoutes.js
const express = require('express');
const router = express.Router();
const {
    createOrganization,
    getAllOrganizations,
    getOrganizationById,
    updateOrganization,
    deleteOrganization
} = require('../controllers/organizationController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

router.post('/', createOrganization);
router.get('/', getAllOrganizations);
router.get('/:id', getOrganizationById);
router.put('/:id', updateOrganization);
router.delete('/:id', deleteOrganization);

module.exports = router;
