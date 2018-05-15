//ennek mintajara lehet csinalni a tobbi szervizeket...
//ket mongodb drivert probaltam ki, maradjunk a mongoose-nal. a mongoskin kuka...
var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var mongoose = require('mongoose');
var cityModel = mongoose.model('city');
 
var service = {};
 
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;
service.getClosest = getClosest;
service.getByName = getByName;
 
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
            deferred.resolve(cities);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function getByName(cityname) {
    var deferred = Q.defer();
 
    console.log("Trying to fetch city "+ cityname +" from db");
    cityModel.findOne({ name: cityname },
        function (err, cities) {
        console.log(cities);
        console.log(err);
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        if (cities) {
            deferred.resolve(cities);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function create(citiesParam) {
    var deferred = Q.defer();
 
    // validation
    console.log(citiesParam.name);
    cityModel.findOne({ name: citiesParam.name },
        function (err, city) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            if (city) {
                // citiname already exists
                deferred.reject('citiname "' + citiesParam.name + '" is already taken');
            } else {
                createCity(citiesParam);
            }
        });
 
    function createCity(cityParam) {        
  
        console.log(cityParam);
        
        cityModel.create(
            cityParam,
            function (err, doc) {
                if (err) {
                    console.log("Error in creation")
                    deferred.reject(err.name + ': ' + err.message);
                }
 
                deferred.resolve();
            });
    }
 
    return deferred.promise;
}
 
function update(cityParam) {
    var deferred = Q.defer();
 
    // validation    
    cityModel.findOne(
        { name:cityParam.name },
        function (err, city) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            
            if (city) {
                updateCity(city._id);
            } else {
                deferred.reject('Cityname "' + req.body.name + '" is not found')
            }
                
        }       
    );
 
    function updateCity(_id) {
        // fields to update
        var set = {
            point: cityParam.point,
        };         
 
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

function getClosest(coordX, coordY) {
    var deferred = Q.defer();
    
    cityModel.find({}, function (err, cities) {
        if (err) deferred.reject(err.name + ': ' + err.message);
 
        cities = _.map(cities, function (cities) {
            return _.omit(cities, 'hash');
        });
    
        //console.log("coords" + coordX + " " +coordY);                        
        cities.sort( function(a,b) {
            function dist(p,qy,qx) {
          //      console.log("px: " + p.x_coordinate +" py: " + p.y_coordinate);
          //      console.log("Calculations:");
          //      console.log(p.x_coordinate); console.log(qx);console.log("==="); console.log(p.x_coordinate-qx);
          //      console.log(Math.pow((p.x_coordinate-qx),2));
                return Math.sqrt(Math.pow((p.x_coordinate-qx),2)+Math.pow((p.y_coordinate-qy),2));
            }
          //  console.log("compare" + a + b);
          //  console.log("distances are: " + dist(a,coordX,coordY) + "***\n****" + dist(b,coordX,coordY));
            if (dist(a,coordX,coordY) > dist(b,coordX,coordY)) {
                return 1;
            } else {
                return 0;
            }
        });

        //console.log(cities);
 
        deferred.resolve(cities);
    });
    
    return deferred.promise;
}
