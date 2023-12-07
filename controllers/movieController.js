const movieModel = require("./../models/moviesSchema");

// add movie form render
exports.addMovie = (req, res) => {
  console.log("movie page called");
  res.render('addmovie', { title: 'Movie Page' });
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
    directors: req.body.directors.split(',').map(dir => dir.trim()), // Split directors by comma and trim spaces
    imdb: {
      rating: req.body.imdb_rating,
      votes: req.body.imdb_votes,
      id: req.body.imdb_id,
    },
    cast: req.body.cast.split(',').map(actor => actor.trim()), // Split cast by comma and trim spaces
    countries: req.body.countries.split(',').map(country => country.trim()), // Split countries by comma and trim spaces
    genres: req.body.genres.split(',').map(genre => genre.trim()), // Split genres by comma and trim spaces
    tomatoes: {
      viewer: {
        rating: req.body.tomatoes_rating,
        numReviews: req.body.tomatoes_reviews,
      },
      lastUpdated: req.body.tomatoes_lastupdated,
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


