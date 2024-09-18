const mongoose = require('mongoose')
// import dotenv
const dotenv = require('dotenv')

//reading/loading our config file defining our environmental variable like CONN_STR
dotenv.config({path: './config.env'})
console.log(process.env)
// require express importing main express app from the app.js
const app = require('./app')

// Create Server
const port = process.env.PORT || 3000

// connecting to remote DB
mongoose.connect(process.env.CONN_STR, {
    useNewUrlParser: true
}).then((conn) => {
    console.log('DB started something.')
})


// server
app.listen(port, ()=>{
    console.log("Server wanna be startin something.")
})

// Handling Mongoose Validation Error
process.on('unhandledRejection', (err) =>{
    console.log(err.name, err.message);
    console.log('Unhandled rejection occured! Shutting down..')

    server.close(()=> {
        process.exit(1)
    })
})