// models/vehicleModel.js

const db = require('../config/database');

// Create a new vehicle
const createVehicle = async (vehicle) => {
  const {
    vehicle_number,
    ticket_number,
    entry_time,
    exit_time,
    numberofperson_entry_male,
    numberofperson_entry_female,
    numberofkids_entry_male,
    numberofkids_entry_female,
    driver_name,
    driver_phone_number,
    vehicle_owner_name,
    vehicle_license,
    driver_alcohol_influence_entry_time,
    driver_alcohol_influence_exit_time,
    parking_area,
    parking_code,
    competition_id,
    remark
  } = vehicle;

  const query = `
    INSERT INTO vehicles (
      vehicle_number, ticket_number, entry_time, exit_time,
      numberofperson_entry_male, numberofperson_entry_female,
      numberofkids_entry_male, numberofkids_entry_female,
      driver_name, driver_phone_number, vehicle_owner_name,
      vehicle_license, driver_alcohol_influence_entry_time,
      driver_alcohol_influence_exit_time, parking_area, parking_code,
      competition_id, remark
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8,
      $9, $10, $11, $12, $13, $14, $15, $16,
      $17, $18
    )
    RETURNING *;
  `;

  const values = [
    vehicle_number, ticket_number, entry_time, exit_time,
    numberofperson_entry_male, numberofperson_entry_female,
    numberofkids_entry_male, numberofkids_entry_female,
    driver_name, driver_phone_number, vehicle_owner_name,
    vehicle_license, driver_alcohol_influence_entry_time,
    driver_alcohol_influence_exit_time, parking_area, parking_code,
    competition_id, remark
  ];

  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Get all vehicles
const getAllVehicles = async () => {
  const query = 'SELECT * FROM vehicles';
  const { rows } = await db.pool.query(query);
  return rows;
};

// Get a vehicle by ID
const getVehicleById = async (id) => {
  const query = 'SELECT * FROM vehicles WHERE vehicle_id = $1';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

// Update a vehicle
const updateVehicle = async (id, vehicle) => {
  const {
    vehicle_number,
    ticket_number,
    entry_time,
    exit_time,
    numberofperson_entry_male,
    numberofperson_entry_female,
    numberofkids_entry_male,
    numberofkids_entry_female,
    driver_name,
    driver_phone_number,
    vehicle_owner_name,
    vehicle_license,
    driver_alcohol_influence_entry_time,
    driver_alcohol_influence_exit_time,
    parking_area,
    parking_code,
    competition_id,
    remark
  } = vehicle;

  const query = `
    UPDATE vehicles
    SET
      vehicle_number = $1,
      ticket_number = $2,
      entry_time = $3,
      exit_time = $4,
      numberofperson_entry_male = $5,
      numberofperson_entry_female = $6,
      numberofkids_entry_male = $7,
      numberofkids_entry_female = $8,
      driver_name = $9,
      driver_phone_number = $10,
      vehicle_owner_name = $11,
      vehicle_license = $12,
      driver_alcohol_influence_entry_time = $13,
      driver_alcohol_influence_exit_time = $14,
      parking_area = $15,
      parking_code = $16,
      competition_id = $17,
      remark = $18,
      updated_at = CURRENT_TIMESTAMP
    WHERE vehicle_id = $19
    RETURNING *;
  `;

  const values = [
    vehicle_number, ticket_number, entry_time, exit_time,
    numberofperson_entry_male, numberofperson_entry_female,
    numberofkids_entry_male, numberofkids_entry_female,
    driver_name, driver_phone_number, vehicle_owner_name,
    vehicle_license, driver_alcohol_influence_entry_time,
    driver_alcohol_influence_exit_time, parking_area, parking_code,
    competition_id, remark, id
  ];

  const { rows } = await db.pool.query(query, values);
  return rows[0];
};

// Delete a vehicle
const deleteVehicle = async (id) => {
  const query = 'DELETE FROM vehicles WHERE vehicle_id = $1 RETURNING *';
  const { rows } = await db.pool.query(query, [id]);
  return rows[0];
};

module.exports = {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
