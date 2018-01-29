
// ====================================
// SETUP
// ====================================


const passport = require('passport');
const User = require('../../models/user');
const LocalStrategy = require('./localstrategy');

// ====================================
// SESSIONS
// ====================================


// If authentication succeeds, a session will be established and maintained via a cookie set in the 
// user's browser. Each subsequent request will not contain credentials, but rather the unique cookie that 
// identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances 
// instances to and from the session. In the following, only user ID is serialized to teh session, keeping the amount 
// of data stored within teh session small. When subsequent requests are recieved, this ID is used to find the user,
// which will be restored to req.user.

passport.serializeUser((user, done) => {
    done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
    User.findById(id, function (err, user) {
        done(err, user);
    })
})

// ====================================
// REGISTER STRATEGIES
// ====================================

passport.use('local-login', LocalStrategy.localLogin);
passport.use('local-register', LocalStrategy.localRegister);

module.exports = passport;