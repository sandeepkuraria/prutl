// // controllers/membershipController.js
const Membership = require('../models/membership');

// Create a new membership
const createMembership = async (req, res, next) => {
  try {
    const newMembership = await Membership.createMembership(req.body);
    res.status(201).json(newMembership);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Get all memberships
const getAllMemberships = async (req, res, next) => {
  try {
    const memberships = await Membership.getAllMemberships();
    res.json(memberships);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Get a membership by ID
const getMembershipById = async (req, res, next) => {
  try {
    const membership = await Membership.getMembershipById(req.params.id);
    if (!membership) {
      const error = new Error('Membership not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(membership);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Update a membership
const updateMembership = async (req, res, next) => {
  try {
    const updatedMembership = await Membership.updateMembership(req.params.id, req.body);
    if (!updatedMembership) {
      const error = new Error('Membership not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(updatedMembership);
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

// Delete a membership
const deleteMembership = async (req, res, next) => {
  try {
    const membership = await Membership.deleteMembership(req.params.id);
    if (!membership) {
      const error = new Error('Membership not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Membership deleted successfully' });
  } catch (error) {
    next(error); // Forward error to the error-handling middleware
  }
};

module.exports = {
  createMembership,
  getAllMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
};

// const Membership = require('../models/membership');

// const createMembership = async (req, res) => {
//   const { membership_type, start_date, end_date, payment_status, remark } = req.body;
//   try {
//     const newMembership = await Membership.createMembership({
//       membership_type,
//       start_date,
//       end_date,
//       payment_status,
//       remark
//     });
//     res.status(201).json(newMembership);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getAllMemberships = async (req, res) => {
//   try {
//     const memberships = await Membership.getAllMemberships();
//     res.json(memberships);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// const getMembershipById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const membership = await Membership.getMembershipById(id);
//     res.json(membership);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// const updateMembership = async (req, res) => {
//   const { id } = req.params;
//   const { membership_type, start_date, end_date, payment_status, remark } = req.body;
//   try {
//     const updatedMembership = await Membership.updateMembership(id, {
//       membership_type,
//       start_date,
//       end_date,
//       payment_status,
//       remark
//     });
//     res.json(updatedMembership);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// const deleteMembership = async (req, res) => {
//   const { id } = req.params;
//   try {
//     await Membership.deleteMembership(id);
//     res.json({ message: 'Membership deleted successfully' });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// module.exports = {
//   createMembership,
//   getAllMemberships,
//   getMembershipById,
//   updateMembership,
//   deleteMembership,
// };
