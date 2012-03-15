exports.path = "/signup";
var	User = models.User;
var check = require('validator').check,
	sanitize = require('validator').sanitize;
var crypto = require('crypto');

exports.get = function(){

};


function md5(str) {
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
}

function encrypt(str) {
   var cipher = crypto.createCipher('aes192', sec_key);
   var enc = cipher.update(str,'utf8','hex');
   enc += cipher.final('hex');
   return enc;
}

exports.post = function(req, res){
  req.on("post complete", function(){
		var username = sanitize(req.post["username"]).trim();
		username = sanitize(username).xss();
		var password = sanitize(req.post["password"]).trim();
		password = sanitize(password).xss();
    var regDate = new Date().getTime();
    
    if ((!!_.isEmpty(username)) || (!!_.isEmpty(password))) {
      res.send(JSON.stringify(error.e_signup_miss_params));
      return;
    }
    
    try{
			check(username, JSON.stringify(error.e_signup_miss_params)).isAlphanumeric();
		}catch(e){
      res.send(e.message);
			return;
		}
    var user = new User();
    user.find({name: username}, function(err, user){
      if (err) {
        res.send(JSON.stringify(error.e_signup_exception));
      } else {
        var now = new Date().getTime() + '';
        var salt =  now + sec_key + password;
        //以后用bcrypt
        user.name = username;
        user.password = md5(password);
        user.salt = salt;
        user.desc = ''
        user.avatar= ''
        user.reg_date =  now;
        user.save(function(err){
          if (err) {
            res.send(JSON.stringify(error.e_signup_fail));
          } else {
            res.send(JSON.stringify(error.e_signup_success));
          }
        });
      }
    });
  });
};

