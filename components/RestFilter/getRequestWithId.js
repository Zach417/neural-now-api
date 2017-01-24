var filter = require('../JsonFilter');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

module.exports = function (config) {

	this.route = function (req, res) {
		var email = req.headers['email']
		var accessToken = req.headers['access-token'];
		var id = req.params.id;
		var select = req.query['s'];

		if (email) {
			email = email.replace("%40","@");
		}

		if (!id) {
			return res.status(401).json(config.invalidRequest);
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

			config.findOne(user, id, function (doc) {
				if (doc && doc._id) {
					var result = {};
					if (typeof select === "string") {
						var _doc = {};
						_doc[select] = doc[select];
						result = filter(config.readFilterSchema, _doc);
					} else if (typeof select === "object") {
						var _doc = {};
						for (var i = 0; i < select.length; i++) {
							var attribute = select[i];
							_doc[attribute] = doc[attribute];
						}
						result = filter(config.readFilterSchema, _doc);
					} else if (!select || select == '' || select.length === 0) {
						result = filter(config.readFilterSchema, doc);
					}
					return res.json(result);
				}

				return res.json({});
			});
		});
	}

}
