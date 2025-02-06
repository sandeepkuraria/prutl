const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create userGroups table and related sequence, function, and trigger
const createUserGroupsTable = async () => {
  const client = await pool.connect();
  try {
    // Step 1: Create the user_groups table
    await client.query(`
        CREATE TABLE IF NOT EXISTS user_groups (
          usergroup_id SERIAL PRIMARY KEY,
          group_code VARCHAR(50) UNIQUE, -- Allows NULL, will be set by trigger
          group_name VARCHAR ,
          description TEXT,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    console.log("User Groups table created or already exists");

    // // Step 2: Create the sequence for the group_code
    // await client.query(`
    //     CREATE SEQUENCE IF NOT EXISTS group_code_seq START 1;
    //   `);
    // console.log("Sequence for group_code created or already exists");

    // // Step 3: Create the function to generate the group_code
    // await client.query(`
    //     CREATE OR REPLACE FUNCTION generate_group_code() 
    //     RETURNS TRIGGER AS $$
    //     DECLARE
    //       new_code VARCHAR;
    //     BEGIN
    //       -- Generate the new group code using the sequence
    //       new_code := 'UGRP' || LPAD(nextval('group_code_seq')::TEXT, 4, '0');
          
    //       -- Set the group_code to the generated value
    //       NEW.group_code := new_code;
          
    //       RETURN NEW;
    //     END;
    //     $$ LANGUAGE plpgsql;
    //   `);
    // console.log("Function to generate group_code created or replaced");

    // // Step 4: Create the trigger to automatically set the group_code
    // await client.query(`
    //     CREATE TRIGGER set_group_code
    //     BEFORE INSERT ON user_groups
    //     FOR EACH ROW
    //     WHEN (NEW.group_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
    //     EXECUTE FUNCTION generate_group_code();
    //   `);
    // console.log("Trigger for setting group_code created or already exists");

  } catch (error) {
    console.error("Error creating user_groups table or related elements:", error);
  } finally {
    client.release();
  }
};

module.exports = createUserGroupsTable;

// //db/createTables//createUserGroupsTable.js
// const { Pool } = require('pg');
// const config = require('../../config/config');

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });
// // Function to create userGroups table
// const createUserGroupsTable = async () => {
//     const client = await pool.connect();
//     try {
//       await client.query(`
//         CREATE TABLE IF NOT EXISTS user_groups (
//           usergroup_id SERIAL PRIMARY KEY,
//           group_code VARCHAR(50) UNIQUE NOT NULL,
//           group_name VARCHAR NOT NULL,
//           description TEXT,
//           remark TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//       `);
//       console.log('User Groups table created or already exists');
//     } catch (error) {
//       console.error('Error creating user groups table:', error);
//     } finally {
//       client.release();
//     }
//   };
// module.exports = createUserGroupsTable;
