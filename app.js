const dotenv = require("dotenv");
const express = require("express");

// Enable express
const app = express();
dotenv.config({ path: './config.env' });


// // Enable CORS for all routes
// app.use(cors());

const port = process.env.PORT;

// Async function to start the server after MongoDB connection is initialized
async function startServer() {
   
  try {
    const database = require("./databaseConnection/connection");
    // Wait for MongoDB connection to be initialized
    await database.initializeMongoDB();

    // Your routes and other middleware go here

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
  }
}

// Call the function to start the server
startServer();
