/********
A ki kommentelt fuggosegek eltavolithatoak a package.json-bol
 hiszen nem hasznaljuk oket... el is tavolitom...
*/

var express = require('express');
//var passport = require('passport');
var expressSession = require('express-session');
//var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var app = express();
require('./models/user.model');
require('./models/cities.model');
require('./models/quiz.model');
require('./models/questions.model');
var questionsService = require('./services/questions.service');

var config = require('./config.json');
var cors = require('cors');
var expressJwt = require('express-jwt');
app.use(cors());

// Mongoose ODM...
var mongoose = require('mongoose');

// Connect to MongoDB...
var dbUrl = config.connectionString;

app.set('dbUrl', dbUrl);
mongoose.connect(dbUrl,{useMongoClient: true});

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open');
    if (process.env.DEBUG_QUIZ) {
        console.log('I am about to export quizes');        

        var questionsModel = mongoose.model('questions');        
        questionsService.getAll()
        .then(function (list) {
            console.log("Todo: here it is not called");
        })
        .catch(function (err) {
            console.log(err)
        });
        process.exit(0);//this one stops everything
    }         
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});


app.use(bodyParser.urlencoded({ 'extended': false }));
app.use(bodyParser.json());

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
        '/cities/getClosest',
        '/cities',
        '/cities/getByName',        
        '/quiz',
        '/quiz/random'
        //ide kell meg bemasolni azokat az eleresi utakat, amikhez nem kell bejelentkezni        
        ] 
}));

app.use(expressSession({ 
    secret: config.secret,
    resave: true,
    saveUninitialized: false
}));

app.use('/users', require('./controllers/users.controller'));

app.use('/cities', require('./controllers/cities.controller'));

app.use('/quiz', require('./controllers/quiz.controller'));

app.use('/questions', require('./controllers/questions.controller'));

if (process.env.DEBUG_QUIZ) {
    console.log("Now we are in Debug option");    
} else {
    app.listen(5000, function() {
        console.log('The server is running');
    });    
}
