const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  local: {
    username: String,
    email: String,
    password: String
  },
  email: {
    type: String
  },
  fullname: {
    type: String
  },
  bio: {
    type: String
  }
});

module.exports = mongoose.model('user', UserSchema);
