// tutoring_seesion_form_backend_db/init.js
require("dotenv").config();
const { Pool } = require("pg");

// PostgreSQL Database Configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to initialize the database table
async function initializeDatabase() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS session_requests (
      id SERIAL PRIMARY KEY,
      parent_first_name VARCHAR(50),
      parent_last_name VARCHAR(50),
      parent_email VARCHAR(100),
      child_grade VARCHAR(20),
      child_name VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(createTableQuery);
}

async function init() {
  try {
    await initializeDatabase();
    console.log("✅ Database and table initialized successfully.");
    process.exit(0); // Exit successfully
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1); // Exit with failure
  }
}

init();
