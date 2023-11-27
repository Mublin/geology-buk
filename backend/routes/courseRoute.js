const express = require('express')
const knex = require('knex')
const multer = require('multer')
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

courseRoute.get('/:level', async (req, res)=>{
    const {level} = req.params
})
courseRoute.post('/newnote', upload.single('file'), async (req, res)=>{
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


module.exports = courseRoute