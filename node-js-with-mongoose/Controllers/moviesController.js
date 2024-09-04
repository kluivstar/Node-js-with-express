
const Movie = require('./../Models/movieModels')

// ROUTE HANDLER FUNCTIONS
exports.getAllMovies = async (req, res)=>{
    try {
        const movies = await Movie.find()
        res.status(200).json({
            status: "success",
            length: movies.length,
            data: {
                movies
            }
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}
// GET SPECIFIC MOVIE/ID RP
exports.getMovie = async (req, res) =>{
    
    try {
        const movie = await Movie.findById(req.params.id)
        res.status(200).json({
            status: "success",
            data: {
                movie
            }
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}


exports.createMovies = async (req, res) => {
    try {
        const movie = await Movie.create(req.body)

        res.status(200).json({
            status: "success",
            data: {
                movie
            }
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            data: {
                message: err.message
            }
        })
    }
}

exports.updateMovie = async (req, res) => {
    try {
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        res.status(200).json({
            status: "success",
            data: {
                movie: updateMovie
            }
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            data: {
                message: err.message
            }
        })
    }
}

exports.deleteMovie = (req, res) =>{

}