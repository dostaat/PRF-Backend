//ennek mintajara lehet csinalni a tobbi szervizeket...
//ket mongodb drivert probaltam ki, maradjunk a mongoose-nal. a mongoskin kuka...
var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var mongoose = require('mongoose');
var questionsModel = mongoose.model('questions');
 
var service = {};
 
service.getAll = getAll;
service.getOneList = getOneList;
 
module.exports = service;
 
function getAll() {
    var deferred = Q.defer();
    console.log("I am about listing question list...");
    questionsModel.find({}, function (err, list) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        list = _.map(list, function (list) {
            return list;
        });
 
        deferred.resolve(list);
    });
 
    return deferred.promise;
}

function getOneList(_id) {
    var deferred = Q.defer();

    questionsModel.findById(_id, function (err, list) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (list) {
            deferred.resolve(list);
        } else {
            deferred.resolve();
        }
    });
 
    return deferred.promise;
}

