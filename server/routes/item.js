// ===============================================
// SETUP
// ===============================================

var express = require('express'),
  Items = require('../models/item'),
  router = express.Router();

// ===============================================
// Index: Display All Items
// ===============================================


router.get('/', function (req, res) {
  Items.find({}).then(foundItems => {
    res.send(foundItems);
  }).catch(err => {
    res.status(400).send(err);
  })
});



// ===============================================
// Export
// ===============================================

module.exports = router;
