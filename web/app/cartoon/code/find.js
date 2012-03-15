exports.path = '/find/:findID';
exports.get = function(req, res) {
  if (_.isEmpty(req.path && req.path.findID)) {
    res.send('fail');
  } else {
    var id = req.path.findID;
    var Cartoon = models.Cartoon;
    console.log(id);
    Cartoon.find({'_id': id},{},function(error, docs){
      if (!!error) {
        console.log(error);
      } else {
        res.send(docs[0]);
      }
    });
  }
  
}