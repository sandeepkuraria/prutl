// models/membership.js
const { pool } = require('../config/database');

const createMembership = async (membershipData) => {
  const { membership_type, start_date, end_date, payment_status, remark } = membershipData;
  try {
    const query = `
      INSERT INTO memberships (membership_type, start_date, end_date, payment_status, remark)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [membership_type, start_date, end_date, payment_status, remark];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const getAllMemberships = async () => {
  try {
    const query = 'SELECT * FROM memberships';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getMembershipById = async (id) => {
  try {
    const query = 'SELECT * FROM memberships WHERE membership_id = $1';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      throw new Error('Membership not found');
    }
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const updateMembership = async (id, membershipData) => {
  const { membership_type, start_date, end_date, payment_status, remark } = membershipData;
  try {
    const query = `
      UPDATE memberships
      SET membership_type = $1, start_date = $2, end_date = $3, payment_status = $4, remark = $5
      WHERE membership_id = $6
      RETURNING *
    `;
    const values = [membership_type, start_date, end_date, payment_status, remark, id];
    const { rows } = await pool.query(query, values);
    if (rows.length === 0) {
      throw new Error('Membership not found');
    }
    return rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteMembership = async (id) => {
  try {
    const query = 'DELETE FROM memberships WHERE membership_id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    if (rows.length === 0) {
      throw new Error('Membership not found');
    }
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createMembership,
  getAllMemberships,
  getMembershipById,
  updateMembership,
  deleteMembership,
};
