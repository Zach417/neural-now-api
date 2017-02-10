var filter = require('../JsonFilter');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');
var selectAttributes = require('./selectAttributes');

module.exports = function (config) {

	this.route = function (req, res) {
		var email = req.headers['email'];
		var accessToken = req.headers['access-token'];
		var select = req.query['s'];

		if (email) {
			email = email.replace("%40","@");
		}

		getUser(email, accessToken, function (user) {

			var requestSecurity = new RequestSecurity({
				method : req.method,
				user: user,
				securityRoles: config.securityRoles
			});

			if (!requestSecurity.isAuthorized()) {
				return res.status(401).json(config.invalidRequest);
			}

			config.findMany(user, function (docs) {
				var result = [];
				for (var i = 0; i < docs.length; i++){
					if (typeof select === "string") {
						var _doc = selectAttributes([select], docs[i]);
						result.push(filter(config.readFilterSchema, _doc));
					} else if (typeof select === "object") {
						var _doc = selectAttributes(select, docs[i]);
						result.push(filter(config.readFilterSchema, _doc));
					} else if (!select || select == '' || select.length === 0) {
						result.push(filter(config.readFilterSchema, docs[i]));
					}
				}
				return res.json(result);
			});
		});
	}

}
