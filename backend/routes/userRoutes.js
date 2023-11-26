const express = require('express')


const userRoute = express.Router()

userRoute.post('/signin', async (req, res)=>{
    const { regNo, password} = req.body
})

userRoute.post('/register', async (req, res)=>{
    const { regNo, password, email} = req.body
  
})

module.exports = {
    userRoute
}