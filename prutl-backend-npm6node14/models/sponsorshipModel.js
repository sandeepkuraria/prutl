//models/sponsorshipModel.js
const db = require('../config/database');

// Create a new sponsorship
const createSponsorship = async (sponsorship) => {
  const { sponsor_id, team_id, event_id, amount, sponsorship_date, remark } = sponsorship;
  const query = `
    INSERT INTO sponsorships (sponsor_id, team_id, event_id, amount, sponsorship_date, remark)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const values = [sponsor_id, team_id, event_id, amount, sponsorship_date, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all sponsorships
const getAllSponsorships = async () => {
  const query = 'SELECT * FROM sponsorships';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a sponsorship by ID
const getSponsorshipById = async (id) => {
  const query = 'SELECT * FROM sponsorships WHERE sponsorship_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a sponsorship
const updateSponsorship = async (id, sponsorship) => {
  const { sponsor_id, team_id, event_id, amount, sponsorship_date, remark } = sponsorship;
  const query = `
    UPDATE sponsorships
    SET sponsor_id = $1, team_id = $2, event_id = $3, amount = $4, sponsorship_date = $5, remark = $6, updated_at = CURRENT_TIMESTAMP
    WHERE sponsorship_id = $7
    RETURNING *
  `;
  const values = [sponsor_id, team_id, event_id, amount, sponsorship_date, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a sponsorship
const deleteSponsorship = async (id) => {
  const query = 'DELETE FROM sponsorships WHERE sponsorship_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createSponsorship,
  getAllSponsorships,
  getSponsorshipById,
  updateSponsorship,
  deleteSponsorship,
};
