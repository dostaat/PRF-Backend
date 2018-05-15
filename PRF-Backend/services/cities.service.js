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
