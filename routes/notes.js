const express = require('express');
const router = express.Router();

/* GET notes listing. */
router.get('*', function (req, res) {
  res.sendFile(__dirname + '/notes.html');
});

module.exports = router;
