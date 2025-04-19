// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// PostgreSQL Database Configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Route to handle form submission
app.post("/submit-session", async (req, res) => {
  const { parentFirstName, parentLastName, parentEmail, grade, childName } = req.body;

  if (!parentFirstName || !parentLastName || !parentEmail || !grade || !childName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const insertQuery = `
      INSERT INTO session_requests (parent_first_name, parent_last_name, parent_email, child_grade, child_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(insertQuery, [
      parentFirstName,
      parentLastName,
      parentEmail,
      grade,
      childName,
    ]);

    res.status(201).json({ message: "Session request submitted successfully", data: result.rows[0] });
  } catch (error) {
    console.error("❌ Error submitting session:", error);
    res.status(500).json({ message: "Error submitting session request" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
