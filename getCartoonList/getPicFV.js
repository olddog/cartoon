var zlib = require('zlib');
var fetchUrl = require('fetch').fetchUrl;

var cluster = require('cluster');
var fs = require('fs');
var _ = require('underscore');
var util = require('util');
var request = require('request');
if (process.argv.length < 2) {
  console.error("Usage: node getPicFV.js tag");
  process.exit();
}

//var selectTags = process.argv["2"].split(',');
if (cluster.isMaster) {
  var allList = [];
  var workers = {};
  var _content = fs.readFileSync("./list_by_tag.txt", "utf-8");
  var _cartoonList = _content.split("\r\n");
  var tranKeyName = function (hash) {
    var _keyName;
    switch (hash) {
      case "1dee80c7d5ab2c1c90aa8d2f7dd47256":
        _keyName = ['desc', 'desc'];
        break;
      case "ed09636a6ea24a292460866afdd7a89a":
        _keyName = ['pic', 'pic'];
        break;
      case "07760b909ef68f366fb2f8d8dff84172":
        _keyName = ['最新收录', 'LastUpdate'];
        break;
      case "0e9f870cd68d83b499d5c6ba940d5e71":
        _keyName = ['原名', 'OName'];
        break;
      case "3fea7ca76cdece641436d7ab0d02ab1b":
        _keyName = ['状态', 'Status'];
        break;
      case "4d7d4410dab75a44ad27b57e84dc1aac":
        _keyName = ['地域', 'Location'];
        break;
      case "60fdab9bf6fb5e82d7d5f0288dbdd253":
        _keyName = ['人气', 'PV'];
        break;
      case "62cea74981b60712a7cd869a9a021869":
        _keyName = ['作者', 'Author'];
        break;
      case "6dc7a717efc15adf80699301b55eb635":
        _keyName = ['别名', 'Alias'];
        break;
      case "d0771a42bbc49a6941f59913fcda35e3":
        _keyName = ['分类', 'Classification'];
        break;
      case "fde555047c1824bad10c4ac39c9b2358":
        _keyName = ['题材', 'Theme'];
        break;
      default:
        break;
    }
    return _keyName;
  };

/*
  cluster.on('death', function (worker) {
    console.log("重新启动 " + worker.uniqueID);
    if (worker.suicide  === true) {
    } else {
      var _linkObj = workers[worker.uniqueID];
      console.error(_linkObj);
      _picList.unshift(_linkObj);
      delete workers[worker.uniqueID];
      setTimeout(function () {
        generateCP();
      }, 1000);
    }
  });
*/  
  cluster.on('death', function (worker) {
    if (worker.suicide  === true) {
      console.log("key=" + Object.keys(cluster.workers));
      if (Object.keys(cluster.workers).length > 0) {
      } else {
        fs.writeFileSync("./data.txt", JSON.stringify(allList), "utf8");
        process.exit();      
      }
    } else {

    }
  });

  cluster.on('online', function (worker) {
    worker.send(workers[worker.uniqueID]);
  });

  var generateCP = function () {
    if (_picList.length <= 0) {
      process.exit();
    }
    _linkObj = _picList.pop();
    _indexL1 = _linkObj.indexL1;
    _indexL2 = _linkObj.indexL2;   
    _linkObj.link = allList[_indexL1]["list"][_indexL2].link; 
    var tempWorker = cluster.fork();
    workers[tempWorker.uniqueID] = _linkObj;
    
    tempWorker.on('message', function (msg) {
      var that = this;
      // console.log('这是原始启动的进程回应消息 ' + this.uniqueID + '\r\n');
      if (msg.rt >= 3) {
        msg.rt = 0;
        msg.picList = undefined;
        msg.link = undefined;
        _picList.unshift(msg);
      } else {
        var _indexL1 = msg.indexL1;
        var _indexL2 = msg.indexL2;
        var _link = msg.link;
        allList[_indexL1]["list"][_indexL2].picList = msg.picList;
        //console.log(msg.picList);
      }
      
      if (_picList.length > 0) {
        console.log(_picList.length);
        var _linkObj = _picList.pop();
        var _indexL1 = _linkObj.indexL1;
        var _indexL2 = _linkObj.indexL2;
        _linkObj.link = allList[_indexL1]["list"][_indexL2].link;  
        //console.log( '这是原始启动的进程重复使用 ' + this.uniqueID + '\r\n');
       
        this.send(_linkObj);
      } else {
        console.log(_picList.length);
        this.destroy();
      }
    }); 


  };

  if (_cartoonList.length > 0) {
    var i;
    for (i = 0; i < _cartoonList.length; i++) {
      var _obj = {};
      _content = _cartoonList[i].replace("\r", "").replace("\n", "");
      if (_.isEmpty(_content)) {
        continue;
      }
      //console.log(_cartoonList[i]);
      try {
        var cartoonList = JSON.parse(_cartoonList[i].replace("\r", "").replace("\n", ""));
/*         if (!Array.prototype.some.call(selectTags, function(value) {  return value == cartoonList.tag; })) {
          continue;
        } */
      } catch (e) {
        console.log(e);
        console.log(_cartoonList[i]);
        process.exit();
      }
      //var desc = 
      //var pic = 
      var name = cartoonList.name;
      var tag = cartoonList.tag;
      var md5Sum = cartoonList.md5Sum;
      var info = cartoonList.info;
      var _list = info.list;
      var _property = info.property;
      //console.log(_property);
      var property = {};
      _.forEach(_property, function (v, k) {
        var keyName = tranKeyName(k);
        if (keyName === undefined) {
         //console.log(k);
        } else {
          if (keyName[0] !== v.key) {
            console.log( name + ": k error" );
          } else {
            property[keyName[1]] = v.values;
          }
          _obj.name = name;
          _obj.tag = tag;
          _obj.md5Sum = md5Sum;
          _obj.property = property;
          _obj.list = _list;
        }
      });
      allList.push( _obj );
    }
  }
  var _picList = [];
  for (i = 0; i < allList.length; i++) {
    var cartoon = allList[i];
    var volumeList = cartoon.list;
    var _i;
    for(_i = 0; _i < volumeList.length; _i++){
      _picList.unshift({ indexL1: i, indexL2: _i, rt: 0, picList: undefined, link: undefined});
    }
  }  
  console.log(_picList.length);
  var tempWorker;
  var _linkObj;
  var _target = {};
  var _indexL1;
  var _indexL2;  
  var _link;
  for (i = 0; i < 12; i++) {
    generateCP();
  }
} else {
 
  function getPicList(_linkObj) {
    if (_linkObj.link == undefined) {
      console.log(JSON.stringify(_linkObj));
    }
    fetchUrl(_linkObj.link, function(error, meta, body){
    //request( _linkObj.link, function ( error, response, body ) {
      if (!error) {
        var regexp = /var pages =(.*)/;
        var _body = body.toString('utf8').replace(/[\r]|[\n]/, '');
        if (regexp.test(_body)) {
          var _temp = RegExp.$1.replace(/\r|\n/,"");
          var _length = _temp.length - 4;
          _linkObj.picList = eval(_temp.substr(2,_length));
          //console.log(_linkObj);
          process.send(_linkObj);
        } else {
          console.log("aaa:" + _linkObj.link);
          _linkObj.rt++;
          if ( (_linkObj.rt >> 0) >=3 ) {
            process.send(_linkObj);
          } else {
            (function () {
              setTimeout(function() {
                getPicList(_linkObj);
              }, 1000);
            })();        
          }
        }
      } else {
        console.log("xxx:" + _linkObj.link);
        _linkObj.rt++;
        if ( (_linkObj.rt >> 0) >=3 ) {
          process.send(_linkObj);
        } else {
          (function () {
            setTimeout(function() {
              getPicList(_linkObj);
            }, 1000);
          })();        
        }
      }

    });  
  }
  process.on('message', function(msg) {
      getPicList(msg);
  });
}





