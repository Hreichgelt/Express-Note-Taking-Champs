// Utilizing example from class
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
// const notes = require('./db/notes'); this doesnt exist?
const database = require("./db/db");
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

// db.json needs to store the notes? - if yes - how? app.what?
// where do routes come in?
// need to writefile? writefilesync?

app.get("/api/notes", (req, res) => {
    console.info(`${req.method} request received to get note`);
    return res.json(database);
});

app.post('/db/db.json', (req, res) => {
    console.info(`${req.method} request received to add note`)
    let newNote = req.body; 

    if (req.body && req.body.product) {
        response = {
            status: 'success', 
            data: req.body,
        };
        notes.push({
            ...req.body,
            note_id: uuid(),
        });
        res.json(`Note for ${response.data.product} has been added!`);
    } else {
        res.json('Request body must at leaset contain a review')
    }

    console.log(req.body);
});

// event listener always at the bottom!~ Might as well create now
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });