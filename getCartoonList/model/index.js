var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/178', function(err){
  if (err) {
    console.log("connect db fail");
    process.exit();
  }
});

require('./178');
exports.book = mongoose.model('cartoon');