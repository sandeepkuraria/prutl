// controllers/roleController.js
const Role = require('../models/roleModel');

// Create a new Role
const createRole = async (req, res, next) => {
  try {
    const role = await Role.createRole(req.body);
    res.status(201).json(role);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all Roles
const getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.getAllRoles();
    res.json(roles);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get a Role by ID
const getRoleById = async (req, res, next) => {
  try {
    const role = await Role.getRoleById(req.params.id);
    if (!role) {
      const error = new Error('Role not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(role);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update a Role
const updateRole = async (req, res, next) => {
  try {
    const role = await Role.updateRole(req.params.id, req.body);
    if (!role) {
      const error = new Error('Role not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(role);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete a Role
const deleteRole = async (req, res, next) => {
  try {
    const role = await Role.deleteRole(req.params.id);
    if (!role) {
      const error = new Error('Role not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};


// // controllers/roleController.js
// const Role = require('../models/roleModel');

// // Create a new Role
// const createRole = async (req, res) => {
//   try {
//     const role = await Role.createRole(req.body);
//     res.status(201).json(role);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all Roles
// const getAllRoles = async (req, res) => {
//   try {
//     const roles = await Role.getAllRoles();
//     res.json(roles);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a Role by ID
// const getRoleById = async (req, res) => {
//   try {
//     const role = await Role.getRoleById(req.params.id);
//     if (!role) {
//       return res.status(404).json({ message: 'Role not found' });
//     }
//     res.json(role);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a Role
// const updateRole = async (req, res) => {
//   try {
//     const role = await Role.updateRole(req.params.id, req.body);
//     if (!role) {
//       return res.status(404).json({ message: 'Role not found' });
//     }
//     res.json(role);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a Role
// const deleteRole = async (req, res) => {
//   try {
//     const role = await Role.deleteRole(req.params.id);
//     if (!role) {
//       return res.status(404).json({ message: 'Role not found' });
//     }
//     res.json({ message: 'Role deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createRole,
//   getAllRoles,
//   getRoleById,
//   updateRole,
//   deleteRole,
// };
