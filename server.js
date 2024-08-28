// require dotenv
const dotenv = require('dotenv')
//reading our config file
dotenv.config({path: './config.env'})
const app = require('./app')

// Create Server
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log("Server wanna be startin something.")
})