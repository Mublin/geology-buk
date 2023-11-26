const express = require('express')


const courseRoute = express.Router()

courseRoute.get('/:level', async (req, res)=>{
    const {level} = req.params
})



module.exports = {
    courseRoute
}