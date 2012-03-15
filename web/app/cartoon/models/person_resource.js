var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Material = new Schema({
  name:{type:String},
  res:{type:String}
});

var Cloud = new Schema({
  userId: {type:String},
  cloudType: {type:String},
  cloudUserName: {type:String},
  cloudPassword: {type:String},
  material: [Material]
});

mongoose.model('PersonResource', Cloud);