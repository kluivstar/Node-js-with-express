const {params} = require('../Routes/moviesRoutes')
const Movie = require('./../Models/movieModels')
const ApiFeatures = require('./../Utils/ApiFeatures')

// GETTING HIGHEST RATED USING ALIASE
exports.getHighestRated = (req, res, next) => {
    //setting properties on query object  from request obj
    req.query.limit = "5"
    req.query.sort = '-ratings'

    // calls getAllMovies with above properties applied to SORT and other logic that uses above properties 'limit', 'sort'
    next()
}

// ROUTE HANDLER FUNCTIONS
exports.getAllMovies = async (req, res)=>{
    try {
        const features = new ApiFeatures(Movie.find(), req.query)
                        .filter()
                        .sort()
                        .limitFields()
                        .paginate()

        // wait for query to return a result and assign to movie then movies is sent as a response
        let movies = await features.query
        //ADVANCE FILTERING (greater than/ less than/ greater than equal to/ less than equal to)

        // let queryStr = JSON.stringify(req.query)

        // CONVERT REQ QUERY TO MONGO DB FORMAT
        //const regex = /\b(gte|gt|lte|lt)\b/g

        //queryStr = queryStr.replace(regex, (match) => `$${match}`)

        //const queryObj1 = JSON.parse(queryStr)


        //this.query = this.query.find(queryObj1)
    //}
    
        // EXCLUDE FIELDS
        //const excludeFields = ['sort', 'page', 'limit', 'fields']
        //const queryObj = { ...req.query }
        //excludeFields.forEach((el) => //delete queryObj[el])


        //SORT
       // req.query.sort
        //? query.sort(req.query.sort.split(',').join(' '))
        //: query.sort('-name')

        //LIMITING FIELDS

       // req.query.fields
        //? query.select(req.query.fields.split(',').join(' '))
        //: query.select('-__v')

        //Pagination

        //const page = +req.query.page || 1
        //const limit = +req.query.limit || 5
        //const skip = (page - 1) * limit
        //query = query.skip(skip).limit(limit)

        //if (req.query.page) {
        //promise awaiting data and assigning to 'moviesCount
        //const moviesCount = await Movie.countDocuments()
       // if (skip >= moviesCount)
        //    throw new Error(' Page not found!')
        //}

    //const movies = await features.query
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

