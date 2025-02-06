//models/committeeModel.js
const db = require('../config/database');

// Create a new committee entry
const createCommittee = async (committee) => {
  const { event_id, committee_name, committee_type, remark } = committee;
  const query = `
    INSERT INTO committees (event_id, committee_name, committee_type, remark)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [event_id, committee_name, committee_type, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all committees
const getAllCommittees = async () => {
  const query = 'SELECT * FROM committees';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a committee by ID
const getCommitteeById = async (id) => {
  const query = 'SELECT * FROM committees WHERE committee_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a committee entry
const updateCommittee = async (id, committee) => {
  const { event_id, committee_name, committee_type, remark } = committee;
  const query = `
    UPDATE committees
    SET event_id = $1, committee_name = $2, committee_type = $3, remark = $4, updated_at = CURRENT_TIMESTAMP
    WHERE committee_id = $5
    RETURNING *
  `;
  const values = [event_id, committee_name, committee_type, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a committee entry
const deleteCommittee = async (id) => {
  const query = 'DELETE FROM committees WHERE committee_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createCommittee,
  getAllCommittees,
  getCommitteeById,
  updateCommittee,
  deleteCommittee,
};
