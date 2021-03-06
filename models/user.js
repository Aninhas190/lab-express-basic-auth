// User model goes here
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  passwordEncrypted: {
    type: String,
    required: true
  },
  name: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;