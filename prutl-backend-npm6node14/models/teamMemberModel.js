const db = require('../config/database');

// Create a new Team Member
const createTeamMember = async (teamMember) => {
  const { user_id, team_id, role_id, remark } = teamMember;
  const query = `
    INSERT INTO team_members (user_id, team_id, role_id, remark)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [user_id, team_id, role_id, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all Team Members
const getAllTeamMembers = async () => {
  const query = 'SELECT * FROM team_members';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a Team Member by ID
const getTeamMemberById = async (id) => {
  const query = 'SELECT * FROM team_members WHERE team_member_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a Team Member
const updateTeamMember = async (id, teamMember) => {
  const { user_id, team_id, role_id, remark } = teamMember;
  const query = `
    UPDATE team_members
    SET user_id = $1, team_id = $2, role_id = $3, remark = $4, updated_at = CURRENT_TIMESTAMP
    WHERE team_member_id = $5
    RETURNING *;
  `;
  const values = [user_id, team_id, role_id, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a Team Member
const deleteTeamMember = async (id) => {
  const query = 'DELETE FROM team_members WHERE team_member_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
};


// const db = require('../config/database');

// // Create a new Team Member
// const createTeamMember = async (teamMember) => {
//   const { user_id, team_id, role_id, remark,profile_picture_url } = teamMember;
//   const query = `
//     INSERT INTO team_members (user_id, team_id, role_id, remark,profile_picture_url)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *;
//   `;
//   const values = [user_id, team_id, role_id, remark,profile_picture_url];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Get all Team Members
// const getAllTeamMembers = async () => {
//   const query = 'SELECT * FROM team_members';
//   const { rows } = await db.pool.query(query);
//   return rows;
// };

// // Get a Team Member by ID
// const getTeamMemberById = async (id) => {
//   const query = 'SELECT * FROM team_members WHERE team_member_id = $1';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// // Update a Team Member
// const updateTeamMember = async (id, teamMember) => {
//   const { user_id, team_id, role_id, remark, profile_picture_url } = teamMember;
//   const query = `
//     UPDATE team_members
//     SET user_id = $1, team_id = $2, role_id = $3, remark = $4, profile_picture_url = $5, updated_at = CURRENT_TIMESTAMP
//     WHERE team_member_id = $6
//     RETURNING *;
//   `;
//   const values = [user_id, team_id, role_id, remark,profile_picture_url, id];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Delete a Team Member
// const deleteTeamMember = async (id) => {
//   const query = 'DELETE FROM team_members WHERE team_member_id = $1 RETURNING *';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// module.exports = {
//   createTeamMember,
//   getAllTeamMembers,
//   getTeamMemberById,
//   updateTeamMember,
//   deleteTeamMember,
// };
