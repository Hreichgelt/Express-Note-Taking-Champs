// Utilizing example from class
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const database = require("./db/db.json");
const uuid = require('./helpers/uuid.js');



const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// need app.get for both html files? adding just in case
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// GET Route for retrieving all the tips - might need something like this for |||||| also could use readandappend
// app.get('/api/tips', (req, res) => {
//     console.info(`${req.method} request received for tips`);
//     readFromFile('./db/tips.json').then((data) => res.json(JSON.parse(data)));
//   });


// need to writefile? writefilesync?

app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received to get note`);
    return res.json(database);
});

// posting notes to database
app.post(database, (req, res) => {
    console.info(`${req.method} request received to add note`)

// look at activity 21 read and append!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const {title, text} = req.body; 

    if (title && text) {
       const newNote = {
          title,
          text, 
          id: uuid(),
        };

const noteString = JSON.stringify(newNote, null, 2);
    // follow lesson 19
    fs.writeFile(`./db/${newNote.response}.json`, noteString, (err) => 
    err
        ? console.error(err)
        : console.log(
            `Note for ${newNote.title} has been written to JSON file`
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