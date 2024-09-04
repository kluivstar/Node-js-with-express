const mongoose = require('mongoose')

// creating a schema and model
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true, ['Duration is required']]
    },
    ratings: {
        type: Number,
        default: 1.0
    }
})

// creating model with schema
const Movie = mongoose.model('Movie', movieSchema)
module.exports = Movie