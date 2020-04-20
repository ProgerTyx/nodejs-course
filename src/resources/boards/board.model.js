const { Schema, model } = require('mongoose');

const boardSchema = new Schema({
  title: String,
  columns: [{ title: String, order: Number }]
});

module.exports = model('Board', boardSchema);
