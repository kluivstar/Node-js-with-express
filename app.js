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
// POST - api/movies
app.post('/movies', (req, res) => {
    console.log(req.body)
    res.send('Created')
})
// Create Server
const port = 3000
app.listen(port, ()=>{
    console.log("Server wanna be startin something")
})