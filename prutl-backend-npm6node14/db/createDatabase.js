//db/createDatabase.js
const { Client } = require('pg');
const config = require('../config/config');

const createDatabase = async () => {
  const client = new Client({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
  });

  try {
    await client.connect();
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [config.db.database]);
    if (res.rows.length === 0) {
      await client.query(`CREATE DATABASE "${config.db.database}"`);
      console.log('Database created');
    } else {
      console.log('Database already exists');
    }
  } catch (err) {
    console.error('Error creating database: ' + err.stack);
  } finally {
    await client.end();
  }
};

module.exports = createDatabase;
