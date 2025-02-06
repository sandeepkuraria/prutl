//routes/teamRoutes.js
const express = require('express');
const router = express.Router();
const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } = require('../controllers/teamController');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/multerMiddleware');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', upload.single('team_icon_url'), createTeam);
router.get('/', getAllTeams);
router.get('/:id', getTeamById);
router.put('/:id', upload.single('team_icon_url'), updateTeam);
router.delete('/:id', deleteTeam);

module.exports = router;


// //routes/teamRoutes.js
// const express = require('express');
// const router = express.Router();
// const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } = require('../controllers/teamController');
// const authenticateToken = require('../middleware/auth');

// // Apply authentication middleware to all routes in this router
// router.use(authenticateToken);

// // Routes
// router.post('/', createTeam);
// router.get('/', getAllTeams);
// router.get('/:id', getTeamById);
// router.put('/:id', updateTeam);
// router.delete('/:id', deleteTeam);

// module.exports = router;
