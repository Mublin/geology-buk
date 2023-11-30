const express = require('express')
const knex = require('knex')
const fs = require('fs').promises
const multer = require('multer')
const { isAuth, adminAuth } = require('../utils')
const path = require('path')
const db = knex({
    client: 'pg',
    connection: {
        host: process.env.url,
        user: process.env.usernam,
        password: process.env.password,
        database: process.env.name
    }
})


const courseRoute = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        return cb(null, './lecturenotes/')
    },
    filename: (req, file, cb)=> {
        return cb(null, `${new Date().getTime()}_${file.originalname}`)
    }
})
const upload = multer({storage})


courseRoute.post('/newnote', isAuth, adminAuth, upload.single('file'), async (req, res)=>{
    const {courseTitle, courseCode, level} = req.body
    const { path: filePath, originalname: fileName} = req.file;
    if (courseTitle && level && filePath) {
        await db('lecture_note').insert({
            course_name: courseTitle,
            course_title: courseTitle,
            level,
            course_code: courseCode,
            file_path: filePath,
            lecture_note: fileName,
        })
        return res.status(201).send({message: "New course or lecture note added successfully"})
    }
    return res.status(401).send({message: 'Unable to add course'})
})

courseRoute.get('/lecturenotes', isAuth, adminAuth, async(req, res)=>{
    const data = await db('lecture_note').select('*')
    res.status(200).send(data)
})

courseRoute.get('/lecturenotes/:filename', async(req, res)=>{
    const {filename} = req.params
    const  filePath = path.join(__dirname, '../lecturenotes', filename)
    console.log(filePath)
    res.status(200).download(filePath)
})

courseRoute.delete('/lecturenote/:id', isAuth, adminAuth, async(req,res)=>{
    const {id} = req.params
    try {
        const data = await db('lecture_note').select('*').where('id', '=', id)
        if (data[0]) {
            const filePath = path.join(__dirname, "../", data[0].file_path)
            await fs.unlink(filePath);
            await db('lecture_note').delete('*').where('id', '=', id)
            res.status(200).send({message: "Lecture note deleted successfully"})
        }
    } catch (error) {
        return res.status(501).send({message: "Server error"})
    }
})



module.exports = courseRoute