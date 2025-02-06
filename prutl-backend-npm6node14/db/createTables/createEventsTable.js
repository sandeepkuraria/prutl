// db/createTables/createEventsTable.js
const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create events table
const createEventsTable = async () => {
  const client = await pool.connect();
  try {
    // Step 1: Create the events table
    await client.query(`
      CREATE TABLE IF NOT EXISTS events (
        event_id SERIAL PRIMARY KEY,
        event_code VARCHAR(50) UNIQUE NOT NULL,
        event_name VARCHAR,
        org_id INT,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        location VARCHAR NOT NULL,
        description TEXT,
        remark TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Events table created or already exists");

 //     // --dropp sequence 
    // // --DROP SEQUENCE IF EXISTS event_code_seq;
    // //  await client.query(`

    // //   DROP TRIGGER IF EXISTS set_event_code ON roles;`);


    // // Step 2: Create the sequence for the event_code
    // await client.query(`
    //   CREATE SEQUENCE IF NOT EXISTS event_code_seq START 1;
    // `);
    // console.log("Sequence for event_code created or already exists");

    // // Step 3: Create the function to generate the event_code
    // await client.query(`
    //   CREATE OR REPLACE FUNCTION generate_event_code() 
    //   RETURNS TRIGGER AS $$
    //   DECLARE
    //     new_code VARCHAR;
    //   BEGIN
    //     -- Generate the new event code using the sequence
    //     new_code := 'EVT' || LPAD(nextval('event_code_seq')::TEXT, 4, '0');
        
    //     -- Set the event_code to the generated value
    //     NEW.event_code := new_code;
        
    //     RETURN NEW;
    //   END;
    //   $$ LANGUAGE plpgsql;
    // `);
    // console.log("Function to generate event_code created or replaced");

    // // Step 4: Create the trigger to automatically set the event_code
    // await client.query(`
    //   CREATE TRIGGER set_event_code
    //   BEFORE INSERT ON events
    //   FOR EACH ROW
    //   WHEN (NEW.event_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
    //   EXECUTE FUNCTION generate_event_code();
    // `);
    // console.log("Trigger for setting event_code created or already exists");

  } catch (error) {
    console.error("Error creating events table or triggers:", error);
  } finally {
    client.release();
  }
};

module.exports = createEventsTable;


// //db/createTables//createEventsTable.js
// const { Pool } = require('pg');
// const config = require('../../config/config');

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });

// // Function to create events table
// const createEventsTable = async () => {
//     const client = await pool.connect();
//     try {
//       await client.query(`
//         CREATE TABLE IF NOT EXISTS events (
//           event_id SERIAL PRIMARY KEY,
//           event_code VARCHAR(50) UNIQUE NOT NULL,
//           event_name VARCHAR,
//           organization_name VARCHAR ,
//           start_date DATE NOT NULL,
//           end_date DATE NOT NULL,
//           location VARCHAR NOT NULL,
//           description TEXT,
//           remark TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//       `);
//       console.log('Events table created or already exists');
      
//     } catch (error) {
//       console.error('Error creating events table:', error);
//     } finally {
//       client.release();
//     }
//   };

// module.exports = createEventsTable;