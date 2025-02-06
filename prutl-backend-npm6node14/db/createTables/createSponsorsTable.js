//db/createTables//createSponsorsTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create sponsors table
const createSponsorsTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS sponsors (
          sponsor_id SERIAL PRIMARY KEY,
          competition_id INT,
          sponsor_name VARCHAR,
          contact_info VARCHAR,
          phone_number VARCHAR,
          sponsorship_amount DECIMAL,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Sponsors table created or already exists');
    } catch (error) {
      console.error('Error creating sponsors table:', error);
    } finally {
      client.release();
    }
  };

module.exports = createSponsorsTable;