// models/prutlFrameworkDimensionModel.js
const db = require('../config/database');

// Create a new PRUTL Framework Dimension
const createPrutlDimension = async (dimension) => {
  const { prutl_name, description, remark } = dimension;
  const query = `
    INSERT INTO prutl_framework_dimensions (prutl_name, description, remark)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [prutl_name, description, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all PRUTL Framework Dimensions
const getAllPrutlDimensions = async () => {
  const query = 'SELECT * FROM prutl_framework_dimensions';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a PRUTL Framework Dimension by ID
const getPrutlDimensionById = async (id) => {
  const query = 'SELECT * FROM prutl_framework_dimensions WHERE prutl_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a PRUTL Framework Dimension
const updatePrutlDimension = async (id, dimension) => {
  const { prutl_name, description, remark } = dimension;
  const query = `
    UPDATE prutl_framework_dimensions
    SET prutl_name = $1, description = $2, remark = $3, updated_at = CURRENT_TIMESTAMP
    WHERE prutl_id = $4
    RETURNING *
  `;
  const values = [prutl_name, description, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a PRUTL Framework Dimension
const deletePrutlDimension = async (id) => {
  const query = 'DELETE FROM prutl_framework_dimensions WHERE prutl_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createPrutlDimension,
  getAllPrutlDimensions,
  getPrutlDimensionById,
  updatePrutlDimension,
  deletePrutlDimension,
};
