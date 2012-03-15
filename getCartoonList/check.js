var Book = require('./model').book;
var fs = require('fs');
var content = fs.readFileSync("data.txt", "utf-8");
var bookList = JSON.parse(content);
var __2 = {};
  for (i = 0; i < bookList.length; i++) {
    var _temp = (bookList[i]);
    if (__2[_temp.md5Sum]) {
      console.log(i);
    } else {
      __2[_temp.md5Sum] = _temp;
    }
    
  }
  process.exit();