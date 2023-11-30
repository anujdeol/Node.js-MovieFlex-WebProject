const dotenv = require("dotenv");
const express = require("express");

dotenv.config({ path: "./config.env" });
const app = express();
const database = require("./databaseConnection/connection");

const port = process.env.PORT;
const connectionString = process.env.DATABASE;

async function startServer() {
  try {
    await database.initializeMongoDB();
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error during server startup:", error);
  }
}

// Call the function to start the server
startServer();
