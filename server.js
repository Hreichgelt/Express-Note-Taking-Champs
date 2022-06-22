// Utilizing example from class
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
// const notes = require('./db/notes'); this doesnt exist?
const database = require("./db/db.json");
const uuid = require('/helpers/uuid.js');
const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// need app.get for both html files? adding just in case
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});


// need to writefile? writefilesync?

app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received to get note`);
    return res.json(database);
});

// posting notes to database
app.post(database, (req, res) => {
    console.info(`${req.method} request received to add note`)

    const {title, note, due} = req.body; 

    if (title && note && duedate) {
       const newNote = {
          title,
          note, 
          duedate,
          note_id: uuid(),
        };

const noteString = JSON.stringify(newNote, null, 2);
    // follow lesson 19
    fs.writeFile(`./db/${newNote.response}.json`, noteString, (err) => 
    err
        ? console.error(err)
        : console.log(
            `Note for ${newNote.response} has been written to JSON file`
        )
);
    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
} else {
    res.status(500).json('Error in posting note');
}
});

// event listener always at the bottom!~ Might as well create now
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });