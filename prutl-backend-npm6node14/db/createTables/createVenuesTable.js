const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create Venues table and related sequence, function, and trigger
const createVenuesTable = async () => {
  const client = await pool.connect();
  try {
    // Step 1: Create the venues table
    await client.query(`
      CREATE TABLE IF NOT EXISTS venues (
        venue_id SERIAL PRIMARY KEY,
        venue_code VARCHAR(50) UNIQUE, -- Allows NULL, will be set by trigger
        venue_name VARCHAR,
        address VARCHAR,
        seating_capacity INT,
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
    console.log("Venues table created or already exists");

    // // Step 2: Create the sequence for the venue_code
    // await client.query(`
    //   CREATE SEQUENCE IF NOT EXISTS venue_code_seq START 1;
    // `);
    // console.log("Sequence for venue_code created or already exists");

    // // Step 3: Create the function to generate the venue_code
    // await client.query(`
    //   CREATE OR REPLACE FUNCTION generate_venue_code() 
    //   RETURNS TRIGGER AS $$
    //   DECLARE
    //     new_code VARCHAR;
    //   BEGIN
    //     -- Generate the new venue code using the sequence
    //     new_code := 'VN' || LPAD(nextval('venue_code_seq')::TEXT, 4, '0');
        
    //     -- Set the venue_code to the generated value
    //     NEW.venue_code := new_code;
        
    //     RETURN NEW;
    //   END;
    //   $$ LANGUAGE plpgsql;
    // `);
    // console.log("Function to generate venue_code created or replaced");

    // // Step 4: Create the trigger to automatically set the venue_code
    // await client.query(`
    //   CREATE TRIGGER set_venue_code
    //   BEFORE INSERT ON venues
    //   FOR EACH ROW
    //   WHEN (NEW.venue_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
    //   EXECUTE FUNCTION generate_venue_code();
    // `);
    // console.log("Trigger for setting venue_code created or already exists");

  } catch (error) {
    console.error("Error creating venues table or related elements:", error);
  } finally {
    client.release();
  }
};

module.exports = createVenuesTable;

// //db/createTables//createVenuesTable.js
// const { Pool } = require("pg");
// const config = require("../../config/config");

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });

// // Function to create Venues table
// const createVenuesTable = async () => {
//   const client = await pool.connect();
//   try {
//     await client.query(`
//        CREATE TABLE IF NOT EXISTS venues (
//         venue_id SERIAL PRIMARY KEY,
//         venue_code VARCHAR(50) UNIQUE ,
//         venue_name VARCHAR ,
//         address VARCHAR ,
//         seating_capacity INT ,
//         phone_number VARCHAR ,
//         contact_person VARCHAR ,
//         city VARCHAR ,
//         county VARCHAR ,
//         state VARCHAR ,
//         country VARCHAR ,
//         pin_code VARCHAR ,
//         remark TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//       `);
//     console.log("Venues table created or already exists");
//   } catch (error) {
//     console.error("Error creating Venues table:", error);
//   } finally {
//     client.release();
//   }
// };

// module.exports = createVenuesTable;
