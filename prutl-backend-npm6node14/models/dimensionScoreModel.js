// models/dimensionScoreModel.js
const db = require('../config/database');

// Create a new dimension score
const createDimensionScore = async (dimensionScore) => {
  const { user_id, dimension_id, prutl_id, score_value, assessment_date, remark } = dimensionScore;
  const query = `
    INSERT INTO dimension_scores (user_id, dimension_id, prutl_id, score_value, assessment_date, remark)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [user_id, dimension_id, prutl_id, score_value, assessment_date, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all dimension scores
const getAllDimensionScores = async () => {
  const query = 'SELECT * FROM dimension_scores';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a dimension score by ID
const getDimensionScoreById = async (id) => {
  const query = 'SELECT * FROM dimension_scores WHERE dimension_score_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a dimension score
const updateDimensionScore = async (id, dimensionScore) => {
  const { user_id, dimension_id, prutl_id, score_value, assessment_date, remark } = dimensionScore;
  const query = `
    UPDATE dimension_scores
    SET user_id = $1, dimension_id = $2, prutl_id= $3, score_value = $4, assessment_date = $5, remark = $6, updated_at = CURRENT_TIMESTAMP
    WHERE dimension_score_id = $7
    RETURNING *
  `;
  const values = [user_id, dimension_id, prutl_id, score_value, assessment_date, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a dimension score
const deleteDimensionScore = async (id) => {
  const query = 'DELETE FROM dimension_scores WHERE dimension_score_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createDimensionScore,
  getAllDimensionScores,
  getDimensionScoreById,
  updateDimensionScore,
  deleteDimensionScore,
};
