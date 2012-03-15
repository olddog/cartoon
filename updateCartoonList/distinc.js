var Book = require('./model').book;
var list = {};
var _docs = [];
function find(cartoon) {
 
  Book.find({},{'md5':1,'id':1},function(error, docs){
    if (!!error) {
      
    } else {
      _docs = docs;
      filter();
    }
  });
}

function filter(){
  if (_docs.length <= 0) {
    process.exit();
  }
  var doc = _docs.pop();
  //console.log(doc.id);
  if (!list[doc.md5]) {
    list[doc.md5] = 1;
  } else {
    doc.remove();
//    console.log(doc.id);
  } 
process.nextTick(filter);  
}

find();