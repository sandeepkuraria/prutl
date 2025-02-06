//routes/sponsorshipRoutes.js
const express = require('express');
const router = express.Router();
const { createSponsorship, getAllSponsorships, getSponsorshipById, updateSponsorship, deleteSponsorship } = require('../controllers/sponsorshipController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createSponsorship);
router.get('/', getAllSponsorships);
router.get('/:id', getSponsorshipById);
router.put('/:id', updateSponsorship);
router.delete('/:id', deleteSponsorship);

module.exports = router;
