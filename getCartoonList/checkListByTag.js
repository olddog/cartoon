var zlib = require('zlib');
var fetchUrl = require('fetch').fetchUrl;

var cluster = require('cluster');
var fs = require('fs');
var _ = require('underscore');
var util = require('util');
var request = require('request');

var _content = fs.readFileSync("./list_by_tag.txt", "utf-8");
var _cartoonList = _content.split("\r\n");

var __2 = {};
  for (i = 0; i < _cartoonList.length; i++) {
    var _temp = JSON.parse(_cartoonList[i]);
    if (__2[_temp.md5Sum]) {
      console.log(_temp.md5Sum);
    } else {
      __2[_temp.md5Sum] = _temp;
    }
    
  }
  