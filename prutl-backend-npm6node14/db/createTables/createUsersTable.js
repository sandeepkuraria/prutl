// db/createTables/createUsersTable.js
const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create users table and related elements
const createUsersTable = async () => {
  const client = await pool.connect();
  try {
    // Step 1: Create the users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        user_id SERIAL PRIMARY KEY,
        user_code VARCHAR(50) UNIQUE NULL, -- Allows NULL
        name VARCHAR,
        date_of_birth DATE,
        email VARCHAR UNIQUE,
        password VARCHAR,
        phone_number VARCHAR,
        user_type VARCHAR,
        membership_id INT,
        usergroup_id INT,
        referrer_id INT,
        city VARCHAR,
        county VARCHAR,
        state VARCHAR,
        country VARCHAR,
        pin_code VARCHAR,
        remark TEXT,
        profile_picture_url VARCHAR,  -- Add profile picture URL
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Users table created or already exists");

    // // Step 2: Create the sequence for the user_code (if needed)
    // await client.query(`
    //   CREATE SEQUENCE IF NOT EXISTS user_code_seq START 1;
    // `);
    // console.log("Sequence for user_code created or already exists");

    // // Step 3: Create the function to generate the user_code
    // await client.query(`
    //   CREATE OR REPLACE FUNCTION generate_user_code()
    //   RETURNS TRIGGER AS $$
    //   DECLARE
    //     new_code VARCHAR;
    //   BEGIN
    //     -- Generate the new user code using the sequence
    //     new_code := 'USR' || LPAD(nextval('user_code_seq')::TEXT, 4, '0');

    //     -- Set the user_code to the generated value
    //     NEW.user_code := new_code;

    //     RETURN NEW;
    //   END;
    //   $$ LANGUAGE plpgsql;
    // `);
    // console.log("Function to generate user_code created or replaced");

    // // Step 4: Create the trigger to automatically set the user_code
    // await client.query(`
    //   CREATE TRIGGER set_user_code
    //   BEFORE INSERT ON users
    //   FOR EACH ROW
    //   WHEN (NEW.user_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
    //   EXECUTE FUNCTION generate_user_code();
    // `);
    // console.log("Trigger for setting user_code created or already exists");
  } catch (error) {
    console.error("Error creating Users table or related elements:", error);
  } finally {
    client.release();
  }
};

module.exports = createUsersTable;

// //db/createTables//createUsersTable.js
// const { Pool } = require("pg");
// const config = require("../../config/config");

// const pool = new Pool({
//   host: config.db.host,
//   user: config.db.user,
//   password: config.db.password,
//   database: config.db.database,
// });
// // Function to create users table
// const createUsersTable = async () => {
//   const client = await pool.connect();
//   try {
//     await client.query(`
//         CREATE TABLE IF NOT EXISTS users (
//       user_id SERIAL PRIMARY KEY,
//       user_code VARCHAR(50) UNIQUE NULL,
//       name VARCHAR NOT NULL,
//       email VARCHAR UNIQUE NOT NULL,
//       password VARCHAR NOT NULL,
//       phone_number VARCHAR,
//       user_type VARCHAR,
//       membership_id INT,
//       usergroup_id INT,
//       referrer_id INT,
//       city VARCHAR,
//       county VARCHAR,
//       state VARCHAR,
//       country VARCHAR,
//       pin_code VARCHAR,
//       remark TEXT,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     )
//       `);
//     console.log("Users table created or already exists");
//   } catch (error) {
//     console.error("Error creating Users table:", error);
//   } finally {
//     client.release();
//   }
// };

// module.exports = createUsersTable;
