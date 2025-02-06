const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create teams table
const createTeamsTable = async () => {
  const client = await pool.connect();
  try {
    // Create the teams table
    await client.query(`
      CREATE TABLE IF NOT EXISTS teams (
        team_id SERIAL PRIMARY KEY,
        team_code VARCHAR(50) UNIQUE,
        team_name VARCHAR,
        role_id INT,               -- role_id to get role_name from roles table as team role in teams table
        sponsor_id INT,
        competition_id INT,
        remark TEXT,
        team_icon_url VARCHAR,  -- Add team icon URL
        team_color VARCHAR(7),  -- Add team color as HEX code (e.g., #FFFFFF)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // // Create the sequence for generating team_code numbers
    // await client.query(`
    //   CREATE SEQUENCE IF NOT EXISTS team_code_seq START 1;
    // `);

    // // Create a function to generate the team_code in the format 'TEAM0001', 'TEAM0002', etc.
    // await client.query(`
    //   CREATE OR REPLACE FUNCTION generate_team_code()
    //   RETURNS TRIGGER AS $$
    //   DECLARE
    //     new_team_code VARCHAR(50);
    //   BEGIN
    //     -- Format the team_code using the sequence and prefix 'TEAM'
    //     new_team_code := 'TEAM' || LPAD(NEXTVAL('team_code_seq')::TEXT, 4, '0');
    //     -- Assign the generated code to the new row
    //     NEW.team_code := new_team_code;
    //     RETURN NEW;
    //   END;
    //   $$ LANGUAGE plpgsql;
    // `);

    // // Create a trigger to automatically call the generate_team_code function before insert
    // await client.query(`
    //   CREATE TRIGGER team_code_trigger
    //   BEFORE INSERT ON teams
    //   FOR EACH ROW
    //   EXECUTE FUNCTION generate_team_code();
    // `);

    console.log('Teams table created or already exists with auto-incrementing team_code');
  } catch (error) {
    console.error('Error creating teams table:', error);
  } finally {
    client.release();
  }
};

module.exports = createTeamsTable;


// //db/createTables//createTeamsTable.js
// const { Pool } = require('pg');
// const config = require('../../config/config');

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });

// // Function to create teams table
// const createTeamsTable = async () => {
//     const client = await pool.connect();
//     try {
//       await client.query(`
//         CREATE TABLE IF NOT EXISTS teams (
//           team_id SERIAL PRIMARY KEY,
//           team_code VARCHAR(50) UNIQUE,
//           team_name VARCHAR NOT NULL,
//           team_role VARCHAR,
//           sponsor_id INT ,
//           competition_id ,
//           remark TEXT,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         )
//       `);
//       console.log('Teams table created or already exists');
//     } catch (error) {
//       console.error('Error creating teams table:', error);
//     } finally {
//       client.release();
//     }
//   };
// module.exports = createTeamsTable;