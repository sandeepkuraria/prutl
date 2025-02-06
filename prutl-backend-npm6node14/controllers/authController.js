//controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

// const registerUser = async (req, res, next) => {
//   try {
//     console.log('Request body:', req.body);
// console.log('Uploaded file:', req.file);

//     const existingUser = await User.getUserByEmail(req.body.email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Add profile picture if uploaded
//     const profilePictureUrl = req.file ? `/uploads/profile_pictures/${req.file.filename}` : null;
//     console.log("Profile Picture URL:", profilePictureUrl);
//     console.time("Database Insert");
//     console.log("Creating user...");
//     const user = await User.createUser({ ...req.body, profile_picture_url: profilePictureUrl });
//     console.log("User created:", user);
//     console.timeEnd("Database Insert");
//     let userWithoutPassword;
//     if (user.dataValues) {
//       const { password: userPassword, ...rest } = user.dataValues;
//       userWithoutPassword = rest;
//     } else {
//       const { password: userPassword, ...rest } = user;
//       userWithoutPassword = rest;
//     }

//     res.status(201).json(userWithoutPassword);
//   } catch (error) {
//     next(error);
//   }
// };
const registerUser = async (req, res, next) => {
  try {
    // Logging to ensure correct data flow
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    // Convert "null" strings to actual null values
    const processNullValues = (value) => (value === "null" ? null : value);

    // Convert null for integer fields
    const membership_id = processNullValues(req.body.membership_id);
    const usergroup_id = processNullValues(req.body.usergroup_id);
    const referrer_id = processNullValues(req.body.referrer_id);

    // Check for existing user
    const existingUser = await User.getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // If a profile picture is uploaded, get its URL
    const profilePictureUrl = req.file
      ? `/uploads/profile_pictures/${req.file.filename}`
      : null;

    // Create the user in the database, passing the profile picture URL
    const user = await User.createUser({
      ...req.body,
      membership_id,
      usergroup_id,
      referrer_id,
      profile_picture_url: profilePictureUrl,
    });

    // Remove the password before sending back the user data
    let userWithoutPassword;
    if (user.dataValues) {
      const { password, ...rest } = user.dataValues;
      userWithoutPassword = rest;
    } else {
      const { password, ...rest } = user;
      userWithoutPassword = rest;
    }

    // Send back the newly created user data as a response
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error); // Handle errors with a middleware
  }
};

const login = async (req, res, next) => {
  const { email, password, keepSignedIn } = req.body;
  try {
    const user = await User.getUserByEmail(email);
    if (!user)
      return res.status(400).json({ message: "Email or password is wrong" });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(400).json({ message: "Email or password is wrong" });

    const expiresIn = keepSignedIn ? "7d" : "1h";
    const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
      expiresIn,
    });

    let userWithoutPassword;
    if (user.dataValues) {
      const { password: userPassword, ...rest } = user.dataValues;
      userWithoutPassword = rest;
    } else {
      const { password: userPassword, ...rest } = user;
      userWithoutPassword = rest;
    }

    res
      .header("Authorization", `Bearer ${token}`)
      .json({ token, user: userWithoutPassword });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, login };

// //controllers/authController.js
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/userModel');
// require('dotenv').config();

// const registerUser = async (req, res, next) => {
//   try {
//     const existingUser = await User.getUserByEmail(req.body.email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }
//     const user = await User.createUser(req.body);

//      // Check if user object has dataValues property
//      let userWithoutPassword;
//      if (user.dataValues) {
//        const { password: userPassword, ...rest } = user.dataValues;
//        userWithoutPassword = rest;
//      } else {
//        const { password: userPassword, ...rest } = user;
//        userWithoutPassword = rest;
//      }

//      res.status(201).json( userWithoutPassword );

//     // res.status(201).json(user);
//   } catch (error) {
//     // res.status(500).json({ message: error.message });
//               next(error); // Forward error to error-handling middleware

//   }
// };

// const login = async (req, res, next) => {
//   const { email, password, keepSignedIn } = req.body;
//   try {
//     const user = await User.getUserByEmail(email);
//     if (!user) return res.status(400).json({ message: 'Email or password is wrong' });

//     const validPass = await bcrypt.compare(password, user.password);
//     if (!validPass) return res.status(400).json({ message: 'Email or password is wrong' });

//     console.log("req.body.keepSignedIn inside authcontroller ++++++++ ",req.body.keepSignedIn)
//     console.log("req.body.email inside authcontroller ++++++++ ",req.body.email)
//     console.log("req.body.password inside authcontroller ++++++++ ",req.body.password)
//     const expiresIn = keepSignedIn ? '7d' : '1h'; // 7 days for keep signed in, 1 hour otherwise
//     const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, { expiresIn });

//     // Check if user object has dataValues property
//     let userWithoutPassword;
//     if (user.dataValues) {
//       const { password: userPassword, ...rest } = user.dataValues;
//       userWithoutPassword = rest;
//     } else {
//       const { password: userPassword, ...rest } = user;
//       userWithoutPassword = rest;
//     }

//     res.header('Authorization', `Bearer ${token}`).json({ token, user: userWithoutPassword });
//   } catch (error) {
//     // res.status(500).json({ message: error.message });
//         next(error); // Forward error to error-handling middleware
//   }
// };

// module.exports = { registerUser, login };
