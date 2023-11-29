const dotenv = require("dotenv");
var express = require("express");
var mongoose = require("mongoose");
var app = express();
dotenv.config({ path: './config.env' });


var port = process.env.PORT;

const connectionString = process.env.DATABASE;


// Connect to MongoDB
mongoose.connect(connectionString);

// Check if the connection is successful
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to the MongoDB database");
});

// Your routes and other middleware go here

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
