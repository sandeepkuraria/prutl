// models/categoryModel.js
const db = require('../config/database');

// Create a new Category
const createCategory = async (category) => {
  const { category_name, passion_dimension, prutl_dimension, remark } = category;
  const query = `
    INSERT INTO categories (category_name, passion_dimension, prutl_dimension, remark)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [category_name, passion_dimension, prutl_dimension, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all Categories
const getAllCategories = async () => {
  const query = 'SELECT * FROM categories';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a Category by ID
const getCategoryById = async (id) => {
  const query = 'SELECT * FROM categories WHERE category_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a Category
const updateCategory = async (id, category) => {
  const { category_name, passion_dimension, prutl_dimension, remark } = category;
  const query = `
    UPDATE categories
    SET category_name = $1, passion_dimension = $2, prutl_dimension = $3, remark = $4, updated_at = CURRENT_TIMESTAMP
    WHERE category_id = $5
    RETURNING *
  `;
  const values = [category_name, passion_dimension, prutl_dimension, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a Category
const deleteCategory = async (id) => {
  const query = 'DELETE FROM categories WHERE category_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
