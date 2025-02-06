const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

const createOrganizationsTable = async () => {
  const client = await pool.connect();

  try {
    // Step 1: Create the organizations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS organizations (
        org_id SERIAL PRIMARY KEY,
        org_code VARCHAR(50) UNIQUE NOT NULL,
        org_name VARCHAR UNIQUE,
        org_type VARCHAR,
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
    console.log("Organizations table created or already exists");

     //     // --dropp sequence 
    // // --DROP SEQUENCE IF EXISTS org_code_seq;
    // //  await client.query(`

    // //   DROP TRIGGER IF EXISTS set_org_code ON roles;`);


    // // Step 2: Create the sequence for org_code
    // await client.query(`
    //   CREATE SEQUENCE IF NOT EXISTS org_code_seq START 1;
    // `);
    // console.log("Sequence for org_code created or already exists");

    // // Step 3: Create the function to generate org_code
    // await client.query(`
    //   CREATE OR REPLACE FUNCTION generate_org_code() 
    //   RETURNS TRIGGER AS $$
    //   DECLARE
    //     new_code VARCHAR;
    //   BEGIN
    //     -- Generate the new org code using the sequence
    //     new_code := 'ORG' || LPAD(nextval('org_code_seq')::TEXT, 4, '0');
        
    //     -- Set the org_code to the generated value
    //     NEW.org_code := new_code;
        
    //     RETURN NEW;
    //   END;
    //   $$ LANGUAGE plpgsql;
    // `);
    // console.log("Function to generate org_code created or replaced");

    // // Step 4: Create the trigger to automatically set the org_code
    // await client.query(`
    //   CREATE TRIGGER set_org_code
    //   BEFORE INSERT ON organizations
    //   FOR EACH ROW
    //   WHEN (NEW.org_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
    //   EXECUTE FUNCTION generate_org_code();
    // `);
    // console.log("Trigger for setting org_code created or already exists");

  } catch (error) {
    console.error("Error creating organizations table:", error);
  } finally {
    client.release();
  }
};

module.exports = createOrganizationsTable;


// //db/createTables//createOrganizationsTable.js
// const { Pool } = require('pg');
// const config = require('../../config/config');

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });
// // Function to create organizations table
// const createOrganizationsTable = async () => {
//     const client = await pool.connect();
//     try {
//       await client.query(`
//       CREATE TABLE IF NOT EXISTS organizations (
//       org_id SERIAL PRIMARY KEY,
//       org_code VARCHAR(50) UNIQUE NOT NULL,
//       org_name VARCHAR,
//       org_type VARCHAR,
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
//   );
//       `);
//       console.log('Organizations table created or already exists');
//     } catch (error) {
//       console.error('Error creating organizations table:', error);
//     } finally {
//       client.release();
//     }
//   };

//   module.exports = createOrganizationsTable;