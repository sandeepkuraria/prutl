// db/createTables/createCategoriesTable.js
const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create Categories table
const createCategoriesTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
        CREATE TABLE IF NOT EXISTS categories (
      category_id SERIAL PRIMARY KEY,
      category_name VARCHAR(255) NOT NULL,  
      passion_dimension VARCHAR(255)  , 
      prutl_dimension VARCHAR(255)  ,  
      remark TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
        `);
    console.log("Categories table created or already exists");
  } catch (error) {
    console.error("Error creating Categories table:", error);
  } finally {
    client.release();
  }
};

module.exports = createCategoriesTable;
