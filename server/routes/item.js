// ===============================================
// SETUP
// ===============================================

var express = require('express'),
  Item = require('../models/item'),
  router = express.Router();

// ===============================================
// Index: Display All Items
// ===============================================

router.get('/', function(req, res) {
  Item.find({})
    .populate('itemowner')
    .then(foundItems => {
      res.status(200).send(foundItems);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// ===============================================
// Create: Add Item
// ===============================================

router.post('/', (req, res) => {
  const item = new Item(req.body);
  item
    .save()
    .then(newItem => {
      res.send(newItem); // REPLACE THIS
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// ===============================================
// Update: Update Item - Borrower, Available
// ===============================================

// ===============================================
// Export
// ===============================================

module.exports = router;
