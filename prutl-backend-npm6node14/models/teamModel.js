//models/teamModel.js
const db = require('../config/database');

// Create a new team entry
const createTeam = async (team) => {
  const { role_id, team_name, sponsor_id, competition_id, remark, team_icon_url, team_color } = team;
  const query = `
    INSERT INTO teams (role_id, team_name, sponsor_id, competition_id, remark, team_icon_url, team_color)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [role_id, team_name, sponsor_id, competition_id, remark, team_icon_url, team_color];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all teams
const getAllTeams = async () => {
  const query = 'SELECT * FROM teams';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a team by ID
const getTeamById = async (id) => {
  const query = 'SELECT * FROM teams WHERE team_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a team entry
const updateTeam = async (id, team) => {
  const { role_id, team_name, sponsor_id, competition_id, remark, team_icon_url, team_color } = team;
  const query = `
    UPDATE teams
    SET role_id = $1, team_name = $2, sponsor_id = $3, competition_id = $4, remark = $5, team_icon_url = $6, team_color = $7, updated_at = CURRENT_TIMESTAMP
    WHERE team_id = $8
    RETURNING *
  `;
  const values = [role_id, team_name, sponsor_id, competition_id, remark, team_icon_url, team_color, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a team entry
const deleteTeam = async (id) => {
  const query = 'DELETE FROM teams WHERE team_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};




//models/teamModel.js

// const db = require('../config/database');

// // Create a new team entry
// const createTeam = async (team) => {
//   const { role_id, team_name, sponsor_id, competition_id, remark } = team;
//   const query = `
//     INSERT INTO teams (role_id, team_name, sponsor_id, competition_id, remark)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *
//   `;
//   const values = [role_id, team_name, sponsor_id, competition_id, remark];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Get all teams
// const getAllTeams = async () => {
//   const query = 'SELECT * FROM teams';
//   const { rows } = await db.pool.query(query);
//   return rows;
// };

// // Get a team by ID
// const getTeamById = async (id) => {
//   const query = 'SELECT * FROM teams WHERE team_id = $1';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// // Update a team entry
// const updateTeam = async (id, team) => {
//   const { role_id, team_name, sponsor_id, competition_id, remark } = team;
//   const query = `
//     UPDATE teams
//     SET role_id = $1, team_name = $2, sponsor_id = $3, competition_id = $4, remark = $5, updated_at = CURRENT_TIMESTAMP
//     WHERE team_id = $6
//     RETURNING *
//   `;
//   const values = [role_id, team_name, sponsor_id, competition_id, remark, id];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Delete a team entry
// const deleteTeam = async (id) => {
//   const query = 'DELETE FROM teams WHERE team_id = $1 RETURNING *';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// module.exports = {
//   createTeam,
//   getAllTeams,
//   getTeamById,
//   updateTeam,
//   deleteTeam,
// };
