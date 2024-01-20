const express = require('express')
const knex = require('knex')
const multer = require('multer')
const { isAuth, adminAuth } = require('../utils')
const path = require('path')
const cors = require('cors')
const db = knex(require('../knexfile'))
const { Dropbox } = require('dropbox');
const { hostname } = require('os')
const courseRoute = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const config = {
  fetch,
  clientId: process.env.db_key,
  clientSecret: process.env.db_secret,
};

const dropbox = new Dropbox(config);

courseRoute.post('/new-note', isAuth, adminAuth, upload.single('file'), async (req, res) => {
  const { courseTitle, courseCode, level } = req.body;
  const { buffer, originalname } = req.file;

  if (courseTitle && level && buffer) {
    try {
      // Upload the file to Dropbox using the configured access token
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
      console.error('Error uploading file to Dropbox:', error);
      return res.status(500).send({ message: 'Error uploading file to Dropbox.' });
    }
  }
  // Send an error response if required data is missing
  return res.status(401).send({ message: 'Unable to add course' });
});

// Your existing /auth route
courseRoute.get('/auth', async (req, res) => {
  const { code } = req.query;
  const hostname = req.get('host');
  try {
    const token = await dropbox.auth.getAccessTokenFromCode(`https://${hostname}/api/course/auth`, code);

    // Optionally, store the access token securely for future use
    if (token.result.refresh_token) {
      dropbox.auth.setRefreshToken(token.result.refresh_token);
      return res.status(200).redirect(`https://${hostname}/new-note`);
    } else {
      // Handle the case where a refresh token is not available
      return res.status(401).send('Refresh token not available.');
    }
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).send('Error getting access token.');
  }
});

courseRoute.get('/code', async (req, res) => {
  if (!dropbox.auth.getAccessToken()) {
    const hostname = req.get('host');
    // If not authenticated, redirect to Dropbox authorization URL
    const authUrl = await dropbox.auth.getAuthenticationUrl(
      `https://${hostname}/api/course/auth`,
      null,
      'code',
      'offline',
      null,
      'none',
      false
    );
    return res.status(200).send(authUrl);
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

courseRoute.delete('/lecturenote/:id', isAuth, adminAuth, async (req, res) => {
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