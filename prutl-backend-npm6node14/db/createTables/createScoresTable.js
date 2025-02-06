//db/createTables//createScoresTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create scores table
const createScoresTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS scores (
          score_id SERIAL PRIMARY KEY,
          user_id INT ,
          team_id INT ,
          competition_id INT ,
          category_id INT,
          score_value FLOAT,
          assessment_date DATE,
           year INT,
          month INT,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Scores table created or already exists');
    } catch (error) {
      console.error('Error creating scores table:', error);
    } finally {
      client.release();
    }
  };

module.exports = createScoresTable;