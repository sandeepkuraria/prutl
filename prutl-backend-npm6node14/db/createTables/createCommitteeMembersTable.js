//db/createTables//createCommitteeMembersTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create ommitteeMembers table
const createCommitteeMembersTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS committee_members (
          committee_member_id SERIAL PRIMARY KEY,
          role_id INT,
          user_id INT,
          committee_id INT,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Committee Members table created or already exists');
    } catch (error) {
      console.error('Error creating committee members table:', error);
    } finally {
      client.release();
    }
  };
  
module.exports = createCommitteeMembersTable;