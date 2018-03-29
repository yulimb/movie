const mongoose = require('mongoose')

export const findAndRemove = async id => {
  const Movie = mongoose.model('Movie')

  const movie = await Movie.findOne({
    _id: id
  })

  if (movie) {
    await movie.remove()
  }
}

export const getAllMovies = async (type, year) => {
  const Movie = mongoose.model('Movie')

  let query = {}

  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }

  if (year) {
    query.year = year
  }

  const movies = await Movie.find(query)

  return movies
}

export const getMovieDetail = async (id) => {
  const Movie = mongoose.model('Movie')

  const movie = await Movie.findOne({
    _id: id
  })

  return movie
}

export const getRelativeMovies = async (movie) => {
  const Movie = mongoose.model('Movie')

  const movies = await Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })

  return movies
}