var config = require('../config.json');
var express = require('express');
var router = express.Router();
var cityService = require('../services/cities.service');
 
// routes
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/:_id', update);
 
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
 
function getCurrent(req, res) {
    cityService.getById(req.cities.sub)
        .then(function (cities) {
            if (cities) {
                res.send(cities);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
 
function update(req, res) {
    cityService.update(req.params._id, req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
