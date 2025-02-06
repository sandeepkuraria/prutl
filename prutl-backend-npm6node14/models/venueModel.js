// //models/venueModel.js

const db = require('../config/database');

// Create a new venue
const createVenue = async (venue) => {
  const {
    venue_name,
    address,
    seating_capacity,
    phone_number,
    contact_person,
    city,
    county,
    state,
    country,
    pin_code,
    remark
  } = venue;

  const query = `
    INSERT INTO venues (venue_name, address, seating_capacity, phone_number, contact_person, city, county, state, country, pin_code, remark)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;

  const values = [venue_name, address, seating_capacity, phone_number, contact_person, city, county, state, country, pin_code, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all venues
const getAllVenues = async () => {
  const query = 'SELECT * FROM venues';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a venue by ID
const getVenueById = async (id) => {
  const query = 'SELECT * FROM venues WHERE venue_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a venue
const updateVenue = async (id, venue) => {
  const {
    venue_name,
    address,
    seating_capacity,
    phone_number,
    contact_person,
    city,
    county,
    state,
    country,
    pin_code,
    remark
  } = venue;

  const query = `
    UPDATE venues
    SET venue_name = $1, address = $2, seating_capacity = $3, phone_number = $4, contact_person = $5, city = $6, county = $7, state = $8, country = $9, pin_code = $10, remark = $11, updated_at = CURRENT_TIMESTAMP
    WHERE venue_id = $12
    RETURNING *;
  `;

  const values = [venue_name, address, seating_capacity, phone_number, contact_person, city, county, state, country, pin_code, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a venue
const deleteVenue = async (id) => {
  const query = 'DELETE FROM venues WHERE venue_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createVenue,
  getAllVenues,
  getVenueById,
  updateVenue,
  deleteVenue,
};

// //models/venueModel.js

// const db = require('../config/database');

// // Create a new venue
// const createVenue = async (venue) => {
//   const { venue_code, venue_name, address, seating_capacity, phone_number, contact_person, city, county, state, country, pin_code, remark } = venue;
//   const query = `
//     INSERT INTO venues (venue_code, venue_name, address, seating_capacity, phone_number, contact_person, city, county, state, country, pin_code, remark)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
//     RETURNING *
//   `;
//   const values = [venue_code, venue_name, address, seating_capacity, phone_number, contact_person, city, county, state, country, pin_code, remark];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Get all venues
// const getAllVenues = async () => {
//   const query = 'SELECT * FROM venues';
//   const { rows } = await db.pool.query(query);
//   return rows;
// };

// // Get a venue by ID
// const getVenueById = async (id) => {
//   const query = 'SELECT * FROM venues WHERE venue_id = $1';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// // Update a venue
// const updateVenue = async (id, venue) => {
//   const { venue_code, venue_name, address, seating_capacity, phone_number, contact_person, city, county, state, country, pin_code, remark } = venue;
//   const query = `
//     UPDATE venues
//     SET venue_code = $1, venue_name = $2, address = $3, seating_capacity = $4, phone_number = $5, contact_person = $6, city = $7, county = $8, state = $9, country = $10, pin_code = $11, remark = $12, updated_at = CURRENT_TIMESTAMP
//     WHERE venue_id = $13
//     RETURNING *
//   `;
//   const values = [venue_code, venue_name, address, seating_capacity, phone_number, contact_person, city, county, state, country, pin_code, remark, id];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Delete a venue
// const deleteVenue = async (id) => {
//   const query = 'DELETE FROM venues WHERE venue_id = $1 RETURNING *';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// module.exports = {
//   createVenue,
//   getAllVenues,
//   getVenueById,
//   updateVenue,
//   deleteVenue,
// };
