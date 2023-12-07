const express = require("express");
const movieController = require("./../controllers/movieController");
const router = express.Router();


const ensureLoggedIn = (req, res, next) => {
  console.log("ensureLoggedIn middleware called");
  console.log("sessiondddd   "+req.session.user);
  if (req.session && req.session.user) {
    console.log("User is logged in");
    next();
  } else {
    console.log("User is not logged in. Redirecting to /login");
    res.redirect('/login');
  }
};


router
  .route("/")
  .get(ensureLoggedIn, movieController.getAllMovies);


router
  .route("/add")
  .get(movieController.addMovie)
  .post(movieController.postMovie)  

router
  .route("/:id")
  .get(movieController.getMovie)
  .patch(movieController.updateMovie)
  .delete(movieController.deleteMovie);



  module.exports=router;