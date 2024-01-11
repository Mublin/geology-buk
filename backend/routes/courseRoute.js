const express = require('express')
const knex = require('knex')
const fs = require('fs').promises
const multer = require('multer')
const { isAuth, adminAuth } = require('../utils')
const path = require('path')
const db = knex(require('../knexfile'))
const { Dropbox } = require('dropbox');
const courseRoute = express.Router();
const storage = multer.memoryStorage(); // Update storage to memory storage for handling file buffer
const upload = multer({ storage });

const dropbox = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

courseRoute.post('/newnote', upload.single('file'), async (req, res) => {
    try {
        const { courseTitle, courseCode, level } = req.body;
        const { buffer, originalname } = req.file;

        if (!courseTitle || !level || !buffer) {
            // Send an error response if required data is missing
            return res.status(400).send({ message: 'Incomplete data. Unable to add course.' });
        }

        // Upload the file to Dropbox
        const dropboxResponse = await dropbox.filesUpload({
            path: `/${new Date().getTime()}_${originalname}`,
            contents: buffer,
        });

        // Insert data into the 'lecture_note' table in the database
        await db('lecture_note').insert({
            course_name: courseTitle,
            course_title: courseTitle,
            level,
            course_code: courseCode,
            file_path: dropboxResponse.result.path_display,
            lecture_note: originalname,
        });

        // Send a success response
        return res.status(201).send({ message: 'New course or lecture note added successfully' });
    } catch (error) {
        // Handle specific Dropbox error: missing_scope
        if (error.status === 401 && error.error && error.error['.tag'] === 'missing_scope') {
            return res.status(401).send({ message: 'Insufficient Dropbox permissions. Please check app settings.' });
        }

        console.error('Error uploading file to Dropbox:', error);
        return res.status(500).send({ message: 'Error uploading file to Dropbox.' });
    }
});

courseRoute.get('/lecturenotes', async(req, res)=>{
    const data = await db('lecture_note').select('*')
    res.status(200).send(data)
})

courseRoute.get('/download/:filename', async (req, res) => {
    try {
        const filename = req.params.filename;
        const dropboxResponse = await dropbox.filesDownload({ path: `${filename}` });
        
        // You can send the file to the client or save it locally, depending on your needs
        res.set('Content-Disposition', `attachment; filename="${filename}"`);
        res.set('Content-Type', 'application/octet-stream');
        res.send(dropboxResponse.result.fileBinary);
    } catch (error) {
        console.error('Error downloading file from Dropbox:', error);
        return res.status(500).send({ message: 'Error downloading file from Dropbox.' });
    }
});

courseRoute.delete('/lecturenote/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)
    
    try {
        // Retrieve the lecture note data
        const lectureNote = await db('lecture_note').select('*').where('id', '=', id);

        if (!lectureNote[0]) {
            return res.status(404).send({ message: "Lecture note not found" });
        }

        // Delete the file from Dropbox
        // console.log(lectureNote[0].file_path.slice(1))
        await dropbox.filesDeleteV2({ path: lectureNote[0].file_path });


        // Delete the lecture note from the database
        await db('lecture_note').delete().where('id', '=', id);

        // Send a success response
        return res.status(204).send({message: 'Deleted successfully'});
    } catch (error) {
        console.error('Error deleting lecture note:', error);
        return res.status(500).send({ message: "Server error" });
    }
});



module.exports = courseRoute