require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());

// ✅ CORS: Allow only your frontend domain
app.use(cors({
    origin: "https://educonnect-sepia.vercel.app", // Adjust this if needed
    methods: ["POST"],
    allowedHeaders: ["Content-Type"]
}));

// ✅ Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// ✅ API Endpoint to Handle Form Submission
app.post("/join-waiting-list", async (req, res) => {
    const { name, email, grade } = req.body;

    // ❌ Validation: Reject empty fields
    if (!name || !email || !grade || grade === "Select grade level") {
        return res.status(400).json({ message: "All fields are required!" });
    }

    // ✅ Email Template (HTML Format)
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send email to yourself
        subject: "New Waiting List Submission",
        html: `
            <h2>New Waiting List Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Grade Level:</strong> ${grade}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Successfully joined the waiting list!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Email sending failed", error: error.message });
    }
});

// ✅ Health Check Route
app.get("/", (req, res) => {
    res.send("EduConnect Backend is Running!");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
