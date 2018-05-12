var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var citySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  point: {
    type: number
  },
  x_cordinate: {
    type: number
  },
  y_cordinate: {
    type: number
  },
}, { collection: 'city' });

citySchema.methods.getPoint = function(){
    return this.point;    
};


var City = mongoose.model('city', citySchema);
module.exports = City;
