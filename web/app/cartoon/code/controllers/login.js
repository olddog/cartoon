exports.path = '/login';
var User = models.User;
var check = require('validator').check,
	sanitize = require('validator').sanitize;
var crypto = require('crypto');

exports.post = function(req, res){
  req.on('post complete', function(){
		var username = sanitize(req.post["username"]).trim();
		username = sanitize(username).xss();
		var password = sanitize(req.post["password"]).trim();
		password = sanitize(password).xss();    
    if ((!!_.isEmpty(username)) || (!!_.isEmpty(password))) {
      res.send(JSON.stringify(error.e_sign_miss_params));
      return;
    }
    
    try{
			check(username, JSON.stringify(error.e_login_miss_params)).isAlphanumeric();
		}catch(e){
      res.send(e.message);
			return;
		}
    var user = new User;
    user.find({name: username}, function(err, user){
      if (err) {
        res.send(JSON.stringify(error.e_login_exception));
      } else {
        if (user.length > 1) {
          res.send(JSON.stringify(error.e_login_multi_users));
        } else {
          res.send
        }
      }
    });
    
  });
};