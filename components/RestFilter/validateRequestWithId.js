var filter = require('../JsonFilter');
var moment = require('moment');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res, next) {
		var email = req.headers['email'];
		var accessToken = req.headers['access-token'];
		var name = req.headers['name'];

		if (email) {
			email = email.replace("%40","@");
		}

		if (!email || !accessToken || !name) {
			return res.status(401).json(config.invalidRequest);
		}

		req.body = filter(config.writeFilterSchema, req.body);

		getUser(email, accessToken, function (user) {

			config.findOne(user, name, function (doc) {
				var requestSecurity = new RequestSecurity({
					method : req.method,
					user: user,
					securityRoles: config.securityRoles,
					doc: doc,
				});

				if (!requestSecurity.isAuthorized()) {
					return res.status(401).json(config.invalidRequest);
				}

				if (doc && doc._id) {
					req.body.modifiedBy = user._id;
					req.body.modifiedOn = moment();
					return next();
				}

				return res.status(401).json(config.invalidRequest);
			});
		});
	}

}
