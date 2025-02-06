//routes/sponsorRoutes.js
const express = require('express');
const router = express.Router();
const { createSponsor, getAllSponsors, getSponsorById, updateSponsor, deleteSponsor } = require('../controllers/sponsorController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createSponsor);
router.get('/', getAllSponsors);
router.get('/:id', getSponsorById);
router.put('/:id', updateSponsor);
router.delete('/:id', deleteSponsor);

module.exports = router;
