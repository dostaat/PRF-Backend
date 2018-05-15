var config = require('../config.json');
var express = require('express');
var router = express.Router();
var questionsService = require('../services/questions.service');
 
// routes
router.get('/', getAll);
router.post('/create', create);
router.put('/:_id', update);
router.post('/one', getOne);
router.delete('/:_id', _delete);
 
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

function create(req,res) {
    questionsService.create(req.body)
        .then(function (questions) {
            res.send({"New questions" : req.body.name, "status": "created successfully"});
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    questionsService.update(req.params._id, req.body)
        .then(function (set) {
            res.json(set);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getByName(req, res) {
    questionsService.getByName(req.body.name)
        .then(function (questions) {
            res.json(questions);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    questionsService.delete(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
