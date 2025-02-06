const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create team_members table and related sequence, function, and trigger
const createTeamMembersTable = async () => {
  const client = await pool.connect();
  try {
    // Step 1: Create the team_members table
    await client.query(`
        CREATE TABLE IF NOT EXISTS team_members (
          team_member_id SERIAL PRIMARY KEY,
          team_member_code VARCHAR(50) UNIQUE, -- Allows NULL, will be set by trigger
          user_id INT,
          team_id INT,
          role_id INT,
          remark TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);
    console.log("Team Members table created or already exists");

    // // Step 2: Create the sequence for the team_member_code
    // await client.query(`
    //     CREATE SEQUENCE IF NOT EXISTS team_member_code_seq START 1;
    //   `);
    // console.log("Sequence for team_member_code created or already exists");

    // // Step 3: Create the function to generate the team_member_code
    // await client.query(`
    //     CREATE OR REPLACE FUNCTION generate_team_member_code() 
    //     RETURNS TRIGGER AS $$
    //     DECLARE
    //       new_code VARCHAR;
    //     BEGIN
    //       -- Generate the new team member code using the sequence
    //       new_code := 'TM' || LPAD(nextval('team_member_code_seq')::TEXT, 4, '0');
          
    //       -- Set the team_member_code to the generated value
    //       NEW.team_member_code := new_code;
          
    //       RETURN NEW;
    //     END;
    //     $$ LANGUAGE plpgsql;
    //   `);
    // console.log("Function to generate team_member_code created or replaced");

    // // Step 4: Create the trigger to automatically set the team_member_code
    // await client.query(`
    //     CREATE TRIGGER set_team_member_code
    //     BEFORE INSERT ON team_members
    //     FOR EACH ROW
    //     WHEN (NEW.team_member_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
    //     EXECUTE FUNCTION generate_team_member_code();
    //   `);
    // console.log("Trigger for setting team_member_code created or already exists");

  } catch (error) {
    console.error("Error creating team_members table or related elements:", error);
  } finally {
    client.release();
  }
};

module.exports = createTeamMembersTable;

// const { Pool } = require("pg");
// const config = require("../../config/config");

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });

// // Function to create Team Members table
// const createTeamMembersTable = async () => {
//   const client = await pool.connect();
//   try {
//     await client.query(`
//        CREATE TABLE IF NOT EXISTS team_members (
//         team_member_id SERIAL PRIMARY KEY,
//  team_member_code VARCHAR(50) UNIQUE,
//          user_id INT ,
//         team_id INT ,
//         role_id INT,
//         remark TEXT,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//       `);
//     console.log("Team Members table created or already exists");
//   } catch (error) {
//     console.error("Error creating Team Members table:", error);
//   } finally {
//     client.release();
//   }
// };

// module.exports = createTeamMembersTable;
