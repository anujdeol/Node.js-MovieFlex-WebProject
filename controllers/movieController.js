const movieModel = require("./../models/moviesSchema");

// add movie form render
exports.addMovie = (req, res) => {
  console.log("movie page called");
  res.render('addmovie', { title: 'Movie Page' });
};

exports.showHomePage = (req, res) => {
  console.log("home page called");
  res.render("homePage", { title: "Hoem" });
};

exports.updateRender = (req, res) => {
  console.log("update page called");
  res.render("updateMovie", { title: "Update" });
};

// addMovie
//done
exports.postMovie = (req, res) => {
  const movieData = {
    title: req.body.title,
    year: req.body.year,
    runtime: req.body.runtime,
    released: req.body.released,
    poster: req.body.poster,
    plot: req.body.plot,
    fullplot: req.body.fullplot,
    lastupdated: req.body.lastupdated,
    type: req.body.type,
    directors: req.body.directors,
    imdb: {
      rating: req.body.rating,
      votes: req.body.votes,
      id: req.body.id,
    },
    cast: req.body.cast,
    countries: req.body.countries,
    genres: req.body.genres,
    tomatoes: {
      viewer: {
        rating: req.body.rating,
        numReviews: req.body.numReviews,
      },
      lastUpdated: req.body.lastUpdated,
    },
    
    num_mflix_comments: req.body.num_mflix_comments,
  };

  console.log("Adding movie");

  const newMovie = new movieModel(movieData);

  newMovie.save((err, movie) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log("Movie added:", movie);
    res.status(201).json({ message: 'Movie added successfully', movieId: movie._id });
  });
};





//get all movies 
//done
exports.getAllMovies = (req, res) => {
  const limit = req.body.limit|| 2;
  console.log("limitttttt   " + limit);
  const page = req.body.page ||1;
  console.log("pagessss " + page);

  // use mongoose to get all movies in the database
  movieModel.find({}, function (err, movies) {
    console.log("$$$$$$$$$" + movies)
    // if there is an error retrieving, send the error; otherwise, render the view
    if (err) {
      res.send(err);
    } else {
      res.render('showMovies', { movies: movies });
    }
  }).skip((page - 1) * 1).limit(limit);
};


//by ID
//done
exports.getMovie = (req, res) => {

  const movieId = req.query.id; // Assuming the movie ID is passed as a route parameter
console.log("SEARCH METHOD CALLED "+movieId);
  movieModel.findById(movieId, (err, movie) => {
    if (err) res.status(500).send(err);
    if (!movie) res.status(404).json({ message: 'Movie not found' });
    res.render('searchMovie', { movie });
  });


};



//DONE
exports.updateMovie = (req, res) => {
  const movieId = req.body.id;
  console.log("updategetting id"+movieId);
  const movieData = {
    title: req.body.title,
    year: req.body.year,
    runtime: req.body.runtime,
    released: req.body.released,
    poster: req.body.poster,
    plot: req.body.plot,
    fullplot: req.body.fullplot,
    lastupdated: req.body.lastupdated,
    type: req.body.type,
    directors: req.body.directors,
    imdb: {
      rating: req.body.rating,
      votes: req.body.votes,
      id: req.body.id,
    },
    cast: req.body.cast,
    countries: req.body.countries,
    genres: req.body.genres,
    tomatoes: {
      viewer: {
        rating: req.body.rating,
        numReviews: req.body.numReviews,
      },
      lastUpdated: req.body.lastUpdated,
    },
    num_mflix_comments: req.body.num_mflix_comments,
  };
  
  // Using findByIdAndUpdate
  movieModel.findByIdAndUpdate(
    movieId,
    { $set: { title: movieData.title } },
    { new: true },
    (err, movie) => {
      if (err) {
        console.log("errorrrrrrr");
        res.status(500).send(err);
      } else if (!movie) {
        console.log("not found");
        res.status(404).json({ message: 'Movie not found' });
      } else {
        console.log(movie);
        res.status(200).json(movie); // Return the updated movie in JSON format
      }
    }
  );
};


exports.addMovie = (req, res) => {
  console.log("add page called");
  res.render("addMovie", { title: "Add" });
};

//delete movie
exports.deleteMovie = (req, res) => {
  const movieId = req.params.id; // Use req.params.id for DELETE requests

  // Assuming movieModel is your Mongoose model
  movieModel.findByIdAndRemove(movieId, (err, movie) => {
    if (err) {
      console.error('Error deleting movie:', err);
      res.status(500).send(err);
    } else if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      console.log('Movie deleted successfully:', movie);
      res.redirect('/'); // Redirect to the desired page after deletion
    }
  });
};

