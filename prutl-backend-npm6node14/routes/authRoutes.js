
// //routes/authRoutes.js
const express = require('express');
const { registerUser, login } = require('../controllers/authController');
const upload = require('../middleware/multerMiddleware');
const router = express.Router();

router.post('/register', upload.single('profile_picture'), registerUser);

// // Backend: Register User route (Express.js example)
// router.post('/register', upload.single('profile_picture'), (req, res) => {
  
//     const profile_picture = req.file; // This should be populated by Multer
  
//     if (profile_picture) {
//       console.log("Profile picture uploaded in authRoutes for register:", profile_picture.filename);
//     }
  
//     // Continue with the rest of the registration process...
//   });

// router.post('/register', upload.single('profile_picture'), (req, res) => {
//     const profile_picture = req.file;
//     if (profile_picture) {
//       console.log("Profile picture uploaded:", profile_picture.filename);
//     }
//     // Send a basic response for testing
//     res.status(200).json({ message: "File uploaded successfully" });
//   });
  
  
router.post('/login', login);

module.exports = router;

// //routes/authRoutes.js
// const express = require('express');
// const { registerUser, login } = require('../controllers/authController');
// const router = express.Router();

// router.post('/register', registerUser);
// router.post('/login', login);

// module.exports = router;
