// Setting Up Express and Reading the JSON File
const express = require('express')
const morgan = require('morgan')
const app = express()

const moviesRouter = require('./Routes/moviesRoutes')


// Middleware that parse incoming JSON request
const logger =  function(req, res, next) {
    req.requestedAt = new Date().toISOString()
    next()
}
app.use(express.json())
app.use(morgan('dev'))
app.use(logger)

// api/movies
/* app.get('/movies', getAllMovies)
app.get('/movies/:id', getRouteId)
app.post('/movies', createMovies)
app.patch('/movies/:id', updateMovie)
app.delete('/movies/:id', deleteMovie) */


app.use('/movies', moviesRouter)
// Create Server
const port = 3000
app.listen(port, ()=>{
    console.log("Server wanna be startin something.")
})