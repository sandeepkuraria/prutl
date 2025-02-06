//db/createTables//createDimensionScoresTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create DimensionScores table
const createDimensionScoresTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS dimension_scores (
          dimension_score_id SERIAL PRIMARY KEY,
          user_id INT,
          dimension_id INT,
          prutl_id INT,
          score_value FLOAT,
          assessment_date DATE,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Dimension Scores table created or already exists');
    } catch (error) {
      console.error('Error creating dimension scores table:', error);
    } finally {
      client.release();
    }
  };
module.exports = createDimensionScoresTable;