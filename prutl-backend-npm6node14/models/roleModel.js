const db = require('../config/database');

// Create a new Role
const createRole = async (role) => {
  const { role_name, remark } = role; // Removed role_code from destructuring
  const query = `
    INSERT INTO roles (role_name, remark)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [role_name, remark]; // No role_code in values
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all Roles
const getAllRoles = async () => {
  const query = 'SELECT * FROM roles';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a Role by ID
const getRoleById = async (id) => {
  const query = 'SELECT * FROM roles WHERE role_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a Role
const updateRole = async (id, role) => {
  const { role_name, remark } = role; // Removed role_code from destructuring
  const query = `
    UPDATE roles
    SET role_name = $1, remark = $2, updated_at = CURRENT_TIMESTAMP
    WHERE role_id = $3
    RETURNING *
  `;
  const values = [role_name, remark, id]; // No role_code in values
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a Role
const deleteRole = async (id) => {
  const query = 'DELETE FROM roles WHERE role_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};


// // models/roleModel.js
// const db = require('../config/database');

// // Create a new Role
// const createRole = async (role) => {
//   const { role_code, role_name, remark } = role;
//   const query = `
//     INSERT INTO roles (role_code, role_name, remark)
//     VALUES ($1, $2, $3)
//     RETURNING *
//   `;
//   const values = [role_code, role_name, remark];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Get all Roles
// const getAllRoles = async () => {
//   const query = 'SELECT * FROM roles';
//   const { rows } = await db.pool.query(query);
//   return rows;
// };

// // Get a Role by ID
// const getRoleById = async (id) => {
//   const query = 'SELECT * FROM roles WHERE role_id = $1';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// // Update a Role
// const updateRole = async (id, role) => {
//   const { role_code, role_name, remark } = role;
//   const query = `
//     UPDATE roles
//     SET role_code = $1, role_name = $2, remark = $3, updated_at = CURRENT_TIMESTAMP
//     WHERE role_id = $4
//     RETURNING *
//   `;
//   const values = [role_code, role_name, remark, id];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Delete a Role
// const deleteRole = async (id) => {
//   const query = 'DELETE FROM roles WHERE role_id = $1 RETURNING *';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// module.exports = {
//   createRole,
//   getAllRoles,
//   getRoleById,
//   updateRole,
//   deleteRole,
// };
