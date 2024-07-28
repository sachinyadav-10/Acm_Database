const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Set up static folder for serving uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Import routes
const officerRoutes = require("./routes/officers");

// Use routes
app.use("/api/officers", officerRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`.bgGreen.white));
