const mongoose = require('mongoose')
// import dotenv
const dotenv = require('dotenv')
//reading/loading our config file
dotenv.config({path: './config.env'})
// require express importing main express app from the app.js
const app = require('./app')

// Create Server
const port = process.env.PORT || 3000

// connecting to remote DB
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('DB started something.')
}).catch(err =>{
    console.log('Some error has occured')
})

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
const movie = mongoose.model('Movie', movieSchema)

// server
app.listen(port, ()=>{
    console.log("Server wanna be startin something.")
})