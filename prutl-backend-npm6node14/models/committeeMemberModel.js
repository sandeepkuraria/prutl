//models/committeeMemberModel.js
const db = require('../config/database');

// Create a new committee member
const createCommitteeMember = async (committeeMember) => {
  const { role_id, user_id, committee_id, remark } = committeeMember;
  const query = `
    INSERT INTO committee_members (role_id, user_id, committee_id, remark)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [role_id, user_id, committee_id, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all committee members
const getAllCommitteeMembers = async () => {
  const query = 'SELECT * FROM committee_members';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a committee member by ID
const getCommitteeMemberById = async (id) => {
  const query = 'SELECT * FROM committee_members WHERE committee_member_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a committee member
const updateCommitteeMember = async (id, committeeMember) => {
  const {role_id, user_id, committee_id, remark } = committeeMember;
  const query = `
    UPDATE committee_members
    SET role_id = $1, user_id = $2, committee_id = $3, remark = $4, updated_at = CURRENT_TIMESTAMP
    WHERE committee_member_id = $5
    RETURNING *
  `;
  const values = [role_id, user_id, committee_id, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a committee member
const deleteCommitteeMember = async (id) => {
  const query = 'DELETE FROM committee_members WHERE committee_member_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createCommitteeMember,
  getAllCommitteeMembers,
  getCommitteeMemberById,
  updateCommitteeMember,
  deleteCommitteeMember,
};
