const express = require('express')
const movieController = require('./../Controllers/moviesController')

const router = express.Router()

router.param('id', movieController.checkId)

router.route('/')
    .get(movieController.getAllMovies)
    .post(movieController.createMovies)

router.route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie)


module.exports = router;