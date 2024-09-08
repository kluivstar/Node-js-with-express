
const Movie = require('./../Models/movieModels')

// ROUTE HANDLER FUNCTIONS
exports.getAllMovies = async (req, res)=>{
    try {
        console.log(req.query)
        // CONVERT QUERY TO STRING
        let queryStr = JSON.stringify(req.query)
        
        // CONVERT TO MONGO DB FORMAT
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match)=> `$${match}`)
        const queryObj = JSON.parse(queryStr)
        
        // DELETE QUERY OBJ TO AVOID EMPTY ARRAY IN RESPONSE
        delete queryObj.sort
        let query = Movie.find(queryObj)
        
        // SORTING LOGIC
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ')
            query = query.sort(sortBy)
        }else{
            query = query.sort('-createdAt')
        }


        const movies = await query;
        res.status(200).json({
            status: "success.",
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

exports.deleteMovie = async (req, res) =>{
    try {
        const deleteMovie = await Movie.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: "success",
            data: null
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