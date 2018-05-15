var config = require('../config.json');
var express = require('express');
var router = express.Router();
var cityService = require('../services/cities.service');
 
// routes
router.get('/', getAll);
router.post('/', create);
router.put('/', update);
router.post('/getByName', getByName);
router.post('/getClosest',getClosest);
 
module.exports = router;

 
function getAll(req, res) {
    cityService.getAll()
        .then(function (cities) {
            res.send(cities);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function create(req,res) {
    cityService.create(req.body)
        .then(function (cities) {
            res.send({"newCityName" : req.body.name, "status": "created successfully"});
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function update(req, res) {
    console.log("I am about updating city " + req.body.name)
    cityService.update(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getByName(req, res) {
    console.log("I am about getting city " + req.body)
    cityService.getByName(req.body.name)
        .then(function (cities) {
            res.json(cities);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getClosest(req,res) {
    console.log("Request arrived to server" + req.body);
    cityService.getClosest(req.body.x_coord,req.body.y_coord)
    .then(function (nearbyCities) {
        res.send(nearbyCities)        
    })
    .catch(function (err) {
        res.status(400).send(err);
    });

}
