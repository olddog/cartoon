var Book = require('./model').book;
var fs = require('fs');
var content = fs.readFileSync("data.txt", "utf-8");
var bookList = JSON.parse(content);

function save(  ) {
  if (bookList.length > 0) {
    var book = new Book();
    var cartoon = bookList.pop();
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
      Array.prototype.forEach.call(e.picList, function(e, i, o){
        book.section[_temp].pic.push({link: e});
      });
    });    
    

    book.save(function(error) {
      if (error) {
        console.error(book.name + ' error ' + error);
      } else {
        console.log('save ok');
        setTimeout(function() {
          save();
        },100);
      }
    });
    
  } else {
    process.exit();
  }
}

save();