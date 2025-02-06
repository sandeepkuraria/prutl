// //controllers/familyController.js
const Family = require('../models/familyModel');

// Create a new family
const createFamily = async (req, res, next) => {
    try {
        const family = await Family.createFamily(req.body); // Pass req.body directly to the model method
        res.status(201).json(family);
    } catch (error) {
        next(error); // Forward error to centralized error handler
    }
};

// Get all families
const getAllFamilies = async (req, res, next) => {
    try {
        const families = await Family.getAllFamilies();
        res.json(families);
    } catch (error) {
        next(error); // Forward error to centralized error handler
    }
};

// Get a family by ID
const getFamilyById = async (req, res, next) => {
    try {
        const family = await Family.getFamilyById(req.params.id);
        if (!family) {
            const error = new Error('Family not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(family);
    } catch (error) {
        next(error); // Forward error to centralized error handler
    }
};

// Update a family
const updateFamily = async (req, res, next) => {
    try {
        const family = await Family.updateFamily(req.params.id, req.body);
        if (!family) {
            const error = new Error('Family not found');
            error.statusCode = 404;
            throw error;
        }
        res.json(family);
    } catch (error) {
        next(error); // Forward error to centralized error handler
    }
};

// Delete a family
const deleteFamily = async (req, res, next) => {
    try {
        const family = await Family.deleteFamily(req.params.id);
        if (!family) {
            const error = new Error('Family not found');
            error.statusCode = 404;
            throw error;
        }
        res.json({ message: 'Family deleted successfully' });
    } catch (error) {
        next(error); // Forward error to centralized error handler
    }
};

module.exports = {
    createFamily,
    getAllFamilies,
    getFamilyById,
    updateFamily,
    deleteFamily,
};

// const Family = require('../models/familyModel');

// // Create a new family
// const createFamily = async (req, res) => {
//     try {
//         const family = await Family.createFamily(req.body); // Implement createFamily function in database module
//         res.status(201).json(family);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get all families
// const getAllFamilies = async (req, res) => {
//     try {
//         const families = await Family.getAllFamilies(); // Implement getAllFamilies function in database module
//         res.json(families);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a family by ID
// const getFamilyById = async (req, res) => {
//     try {
//         const family = await Family.getFamilyById(req.params.id); // Implement getFamilyById function in database module
//         if (!family) {
//             return res.status(404).json({ message: 'Family not found' });
//         }
//         res.json(family);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update a family
// const updateFamily = async (req, res) => {
//     try {
//         const family = await Family.updateFamily(req.params.id, req.body); // Implement updateFamily function in database module
//         if (!family) {
//             return res.status(404).json({ message: 'Family not found' });
//         }
//         res.json(family);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete a family
// const deleteFamily = async (req, res) => {
//     try {
//         const family = await Family.deleteFamily(req.params.id); // Implement deleteFamily function in database module
//         if (!family) {
//             return res.status(404).json({ message: 'Family not found' });
//         }
//         res.json({ message: 'Family deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = {
//     createFamily,
//     getAllFamilies,
//     getFamilyById,
//     updateFamily,
//     deleteFamily,
// };
