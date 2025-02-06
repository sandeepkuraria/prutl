//db/createTables//createParticipantsTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create participants table
const createParticipantsTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS participants (
          participant_id SERIAL PRIMARY KEY,
          user_id INT ,
          usergroup_id INT ,
          competition_id INT ,
          org_id INT ,
          event_id INT ,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Participants table created or already exists');
    } catch (error) {
      console.error('Error creating participants table:', error);
    } finally {
      client.release();
    }
  };

module.exports = createParticipantsTable;