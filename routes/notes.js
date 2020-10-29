var express = require('express');
var router = express.Router();

/* GET notes listing. */
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/notes.html');
});

module.exports = router;
