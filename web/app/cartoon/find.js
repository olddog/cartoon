var Book = require('./models').Cartoon;
var fs = require('fs');


function find(id) {

  Book.find({'_id':id},{},function(error, docs){
    

    if (!!error) {
      console.log(error);
    } else {
      console.log(docs[0].name);
    }
  });
}
find("4f5db611c411e5282101c05b");
//save();