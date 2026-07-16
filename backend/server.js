require("dotenv").config();

const express = require("express");
const cors = require("cors");

//importing the routes
const pool=require("./config/database");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resumes", resumeRoutes);
app.use("/api/ai", aiRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    testConnection();
});

async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT 1 AS test");
        console.log("✅ Database connected! Test value:", rows[0].test);
    } catch (err) {
        console.error("❌ Database connection failed:", err.message);
    }
}