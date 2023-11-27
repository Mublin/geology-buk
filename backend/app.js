const express = require('express')
require('dotenv').config()
const cors = require('cors')
const path = require('path')
const courseRoute = require('./routes/courseRoute')
const userRoute = require('./routes/userRoutes')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get("/", (req, res)=>{
    return res.status(200).send({message: 'hello'})
})
app.use('/api/users', userRoute)
app.use('/api/course', courseRoute)

app.listen(process.env.PORT, ()=>{
    console.log('running on port ' + process.env.PORT)
})