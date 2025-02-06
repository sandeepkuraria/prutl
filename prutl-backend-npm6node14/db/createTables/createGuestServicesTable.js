//db/createTables//createGuestServicesTable.js
const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create Guest Services table
const createGuestServicesTable = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS guest_services (
        service_id SERIAL PRIMARY KEY,
        service_code VARCHAR(50) UNIQUE NOT NULL,
        service_name VARCHAR NOT NULL,
        description TEXT,
        cost_per_unit DECIMAL NOT NULL,
        remark TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Guest Services table created or already exists");

    // // Step 2: Create the sequence for the service_code
    // const createSequenceQuery = `
    //   CREATE SEQUENCE IF NOT EXISTS service_code_seq START 1;
    // `;
    // await client.query(createSequenceQuery);
    // console.log("Sequence for service_code created or already exists");

    // // Step 3: Create the function to generate the service_code
    // const createFunctionQuery = `
    //   CREATE OR REPLACE FUNCTION generate_service_code()
    //   RETURNS TRIGGER AS $$
    //   DECLARE
    //     new_code VARCHAR;
    //   BEGIN
    //     -- Generate the new service code using the sequence
    //     new_code := 'GSERV' || LPAD(nextval('service_code_seq')::TEXT, 4, '0');
        
    //     -- Set the service_code to the generated value
    //     NEW.service_code := new_code;
        
    //     RETURN NEW;
    //   END;
    //   $$ LANGUAGE plpgsql;
    // `;
    // await client.query(createFunctionQuery);
    // console.log("Function to generate service_code created or replaced");

    // // Step 4: Create the trigger to automatically set the service_code
    // const createTriggerQuery = `
    //   CREATE TRIGGER set_service_code
    //   BEFORE INSERT ON guest_services
    //   FOR EACH ROW
    //   WHEN (NEW.service_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
    //   EXECUTE FUNCTION generate_service_code();
    // `;
    // await client.query(createTriggerQuery);
    // console.log("Trigger for setting service_code created or already exists");


  } catch (err) {
    console.error("Error creating Guest Services table: ", err);
  } finally {
    client.release(); // Release the client back to the pool

  }
};

module.exports = createGuestServicesTable;
