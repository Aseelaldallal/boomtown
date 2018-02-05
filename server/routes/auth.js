// ===============================================
// SETUP

// ===============================================
const express = require('express');
const passport = require('../config/passport'); // index.js
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');

// ===============================================
// Register
// ===============================================

// process the signup form
// router.post('/register', passport.authenticate('local-register', ()), function (req, res) {
//     // Success
//     res.send(req.user);
// });

// router.post('/register', function(req, res, next) {
//   passport.authenticate('local-register', function(err, user, info) {
//     if (err) {
//       res.status(500).send(err);
//     } else if (info) {
//       res.status(400).json(info);
//     } else {
//       req.logIn(user, function(err) {
//         if (err) {
//           res.status(500).json(err);
//         } else {
//           res.json(req.user);
//         }
//       });
//     }
//   })(req, res, next);
// });


router.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "You must fill all form fields" });
  } else {
    console.log("Body:", req.body);
    User.findOne({ 'jwt.email': req.body.email }, (err, foundUser) => {
      if (err) {
        console.log("Err 1");
        res.status(400).json({ message: err.message });
      } else if (foundUser) {
        console.log("err 2");
        res.status(400).json({ message: `${req.body.email} account already exists` });
      } else {
        console.log("Creting new user");
        const newUser = new User({});
        newUser.jwt.email = req.body.email;
        newUser.jwt.password = newUser.generateHash(req.body.password);
        newUser.fullname = req.body.fullname;
        newUser.bio = req.body.bio;
        newUser.save().then((savedUser) => {
          console.log("Saving");
          let payload = { id: savedUser._id };
          let token = jwt.sign(payload, 'blooper');
          res.status(200).json({ message: "ok", id: savedUser._id, token: token });
        }).catch(err => res.status(400).send({ message: err.message }));
      }
    })
  }

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
