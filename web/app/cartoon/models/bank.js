var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Bank = new Schema({
  userId: {type:String},
  level:  {type:String},
  gold:   {type:String},
  silver: {type:String}
});
mongoose.model('Bank', Bank);