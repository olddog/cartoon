var Book = require('./model').book;
var fs = require('fs');
var content = fs.readFileSync("data.txt", "utf-8");
var bookList = JSON.parse(content);

function save( cartoon, callback) {

    var book = new Book();
    //var cartoon = bookList.pop();
    console.log(cartoon.md5Sum + ' add');
    book.md5 = cartoon.md5Sum
    book.name = cartoon.name;
    book.tag = cartoon.tag;
    book.desc = cartoon.property.desc;
    if (cartoon.property.LastUpdate.length > 0) {
       book.lastUpdate.push({name: cartoon.property.LastUpdate[cartoon.property.LastUpdate.length -1].value, link: cartoon.property.LastUpdate[cartoon.property.LastUpdate.length -1].link});
    } else {
      book.lastUpdate = [];
    }    
    book.wrapping = cartoon.property.pic;
    book.status = cartoon.property.Status[0].value;
    book.alias = cartoon.property.Alias;
    book.oname = cartoon.property.OName;
    Array.prototype.forEach.call(cartoon.property.Location, function(e, i, o){
      book.location.push({name: e.value, link: e.link});
    });

    Array.prototype.forEach.call(cartoon.property.Author, function(e, i, o){
      book.author.push({name: e.value, link: e.link});
    });
    
    Array.prototype.forEach.call(cartoon.property.Classification, function(e, i, o){
      book.classification.push({name: e.value, link: e.link});
    });

    Array.prototype.forEach.call(cartoon.property.Theme, function(e, i, o){
      book.theme.push({name: e.value, link: e.link});
    });

    Array.prototype.forEach.call(cartoon.property.Location, function(e, i, o){
      book.location.push({name: e.value, link: e.link});
    });

    
    Array.prototype.forEach.call(cartoon.list, function(e, i, o){
      
      book.section.push({title: e.title, link: e.link});
      var _temp = book.section.length - 1;
      Array.prototype.forEach.call(e.pic, function(e, i, o){
        book.section[_temp].pic.push({link: e});
      });
    });    
    

    book.save(function(error) {
      if (error) {
        console.error(book.name + ' error ' + error);
      } else {
        console.log('save ok');
        if (bookList.length <= 0) process.exit();
        var _cartoon = bookList.pop();
        process.nextTick(function(){
          find(_cartoon);
        });           
      }
    });

}

function find(_cartoon) {
  var cartoon = _cartoon;
  
  Book.find({'md5':_cartoon.md5Sum},{},function(error, docs){
    
    var _cartoon = cartoon;
    if (!!error) {
      
    } else {
      if (docs.length > 0) {
        console.log(_cartoon.md5Sum);
        console.log(_cartoon.property.LastUpdate);
        //console.log(_cartoon.list);
        var _section = [];
        Array.prototype.forEach.call(_cartoon.list, function(e, i, o){
          _section.push({title: e.title, link: e.link, pic: []});
          var _temp = _section.length - 1;
          Array.prototype.forEach.call(e.pic, function(e, i, o){
            _section[_temp].pic.push({link: e});
          });
        });         
       
        Book.update({_id:docs[0].id}, {$set: {status: _cartoon.property.Status[0].value, lastUpdate:[{name: _cartoon.property.LastUpdate[_cartoon.property.LastUpdate.length -1].value, link: _cartoon.property.LastUpdate[_cartoon.property.LastUpdate.length -1].link}], section:_section}}, {upsert:true, safe: true}, function (error, numAffected) {
          if (!!error) {
            console.log("err:"+ error);
          } else {
            console.log("numAffected:" + numAffected);
              if (bookList.length <= 0) process.exit();
              var _cartoon = bookList.pop();
              process.nextTick(function(){
                find(_cartoon);
              });            
          }
        });
      } else {
        save(_cartoon, function(){
          if (bookList.length <= 0) process.exit();
          var _cartoon = bookList.pop();
          process.nextTick(function(){
            find(_cartoon);
          });          
        });
      }
    }
  });
}
var cartoon = bookList.pop();
find(cartoon);
//save();