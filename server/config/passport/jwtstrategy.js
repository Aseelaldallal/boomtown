const User = require('../../models/user');
const passportJWT = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'blooper';

// to access restricted routes
const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  console.log('payload recieved: ', jwt_payload);
  if (jwt_payload.email) {
    email = email.toLowerCase();
  } // Use lower-case e-mails to avoid case-sensitive e-mail matching
  User.findOne({ 'jwt.email': email }, function(err, user) {
    if (err) {
      next(err);
    }
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

module.exports = { strategy };
