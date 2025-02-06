// db/createTables/createRolesTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create Roles table
const createRolesTable = async () => {
      const client = await pool.connect();
    try {
        await client.query(`
        CREATE TABLE IF NOT EXISTS roles (
        role_id SERIAL PRIMARY KEY,
        role_code VARCHAR(50) UNIQUE NOT NULL,
        role_name VARCHAR UNIQUE,
        remark TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
        `);
        console.log('Roles table created or already exists');

    //     // --dropp sequence 
    // // --DROP SEQUENCE IF EXISTS role_code_seq;
    // //  await client.query(`

    // //   DROP TRIGGER IF EXISTS set_role_code ON roles;`);

    // // -- Step 2: Create a sequence to auto-generate the numeric part of role_code
    // await client.query(`
    //   CREATE SEQUENCE IF NOT EXISTS role_code_seq START 1;
    //   `);

    // console.log("Sequence for role_code created or already exists");

    // //-- Step 3: Create a function to generate role_code in the format 'ROLE0001'
    // await client.query(`
    //   CREATE OR REPLACE FUNCTION generate_role_code()
    //   RETURNS TRIGGER AS $$
    //   DECLARE
    //       new_role_code VARCHAR(50);
    //   BEGIN
    //       -- Generate role_code as 'ROLE' followed by the sequence number padded to 4 digits
    //       new_role_code := 'ROLE' || LPAD(NEXTVAL('role_code_seq')::TEXT, 4, '0');
    //       -- Assign the generated code to the new row
    //       NEW.role_code := new_role_code;
    //       RETURN NEW;
    //   END;
    //   $$ LANGUAGE plpgsql;
    //   `);
    // console.log("Function to generate role_code created or replaced");

    // //-- Step 4: Create a trigger to automatically call the function before insert
    // await client.query(`
    //   CREATE TRIGGER role_code_trigger
    //   BEFORE INSERT ON roles
    //   FOR EACH ROW
    //   EXECUTE FUNCTION generate_role_code();
    //   `);
    // console.log("Trigger for setting role_code created or already exists");


      } catch (error) {
        console.error('Error creating Roles table:', error);
      } finally {
        client.release();
      }
};

module.exports = createRolesTable;
