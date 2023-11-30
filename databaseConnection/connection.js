const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const connectionString = process.env.DATABASE;

// Function to initialize MongoDB connection
async function initializeMongoDB() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the MongoDB database");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

// Export the initializeMongoDB function
module.exports = { initializeMongoDB };
