const express = require('express')
const movieController = require('./../Controllers/moviesController')

const router = express.Router()

// adds checkid to route
// router.param('id', movieController.checkId)
// RHF added to route
router.route('/')
    .get(movieController.getAllMovies)
    .post(movieController.validateBody, movieController.createMovies)

router.route('/:id')
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie)


module.exports = router;