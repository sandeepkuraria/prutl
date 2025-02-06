// controllers/organizationController.js
const Organization = require('../models/organization');

// Create a new organization entry
const createOrganization = async (req, res, next) => {
  try {
    const newOrganization = await Organization.createOrganization(req.body);
    res.status(201).json(newOrganization);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get all organization entries
const getAllOrganizations = async (req, res, next) => {
  try {
    const organizations = await Organization.getAllOrganizations();
    res.json(organizations);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Get an organization entry by ID
const getOrganizationById = async (req, res, next) => {
  try {
    const organization = await Organization.getOrganizationById(req.params.id);
    if (!organization) {
      const error = new Error('Organization not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(organization);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Update an organization entry
const updateOrganization = async (req, res, next) => {
  try {
    const updatedOrganization = await Organization.updateOrganization(req.params.id, req.body);
    if (!updatedOrganization) {
      const error = new Error('Organization not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(updatedOrganization);
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

// Delete an organization entry
const deleteOrganization = async (req, res, next) => {
  try {
    const organization = await Organization.deleteOrganization(req.params.id);
    if (!organization) {
      const error = new Error('Organization not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Organization deleted successfully' });
  } catch (error) {
    next(error); // Forward error to error-handling middleware
  }
};

module.exports = {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  updateOrganization,
  deleteOrganization,
};


// // controllers/organizationController.js
// const Organization = require('../models/organization');

// const createOrganization = async (req, res) => {
//     try {
//         const newOrganization = await Organization.createOrganization(req.body);
//         res.status(201).json(newOrganization);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getAllOrganizations = async (req, res) => {
//     try {
//         const organizations = await Organization.getAllOrganizations();
//         res.json(organizations);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const getOrganizationById = async (req, res) => {
//     try {
//         const organization = await Organization.getOrganizationById(req.params.id);
//         res.json(organization);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const updateOrganization = async (req, res) => {
//     try {
//         const updatedOrganization = await Organization.updateOrganization(req.params.id, req.body);
//         res.json(updatedOrganization);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// const deleteOrganization = async (req, res) => {
//     try {
//         await Organization.deleteOrganization(req.params.id);
//         res.json({ message: 'Organization deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     createOrganization,
//     getAllOrganizations,
//     getOrganizationById,
//     updateOrganization,
//     deleteOrganization,
// };
