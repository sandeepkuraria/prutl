//db/createTables//createAwardsTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create awards table
const createAwardsTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS awards (
          award_id SERIAL PRIMARY KEY,
          award_name VARCHAR(100),
          award_date DATE,
          user_id INT, 
          team_id INT, 
          year INT,
          month INT,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Awards table created or already exists');
    } catch (error) {
      console.error('Error creating awards table:', error);
    } finally {
      client.release();
    }
  };
  
module.exports = createAwardsTable;