var express = require('express');
var router = express.Router();

/* GET trade listing. */
router.get('/', function(req, res, next) {
  res.send('trade');
});

module.exports = router;
