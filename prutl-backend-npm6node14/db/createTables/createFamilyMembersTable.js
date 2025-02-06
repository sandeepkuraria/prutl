//db/createTables//createFamilyMembersTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create familyMembers table
const createFamilyMembersTable = async () => {
    const createFamilyMembersTableQuery = `
        CREATE TABLE IF NOT EXISTS family_members (
            family_member_id SERIAL PRIMARY KEY,
            family_id INT REFERENCES families(family_id) ON DELETE SET NULL,
            user_id INT REFERENCES users(user_id) ON DELETE SET NULL,
            relationship VARCHAR(100),
            remark TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;
  
    try {
        const client = await pool.connect();
        await client.query(createFamilyMembersTableQuery);
        console.log('Family Members table created or already exists');
        client.release();
    } catch (err) {
        console.error('Error creating Family Members table:', err);
    }
  };

module.exports = createFamilyMembersTable;