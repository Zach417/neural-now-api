var path = require('path');

module.exports = function (app) {

	app.use('/auth/sign-out', function (req, res) {
		req.session.destroy(function(err) {
			console.log(err);
		});
		res.clearCookie('accessToken');
		return res.redirect('/');
	});

}
