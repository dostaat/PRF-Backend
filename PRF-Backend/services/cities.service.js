//ennek mintajara lehet csinalni a tobbi szervizeket...
//ket mongodb drivert probaltam ki, maradjunk a mongoose-nal. a mongoskin kuka...
var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var mongoose = require('mongoose');
var cityModel = mongoose.model('Cities');
 
var service = {};
 
service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
 
module.exports = service;
 
 
function getAll() {
    var deferred = Q.defer();
    console.log("I am about listing cities...");
    cityModel.find({}, function (err, cities) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        cities = _.map(cities, function (cities) {
            return _.omit(cities, 'hash');
        });
 
        deferred.resolve(cities);
    });
 
    return deferred.promise;
}
 
function getById(_id) {
    var deferred = Q.defer();
 
    citiesModel.findById(_id, function (err, cities) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (cities) {
            deferred.resolve(_.omit(cities, 'hash'));
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}
 
function create(citiesParam) {
    var deferred = Q.defer();
 
    // validation
    console.log(citiesParam.citiname);
    citiModel.findOne({ citiname: citiesParam.citiname },
        function (err, city) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            if (city) {
                // citiname already exists
                deferred.reject('citiname "' + citiesParam.citiname + '" is already taken');
            } else {
                createCity();
            }
        });
 
    function createCity() {
        
        var city = _.omit(cityParam, 'password');
  
        console.log(city);
        
        cityModel.create(
            city,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}
 
function update(_id, cityParam) {
    var deferred = Q.defer();
 
    // validation
    cityModel.findById(_id, function (err, city) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (city.cityname !== cityParam.cityname) {
            cityModel.findOne(
                { cityname:cityParam.cityname },
                function (err, city) {
                    if (err) deferred.reject(err.name + ': ' + err.message);
 
                    if (city) {
                        deferred.reject('cityname "' + req.body.cityname + '" is already taken')
                    } else {
                        updateCity();
                    }
                });
        } else {
            updateCity();
        }
    });
 
    function updateCity() {
        // fields to update
        var set = {
            point: cityParam.point,
        };
 
        if (cityParam.point) {
            set.hash = bcrypt.hashSync(cityParam.password, 10);
        }
 
        cityModel.update(
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
 
    cityModel.remove(
        { _id: mongoose.Types.ObjectId(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            deferred.resolve();
        });
 
    return deferred.promise;
}
