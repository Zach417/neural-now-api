var filter = require('../JsonFilter');
var RequestSecurity = require('./RequestSecurity');
var getUser = require('./getUser');

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
						var doc = {};
						doc[select] = docs[i][select];
						result.push(filter(config.readFilterSchema, doc));
					} else if (typeof select === "object") {
						var doc = {};
						for (var j = 0; j < select.length; j++) {
							var attribute = select[j];
							doc[attribute] = docs[i][attribute];
						}
						result.push(filter(config.readFilterSchema, doc));
					} else if (!select || select == '' || select.length === 0) {
						result.push(filter(config.readFilterSchema, docs[i]));
					}
				}
				return res.json(result);
			});
		});
	}

}
