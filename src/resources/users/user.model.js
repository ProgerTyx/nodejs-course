const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: String,
  login: String,
  password: String
});

module.exports = model('User', userSchema);
