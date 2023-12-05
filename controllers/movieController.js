const movieModel = require("./../models/moviesSchema");


//home page

exports.homePageLogin = (req, res) => {
  console.log("login page called");
  res.render('login', { title: 'LoginPage' });
};

exports.homePageRegister = (req, res) => {
  console.log("register page called");
  res.render('register', { title: 'Register Yourself!' });
};

//get all movies 
//done
// Assuming you have the necessary imports and setup for movieModel

exports.getAllMovies = (req, res) => {
  const limit = req.body.limit || 5;
  const page = req.body.page|| 1;
  

  movieModel.find({}, (err, movies) => {
      if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
      }

      res.render('showMovies', { movies });
  }).skip((page - 1) * 1).limit(limit);
};


// addMovie
//done
exports.addMovie = (req, res) => {
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



//by ID
//done
exports.getMovie = (req, res) => {

  const movieId = req.params.id; // Assuming the movie ID is passed as a route parameter

  movieModel.findById(movieId, (err, movie) => {
    if (err) res.status(500).send(err);
    if (!movie) res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie); // Return the found movie in JSON format
  });


};


//DONE
exports.updateMovie = (req, res) => {
  const movieId = req.params.id;
  const newTitle = req.body.title;
  console.log("title yhaaan"+newTitle);

  // Using findByIdAndUpdate
  movieModel.findByIdAndUpdate(
    movieId,
    { $set: { title: newTitle } },
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



//delete movie
exports.deleteMovie = (req, res) => {

  const movieId = req.params.id; 

  movieModel.findByIdAndRemove(movieId, (err, movie) => {
    if (err) res.status(500).send(err);
    if (!movie) res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  });

};


