// db/createTables/createParkingAreaTable.js
const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create Parking Area table and related sequence, function, and trigger
const createParkingAreaTable = async () => {
  const client = await pool.connect();
  try {
    // Step 1: Create parking_areas table
    await client.query(`
    CREATE TABLE IF NOT EXISTS parking_areas (
    parking_area_id SERIAL PRIMARY KEY,          -- Unique identifier for each parking area
    pin_code VARCHAR,                            -- Pin code of the parking area (string, can be alphanumeric in some regions)
    address VARCHAR,                             -- Address of the parking area (string)
    latitude DECIMAL(9, 6),                      -- Latitude (decimal for better precision)
    longitude DECIMAL(9, 6),                     -- Longitude (decimal for better precision)
    remark TEXT,                                 -- Additional remarks about the parking area
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for creation
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Timestamp for updates
);

    `);
    console.log("Parking Area table created or already exists");

  } catch (error) {
    console.error("Error creating parking area table or related elements:", error);
  } finally {
    client.release();
  }
};

module.exports = createParkingAreaTable;
