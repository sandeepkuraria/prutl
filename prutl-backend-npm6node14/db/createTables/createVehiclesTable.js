// db/createTables/createVehiclesTable.js
const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create Venues table and related sequence, function, and trigger
const createVehiclesTable = async () => {
  const client = await pool.connect();
  try {
    // Step 1: Create the venues table
    await client.query(`
     CREATE TABLE IF NOT EXISTS vehicles (
    vehicle_id SERIAL PRIMARY KEY,
    vehicle_number VARCHAR,
    ticket_number VARCHAR,
    entry_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    exit_time TIMESTAMP,
    numberofperson_entry_male INT DEFAULT 0,
    numberofperson_entry_female INT DEFAULT 0,
    numberofkids_entry_male INT DEFAULT 0,
    numberofkids_entry_female INT DEFAULT 0,
    driver_name VARCHAR,
    driver_phone_number VARCHAR,
    vehicle_owner_name VARCHAR,
    vehicle_license VARCHAR,
    driver_alcohol_influence_entry_time TIMESTAMP,
    driver_alcohol_influence_exit_time TIMESTAMP,
    parking_area VARCHAR,
    parking_code VARCHAR,
    competition_id INT,
    remark TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `);
    console.log("Vehicles table created or already exists");

  } catch (error) {
    console.error("Error creating vehicles table or related elements:", error);
  } finally {
    client.release();
  }
};

module.exports = createVehiclesTable;




