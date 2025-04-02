require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// API Endpoint to Handle Form Submission
app.post("/join-waiting-list", async (req, res) => {
    const { name, email, grade } = req.body;

    if (!email || !name || !grade) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send email to yourself
        subject: "New Waiting List Submission",
        text: `Name: ${name}\nEmail: ${email}\nGrade Level: ${grade}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Successfully joined the waiting list!" });
    } catch (error) {
        res.status(500).json({ message: "Email sending failed", error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
