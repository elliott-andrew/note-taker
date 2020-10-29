// =============================================================
// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');

// Express
const app = express();

// Array to hold notes
const notesAll = require('./db/db.json')

// dynamic port
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});

// Engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('', indexRouter);
app.use('/notes', notesRouter);
app.use(express.static(path.join(__dirname, '/public')));
app.get("/api/notes", function (req, res) {
  return res.json(JSON.parse(fs.readFileSync("./db/db.json")));
});
// =============================================================
// Note Taking
// Post function
app.post("/notes", function (req, res) {
  // Array to hold the submitted note
  let newNote = req.body;
  console.log(newNote);
  // Add the newly submitted note to the notes array
  notesAll.push(newNote);
  // Assign the new note an index number
  newNote.id = notesAll.indexOf(newNote);
  // Update the database with the new note
  fs.writeFileSync("./db/db.json", JSON.stringify(newNote));
  res.json(newNote);
});

module.exports = app;