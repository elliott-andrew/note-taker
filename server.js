// =============================================================
// Dependencies
const express = require('express');
const fs = require('fs');
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

// =============================================================
// Note Taking
// Post function
// Array to hold the submitted note
// Add the newly submitted note to the notes array
// Assign the new note an index number
// Update the database with the new note

// Delete function
// Pull the id number of the note to be deleted
// Find the id number in the notes array
// Remove the id nnumber in the notes array
// Update the notes array

module.exports = app;