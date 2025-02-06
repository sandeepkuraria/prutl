//config/database.js
const { Pool } = require('pg');
const config = require('./config');
const createDatabase = require('../db/createDatabase');
const createTables = require('../db/index');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

const connectDB = async () => {
  try {
    // await createDatabase();
    // await createTables();
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release(); // Release the client back to the pool
  } catch (error) {
    console.error('Error connecting to the database', error);
    throw error;
  }
};

module.exports = { connectDB, pool };

