var website = {
    prefix : "http://manhua.178.com/tags/a.shtml",
	init: function () {
		//console.log("178.js init");
	},
	run:  function () {
		//console.log("178.js running");
    var result = {
      list: []
    };
    var bookPages = $('div.pages > a');
    var lastPage = true;
    /* 找到当前分类列表的下一页，如果没有，说明到了最后一页 */
    var outObj = [];
    var nextPageObj;
		if (bookPages.length > 0) {
      if (bookPages.length <= 2) {
        console.log("pages_reload:" + window.location.href);
        result = {
          code:2,
          tag:undefined,
          _link: window.location.href,
          list:outObj
        };
        //window.location.reload();
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
    var cartoonList = $("#search_list_div > ul");
    if (cartoonList.length > 0) {
      //console.log("cartoonList length:" + cartoonList.length);
      _.forEach(cartoonList, function (ul, key) {
        var index = 0;
        var author = [];
        var authorLink = [];
        var cartoonProperty = $(ul).find("a");
        var status = $(cartoonProperty[index]).parent("li").find("span").length > 0 ? "已完结" : "连载中";
        var link   = $(cartoonProperty[index]).attr("href");
        var name   = $(cartoonProperty[index++]).attr("title");
/*        
        author.push($.trim($(cartoonProperty[index]).text().trim()));
        authorLink.push($(cartoonProperty[index]).attr("href"));
        var authorObj = cartoonProperty[index];
        while ( $(authorObj).next().is("a") ) {
          author.push($.trim($(cartoonProperty[index]).text().trim()));
          authorLink.push($(cartoonProperty[index]).attr("href"));
          authorObj = $(authorObj).next();
        }      
        index++;  
*/        
				var lastUpdateText = $.trim($(cartoonProperty[index]).text().trim());
				var lastUpdateLink = $(cartoonProperty[index]).attr("href");   
        var _temp = { 'name': name, 
          'link': link, 
          'status': status,
          'lastUpdateText':lastUpdateText,
          'lastUpdateLink': lastUpdateLink };
        //result = { code:3, list: outObj};
        outObj.push( _temp );
        //console.log( JSON.stringify(outObj) );
        //return result;
      });
    }
    
    if ((outObj.length >> 0) <= 0) {
      console.log("tags_reload:" + window.location.href);
      result = {
        code: 2,
        _link: window.location.href,
        list: [],
        tag: undefined
      };
      return result;      
    }

    var tag = $("span.search_list_m_right > a").filter(".pitchon");
    var tagName = ($(tag).text().indexOf('0') >= 0) ? ('num') : $(tag).text();
    if ( tag.length == 1) {
      if (!lastPage) {
        //console.log("next page is:" + nextPageObj.text());
        var position = nextPageObj.offset();
        result = { code:4, x: position.left, y:position.top, list:outObj,tag: tagName };
        return result;
      } else {
        var next = $(tag).next("a");
        if ( next.length == 1) {
          //console.log("next tag is:" + $(next).text());
          var position = $(next).offset();
          result = { code:4, x: position.left, y:position.top, list:outObj,tag: tagName };
          return result;
        } else {
          result = {
            code: 1,
            list: outObj,
             tag: tagName
          };
          return result;
        }        
      }

    } else {
      window.location.reload();
      result = {
        code: 2,
        list:outObj
      };        
      return result;
    }
  
	}
};

