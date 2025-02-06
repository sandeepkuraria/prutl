//db/createTables//createEventBookingsTable.js
const { Pool } = require("pg");
const config = require("../../config/config");

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Function to create Event Bookings table
const createEventBookingsTable = async () => {
  const client = await pool.connect();
  try {
    // Step 1: Create the competitions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS event_bookings (
        booking_id SERIAL PRIMARY KEY,
        booking_code VARCHAR(50) UNIQUE ,
        event_id INT ,
        hall_id INT,
        venue_id INT,
        user_id INT,
        booking_start_date DATE,
        booking_end_date DATE,
        num_of_seats INT,
        total_cost FLOAT,
        remark TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `);
    console.log("Event Bookings table created or already exists");

    // // Step 2: Create the sequence for the booking_code
    // const createSequenceQuery = `
    //   CREATE SEQUENCE IF NOT EXISTS booking_code_seq START 1;
    // `;
    // await client.query(createSequenceQuery);
    // console.log('Sequence for booking_code created or already exists');

    // // Step 3: Create the function to generate the booking_code
    // const createFunctionQuery = `
    //   CREATE OR REPLACE FUNCTION generate_booking_code()
    //   RETURNS TRIGGER AS $$
    //   DECLARE
    //     new_code VARCHAR;
    //   BEGIN
    //     -- Generate the new booking code using the sequence
    //     new_code := 'EVTBKNG' || LPAD(nextval('booking_code_seq')::TEXT, 4, '0');

    //     -- Set the booking_code to the generated value
    //     NEW.booking_code := new_code;

    //     RETURN NEW;
    //   END;
    //   $$ LANGUAGE plpgsql;
    // `;
    // await client.query(createFunctionQuery);
    // console.log('Function to generate booking_code created or replaced');

    // // Step 4: Create the trigger to automatically set the booking_code
    // const createTriggerQuery = `
    //   CREATE TRIGGER set_booking_code
    //   BEFORE INSERT ON event_bookings
    //   FOR EACH ROW
    //   WHEN (NEW.booking_code IS NULL) -- Ensures the trigger only sets the code if it's NULL
    //   EXECUTE FUNCTION generate_booking_code();
    // `;
    // await client.query(createTriggerQuery);
    // console.log('Trigger for setting booking_code created or already exists');
  } catch (err) {
    console.error("Error creating Event Bookings table: ", err);
  } finally {
    client.release();
  }
};

module.exports = createEventBookingsTable;
