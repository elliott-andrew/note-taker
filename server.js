// Dependencies
// ================================================================================
const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFileSync = util.promisify(fs.writeFileSync);
const notesArray = path.join(__dirname, 'db/db.json');

// Express
const app = express();

// Dynamic port
const PORT = process.env.PORT || 3000;

// Engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Note Taking
// ================================================================================
// Get function
app.get("/api/notes", function (req, res) {
  // Read the notes array then parse the JSON data
  readFile(notesArray, "utf8").then(data => res.json(JSON.parse(data))).catch((err) => {
    console.log(err);
  });
});


// Post function
app.post("/api/notes", function (req, res) {
  // read the notes array file
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  // Use spread operator to grab the data
  const newNote = { ...req.body };
  // Add the new note to the notes array
  notes.push(newNote);
  // Assign the new note an index number
  newNote.id = notes.indexOf(newNote);
  // Update the db.json file
  writeFileSync('./db/db.json', JSON.stringify(notes, null, 2)).then(() => {
    res.JSON(notesArray)
  });
});

// Delete function
app.delete("/api/notes/:id", function (req, res) {
  // Grab the ID of the note clicked
  const deletedNote = parseInt(req.params.id);
  readFile(notesArray, "utf8").then(data => {
    let notes = JSON.parse(data);
    // filter the notes and find the ID of the selected note, send the request
    notes = notes.filter(newNote => newNote.id !== deletedNote);
    writeFileSync(notesArray, JSON.stringify(notes))
  })
    .catch((err) => {
      console.log(err);
    });
});

// Routes
// ================================================================================
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Listener
// ================================================================================
app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});