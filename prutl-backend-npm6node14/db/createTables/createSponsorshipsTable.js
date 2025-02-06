//db/createTables//createSponsorshipsTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create sponsorships table
const createSponsorshipsTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS sponsorships (
          sponsorship_id SERIAL PRIMARY KEY,
          sponsor_id INT ,
          team_id INT ,
          event_id INT ,
          amount DECIMAL ,
          sponsorship_date DATE,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Sponsorships table created or already exists');
    } catch (error) {
      console.error('Error creating sponsorships table:', error);
    } finally {
      client.release();
    }
  };

module.exports = createSponsorshipsTable;