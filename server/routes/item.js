var express = require('express'),
  Item = require('../models/item'),
  router = express.Router();

router.get('/', function(req, res) {
  res.send('hello');
});

module.exports = router;
