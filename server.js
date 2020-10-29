const express = require('express');
const app = express();

const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');

const path = require('path');

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('', indexRouter);
app.use('/notes', notesRouter);


module.exports = app;