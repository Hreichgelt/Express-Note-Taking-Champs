// Utilizing example from class
const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;
const notes = require("./db/db.json");
const uuid = require("./helpers/uuid.js");
const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// need app.get for both html files? adding just in case
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received for notes`);
  res.json(notes);
});

// posting notes to database
app.post("/api/notes", (req, res) => {
  // readFromFile(database).then(data)
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    notes.push(newNote);
    const noteString = JSON.stringify(notes, null, 2);
    // follow lesson 19
    fs.writeFile('./db/db.json', noteString, (err) =>
      err
        ? console.error(err)
        : console.log(`Note for ${newNote.title} has been written to JSON file`)
    );
    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting note");
  }
});

// event listener always at the bottom!~ Might as well create now
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
