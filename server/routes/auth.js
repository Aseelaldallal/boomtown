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

router.post('/register', (req, res) => {
    const { email, password } = req.body;
    console.log("REACHED SERVER!");
    console.log("Email: ", email);
    console.log("Password: ", password);
    User.findOne({ 'local.email': email }).then(foundUser => {
        if (foundUser) {
            res.send(`${email} already exists. Try signing in instead.`);
        } else {
            const newUser = new User({
                'local.email': email,
                'local.password': password
            })
            return newUser.save();
        }
    }).then(savedUser => {
        console.log("SAVED USER: ", savedUser);
        res.send('Registered User');
    }).catch((err) => {
        res.send(err);
    });


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
