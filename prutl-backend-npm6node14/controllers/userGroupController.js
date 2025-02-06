//controllers/userGroupController.js
const UserGroup = require('../models/userGroupModel');

// Create a new user group
const createUserGroup = async (req, res, next) => {
  try {
    const userGroup = await UserGroup.createUserGroup(req.body);
    res.status(201).json(userGroup);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

// Get all user groups
const getAllUserGroups = async (req, res, next) => {
  try {
    const userGroups = await UserGroup.getAllUserGroups();
    res.json(userGroups);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

// Get a user group by ID
const getUserGroupById = async (req, res, next) => {
  try {
    const userGroup = await UserGroup.getUserGroupById(req.params.id);
    if (!userGroup) {
      return res.status(404).json({ message: 'User group not found' });
    }
    res.json(userGroup);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

// Update a user group
const updateUserGroup = async (req, res, next) => {
  try {
    const userGroup = await UserGroup.updateUserGroup(req.params.id, req.body);
    if (!userGroup) {
      return res.status(404).json({ message: 'User group not found' });
    }
    res.json(userGroup);
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a user group
const deleteUserGroup = async (req, res, next) => {
  try {
    const userGroup = await UserGroup.deleteUserGroup(req.params.id);
    if (!userGroup) {
      return res.status(404).json({ message: 'User group not found' });
    }
    res.json({ message: 'User group deleted successfully' });
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createUserGroup,
  getAllUserGroups,
  getUserGroupById,
  updateUserGroup,
  deleteUserGroup,
};
