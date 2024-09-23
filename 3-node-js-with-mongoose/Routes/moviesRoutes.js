const express = require('express')

// IMPORT CONTROLLER
const movieController = require('./../Controllers/moviesController')
const authController = require('./../Controllers/authController')
const router = express.Router()

//HANDLING REQUEST TO GET HIGHEST RATED MOVIES IN DATABASE
router.route('/highest-rated')
    .get(movieController.getHighestRated, movieController.getAllMovies)

// HANDLING ROUTES  TO GET MOVIES STATS
router.route('/movie-stats')
    .get(movieController.getMovieStats)

// HANDLING ROUTES  TO GET MOVIES BY GENRE
router.route('/movie-by-genre')
    .get(movieController.getMovieByGenre)
    
// HANDLING ROUTES WITH ROUTER OBJECT
router.route('/')
    .get(authController.protect, movieController.getAllMovies)
    .post(movieController.createMovies)

// HANDLING ROUTES PARAMETER TO SPECIFIC IDs WITH ROUTER OBJECT
// COMMIT CORRECTION
router.route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(authController.protect, authController.restrict('admin'), movieController.deleteMovie)


module.exports = router;