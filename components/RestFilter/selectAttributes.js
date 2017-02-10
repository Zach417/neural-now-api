module.exports = function (select, docOriginal) {
	if (select.length === 0) {
		return docOriginal
	}

	var docTarget = {};
	var allUnselect = true;
	for (var i = 0; i < select.length; i++) {
		var attribute = select[i];
		if (!select[i].startsWith("!")) {
			allUnselect = false;
		}
	}

	if (allUnselect) {
		Object.keys(docOriginal._doc).map(function (property) {
			var include = true;
			for (var i = 0; i < select.length; i++) {
				var attribute = select[i].replace("!", "");
				if (property == attribute) {
					include = false;
				}
			}
			if (include) {
				docTarget[property] = docOriginal[property];
			}
		});
	} else {
		for (var i = 0; i < select.length; i++) {
			var attribute = select[i];
			if (!attribute.startsWith("!")) {
				docTarget[attribute] = docOriginal[attribute];
			}
		}
	}

	return docTarget;
}
