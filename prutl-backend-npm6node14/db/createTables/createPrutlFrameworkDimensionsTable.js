// db/createTables/createPrutlFrameworkDimensionsTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create PRUTL Framework Dimensions table
const createPrutlFrameworkDimensionsTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS prutl_framework_dimensions (
      prutl_id SERIAL PRIMARY KEY,
      prutl_name VARCHAR,
      description TEXT,
      remark TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    const client = await pool.connect();
    await client.query(createTableQuery);
    console.log("PRUTL Framework Dimensions table created or already exists");
    client.release(); // Release the client back to the pool
  } catch (err) {
    console.error("Error creating PRUTL Framework Dimensions table: ", err);
  }
};

module.exports = createPrutlFrameworkDimensionsTable;
