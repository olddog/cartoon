var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookMd5 = new Schema({
  name: {type: string},
  md5 : {type: string}
});

var Subscribe = new Schema({
  userId: {type:String},
  md5 : [BookMd5]
});
mongoose.model('Subscribe', Subscribe);