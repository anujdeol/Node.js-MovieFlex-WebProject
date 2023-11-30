const express = require("express");
const movieController = require("./../controllers/movieController");
const router = express.Router();

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(movieController.addMovie);

router
  .route("/:id")
  .get(movieController.getMovie)
  .put(movieController.updateMovie)
  .delete(movieController.deleteMovie);


  module.exports=router;