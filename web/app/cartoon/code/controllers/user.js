var models = require('../../models'),
	User = models.User,
	Cartoon = models.Cartoon,
	PersonResource = models.PersonResource
var check = require('validator').check,
	sanitize = require('validator').sanitize;
var crypto = require('crypto');
