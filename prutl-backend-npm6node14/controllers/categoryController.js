// const Category = require('../models/categoryModel');

const Category = require('../models/categoryModel');

// Create a new Category
const createCategory = async (req, res, next) => {
  try {
    const category = await Category.createCategory(req.body);
    res.status(201).json(category);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get all Categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.getAllCategories();
    res.json(categories);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Get a Category by ID
const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.getCategoryById(req.params.id);
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(category);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Update a Category
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.updateCategory(req.params.id, req.body);
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(category);
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

// Delete a Category
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.deleteCategory(req.params.id);
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error); // Forward error to centralized error handler
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};


// // Create a new Category
// const createCategory = async (req, res) => {
//   try {
//     const category = await Category.createCategory(req.body);
//     res.status(201).json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all Categories
// const getAllCategories = async (req, res) => {
//   try {
//     const categories = await Category.getAllCategories();
//     res.json(categories);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a Category by ID
// const getCategoryById = async (req, res) => {
//   try {
//     const category = await Category.getCategoryById(req.params.id);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update a Category
// const updateCategory = async (req, res) => {
//   try {
//     const category = await Category.updateCategory(req.params.id, req.body);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.json(category);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a Category
// const deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.deleteCategory(req.params.id);
//     if (!category) {
//       return res.status(404).json({ message: 'Category not found' });
//     }
//     res.json({ message: 'Category deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   createCategory,
//   getAllCategories,
//   getCategoryById,
//   updateCategory,
//   deleteCategory,
// };
