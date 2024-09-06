const mongoose = require('mongoose')
// import dotenv
const dotenv = require('dotenv')

//reading/loading our config file defining our environmental variable like CONN_STR
dotenv.config({path: './config.env'})
const fs = require('fs')

const Movie = require('./../Models/movieModels')

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('DB started something.')
}).catch((error) =>{
    console.log('Some error has occured')
})

const movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'))

const deleteMovies = async ()=> {
    try {
        await Movie.deleteMany()
        console.log('Data cleared successfully')
    }catch(err){
        console.log(err.message)
    }
}

const importMovies = async ()=> {
    try {
        await Movie.create(movies)
        console.log('Data created successfully')
    }catch(err){
        console.log(err.message)
    }
    process.exit()
}
if(process.argv[2] === '--import'){
    importMovies()
}
if(process.argv[2] === '--delete'){
    deleteMovies()
}