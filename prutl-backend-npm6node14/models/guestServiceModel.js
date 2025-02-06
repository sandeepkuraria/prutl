//models/guestServiceModel.js
const db = require('../config/database');

// Create a new guest service
const createGuestService = async (service) => {
  const {  service_name, description, cost_per_unit, remark } = service;
  const query = `
    INSERT INTO guest_services ( service_name, description, cost_per_unit, remark)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [ service_name, description, cost_per_unit, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all guest services
const getAllGuestServices = async () => {
  const query = 'SELECT * FROM guest_services';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a guest service by ID
const getGuestServiceById = async (id) => {
  const query = 'SELECT * FROM guest_services WHERE service_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a guest service
const updateGuestService = async (id, service) => {
  const {  service_name, description, cost_per_unit, remark } = service;
  const query = `
    UPDATE guest_services
    SET  service_name = $1, description = $2, cost_per_unit = $3, remark = $4, updated_at = CURRENT_TIMESTAMP
    WHERE service_id = $5
    RETURNING *
  `;
  const values = [ service_name, description, cost_per_unit, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a guest service
const deleteGuestService = async (id) => {
  const query = 'DELETE FROM guest_services WHERE service_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createGuestService,
  getAllGuestServices,
  getGuestServiceById,
  updateGuestService,
  deleteGuestService,
};
