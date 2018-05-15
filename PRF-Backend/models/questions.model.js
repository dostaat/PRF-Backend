var mongoose = require('mongoose');

var questionsSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  list : {
    type : Array,
    default : []
  },
}, { collection: 'questions' });

var Questions = mongoose.model('questions', questionsSchema);
module.exports = Questions;
