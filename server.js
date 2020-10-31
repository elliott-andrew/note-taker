// =============================================================
// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');
const db = require('./db/db')

// Express
const app = express();

// dynamic port
const PORT = process.env.PORT || 3000;

// Engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('', indexRouter);
app.use('/notes', notesRouter);
app.use(express.static(path.join(__dirname, '/public')));
app.get("/api/notes", function (req, res) {
  return res.json(JSON.parse(fs.readFileSync(db)));
});
// =============================================================
// Note Taking
// Post function
// app.post("/api/notes", function (req, res) {

//   fs.appendFile("./db/db.json", "utf8")
// console.log("im running")
// fs.readFile(notesAll, "utf8").then(data => {
//   console.log(data)
//   console.log("me too")
//   // Array to hold the submitted note
//   let savedNotes = JSON.parse(data);
//   console.log(savedNotes);
//   // Add the newly submitted note to the notes array
//   let newNote = { ...req.body }
//   savedNotes.push(newNote)
//   // Assign the new note an index number
//   newNote.id = notesAll.indexOf(newNote);
//   // Update the database with the new note
//   fs.writeFile(notesAll, JSON.stringify(savedNotes)).then(() => {
//     res.json(newNote);
//   }).catch((err) => {
//     console.log(err);
//   });
// });
// });
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

app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});

module.exports = app;