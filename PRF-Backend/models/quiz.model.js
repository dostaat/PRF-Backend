var mongoose = require('mongoose');

var quizSchema = new mongoose.Schema({
  question: {
    type: String,
    unique: true,
    required: true
  },
  first_answer: {
    tpye: String,
  },
  second_answer: {
    tpye: String,
  },
  third_answer: {
    tpye: String,
  },
  fourth_answer: {
    tpye: String,
  },
  answer: {
    tpye: String,
  },
  level:{
    type: Number,
    default: 0,
  }
}, { collection: 'quiz' });

quizSchema.methods.getLevel = function(){
    return this.level;    
};

var Quiz = mongoose.model('quiz', quizSchema);
module.exports = Quiz;
