// controllers/userController.js
const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    res.json({ users: usersWithoutPassword });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    console.log("Request body in updateUser:", req.body);
    console.log("Uploaded file in updateUser:", req.file);

    // Convert "null" strings to actual null values
    const processNullValues = (value) => (value === "null" ? null : value);

    // Convert null for integer fields
    const membership_id = processNullValues(req.body.membership_id);
    const usergroup_id = processNullValues(req.body.usergroup_id);
    const referrer_id = processNullValues(req.body.referrer_id);

    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.profile_picture_url && req.file) {
      const oldPicturePath = path.join(
        __dirname,
        "..",
        user.profile_picture_url
      );
      if (fs.existsSync(oldPicturePath)) fs.unlinkSync(oldPicturePath);
    }

    const profilePictureUrl = req.file
      ? `/uploads/profile_pictures/${req.file.filename}`
      : user.profile_picture_url;

    const updatedUser = await User.updateUser(req.params.id, {
      ...req.body,
      membership_id,
      usergroup_id,
      referrer_id,
      profile_picture_url: profilePictureUrl,
    });

    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.profile_picture_url) {
      const oldPicturePath = path.join(
        __dirname,
        "..",
        user.profile_picture_url
      );
      if (fs.existsSync(oldPicturePath)) fs.unlinkSync(oldPicturePath);
    }

    await User.deleteUser(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };

// // controllers/userController.js

// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const { pool } = require('../config/database.js');
// require('dotenv').config();
// const User = require('../models/userModel');

//   const getAllUsers = async (req, res, next) => {
//     try {
//       const users = await User.getAllUsers();
//        // Exclude the password field from each user
//         const usersWithoutPassword = users.map(user => {
//             const { password, ...userWithoutPassword } = user;
//             return userWithoutPassword;
//         });

//         res.json({ users:usersWithoutPassword});
//       // res.json(users);
//     } catch (error) {
//       // res.status(500).json({ message: error.message });
//           next(error); // Forward error to error-handling middleware

//     }
//   };

//   const getUserById = async (req, res, next) => {
//     try {
//       const user = await User.getUserById(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//         // Remove password field
//         const { password, ...userWithoutPassword } = user;

//         res.json(userWithoutPassword);
//       // res.json(user);
//     } catch (error) {
//       // res.status(500).json({ message: error.message });
//                 next(error); // Forward error to error-handling middleware

//     }
//   };

//   const updateUser = async (req, res, next) => {
//     try {
//       const user = await User.updateUser(req.params.id, req.body);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.json(user);
//     } catch (error) {
//       // res.status(500).json({ message: error.message });
//                 next(error); // Forward error to error-handling middleware

//     }
//   };

//   const deleteUser = async (req, res, next) => {
//     try {
//       const user = await User.deleteUser(req.params.id);
//       if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//       }
//       res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//       // res.status(500).json({ message: error.message });
//                 next(error); // Forward error to error-handling middleware

//     }
//   };

// module.exports = { getAllUsers,
//     getUserById,
//     updateUser,
//     deleteUser
//      };
