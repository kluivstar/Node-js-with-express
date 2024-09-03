const mongoose = require('mongoose')
// import dotenv
const dotenv = require('dotenv')
//reading/loading our config file
dotenv.config({path: './config.env'})
// require express importing main express app from the app.js
const app = require('./app')

// Create Server
const port = process.env.PORT || 3000

mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('DB started something.')
})
app.listen(port, ()=>{
    console.log("Server wanna be startin something.")
})