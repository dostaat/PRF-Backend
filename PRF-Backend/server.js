var express = require('express');
var passport = require('passport');
var expressSession = require('express-session');
var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

var config = require('./config.json');
var cors = require('cors');
var expressJwt = require('express-jwt');
app.use(cors());

// Mongoose ODM...
var mongoose = require('mongoose');

require('./models/user.model');

var userModel = mongoose.model('user');

// Connect to MongoDB...
var dbUrl = config.connectionString;

app.set('dbUrl', dbUrl);
mongoose.connect(dbUrl,{useMongoClient: true});

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open');
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

//var user = new User({username: "Larry2", password: "asdasd"});
//user.save();

app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(cookieParser());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use('login', new LocalStrategy.Strategy(function(username, password, done) {
    userModel.findOne({ username: username }, function(err, temp_user) {
        console.log('searching for the login');
        console.log(temp_user);
        if (err) { return done(err); }
        if (!temp_user) { return done(null, false); }
        temp_user.comparePassword(password, function(err, isMatch) {
            if (err) return done(err);
            console.log(isMatch);
        });
        return done(null, temp_user);
    });
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
}).unless({ path: [
        '/users/authenticate',
        '/users/register',
        '/rest/user/greeting',
        '/rest/user/register',
        '/rest/user/login'
        ] 
}));

app.use(expressSession({ 
    secret: config.secret,
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/users', require('./controllers/users.controller'));
app.use('/rest/user', require('./routes/user.route')(passport, express.Router()));

app.listen(5000, function() {
    console.log('The server is running');
});
