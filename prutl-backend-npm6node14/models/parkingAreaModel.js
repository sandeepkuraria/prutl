const db = require('../config/database');

// Create a new parking area
const createParkingArea = async (parkingArea) => {
  const { pin_code, address, latitude, longitude, remark } = parkingArea;
  const query = `
    INSERT INTO parking_areas (pin_code, address, latitude, longitude, remark)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [pin_code, address, latitude, longitude, remark];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all parking areas
const getAllParkingAreas = async () => {
  const query = 'SELECT * FROM parking_areas';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a parking area by ID
const getParkingAreaById = async (id) => {
  const query = 'SELECT * FROM parking_areas WHERE parking_area_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a parking area
const updateParkingArea = async (id, parkingArea) => {
  const { pin_code, address, latitude, longitude, remark } = parkingArea;
  const query = `
    UPDATE parking_areas
    SET pin_code = $1, address = $2, latitude = $3, longitude = $4, remark = $5, updated_at = CURRENT_TIMESTAMP
    WHERE parking_area_id = $6
    RETURNING *;
  `;
  const values = [pin_code, address, latitude, longitude, remark, id];
  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a parking area
const deleteParkingArea = async (id) => {
  const query = 'DELETE FROM parking_areas WHERE parking_area_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createParkingArea,
  getAllParkingAreas,
  getParkingAreaById,
  updateParkingArea,
  deleteParkingArea,
};
