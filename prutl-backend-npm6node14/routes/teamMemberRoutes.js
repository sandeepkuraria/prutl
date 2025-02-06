const express = require('express');
const router = express.Router();
const {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember
} = require('../controllers/teamMemberController');
const authenticateToken = require('../middleware/auth');

// Apply authentication middleware to all routes in this router
router.use(authenticateToken);

// Routes
router.post('/', createTeamMember);
router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);
router.put('/:id', updateTeamMember);
router.delete('/:id', deleteTeamMember);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const {
//   createTeamMember,
//   getAllTeamMembers,
//   getTeamMemberById,
//   updateTeamMember,
//   deleteTeamMember
// } = require('../controllers/teamMemberController');
// const authenticateToken = require('../middleware/auth');
// const upload = require('../middleware/multerMiddleware');


// // Apply authentication middleware to all routes in this router
// router.use(authenticateToken);

// // Routes
// router.post('/',upload.single('profile_picture'), createTeamMember);
// router.get('/', getAllTeamMembers);
// router.get('/:id', getTeamMemberById);
// router.put('/:id', upload.single('profile_picture'), updateTeamMember);
// router.delete('/:id', deleteTeamMember);

// module.exports = router;
