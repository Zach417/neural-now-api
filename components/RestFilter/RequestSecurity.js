function RequestSecurity(config) {

	this.isAuthorized = function () {
		return true;
	}

}

module.exports = RequestSecurity;
