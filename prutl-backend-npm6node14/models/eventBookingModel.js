//models/eventBookingModel.js
const db = require('../config/database');

// Create a new event booking
const createEventBooking = async (booking) => {
  const {  event_id, venue_id, hall_id, user_id, booking_start_date, booking_end_date, num_of_seats, total_cost, remark } = booking;
  const query = `
    INSERT INTO event_bookings ( event_id, venue_id, hall_id, user_id, booking_start_date, booking_end_date, num_of_seats, total_cost, remark)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const values = [ event_id, venue_id, hall_id, user_id, booking_start_date, booking_end_date, num_of_seats, total_cost, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all event bookings
const getAllEventBookings = async () => {
  const query = 'SELECT * FROM event_bookings';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get an event booking by ID
const getEventBookingById = async (id) => {
  const query = 'SELECT * FROM event_bookings WHERE booking_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update an event booking
const updateEventBooking = async (id, booking) => {
  const {  event_id, venue_id, hall_id, user_id, booking_start_date, booking_end_date, num_of_seats, total_cost, remark } = booking;
  const query = `
  UPDATE event_bookings
  SET  event_id = $1, venue_id = $2, hall_id = $3, user_id = $4, booking_start_date = $5, booking_end_date = $6, num_of_seats = $7, total_cost = $8, remark = $9, updated_at = CURRENT_TIMESTAMP
  WHERE booking_id = $10
  RETURNING *
`;

  const values = [ event_id, venue_id,hall_id, user_id, booking_start_date, booking_end_date, num_of_seats, total_cost, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete an event booking
const deleteEventBooking = async (id) => {
  const query = 'DELETE FROM event_bookings WHERE booking_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createEventBooking,
  getAllEventBookings,
  getEventBookingById,
  updateEventBooking,
  deleteEventBooking,
};
