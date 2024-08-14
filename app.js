const express = require('express')
const fs = require('fs')

const app = express()
// Read file
let movies = JSON.parse(fs.readFileSync("./data/movies.json"))

app.use(express.json())


// GET - api/movies
app.get('/movies', (req, res)=>{
    res.status(200).json({
        // json json formatting
        status: "success",
        data: {
            movies:movies
        }
    })
})

app.get('/movies/:id', (req, res)=>{
    console.log(req.params)
    res.send('Created something')
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
    console.log("Server wanna be startin something")
})