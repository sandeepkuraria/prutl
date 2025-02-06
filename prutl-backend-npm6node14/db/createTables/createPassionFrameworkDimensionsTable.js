//db/createTables//createPassionFrameworkDimensionsTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create passion_framework_dimensions table
const createPassionFrameworkDimensionsTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS passion_framework_dimensions (
          dimension_id SERIAL PRIMARY KEY,
          dimension_name VARCHAR ,
          description TEXT,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Passion Framework Dimensions table created or already exists');
    } catch (error) {
      console.error('Error creating passion framework dimensions table:', error);
    } finally {
      client.release();
    }
  };
module.exports = createPassionFrameworkDimensionsTable;