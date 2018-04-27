/****
EZ a fajl mar nincs is hasznalva. de azert megtartjuk mintanak
*/
var mongoose = require('mongoose');
var userModel = mongoose.model('user');

module.exports = function(passport, router) {

    router.post('/register', function(req, res, next) {        
        console.log(req.body);
        if (req.body.email &&
          req.body.username &&
          req.body.password ) {

          var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
          }

          //use schema.create to insert data into the db
          userModel.create(userData, function (error, user) {
            if (error) {
              return res.status(500).send(err);//next(err)
            } else {
              return res.status(200).send(JSON.stringify(
                    {result: 'Registration success'})
                );
              //return res.redirect('/profile');
            }
          });
        }
    });
    
 // GET route after registering
    router.get('/profile', function (req, res, next) {
        if(req.isAuthenticated()){
            return res.json({ user: req.user.username,  email: req.user.email });
        } else {
            return res.status(500).send(JSON.stringify(
                            {result: 'Login requested!'}));
        }
    });

    router.post('/login', function(req, res, next) {
        passport.authenticate('login', function(error, user) {
            if (error) {
                res.status(500).send('ERROR');
            } else {
                req.logIn(user, function(error) {
                    if (error) {
                        return res.status(500).send(JSON.stringify(
                            {result: 'Request login failed '+error})
                        );
                    } else {
                        if (user.isAdmin()){
                            return res.status(200).send(JSON.stringify(
                                {result: 'Welcome Admin'}));
                        } else {
                            return res.status(200).send(JSON.stringify(
                                {result: 'You are free to pass'}));
                        }
                      }
                    
                });
            }
        })(req, res, next);
    });

    router.post('/logout', function(req, res, next) {
        if (req.isAuthenticated()) {
            req.logout();
            res.status(200).send(JSON.stringify({result: 'Logout successful'}));
        } else {
            res.status(500).send(JSON.stringify({result: 'You have no right'}));
        }
    });

    router.get('/greeting', function(req, res, next) {
        if (req.isAuthenticated()) {
            return res.status(200).send(JSON.stringify({result: 'hello!'}));
        } else {
            return res.status(500).send(JSON.stringify({result: 'stop that'}));
        }
    });

    return router;
}

