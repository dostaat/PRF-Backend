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
  x_cordinate:{
    type: Number,
    default: 0,
    required: false,
  },
  y_cordinate: {
    type: Number,
    default: 0,
    required: false,
  },
}, { collection: 'city' });

citySchema.methods.getPoint = function(){
    return this.point;    
};

var City = mongoose.model('city', citySchema);
module.exports = City;
