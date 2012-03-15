var util = require("util");
var   vm = require('vm');
var crypto = require("crypto");
var hash = crypto.createHash('md5');
var path  = require("path");
var fs    = require("fs");
var cartoonText = fs.readFileSync("./update.txt", "utf8");
var cartoonTextArray = cartoonText.split("\r\n");
var cartoonList = [];
var index = 0;
var i = 0;
var begin = 0;
var end = 0;
var timeStamp = 0;
var stop = false;
var ___1 = '';

timeStamp = fs.readFileSync("./updatetime", "utf8").replace(/[\r]|[\n]/,"");
console.log(timeStamp);
fs.writeFileSync("./updateTime",new Date().getTime());
fs.writeFileSync("./updateTime_backup",timeStamp);
(function () {
  for (i = 0; i < cartoonTextArray.length; i++) {
    var _temp = JSON.parse(cartoonTextArray[i]), tag, _list, _i;
    _list  = _temp.list;
    
    for (_i = 0; _i < _list.length; _i++) {
      if ((timeStamp) >= (_list[_i]["updatetime"])) {
        console.log(_list[_i]["updatetime"] + ':' + timeStamp);
        console.log(_list[_i]["name"]);      
        stop = true;
        break;
      } else {


      }
      if (i == 0 && _i == 0) {
        fs.writeFileSync("./updateTime",_list[_i]["updatetime"]);
      }
      _list[_i]["link"] = "http://manhua.178.com/" + _list[_i]["link"];
      var hash = crypto.createHash('md5');
      var md5Sum = hash.update( _list[_i]["link"] ).digest("hex").toString();
      var _classification = _list[_i].classification.split("/");
      _list[_i]["md5Sum"] = md5Sum;
      _list[_i]
      console.log(JSON.stringify(_list[_i]));
      ___1 += JSON.stringify(_list[_i]) + '\r\n';
      index++;
    }
    if (!!stop) {
      break;
    }
  }
}());

fs.writeFileSync("./update_.txt", ___1, 'utf8');


/* 
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/cartoon');
var directory = new Schema({
  title : String,
  rootLink  : String
});
var author = new Schema({
  name : String,
  link : String
});
var tag = new Schema({
  name : String,
  link : String
})
var data_dangdang = new Schema({
  'hash'       : {type:String},
  'updateTime' : {type:String },
  'name'       : {type:String },
  'link'       : {type:String },
  'desc'       : {type:String },
  'author'     : [ author ],
  'tag'        : [ tag ],
  'directory'  : [ directory ]
});
 */



/*
var getPage = function(){
  var target = cartoonList.pop();
  var url = target.url;
  var command = spawn("phantomjs", ["--load-images=no", "sort_by_tag_app.js", url, "sort_by_tag.js"] );
  (function( index ){
    command.stdout.on("data",function(data){
      //console.log(  data.toString('utf8') );
      //cartoonList[ index ]["_temp"] += data.toString('utf8');
    });
  }(i));
  (function( index ){
    command.stderr.on("data", function( data ){
      console.log( data );
       // if (data.toString('utf8').match(/No such method/)) {
        // cartoonList[ index ].logger = data;
      // } 
      return;
    });
  }(i));

  (function( index ){
    command.on("exit", function(code){
      if ( cartoonList.length > 0) {
        setTimeout(getPage, 1000);
      } else {
        process.exit();
      }
    });  
  }(i));
};
getPage();
*/
