const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create families table and related sequence, function, and trigger
const createFamiliesTable = async () => {
    const client = await pool.connect();
    try {
      // Step 1: Create the families table
      await client.query(`
        CREATE TABLE IF NOT EXISTS families (
          family_id SERIAL PRIMARY KEY,
          family_code VARCHAR(50) UNIQUE, -- Allows NULL, will be set by trigger
          family_name VARCHAR,
          address VARCHAR,
          phone_number VARCHAR,
          contact_person VARCHAR,
          city VARCHAR,
          county VARCHAR,
          state VARCHAR,
          country VARCHAR,
          pin_code VARCHAR,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
      console.log('Families table created or already exists');

      // // Step 2: Create the sequence for the family_code
      // await client.query(`
      //   CREATE SEQUENCE IF NOT EXISTS family_code_seq START 1;
      // `);
      // console.log('Sequence for family_code created or already exists');

      // // Step 3: Create the function to generate the family_code
      // await client.query(`
      //   CREATE OR REPLACE FUNCTION generate_family_code() 
      //   RETURNS TRIGGER AS $$
      //   DECLARE
      //     new_code VARCHAR;
      //   BEGIN
      //     -- Generate the new family code using the sequence
      //     new_code := 'FML' || LPAD(nextval('family_code_seq')::TEXT, 4, '0');
          
      //     -- Set the family_code to the generated value
      //     NEW.family_code := new_code;
          
      //     RETURN NEW;
      //   END;
      //   $$ LANGUAGE plpgsql;
      // `);
      // console.log('Function to generate family_code created or replaced');

      // // Step 4: Create the trigger to automatically set the family_code
      // await client.query(`
      //   CREATE TRIGGER set_family_code
      //   BEFORE INSERT ON families
      //   FOR EACH ROW
      //   WHEN (NEW.family_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
      //   EXECUTE FUNCTION generate_family_code();
      // `);
      // console.log('Trigger for setting family_code created or already exists');

    } catch (error) {
      console.error('Error creating families table or related elements:', error);
    } finally {
      client.release();
    }
};

module.exports = createFamiliesTable;

// //db/createTables//createFamiliesTable.js
// const { Pool } = require('pg');
// const config = require('../../config/config');

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });

// // Function to create families table
// const createFamiliesTable = async () => {
//     const client = await pool.connect();
//     try {
//       await client.query(`
//         CREATE TABLE IF NOT EXISTS families (
//       family_id SERIAL PRIMARY KEY,
//       family_code VARCHAR(50) UNIQUE NOT NULL,
//       family_name VARCHAR NOT NULL,
//       address VARCHAR,
//       phone_number VARCHAR,
//       contact_person VARCHAR,
//       city VARCHAR,
//       county VARCHAR,
//       state VARCHAR,
//       country VARCHAR,
//       pin_code VARCHAR,
//       remark TEXT,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//   )
//       `);
//       console.log('Families table created or already exists');
//     } catch (error) {
//       console.error('Error creating Families table:', error);
//     } finally {
//       client.release();
//     }
//   };

// module.exports = createFamiliesTable;