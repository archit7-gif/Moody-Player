
const express = require("express")
const songsRoutes = require('./routes/songs.routes')
const cors = require('cors')



const app = express()
app.use(cors())
app.use(express.json())


app.use('/',songsRoutes)









module.exports = app


// express require kara hai mainly