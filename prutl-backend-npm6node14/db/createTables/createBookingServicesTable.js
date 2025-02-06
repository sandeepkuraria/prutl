//db/createTables//createBookingServicesTable.js
const { Pool } = require('pg');
const config = require('../../config/config');

const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});


// Function to create Booking Services table
const createBookingServicesTable = async () => {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS booking_services (
        booking_service_id SERIAL PRIMARY KEY,
        booking_id INT REFERENCES event_bookings(booking_id) ON DELETE SET NULL,
        service_id INT REFERENCES guest_services(service_id) ON DELETE SET NULL,
        quantity INT NOT NULL,
        total_cost DECIMAL NOT NULL,
        remark TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  
    try {
      const client = await pool.connect();
      await client.query(createTableQuery);
      console.log("Booking Services table created or already exists");
      client.release(); // Release the client back to the pool
    } catch (err) {
      console.error("Error creating Booking Services table: ", err);
    }
  };

module.exports = createBookingServicesTable;