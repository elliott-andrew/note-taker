var express = require('express');
var indexRouter = require('./routes/index');
var notesRouter = require('./routes/notes');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('Listening on PORT: ' + PORT);
});

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('', indexRouter);
app.use('/notes', notesRouter);


module.exports = app;