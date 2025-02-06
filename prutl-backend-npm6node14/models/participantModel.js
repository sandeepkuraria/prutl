//models/participantModel.js
const db = require('../config/database');

// Create a new participant entry
const createParticipant = async (participant) => {
  const { user_id, usergroup_id, competition_id, org_id, event_id, remark } = participant;
  const query = `
    INSERT INTO participants (user_id, usergroup_id, competition_id, org_id, event_id, remark)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [user_id, usergroup_id, competition_id, org_id, event_id, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all participants
const getAllParticipants = async () => {
  const query = 'SELECT * FROM participants';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a participant by ID
const getParticipantById = async (id) => {
  const query = 'SELECT * FROM participants WHERE participant_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a participant entry
const updateParticipant = async (id, participant) => {
  const { user_id, usergroup_id, competition_id, org_id, event_id, remark } = participant;
  const query = `
    UPDATE participants
    SET user_id = $1, usergroup_id = $2, competition_id = $3, org_id = $4, event_id = $5, remark = $6, updated_at = CURRENT_TIMESTAMP
    WHERE participant_id = $7
    RETURNING *
  `;
  const values = [user_id, usergroup_id, competition_id, org_id, event_id, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a participant entry
const deleteParticipant = async (id) => {
  const query = 'DELETE FROM participants WHERE participant_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createParticipant,
  getAllParticipants,
  getParticipantById,
  updateParticipant,
  deleteParticipant,
};
