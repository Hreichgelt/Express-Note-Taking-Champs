// Utilizing example from class
const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
const reviews = require('./db/reviews');
const uuid = require('/helpers/uuid.js');
const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// need app.get for both html files? adding just in case
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
})






// event listener always at the bottom!~ Might as well create now
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });