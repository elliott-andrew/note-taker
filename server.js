// Dependencies
// ================================================================================
const express = require('express');
const fs = require('fs');
const path = require('path');
const util = require("util");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
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

// Generate IDs for notes
function noteID(currentNotes) {
  let highestId = 0;
  currentNotes.forEach(note => {
    if (note.id > highestId) {
      highestId = note.id;
    }
  });
  return highestId + 1;
};

// Post function
app.post("/api/notes", function (req, res) {
  // read the notes array file
  readFile(notesArray, "utf8").then(data => {
    // add the JSON parsed data to the variable notes
    let notes = JSON.parse(data);
    // Use the spread operator to add the submitted note to a new variable and assign it an ID we can later reference.
    const newNote = { ...req.body, "id": noteID(notes) };
    // add the new note to the notes variable.
    notes.push(newNote);
    // write the db file
    writeFile(notesArray, JSON.stringify(notes)).then(() => {
      res.json(newNote);
    })
      .catch((err) => {
        console.log(err);
      });
  })
    .catch((err) => {
      console.log(err);
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
    writeFile(notesArray, JSON.stringify(notes)).then(() => {
      res.send('Got a DELETE request at /user');
    })
      .catch((err) => {
        console.log(err);
      });
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