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
  passwordConf: {
    type: String,
    required: true,
  }
}, { collection: 'user' });

/*userSchema.pre('save', function(next) {

    var user = this;

    if (user.isModified('password') && user.isModified('passwordConf') ) {
        bcrypt.genSalt(10, function(error, salt) {

            if (error) {
                return next(error);
            }

            bcrypt.hash(user.password, salt, function(error, hash) {

                if (error) {
                    return next(error);
                }

                user.password = hash;
                //next();
            });
            
            bcrypt.hash(user.passwordConf, salt, function(error, hash) {

                if (error) {
                    return next(error);
                }

                user.passwordConf = hash;
                next();
            });
        });
    } else {
        return next();
    }

});*/

//hashing a password before saving it to the database
userSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
  })
  bcrypt.hash(user.passwordConf, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    user.passwordConf = hash;
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
