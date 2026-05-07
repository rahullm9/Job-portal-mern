const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

const mongoose = require("mongoose");
app.get("/api/health", async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState;
    const states = { 0: "Disconnected", 1: "Connected", 2: "Connecting", 3: "Disconnecting" };
    
    // Check if variables exist
    const hasMongoURI = !!process.env.MONGO_URI;
    const hasJWT = !!process.env.JWT_SECRET;
    
    res.json({ 
      status: "OK", 
      database: states[dbStatus] || "Unknown",
      env: { hasMongoURI, hasJWT },
      message: "If database is Disconnected, check your MONGO_URI in Vercel."
    });
  } catch (err) {
    res.status(500).json({ status: "Error", error: err.message });
  }
});

app.use(express.static(path.resolve(__dirname, "frontend", "build"))); 
app.use((req, res) => { 
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")); 
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
