var mongoose = require('mongoose');
var userModel = mongoose.model('user');

module.exports = function(passport, router) {

    router.post('/register', function(req, res, next) {
        var username = req.body.username;
        var password = req.body.password;
        console.log(req.body);
        if (!username || !password) {
            return res.status(500).send('Username and password is required.');
        } else {
            var user = new userModel({ username: username, password: password });
            user.save(function(error) {
                if (error) {
                    return res.status(500).send(error);
                }
                return res.status(200).send('Registration success');
            });
        }
    });

    router.post('/login', function(req, res, next) {
        passport.authenticate('login', function(error, user) {
            if (error) {
                res.status(500).send('ERROR');
            } else {
                req.logIn(user, function(error) {
                    if (error) {
                        return res.status(500).send('Request login failed');
                    } else {
                        return res.status(200).send('You are free to pass');
                    }
                });
            }
        })(req, res, next);
    });

    router.post('/logout', function(req, res, next) {
        if (req.isAuthenticated()) {
            req.logout();
            res.status(200).send('Logout successful');
        } else {
            res.status(500).send('You have no right');
        }
    });

    router.get('/greeting', function(req, res, next) {
        if (req.isAuthenticated()) {
            return res.status(200).send('hello!');
        } else {
            return res.status(500).send('stop that');
        }
    });

    return router;
}