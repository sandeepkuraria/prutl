//db/createTables//createMembershipsTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});
// Function to create memberships table
const createMembershipsTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS memberships (
          membership_id SERIAL PRIMARY KEY,
          membership_type VARCHAR(100),
          start_date DATE,
          end_date DATE,
          payment_status VARCHAR(50),
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Memberships table created or already exists');
    } catch (error) {
      console.error('Error creating memberships table:', error);
    } finally {
      client.release();
    }
  };

module.exports = createMembershipsTable;
