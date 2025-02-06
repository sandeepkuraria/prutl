//models/userGroupModel.js
const db = require('../config/database');

// Create a new user group
const createUserGroup = async (userGroup) => {
  const {  group_name, description, remark } = userGroup;
  const query = `
    INSERT INTO user_groups ( group_name, description, remark)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [ group_name, description, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all user groups
const getAllUserGroups = async () => {
  const query = 'SELECT * FROM user_groups';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a user group by ID
const getUserGroupById = async (id) => {
  const query = 'SELECT * FROM user_groups WHERE usergroup_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a user group
const updateUserGroup = async (id, userGroup) => {
  const { group_code, group_name, description, remark } = userGroup;
  const query = `
    UPDATE user_groups
    SET  group_name = $1, description = $2, remark = $3, updated_at = CURRENT_TIMESTAMP
    WHERE usergroup_id = $4
    RETURNING *
  `;
  const values = [ group_name, description, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a user group
const deleteUserGroup = async (id) => {
  const query = 'DELETE FROM user_groups WHERE usergroup_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createUserGroup,
  getAllUserGroups,
  getUserGroupById,
  updateUserGroup,
  deleteUserGroup,
};
