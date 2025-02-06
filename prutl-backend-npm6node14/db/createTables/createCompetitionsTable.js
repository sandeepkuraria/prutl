const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create competitions table and related sequence, function, and trigger
const createCompetitionsTable = async () => {
  const client = await pool.connect();
  try {
    // Step 1: Create the competitions table
    await client.query(`
        CREATE TABLE IF NOT EXISTS competitions (
          competition_id SERIAL PRIMARY KEY,
          competition_code VARCHAR(50) UNIQUE,
          competition_name VARCHAR,
          event_id INT ,
          category_id INT,
          passion_dimension_id INT,
          prutl_dimension_id INT,
          venue_id INT,
          type VARCHAR ,
          start_date DATE ,
          end_date DATE ,
          location VARCHAR ,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    console.log("Competitions table created or already exists");
   // // --dropp sequence 
    // // --DROP SEQUENCE IF EXISTS competition_code_seq;
    //  await client.query(`

    //   DROP TRIGGER IF EXISTS set_competition_code ON competitions;`);

    // // Step 2: Create the sequence for the competition_code
    // await client.query(`
    //     CREATE SEQUENCE IF NOT EXISTS competition_code_seq START 1;
    //   `);
    // console.log("Sequence for competition_code created or already exists");

    // // Step 3: Create the function to generate the competition_code
    // await client.query(`
    //     CREATE OR REPLACE FUNCTION generate_competition_code() 
    //     RETURNS TRIGGER AS $$
    //     DECLARE
    //       new_code VARCHAR;
    //     BEGIN
    //       -- Generate the new competition code using the sequence
    //       new_code := 'CMP' || LPAD(nextval('competition_code_seq')::TEXT, 4, '0');
          
    //       -- Set the competition_code to the generated value
    //       NEW.competition_code := new_code;
          
    //       RETURN NEW;
    //     END;
    //     $$ LANGUAGE plpgsql;
    //   `);
    // console.log("Function to generate competition_code created or replaced");

    // // Step 4: Create the trigger to automatically set the competition_code
    // await client.query(`
    //     CREATE TRIGGER set_competition_code
    //     BEFORE INSERT ON competitions
    //     FOR EACH ROW
    //     WHEN (NEW.competition_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
    //     EXECUTE FUNCTION generate_competition_code();
    //   `);
    // console.log("Trigger for setting competition_code created or already exists");

  } catch (error) {
    console.error("Error creating competitions table or related elements:", error);
  } finally {
    client.release();
  }
};

module.exports = createCompetitionsTable;


// //db/createTables//createCompetitionsTable.js
// const { Pool } = require("pg");
// const config = require("../../config/config");

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });

// // Function to create competitions table
// const createCompetitionsTable = async () => {
//   const client = await pool.connect();
//   try {
//     await client.query(`
//         CREATE TABLE IF NOT EXISTS competitions (
//           competition_id SERIAL PRIMARY KEY,
//           competition_code VARCHAR(50) UNIQUE NOT NULL,
//           competition_name VARCHAR ,
//           event_name VARCHAR,
//           category VARCHAR ,
//           passion_dimension VARCHAR ,
//           prutl_dimension VARCHAR ,
//           type VARCHAR NOT NULL,
//           start_date DATE NOT NULL,
//           end_date DATE NOT NULL,
//           location VARCHAR NOT NULL,
//           remark TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//       `);
//     console.log("Competitions table created or already exists");
//   } catch (error) {
//     console.error("Error creating competitions table:", error);
//   } finally {
//     client.release();
//   }
// };

// module.exports = createCompetitionsTable;
