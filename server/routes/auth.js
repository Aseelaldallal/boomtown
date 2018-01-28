// ===============================================
// SETUP

// ===============================================
var express = require('express'),
    passport = require('../config/passport'), // index.js
    router = express.Router();


// ===============================================
// Register
// ===============================================

router.post('/register', (req, res) => {
    const { email, username, password } = req.body;
    console.log("Email: ", email);
    console.log("Username: ", username);
    console.log("Password: ", password);
    User.findOne({ 'local.email': email }).then(foundUser => {
        if (foundUser) {
            return res.json({ error: `Sorry, the email address ${email} already exists. Try signing in instead.` })
        }
        const newUser = new User({
            'local.username': username,
            'local.email': email,
            'local.password': password
        })
        return newUser.save();
    }).then(savedUser => {
        return res.json('Registered User: ', savedUser)
    }).
        catch((err) => {
            return res.json(err);
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
