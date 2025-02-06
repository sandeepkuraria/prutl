//db/createTables//createStreamTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create stream table
const createStreamTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS stream (
          stream_id SERIAL PRIMARY KEY,
          competition_id INT,
          stream_url VARCHAR(255),
          stream_start_time TIMESTAMP,
          stream_end_time TIMESTAMP,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Stream table created or already exists');
    } catch (error) {
      console.error('Error creating stream table:', error);
    } finally {
      client.release();
    }
  };

module.exports = createStreamTable;