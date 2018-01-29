
const User = require('../../models/user');
const LocalStrategy = require('passport-local').Strategy;


const localLogin = new LocalStrategy(
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

const localRegister = new LocalStrategy(
    {
        usernameField: 'email', // by default, local strategy uses username and password, we will override with email
        passwordField: 'password',
        passReqToCallback: true
    },
    function (req, email, password, done) {
        //console.log("REQUEST: ", req);
        console.log("[localRegister]");
        if (email) { email = email.toLowerCase(); } // Use lower-case e-mails to avoid case-sensitive e-mail matching
        User.findOne({ 'local.email': email }, function (err, user) {
            if (err) { return done(err); }
            if (user) {
                console.log('user exists');
                return done(null, false, { message: `${email} is already registered` });
            } else {
                var newUser = new User({});
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.fullname = req.body.fullname;
                newUser.bio = req.body.bio;
                newUser.save().then((savedUser) => {
                    console.log(`[DB Save] Saved ${savedUser} to db`);
                    return done(null, savedUser);
                }).catch(err => console.log(err));
            }

        })
    });


module.exports = { localLogin, localRegister };