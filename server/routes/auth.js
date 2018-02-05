// ===============================================
// SETUP

// ===============================================
const express = require('express'),
  passport = require('../config/passport'), // index.js
  User = require('../models/user');
router = express.Router();
// ===============================================
// Register
// ===============================================

// process the signup form
// router.post('/register', passport.authenticate('local-register', ()), function (req, res) {
//     // Success
//     res.send(req.user);
// });

router.post('/register', function(req, res, next) {
  passport.authenticate('local-register', function(err, user, info) {
    if (err) {
      res.status(500).send(err);
    } else if (info) {
      res.status(400).json(info);
    } else {
      req.logIn(user, function(err) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.json(req.user);
        }
      });
    }
  })(req, res, next);
});

// ===============================================
// Login
// ===============================================

// router.post('/login', passport.authenticate('local', (err, req, res) => {
//     console.log('[Login Post Route]');
//     console.log(req.user);
//     console.log('Req: ', req);
// }));

// ===============================================
// Logout
// ===============================================

// router.get('/logout', (req, res) => {
//     res.send('logout');
// });

// ===============================================
// Export
// ===============================================

module.exports = router;
