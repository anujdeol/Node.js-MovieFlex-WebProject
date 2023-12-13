const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const database = require("./databaseConnection/connection");
const movieRoutes = require("./routes/movieRoutes");
const loginRoutes = require("./routes/loginRoutes");
const clientSessions = require("client-sessions");
const app = express();
const methodOverride = require('method-override');


// Use method-override middleware
app.use(methodOverride('_method'));

const port = process.env.PORT || 9000;

// Set up Handlebars as the view engine
app.engine(
  ".hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
    // Add runtime options to control prototype access
    runtimeOptions: {
      allowProtoMethodsByDefault: true,
      allowProtoPropertiesByDefault: true,
    },
  })
);

// Set the views folder
app.set("views", path.join(__dirname, "views"));

// Set the view engine
app.set("view engine", ".hbs");

// Other configurations
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Setup session
app.use(clientSessions({
  cookieName: "session",
  secret: "webproject",
  duration: 1000, // 2 minutes
  activeDuration: 1000 * 60 // 1 minute
}));

// Routes
app.use("/api/movies", movieRoutes);
app.use("/", loginRoutes);

// Async function to start the server after MongoDB connection is initialized
async function startServer() {
  try {
    // Wait for MongoDB connection to be initialized
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
