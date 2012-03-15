var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/178', function(err){
  if (err) {
    console.log("connect db fail");

  }
});

require('./cartoon');
require('./user');
require('./person_resource');


exports.PersonResource = mongoose.model('PersonResource');
exports.Cartoon = mongoose.model('Cartoon');
exports.User = mongoose.model('User');
exports.LastUpdate = mongoose.model('LastUpdate');