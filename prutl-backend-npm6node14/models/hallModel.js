// models/hallModel.js
const db = require('../config/database');

// Create a new hall (hall_code will be auto-generated)
const createHall = async (hall) => {
  const { hall_name, venue_id, seating_capacity, remark } = hall;
  const query = `
    INSERT INTO halls (hall_name, venue_id, seating_capacity, remark)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [hall_name, venue_id, seating_capacity, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all halls
const getAllHalls = async () => {
  const query = 'SELECT * FROM halls;';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a hall by ID
const getHallById = async (id) => {
  const query = 'SELECT * FROM halls WHERE hall_id = $1;';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a hall (hall_code is not updated here as it's auto-generated)
const updateHall = async (id, hall) => {
  const { hall_name, venue_id, seating_capacity, remark } = hall;
  const query = `
    UPDATE halls
    SET hall_name = $1, venue_id = $2, seating_capacity = $3, remark = $4, updated_at = CURRENT_TIMESTAMP
    WHERE hall_id = $5
    RETURNING *;
  `;
  const values = [hall_name, venue_id, seating_capacity, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a hall by ID
const deleteHall = async (id) => {
  const query = 'DELETE FROM halls WHERE hall_id = $1 RETURNING *;';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createHall,
  getAllHalls,
  getHallById,
  updateHall,
  deleteHall,
};


// //models/hallModel.js

// const db = require('../config/database');

// const createHall = async (hall) => {
//   const { hall_code, hall_name, venue_id, seating_capacity, remark } = hall;
//   const query = `
//     INSERT INTO halls (hall_code, hall_name, venue_id, seating_capacity, remark)
//     VALUES ($1, $2, $3, $4, $5)
//     RETURNING *
//   `;
//   const values = [hall_code, hall_name, venue_id, seating_capacity, remark];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// const getAllHalls = async () => {
//   const query = 'SELECT * FROM halls';
//   const { rows } = await db.pool.query(query);
//   return rows;
// };

// const getHallById = async (id) => {
//   const query = 'SELECT * FROM halls WHERE hall_id = $1';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// const updateHall = async (id, hall) => {
//   const { hall_code, hall_name, venue_id, seating_capacity, remark } = hall;
//   const query = `
//     UPDATE halls
//     SET hall_code = $1, hall_name = $2, venue_id = $3, seating_capacity = $4, remark = $5, updated_at = CURRENT_TIMESTAMP
//     WHERE hall_id = $6
//     RETURNING *
//   `;
//   const values = [hall_code, hall_name, venue_id, seating_capacity, remark, id];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// const deleteHall = async (id) => {
//   const query = 'DELETE FROM halls WHERE hall_id = $1 RETURNING *';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// module.exports = {
//   createHall,
//   getAllHalls,
//   getHallById,
//   updateHall,
//   deleteHall,
// };
