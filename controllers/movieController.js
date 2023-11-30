const movieModel = require("./../models/movies");

exports.getAllMovies = (req, res) => {

  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  
  // const page = req.param.pageNo;

     // use mongoose to get all todos in the database
     console.log("quesry result"+req.query);

     movieModel.find(function (err, movies) {
    console.log("$$$$$$$$$" +movies)
    // if there is an error retrieving, send the error otherwise send data
    if (err) res.send(err);
    res.json(movies); // return all employees in JSON format

  }).skip((page-1)*1).limit(limit);



};
exports.addMovie = (req, res) => {

  const newMovieData = req.body; // Assuming the movie data is sent in the request body
  const newMovie = new movieModel(newMovieData);

  newMovie.save((err, movie) => {
    if (err) res.status(500).send(err);
    res.status(201).json(movie); // Return the newly created movie in JSON format
  });
};
exports.getMovie = (req, res) => {

  const movieId = req.params.id; // Assuming the movie ID is passed as a route parameter

  movieModel.findById(movieId, (err, movie) => {
    if (err) res.status(500).send(err);
    if (!movie) res.status(404).json({ message: 'Movie not found' });
    res.status(200).json(movie); // Return the found movie in JSON format
  });


};
exports.updateMovie = (req, res) => {

  const movieId = req.params.id; 

  const newTitle = req.body.title;
 
  movieModel.findByIdAndUpdate(movieId, { $set: { title: newTitle } }, { new: true }, (err, movie) => {
    if (err) {
      res.status(500).send(err);
    } else if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
    } else {
      res.status(200).json(movie); // Return the updated movie in JSON format
    }
  });


};
exports.deleteMovie = (req, res) => {

  const movieId = req.params.id; // Assuming the movie ID is passed as a route parameter

  movieModel.findByIdAndRemove(movieId, (err, movie) => {
    if (err) res.status(500).send(err);
    if (!movie) res.status(404).json({ message: 'Movie not found' });
    res.status(200).json({ message: 'Movie deleted successfully' });
  });

};


