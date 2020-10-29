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

module.exports = app;