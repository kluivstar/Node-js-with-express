// import dotenv
const dotenv = require('dotenv')
//reading/loading our config file
dotenv.config({path: './config.env'})
// require express importing main express app from the app.js
const app = require('./app')

// Create Server
const port = process.env.PORT || 3000


// server
app.listen(port, ()=>{
    console.log("Server wanna be startin something.")
})