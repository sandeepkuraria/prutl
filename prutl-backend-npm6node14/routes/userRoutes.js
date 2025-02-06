
// //routes/userRoutes.js
const express = require('express');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/multerMiddleware');
const router = express.Router();

router.get('/', authenticateToken, getAllUsers);
router.get('/:id', authenticateToken, getUserById);
router.put('/:id', authenticateToken, upload.single('profile_picture'), updateUser);
router.delete('/:id', authenticateToken, deleteUser);

module.exports = router;

// //routes/userRoutes.js
// const express = require('express');
// const router = express.Router();
// const {  getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
// const authenticateToken = require('../middleware/auth');

// // Protect routes with JWT authentication
// router.get('/', authenticateToken, getAllUsers);
// router.get('/:id', authenticateToken, getUserById);
// router.put('/:id', authenticateToken, updateUser);
// router.delete('/:id', authenticateToken, deleteUser);

// module.exports = router;
