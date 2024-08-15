// Setting Up Express and Reading the JSON File
const express = require('express')
const fs = require("fs")

const app = express()
// Read file
let movies = JSON.parse(fs.readFileSync("./data/movies.json"))

// Middleware that parse incoming JSON request
app.use(express.json())


// GET - api/movies, GET Request to Retrieve All Movies
app.get('/movies', (req, res)=>{
    res.status(200).json({
        // json json formatting
        status: "success",
        data: {
            movies:movies
        }
    })
})

// GET Request to Retrieve a Single Movie by ID
app.get('/movies/:id', (req, res) =>{
    // The id is extracted from the URL (req.params.id) and converted to a number using * 1 // FIND MOVIE BASED ON PRODUCT ID PARAMETER
    const id = req.params.id * 1
    let movie = movies.find(el => el.id === id)

    // IF MOVIE IS NOT FOUND
    if(!movie){
        return res.status(404).json({
            status: "fail",
            data: {
                message: `Movie with ${id} not found`
            }
        })
    }
    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    })
})
// POST - api/movies
app.post('/movies', (req, res) => {
    const newID = movies[movies.length - 1].id + 1
    const newMovie = Object.assign({id: newID}, req.body)
    movies.push(newMovie)
    fs.writeFile('/data/movies.json', JSON.stringify(movies), (err)=>{
        res.status(201).json({
            status: "success",
            data: {
                movies:newMovie
            }
        })
    })
})
// Create Server
const port = 3000
app.listen(port, ()=>{
    console.log("Server wanna be startin something.")
})