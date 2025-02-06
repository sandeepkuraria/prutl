// models/eventModel.js
const db = require('../config/database');

// Create a new Event
const createEvent = async (event) => {
  const { event_name, org_id, start_date, end_date, location, description, remark } = event;
  const query = `
    INSERT INTO events (event_name, org_id, start_date, end_date, location, description, remark)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [event_name, org_id, start_date, end_date, location, description, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all Events
const getAllEvents = async () => {
  const query = 'SELECT * FROM events';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get an Event by ID
const getEventById = async (id) => {
  const query = 'SELECT * FROM events WHERE event_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update an Event
const updateEvent = async (id, event) => {
  const { event_name, org_id, start_date, end_date, location, description, remark } = event;
  const query = `
    UPDATE events
    SET event_name = $1, org_id = $2, start_date = $3, end_date = $4, location = $5, description = $6, remark = $7, updated_at = CURRENT_TIMESTAMP
    WHERE event_id = $8
    RETURNING *;
  `;
  const values = [event_name, org_id, start_date, end_date, location, description, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete an Event
const deleteEvent = async (id) => {
  const query = 'DELETE FROM events WHERE event_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};


// //models/eventModel.js
// const db = require('../config/database');

// // Create a new event
// const createEvent = async (event) => {
//   const { event_code, event_name, org_id, start_date, end_date, location, description, remark } = event;
//   const query = `
//     INSERT INTO events (event_code, event_name, org_id, start_date, end_date, location, description, remark)
//     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//     RETURNING *
//   `;
//   const values = [event_code, event_name, org_id, start_date, end_date, location, description, remark];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Get all events
// const getAllEvents = async () => {
//   const query = 'SELECT * FROM events';
//   const { rows } = await db.pool.query(query);
//   return rows;
// };

// // Get an event by ID
// const getEventById = async (id) => {
//   const query = 'SELECT * FROM events WHERE event_id = $1';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// // Update an event
// const updateEvent = async (id, event) => {
//   const { event_code, event_name, org_id, start_date, end_date, location, description, remark } = event;
//   const query = `
//     UPDATE events
//     SET event_code = $1, event_name = $2, org_id= $3, start_date = $4, end_date = $5, location = $6, description = $7, remark = $8, updated_at = CURRENT_TIMESTAMP
//     WHERE event_id = $9
//     RETURNING *
//   `;
//   const values = [event_code, event_name, org_id, start_date, end_date, location, description, remark, id];
//   const { rows } = await db.pool.query(query, values);
//   return rows[0];
// };

// // Delete an event
// const deleteEvent = async (id) => {
//   const query = 'DELETE FROM events WHERE event_id = $1 RETURNING *';
//   const { rows } = await db.pool.query(query, [id]);
//   return rows[0];
// };

// module.exports = {
//   createEvent,
//   getAllEvents,
//   getEventById,
//   updateEvent,
//   deleteEvent,
// };
