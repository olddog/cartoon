var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  name:     {type:String},
  password: {type:String},
  salt :    {type:String},
  desc:     {type:String},
  avatar:   {type:String},
  regDate:  {type:String}
});
mongoose.model('User', User);