const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  year: {
    type: Number,
    // required: true,
  },
  runtime: {
    type: Number,
    // required: true,
  },
  released: {
    type: Date,
    // required: true,
  },
  poster: {
    type: String,
    // required: true,
  },
  plot: {
    type: String,
    // required: true,
  },
  fullplot: {
    type: String,
    // required: true,
  },
  lastupdated: {
    type: String,
    // required: true,
  },
  type: {
    type: String,
    // required: true,
  },
  directors: {
    type: [String],
    // required: true,
  },
  imdb: {
    rating: {
      type: Number,
      // required: true,
    },
    votes: {
      type: Number,
      // required: true,
    },
    id: {
      type: Number,
      // required: true,
    },
  },
  cast: {
    type: [String],
    // required: true,
  },
  countries: {
    type: [String],
    // required: true,
  },
  genres: {
    type: [String],
    // required: true,
  },
  tomatoes: {
    viewer: {
      rating: {
        type: Number,
        // required: true,
      },
      numReviews: {
        type: Number,
        // required: true,
      },
    },
    lastUpdated: {
      type: Date,
      // required: true,
    },
  },
  num_mflix_comments: {
    type: Number,
    // required: true,
  },
});

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie;