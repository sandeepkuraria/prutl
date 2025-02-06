//models/scoreModel.js
const db = require('../config/database');

// Create a new score
const createScore = async (score) => {
  const { user_id, team_id, competition_id, category_id, score_value, assessment_date, year, month, remark } = score;
  const query = `
    INSERT INTO scores (user_id, team_id, competition_id, category_id, score_value, assessment_date, year, month, remark)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;
  const values = [user_id, team_id, competition_id, category_id, score_value, assessment_date, year, month, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all scores
const getAllScores = async () => {
  const query = 'SELECT * FROM scores';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a score by ID
const getScoreById = async (id) => {
  const query = 'SELECT * FROM scores WHERE score_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a score
const updateScore = async (id, score) => {
  const { user_id, team_id, competition_id, category_id, score_value, assessment_date, year, month, remark } = score;
  const query = `
    UPDATE scores
    SET user_id = $1, team_id = $2, competition_id = $3, category_id = $4, score_value = $5, assessment_date = $6, year = $7, month = $8, remark = $9, updated_at = CURRENT_TIMESTAMP
    WHERE score_id = $10
    RETURNING *
  `;
  const values = [user_id, team_id, competition_id, category_id, score_value, assessment_date, year, month, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a score
const deleteScore = async (id) => {
  const query = 'DELETE FROM scores WHERE score_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createScore,
  getAllScores,
  getScoreById,
  updateScore,
  deleteScore,
};
