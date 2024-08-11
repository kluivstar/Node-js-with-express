const express = require('express')
const app = express()

// Route
app.get('/', (req, res)=>{
    res.status(200).send("Something's started")
})

// Create Server
const port = 3000
app.listen(port, ()=>{
    console.log("Server wanna be startin something")
})