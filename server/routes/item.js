// ===============================================
// SETUP
// ===============================================

var express = require('express'),
  Item = require('../models/item'),
  passport = require('../config/passport/');
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

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send('Congrats, you can only see this route if authenticated!');
  }
);

// ===============================================
// Export
// ===============================================

module.exports = router;
