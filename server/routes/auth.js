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

router.post('/register', passport.authenticate('local-register'), (req, res) => {
    console.log("here!");


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
