const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new mongoose.Schema({
  jwt: {
    email: String,
    password: String
  },
  fullname: String,
  bio: String,
  itemsowned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item',
      required: true
    }
  ]
});

// generating a hash
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.jwt.password);
};

// Lowercase emails before saving to db
UserSchema.pre('save', function(next) {
  this.jwt.email = this.jwt.email.toLowerCase();
  next();
});

module.exports = mongoose.model('user', UserSchema);
