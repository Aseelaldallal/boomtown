// ===============================================
// SETUP
// ===============================================

const express = require('express');
const passport = require('../config/passport'); // index.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const middleware = require("../middleware");

// ===============================================
// Register
// ===============================================

router.post('/register', middleware.sanitizeUserInput, middleware.validateRegisterationForm, (req, res) => {
  User.findOne({ 'jwt.email': req.body.email }, (err, foundUser) => {
    if (err) {
      console.log("Fail Case 1");
      res.status(400).json({ messages: [err.message] });
    } else if (foundUser) {
      console.log("Fail Case 2");
      res.status(400).json({ messages: [`${req.body.email} account already exists`] });
    } else {
      const newUser = new User({});
      newUser.jwt.email = req.body.email;
      newUser.jwt.password = newUser.generateHash(req.body.password);
      newUser.fullname = req.body.fullname;
      newUser.bio = req.body.bio;
      newUser.save().then((savedUser) => {
        let payload = { id: savedUser._id };
        let token = jwt.sign(payload, 'blooper');
        let expiry = 3600;
        res.status(200).json({ id: savedUser._id, token: token, expiry: expiry });
      }).catch(err => {
        console.log("Fail Case 3");
        res.status(400).send({ messages: [err.message] })
      });
    }
  })
})

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
