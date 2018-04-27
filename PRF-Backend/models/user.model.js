var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var userSchema = new mongoose.Schema({
    email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  hash: {
    type: String
  },
  role: {
    type: String,
    enum: ['player', 'admin'],
    default: 'player',
  },
  score: {
    type: Number,
    default: 0,
    required: false,
  }
  /*password: {
    type: String
    //required: true,
  },*/
}, { collection: 'user' });

userSchema.methods.isAdmin = function(){
    return this.role === "admin";    
};


userSchema.methods.comparePassword = function(password, next) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        next(error, isMatch);
    });
};

var User = mongoose.model('user', userSchema);
module.exports = User;
