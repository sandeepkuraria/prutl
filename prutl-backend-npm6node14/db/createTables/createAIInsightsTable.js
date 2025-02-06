//db/createTables//createAIInsightsTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create AI Insights table
const createAIInsightsTable = async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS ai_insights (
        insight_id SERIAL PRIMARY KEY,
    user_id INT,
        insight_type VARCHAR,
        insight_data TEXT,
        insight_date DATE,
        remark TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  
    try {
      const client = await pool.connect();
      await client.query(createTableQuery);
      console.log("AI Insights table created or already exists");
      client.release(); // Release the client back to the pool
    } catch (err) {
      console.error("Error creating AI Insights table: ", err);
    }
  };
  
module.exports = createAIInsightsTable;