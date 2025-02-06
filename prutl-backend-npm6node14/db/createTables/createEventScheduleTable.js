//db/createTables/createEventScheduleTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create eventSchedule table
const createEventScheduleTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS event_schedule (
          schedule_id SERIAL PRIMARY KEY,
          competition_id INT,
          start_time TIMESTAMP NOT NULL,
          end_time TIMESTAMP NOT NULL,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Event Schedule table created or already exists');
    } catch (error) {
      console.error('Error creating event schedule table:', error);
    } finally {
      client.release();
    }
  };

module.exports = createEventScheduleTable;