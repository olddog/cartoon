var page = new WebPage(),address, template, size;
var fs = require('fs');
if (phantom.args.length < 2 || phantom.args.length > 3) {
  console.log('Usage: phantomjs URL template');
  phantom.exit();
} else {
  page.onConsoleMessage = function (msg, line, source) {
    //console.log('console> ' + msg + ' @ line: ' + line);
    console.log( msg );
  };
  address = phantom.args[0];
  template = phantom.args[1];
  page.onLoadFinished = function(status){
    if (status != "success") {
      console.log("ERROR:LOAD FAIL!!!");
      phantom.exit();
    }
    
    if (page.injectJs("../tools/jquery.js")) {
      if (page.injectJs("../tools/jquery.md5.js")) {
        if (page.injectJs("../tools/underscore.js")) {
          if (page.injectJs( template )) {
            var result = page.evaluate(function () {

              website.init();
              return website.run();

            });
            if (result.code === 2) {
              console.log("RELOAD" + result._link)
              setTimeout(function(){
                page.open(result._link);         
              },200);
            } else {
              var writeData = function( data ){
                var file = fs.open("./update.txt", "a");
                file.write( data );
                file.flush();
                file.close();              
              };
              console.log( JSON.stringify(result.list) );
              writeData( JSON.stringify( {tag: result.tag, list:result.list} ) + "\r\n");
              if (result.code === 1) {
                phantom.exit();
              } else if (result.code === 3){
              } else if (result.code == 4){
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
  };
  page.viewportSize = { width: 1024, height:65535 };
  page.open(address);         
} 

