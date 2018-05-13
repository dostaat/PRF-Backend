var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  point:{
    type: Number,
    default: 0,
    required: false,
  },
  x_coordinate:{
    type: Number,
    default: 100,
    required: false,
  },
  y_coordinate: {
    type: Number,
    default: 50,
    required: false,
  },
}, { collection: 'city' });

citySchema.methods.getPoint = function(){
    return this.point;    
};

citySchema.methods.getX = function(){
  return this.x_cordinate;    
};
citySchema.methods.getY = function(){
  return this.y_cordinate;    
};
var City = mongoose.model('city', citySchema);
module.exports = City;
