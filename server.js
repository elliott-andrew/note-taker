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
app.use(express.static(path.join(__dirname, '/public')));

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

// Note Taking
// ================================================================================
// Get function
app.get("/api/notes", function (req, res) {
  readFile(notesArray, "utf8").then(data => res.json(JSON.parse(data))).catch((err) => {
    console.log(err);
  });
});
// Post function
app.post("/api/notes", function (req, res) {
  readFile(notesArray, "utf8").then(data => {
    let notes = JSON.parse(data);
    const newNote = { ...req.body };
    notes.push(newNote);
    writeFile(noteArray, JSON.stringify(notes)).then(() => {
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
// // Delete function
// app.delete("api/notes/:id", function (req, res) {
//   // Pull the id number of the note to be deleted
//   let index = parseInt(req.params.id);
//   // Find the id number in the notes array
//   function removedNote() {
//     if (index > -1) {
//       // Remove the id nnumber in the notes array
//       notesAll.splice(index, 1);
//     }
//     return notesAll;
//   }
//   // Update the notes array
//   fs.writeFileSync("./db/db.json", JSON.stringify(removedNote));
// });

// Listener
// ================================================================================
app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});

// Export
module.exports = app;