const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const dotenv = require("dotenv");

const connectionString = process.env.DATABASE;

// Function to initialize MongoDB connection
async function initializeMongoDB() {
  return new Promise((resolve, reject) => {
    // Connect to MongoDB
    mongoose.connect(connectionString);

    // Check if the connection is successful
    const db = mongoose.connection;
    db.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      reject(err); // Reject the promise if there is an error
    });

    db.once("open", () => {
      console.log("Connected to the MongoDB database");
      resolve(); // Resolve the promise if the connection is successful
    });
  });
}
