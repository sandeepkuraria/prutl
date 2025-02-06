//models/awardModel.js
const db = require('../config/database');

// Create a new award
const createAward = async (award) => {
  const { award_name, award_date, user_id, team_id, year, month, remark } = award;
  const query = `
    INSERT INTO awards (award_name, award_date, user_id, team_id, year, month, remark)
    VALUES ($1, $2, $3, $4, $5,$6, $7)
    RETURNING *
  `;
  const values = [award_name, award_date, user_id, team_id, year, month, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all awards
const getAllAwards = async () => {
  const query = 'SELECT * FROM awards';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get an award by ID
const getAwardById = async (id) => {
  const query = 'SELECT * FROM awards WHERE award_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update an award
const updateAward = async (id, award) => {
  const { award_name, award_date, user_id, team_id, year, month, remark } = award;
  const query = `
    UPDATE awards
    SET award_name = $1, award_date = $2, user_id = $3, team_id = $4, year = $5, month = $6, remark = $7, updated_at = CURRENT_TIMESTAMP
    WHERE award_id = $8
    RETURNING *
  `;
  const values = [award_name, award_date, user_id, team_id, year, month, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete an award
const deleteAward = async (id) => {
  const query = 'DELETE FROM awards WHERE award_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createAward,
  getAllAwards,
  getAwardById,
  updateAward,
  deleteAward,
};
