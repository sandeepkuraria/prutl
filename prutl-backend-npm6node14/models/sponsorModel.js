//models/sponsorModel.js
const db = require('../config/database');

// Create a new sponsor entry
const createSponsor = async (sponsor) => {
  const { competition_id, sponsor_name, contact_info, phone_number, sponsorship_amount, remark } = sponsor;
  const query = `
    INSERT INTO sponsors (competition_id, sponsor_name, contact_info, phone_number, sponsorship_amount, remark)
    VALUES ($1, $2, $3, $4, $5,$6)
    RETURNING *
  `;
  const values = [competition_id, sponsor_name, contact_info, phone_number, sponsorship_amount, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all sponsors
const getAllSponsors = async () => {
  const query = 'SELECT * FROM sponsors';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a sponsor by ID
const getSponsorById = async (id) => {
  const query = 'SELECT * FROM sponsors WHERE sponsor_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a sponsor entry
const updateSponsor = async (id, sponsor) => {
  const {competition_id, sponsor_name, contact_info, phone_number, sponsorship_amount, remark } = sponsor;
  const query = `
    UPDATE sponsors
    SET competition_id = $1, sponsor_name = $2, contact_info = $3, phone_number = $4, sponsorship_amount = $5, remark = $6, updated_at = CURRENT_TIMESTAMP
    WHERE sponsor_id = $7
    RETURNING *
  `;
  const values = [competition_id, sponsor_name, contact_info, phone_number, sponsorship_amount, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a sponsor entry
const deleteSponsor = async (id) => {
  const query = 'DELETE FROM sponsors WHERE sponsor_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createSponsor,
  getAllSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
};
