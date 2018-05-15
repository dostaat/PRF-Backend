var config = require('../config.json');
var express = require('express');
var router = express.Router();
var questionsService = require('../services/questions.service');
 
// routes
router.get('/', getAll);
router.post('/one', getOne);
 
module.exports = router;

 
function getAll(req, res) {
    questionsService.getAll()
        .then(function (list) {
            res.send(list);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getOne(req, res) {
    questionsService.getOneList(req.body.id)
        .then(function (one) {
            res.json(one);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}