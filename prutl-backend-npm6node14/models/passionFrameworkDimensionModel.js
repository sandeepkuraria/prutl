//models/passionFrameworkDimensionModel.js
const db = require('../config/database');

// Create a new dimension
const createDimension = async (dimension) => {
  const { dimension_name, description, remark } = dimension;
  const query = `
    INSERT INTO passion_framework_dimensions (dimension_name, description, remark)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [dimension_name, description, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all dimensions
const getAllDimensions = async () => {
  const query = 'SELECT * FROM passion_framework_dimensions';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a dimension by ID
const getDimensionById = async (id) => {
  const query = 'SELECT * FROM passion_framework_dimensions WHERE dimension_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a dimension
const updateDimension = async (id, dimension) => {
  const { dimension_name, description, remark } = dimension;
  const query = `
    UPDATE passion_framework_dimensions
    SET dimension_name = $1, description = $2, remark = $3, updated_at = CURRENT_TIMESTAMP
    WHERE dimension_id = $4
    RETURNING *
  `;
  const values = [dimension_name, description, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a dimension
const deleteDimension = async (id) => {
  const query = 'DELETE FROM passion_framework_dimensions WHERE dimension_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createDimension,
  getAllDimensions,
  getDimensionById,
  updateDimension,
  deleteDimension,
};
