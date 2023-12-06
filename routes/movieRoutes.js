const express = require("express");
const movieController = require("./../controllers/movieController");
const router = express.Router();

router
  .route("/")
  .get(movieController.getAllMovies)
  .post(movieController.addMovie);

  router
    .route("/home")
    .get(movieController.homePageLogin)
    .post(movieController.homePageRegister);

router
  .route("/:id")
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);



  module.exports=router;