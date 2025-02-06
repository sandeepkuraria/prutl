//models/bookingServiceModel.js
const db = require('../config/database');

// Create a new booking service
const createBookingService = async (service) => {
  const { booking_id, service_id, quantity, total_cost, remark } = service;
  const query = `
    INSERT INTO booking_services (booking_id, service_id, quantity, total_cost, remark)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const values = [booking_id, service_id, quantity, total_cost, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all booking services
const getAllBookingServices = async () => {
  const query = 'SELECT * FROM booking_services';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a booking service by ID
const getBookingServiceById = async (id) => {
  const query = 'SELECT * FROM booking_services WHERE booking_service_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a booking service
const updateBookingService = async (id, service) => {
  const { booking_id, service_id, quantity, total_cost, remark } = service;
  const query = `
    UPDATE booking_services
    SET booking_id = $1, service_id = $2, quantity = $3, total_cost = $4, remark = $5, updated_at = CURRENT_TIMESTAMP
    WHERE booking_service_id = $6
    RETURNING *
  `;
  const values = [booking_id, service_id, quantity, total_cost, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a booking service
const deleteBookingService = async (id) => {
  const query = 'DELETE FROM booking_services WHERE booking_service_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createBookingService,
  getAllBookingServices,
  getBookingServiceById,
  updateBookingService,
  deleteBookingService,
};
