// // controllers/familyMemberController.js

const FamilyMember = require('../models/familyMember');

// Create a new family member
const createFamilyMember = async (req, res, next) => {
    try {
        const familyMember = await FamilyMember.createFamilyMember(req.body);
        res.status(201).json(familyMember);
    } catch (error) {
        next(error); // Forward error to the error-handling middleware
    }
};

// Get all family members
const getAllFamilyMembers = async (req, res, next) => {
    try {
        const familyMembers = await FamilyMember.getAllFamilyMembers();
        res.json(familyMembers);
    } catch (error) {
        next(error); // Forward error to the error-handling middleware
    }
};

// Get a family member by ID
const getFamilyMemberById = async (req, res, next) => {
    try {
        const familyMember = await FamilyMember.getFamilyMemberById(req.params.id);
        if (!familyMember) {
            const error = new Error('Family member not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(familyMember);
    } catch (error) {
        next(error); // Forward error to the error-handling middleware
    }
};

// Update a family member
const updateFamilyMember = async (req, res, next) => {
    try {
        const updatedFamilyMember = await FamilyMember.updateFamilyMember(req.params.id, req.body);
        if (!updatedFamilyMember) {
            const error = new Error('Family member not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(updatedFamilyMember);
    } catch (error) {
        next(error); // Forward error to the error-handling middleware
    }
};

// Delete a family member
const deleteFamilyMember = async (req, res, next) => {
    try {
        const deletedFamilyMember = await FamilyMember.deleteFamilyMember(req.params.id);
        if (!deletedFamilyMember) {
            const error = new Error('Family member not found');
            error.statusCode = 404;
            throw error;
        }
        res.json({ message: 'Family member deleted successfully' });
    } catch (error) {
        next(error); // Forward error to the error-handling middleware
    }
};

module.exports = {
    createFamilyMember,
    getAllFamilyMembers,
    getFamilyMemberById,
    updateFamilyMember,
    deleteFamilyMember,
};


// const FamilyMember = require('../models/familyMember');

// // Create a new family member
// const createFamilyMember = async (req, res) => {
//     const { family_id, user_id, relationship, remark } = req.body;
//     try {
//         const familyMember = await FamilyMember.createFamilyMember({ family_id, user_id, relationship, remark });
//         res.status(201).json(familyMember);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all family members
// const getAllFamilyMembers = async (req, res) => {
//     try {
//         const familyMembers = await FamilyMember.getAllFamilyMembers();
//         res.json(familyMembers);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a family member by ID
// const getFamilyMemberById = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const familyMember = await FamilyMember.getFamilyMemberById(id);
//         if (!familyMember) {
//             return res.status(404).json({ message: 'Family member not found' });
//         }
//         res.json(familyMember);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update a family member
// const updateFamilyMember = async (req, res) => {
//     const { id } = req.params;
//     const { family_id, user_id, relationship, remark } = req.body;
//     try {
//         const updatedFamilyMember = await FamilyMember.updateFamilyMember(id, { family_id, user_id, relationship, remark });
//         if (!updatedFamilyMember) {
//             return res.status(404).json({ message: 'Family member not found' });
//         }
//         res.json(updatedFamilyMember);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete a family member
// const deleteFamilyMember = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedFamilyMember = await FamilyMember.deleteFamilyMember(id);
//         if (!deletedFamilyMember) {
//             return res.status(404).json({ message: 'Family member not found' });
//         }
//         res.json({ message: 'Family member deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     createFamilyMember,
//     getAllFamilyMembers,
//     getFamilyMemberById,
//     updateFamilyMember,
//     deleteFamilyMember,
// };
