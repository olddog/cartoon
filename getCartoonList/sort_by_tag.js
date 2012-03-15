var website = {
    prefix : "http://manhua.178.com/tags/a.shtml",
	init: function(  ){
		//console.log("178.js init");
	},
	run:  function(){
    var lists = $('div.cartoon_online_border  li a');
    var _temp = [];
    var result = {};
    if ( lists.length > 0) {
      _.forEach(lists, function( key, value){
        var title = $(key).text();
        var link  = $(key).attr("href");
        _temp.push( { title: title, link: link} );
        result = {
          code: 3,
          list: _temp
        };        
      });
      
      var trList = $("div.anim-main_list > table").find("tr");
      if (trList.length > 0) {
        var cartoonProperty = {};
        _.forEach(trList, function( key, value){
          var th = $(key).find("th");
          if (th.length == 1) {
            var columnNames = $(th).text().trim().replace("：","").replace(":","");
            var columnValues = [];
            var _values = $(key).find("td > a");
            var propertyName = hex_md5( columnNames );
            if (_values.length <= 0) {
              columnValues =  $(key).find("td").text();
            } else {
              _.forEach(_values, function( key, values) {
                columnValues.push( { value: $(key).text(), link: $(key).attr("href") } );
              });
            }
            cartoonProperty[ propertyName ] = { key: columnNames, values: columnValues};
          } else {
          
          }
        });
        if (!_.isEmpty(cartoonProperty)) {
          var pic = $("#cover_pic").attr("src");
          var desc = $(".line_height_content > br").parent().text().replace(/(<br|<BR|<Br|bR).*/, '').replace("在178在线漫画", "").replace(/[ ]|[\r]|[\n]/g,'');
          var propertyName = hex_md5( "desc" );
          cartoonProperty[ propertyName ] = { key: "desc", values: desc};
          propertyName = hex_md5( "pic" );
          cartoonProperty[ propertyName ] = { key: "pic", values: pic};
          result.property = cartoonProperty;
        }
        
      } else {
        //window.location.reload();
        console.log
        result._link = window.location.href;
        result.code = 2;
      }
      return result;        
    } else {
      result = {
        _link : window.location.href,
        code: 2,
        list: _temp
      };      
    }
    return result;
	}
};

