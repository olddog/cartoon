var page = new WebPage(),address, template, size, timeStamp;
var fs = require('fs');
var content = fs.read("./update_.txt");
if (content.length <= 2) {
  console.log("ALLUPDATE:CLEAR");
  phantom.exit();
}
var _tempList = content.replace('\r','').split("\n");
var cartoonList = [];
var _temp, _i, timeoutHandler;



for(_i = 0; _i < _tempList.length; _i++) {
  _temp = JSON.parse(_tempList[_i].replace(/\r|\n/,""));
  cartoonList.push( _temp );
}
var returnStatus = false;
var index = 0;
var cartoon = cartoonList.pop();
if (phantom.args.length < 1) {
  console.log('Usage: phantomjs URL template');
  phantom.exit();
} else {

  page.onConsoleMessage = function (msg, line, source) {
    console.log( msg );
  };
  
  page.onLoadStarted = function () {
    timeoutHandler = setTimeout(function(){
      clearTimeout(timeoutHandler);
      if (!!returnStatus) {
        console.log("time out but had got it");
        return;
      }      
      console.log("request time out:" + cartoon.link);
      page.open(cartoon.link);
    },60000);
  };  
  
  page.onLoadFinished = function(status){
    console.log(status);
    clearTimeout(timeoutHandler);
    returnStatus = true;
    if (status != "success") {
      console.log("RELOAD:" + cartoon.link);
      setTimeout(function(){
        returnStatus = false;
        page.open(cartoon.link);
      },3000);
      
    } else {
      template = phantom.args[0];
      if (page.injectJs("../tools/md5.js")) {
        if (page.injectJs("../tools/jquery.js")) {
          if (page.injectJs("../tools/jquery.md5.js")) {
            if (page.injectJs("../tools/underscore.js")) {
              if (page.injectJs( template )) {
                var result = page.evaluate(function () {
                  website.init();
                  return website.run();
                });
                if (result.code === 1) {
                  phantom.exit();
                } else if (result.code === 2) {
                  setTimeout(function(){
                    returnStatus = false;
                    page.open(result._link);         
                  },800);                  
                } else if (result.code === 3) {

                  var fs = require('fs');
                  var file = fs.open("./update_list.txt", "a");
                  var data = {tag: result.tag, md5Sum: cartoon.md5Sum, name: cartoon.name, info: result};
                  console.log( JSON.stringify( data ) );
                  file.write( JSON.stringify( data ) + "\r\n");
                  file.flush();
                  file.close();
                  if (cartoonList.length > 0) {
                    setTimeout(function(){
                      cartoon = cartoonList.pop();
                      returnStatus = false;
                      page.open(cartoon.link);         
                    },500);              
                  } else {
                    phantom.exit();
                  }
                } else {
                  try {
                    if (!!result.x) {
                      page.sendEvent('click', result.x + 1, result.y + 1);
                    } else {
                      console.log("ERROR:CLICK CRASH!!!");
                      phantom.exit();
                    }
                  } catch (e) {
                    console.log("ERROR!!!");
                    phantom.exit();
                  }
                }            
              }
            }
          }      
        }
      }  
    }


  };
  page.viewportSize = { width: 1024, height:768 };
  page.open(cartoon.link);         
}