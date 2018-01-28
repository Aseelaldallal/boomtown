
const User = require('../../models/user');
const LocalStrategy = require('passport-local').Strategy;


const strategy = new LocalStrategy(
    {
        usernameField: 'email', // by default, local strategy uses username and password, we will override with email
        passwordField: 'password',
    },
    function (email, password, done) {
        if (email) { email = email.toLowerCase(); } // Use lower-case e-mails to avoid case-sensitive e-mail matching
        User.findOne({ 'local.email': email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false, { message: 'Incorrect username' }); }
            if (!user.verifyPassword(password)) { return done(null, false, { message: 'Incorrect password' }); }
            return done(null, user);
        })
    });


module.exports = strategy;