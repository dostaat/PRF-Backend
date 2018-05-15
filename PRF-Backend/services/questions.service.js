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
service.create = create;
service.update = update;
service.delete = _delete;
service.getByName = getByName;
 
module.exports = service;
 
function getAll() {
    var deferred = Q.defer();
    console.log("I am about listing question lists...");
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

function create(params) {
    var deferred = Q.defer();
 
    // validation
    console.log(params.name);
    questionsModel.findOne({ name: params.name },
        function (err, questions) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            if (questions) {
                // citiname already exists
                deferred.reject('Questions name "' + params.name + '" is already taken');
            } else {
                createQuestions(params);
            }
        });
 
    function createQuestions(params) {        
  
        //console.log(cityParam);
        
        questionsModel.create(
            params,
            function (err, doc) {
                if (err) {
                    console.log("Error in creation questions")
                    deferred.reject(err.name + ': ' + err.message);
                }
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}

function update(params) {
    var deferred = Q.defer();
 
    // validation    
    questionsModel.findOne(
        { name: params.name },
        function (err, questions) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            
            if (questions) {
                updateQuestions(questions._id);
            } else {
                deferred.reject('Questions name "' + req.body.name + '" is not found')
            }
                
        }       
    );
 
    function updateQuestions(_id) {
        // fields to update
        var set = {
            name: params.name,
            list: params.list,
        };         
 
        questionsModel.update(
            { _id: mongoose.Types.ObjectId(_id) },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();
 
    questionsModel.remove(
        { _id: mongoose.Types.ObjectId(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            deferred.resolve();
        });
 
    return deferred.promise;
}

function getByName(questionsName) {
    var deferred = Q.defer();
 
    console.log("Trying to fetch questions "+ questionsName +" from db");
    questionsModel.findOne({ name: questionsName },
        function (err, questions) {
        console.log(questions);
        console.log(err);
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (questions) {
            deferred.resolve(questions);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

