var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var picList = new Schema({
  link: {type:String}
});

var LastUpdate = new Schema({
  link: {type:String},
  name: {type:String},
});

var Section = new Schema({
  link: {type:String},
  title: {type:String},
  pic: [picList]
})

var AuthorList = new Schema({
  name: {type:String},
  link: {type:String}
});

var Location = new Schema({
  name: {type:String},
  link: {type:String}
});

var Classification = new Schema({
  name: {type:String},
  link: {type:String}
});

var Theme = new Schema({
  name: {type:String},
  link: {type:String}
});

var Cartoon = new Schema({
  name: {type:String},
  md5 : {type:String},
  tag : {type:String},
  desc: {type:String},
  lastUpdate: [LastUpdate],
  wrapping : {type:String},  
  status : {type:String},
  location: [Location],
  author: [AuthorList],
  alias: {type:String},
  oname: {type:String},
  classification: [Classification],
  theme: [Theme],
  section: [Section]
});

mongoose.model('Cartoon', Cartoon);
mongoose.model('LastUpdate', LastUpdate);
