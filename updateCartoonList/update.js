var website = {
    prefix : "http://manhua.178.com/update_1.shtml",
	init: function () {
		//console.log("178.js init");
	},
	run:  function () {
		//console.log("178.js running");
    var result = {
      list: []
    };
    if ($('div.pages').length != 2) {
      result = {
        code: 1,
        tag: undefined,
        list: undefined
      };
      return result;
    }

    var bookPages = $($('div.pages')[0]).find("a");
    
    var lastPage = true;
    /* 找到当前分类列表的下一页，如果没有，说明到了最后一页 */
    var outObj = [];
    var nextPageObj;
		if (bookPages.length > 0) {
      if (bookPages.length <= 2) {
        console.log("pages_reload:" + window.location.href);
        //window.location.reload();
        result = {
          code:2,
          tag:undefined,
          _link:window.location.href,
          list:outObj
        };
        return result;
      }
			_.forEach(bookPages, function (item, key) {
				var text = $(item).text();
				if (text === "下一页") {
					lastPage = false;
					nextPageObj = $(item);
				}
			});
    }
    var cartoonList = $(".boxdiv1");
    if (cartoonList.length > 0) {
      //console.log("cartoonList length:" + cartoonList.length);
      _.forEach(cartoonList, function (div, key) {
        var index = 0;
        var author = [];
        var authorLink = [];
        var cartoonProperty = $(div).find("div.pictext > ul > li");
        var link   = $(cartoonProperty[index]).find("a").attr("href");
        var name   = $(cartoonProperty[index++]).find("a").attr("title");
        author = $(cartoonProperty[index++]).find("span").text().split("/");
        var classification = $(cartoonProperty[index++]).text().replace("分类：","");
				var lastUpdateText = $(cartoonProperty[index]).find("a").attr("title");
				var lastUpdateLink = $(cartoonProperty[index++]).find("a").attr("href");
        var status = $(cartoonProperty[index++]).text().replace("状态：","");
        if ( $(cartoonProperty[index]).find("span").length > 0) {
          var updatetime = new Date($(cartoonProperty[index]).find("span").text().replace(/-/g,'/')).getTime();
        } else {
          var updatetime = new Date($(cartoonProperty[index]).text().replace(/-/g,'/')).getTime();
        }
        var _temp = { 'name': name, 
          'link': link, 
          'author': author,
          'classification': classification,
          'updatetime': updatetime,
          'status': status,
          'lastUpdateText':lastUpdateText,
          'lastUpdateLink': lastUpdateLink };
        //result = { code:3, list: outObj};
        outObj.push( _temp );
        //console.log( JSON.stringify(_temp) );
        //return result;
      });
    }
    
    if ((outObj.length >> 0) <= 0) {
      console.log("tags_reload:" + window.location.href);
        result = {
          code:2,
          tag:undefined,
          _link:window.location.href,
          list:undefined
        };
        return result;    
    }


    if (!lastPage) {
      //console.log("next page is:" + nextPageObj.text());
      var position = nextPageObj.offset();
      result = { code:4, x: position.left, y:position.top, list:outObj};
      return result;
    } else {
      result = { code:1, list:outObj};
      return result;    
    }
	}
};

