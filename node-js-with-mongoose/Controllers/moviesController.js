
const Movie = require('./../Models/movieModels')

exports.validateBody = (req, res, next) => {
    if(!req.body.name || !req.body.releaseYear) {
        return res.status(400).json({
            status: "fail",
            message: 'Invalid movie data'
        })
    }
    next()
}
// ROUTE HANDLER FUNCTIONS
exports.getAllMovies = (req, res)=>{

}
exports.getMovie = (req, res) =>{

}
exports.createMovies = (req, res) => {
    
}

exports.updateMovie = (req, res) => {

}

exports.deleteMovie = (req, res) =>{

}