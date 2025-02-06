//db/createTables//createCommitteesTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create committees table
const createCommitteesTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS committees (
          committee_id SERIAL PRIMARY KEY,
          event_id INT REFERENCES events(event_id) ON DELETE SET NULL,
          committee_name VARCHAR NOT NULL,
          committee_type VARCHAR,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Committees table created or already exists');
    } catch (error) {
      console.error('Error creating committees table:', error);
    } finally {
      client.release();
    }
  };

module.exports = createCommitteesTable;