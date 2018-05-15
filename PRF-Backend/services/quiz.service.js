//ennek mintajara lehet csinalni a tobbi szervizeket...
//ket mongodb drivert probaltam ki, maradjunk a mongoose-nal. a mongoskin kuka...
var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var mongoose = require('mongoose');
var quizModel = mongoose.model('quiz');
 
var service = {};
 
service.getAll = getAll;
service.getRandomQuestion = getRandomQuestion;
service.getOne = getOne;
 
module.exports = service;
 
function getAll() {
    var deferred = Q.defer();
    console.log("I am about listing questions...");
    quizModel.find({}, function (err, questions) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        questions = _.map(questions, function (questions) {
            return _.omit(questions, 'hash');
        });
 
        deferred.resolve(questions);
    });
 
    return deferred.promise;
}

function getRandomQuestion() {
    var deferred = Q.defer();
    quizModel.find({}, function (err, questions) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        questions = _.map(questions, function (questions) {
            return _.omit(questions, 'hash');
        });

        var index = Math.floor(Math.random() * questions.length) + 0;
 
        deferred.resolve(questions[index]);
    });
 
    return deferred.promise;
}

function getOne(_id) {
    var deferred = Q.defer();

    quizModel.findById(_id, function (err, quiz) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (quiz) {
            deferred.resolve(quiz);
        } else {
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}