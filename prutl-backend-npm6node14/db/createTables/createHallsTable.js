// //db/createTables//createHallsTable.js
    
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create halls table
const createHallsTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(`
        CREATE TABLE IF NOT EXISTS halls (
          hall_id SERIAL PRIMARY KEY,
          hall_code VARCHAR(50) UNIQUE NOT NULL,
          hall_name VARCHAR,
          venue_id INT,
          seating_capacity INT,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('Halls table created or already exists');

    // // --dropp sequence 
    // // --DROP SEQUENCE IF EXISTS hall_code_seq;

    // //  await client.query(`
    // // DROP TRIGGER IF EXISTS set_competition_code ON competitions;`);

    //   // Step 2: Create a sequence to auto-generate the numeric part of hall_code
    // await client.query(`
    //         CREATE SEQUENCE IF NOT EXISTS hall_code_seq START 1;
    // `);

    // // Step 3: Create a function to generate hall_code in the format 'HALL0001'
    // await client.query(`
    //   CREATE OR REPLACE FUNCTION generate_hall_code()
    //   RETURNS TRIGGER AS $$
    //   DECLARE
    //       new_hall_code VARCHAR(50);
    //   BEGIN
    //       -- Generate hall_code as 'HALL' followed by the sequence number padded to 4 digits
    //       new_hall_code := 'HALL' || LPAD(NEXTVAL('hall_code_seq')::TEXT, 4, '0');
    //       -- Assign the generated code to the new row
    //       NEW.hall_code := new_hall_code;
    //       RETURN NEW;
    //   END;
    //   $$ LANGUAGE plpgsql;

    // `);

    // //Step 4: Create a trigger to automatically call the function before insert
    // await client.query(`
    //  CREATE TRIGGER hall_code_trigger
    //   BEFORE INSERT ON halls
    //   FOR EACH ROW
    //   EXECUTE FUNCTION generate_hall_code();
    // `);

    } catch (error) {
      console.error('Error creating halls table:', error);
    } finally {
      client.release();
    }
  };
  
  
module.exports = createHallsTable;

// //db/createTables//createHallsTable.js

// const { Pool } = require('pg');
// const config = require('../../config/config');

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });

// // Function to create halls table
// const createHallsTable = async () => {
//     const client = await pool.connect();
//     try {
//       await client.query(`
//         CREATE TABLE IF NOT EXISTS halls (
//           hall_id SERIAL PRIMARY KEY,
//           hall_code VARCHAR(50) UNIQUE NOT NULL,
//           hall_name VARCHAR NOT NULL,
//           venue_id INT,
//           seating_capacity INT,
//           remark TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//       `);
//       console.log('Halls table created or already exists');
//     } catch (error) {
//       console.error('Error creating halls table:', error);
//     } finally {
//       client.release();
//     }
//   };
  
  
// module.exports = createHallsTable;