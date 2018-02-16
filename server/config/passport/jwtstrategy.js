const User = require('../../models/user');
const passportJWT = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'blooper';

// to access restricted routes
const strategy = new JwtStrategy(jwtOptions, (jwt_payload, next) => {
  User.findOne({ _id: jwt_payload.id }, function(err, user) {
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
