// ===============================================
// SETUP
// ===============================================

const express = require('express');
const passport = require('../config/passport'); // index.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const middleware = require('../middleware');

const jwt_secretOrKey = 'blooper';

// ===============================================
// Register
// ===============================================

router.post(
  '/register',
  middleware.sanitizeUserInput,
  middleware.validateRegisterationForm,
  (req, res) => {
    User.findOne({ 'jwt.email': req.body.email }, (err, foundUser) => {
      if (err) {
        res.status(400).json({ messages: [err.message] });
      } else if (foundUser) {
        res
          .status(400)
          .json({ messages: [`${req.body.email} account already exists`] });
      } else {
        const newUser = new User({});
        newUser.jwt.email = req.body.email;
        newUser.jwt.password = newUser.generateHash(req.body.password);
        newUser.fullname = req.body.fullname;
        newUser.bio = req.body.bio;
        newUser
          .save()
          .then(savedUser => {
            let payload = { id: savedUser._id };
            let token = jwt.sign(payload, jwt_secretOrKey, { expiresIn: '1h' });
            let expiry = 3600; // 1hr
            res
              .status(200)
              .json({ id: savedUser._id, token: token, expiry: expiry });
          })
          .catch(err => {
            res.status(400).json({ messages: [err.message] });
          });
      }
    });
  }
);

// ===============================================
// Login
// ===============================================

router.post(
  '/login',
  middleware.sanitizeUserInput,
  middleware.validateRegisterationForm,
  (req, res) => {
    // Backend Validation
    User.findOne({ 'jwt.email': req.body.email })
      .then(foundUser => {
        if (!foundUser) {
          res
            .status(401)
            .json({ messages: [`${req.body.email} is not registered`] });
        } else if (foundUser.validPassword(req.body.password)) {
          let token = jwt.sign({ id: foundUser._id }, jwt_secretOrKey, {
            expiresIn: '1h'
          });
          let expiry = 3600; // 1hr
          res
            .status(200)
            .json({ id: foundUser._id, token: token, expiry: expiry });
        } else {
          res.status(401).json({ messages: ['Incorrect Password'] });
        }
      })
      .catch(err => {
        res.status(401).json({ messages: ['Woops, something went wrong'] });
      });
  }
);

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
