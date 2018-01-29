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

// router.post('/register', passport.authenticate('local-register'), (err, req, res) => {
//     console.log("ERR: ", err);
//     console.log("here!");
//     console.log("REQ USER: ", req.user);
// });



router.post('/register',
    passport.authenticate('local-register', function (err, user, info) {
        if (err) {
            res.status(400).send(err);  // What type of error handling goes here?
        } else if (info) {
            res.send(info.message);
        } else {
            // Success
        }
    }), (req, res) => {
        // Nothing here
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
