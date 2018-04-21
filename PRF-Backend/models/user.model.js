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
  password: {
    type: String,
    required: true,
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
}, { collection: 'user' });

userSchema.methods.isAdmin = function(){
    return this.role === "admin";    
};

//hashing a password before saving it to the database
//we assume that password==passwordConf has been compared in the frontEnd
userSchema.pre('save', function (next) { 
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});


userSchema.methods.comparePassword = function(password, next) {
    bcrypt.compare(password, this.password, function(error, isMatch) {
        next(error, isMatch);
    });
};

var User = mongoose.model('user', userSchema);
module.exports = User;
