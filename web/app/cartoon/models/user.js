var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name:     {type:String},
  password: {type:String},
  salt :    {type:String},
  desc:     {type:String},
  avatar:   {type:String},
  reg_date:  {type:String}
});
mongoose.model('User', User);