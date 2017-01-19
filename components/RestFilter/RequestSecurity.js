function RequestSecurity(config) {
	this.doc = config.doc;
	this.user = config.user;
	this.method = config.method;

	this.isAuthorized = function () {
		if (this.method == "GET") {
			return true;
		}

		if (this.method == "POST") {
			if (this.user) {
				return true;
			}
		}

		if (this.user.isAdmin === true) {
			return true;
		}

		if (this.doc && this.doc.createdBy && this.user && this.user._id &&
			this.doc.createdBy.toString() == this.user._id.toString()) {
			return true;
		}

		return false;
	}

}

module.exports = RequestSecurity;
