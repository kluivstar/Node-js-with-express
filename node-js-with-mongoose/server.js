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
}).catch((error) =>{
    console.log('Some error has occured,')
})


// server
app.listen(port, ()=>{
    console.log("Server wanna be startin something.")
})