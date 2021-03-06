// ===============================================
// SETUP
// ===============================================

var express = require('express'),
  Users = require('../models/user'),
  router = express.Router();

// ===============================================
// Index: Display All Users
// ===============================================

router.get('/', function(req, res) {
  Users.find({})
    .populate('itemsowned')
    .populate('itemsborrowed')
    .then(foundUsers => {
      res.send(foundUsers);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// ===============================================
// Show: Show specific user
// ===============================================

//Called in UserProfile
router.get('/:id', function(req, res) {
  Users.find({ _id: req.params.id })
    .then(foundUser => {
      res.send(foundUser);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// ===============================================
// Export
// ===============================================

module.exports = router;
