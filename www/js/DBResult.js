function DBResult(options) {

	// Required
	this.spec = get_opt('spec', options, null);
	
	this.init = function() {
	};

	
	//// Makes a convenient array of display-friedly field names
	//
	//	# params #
	//
	//	# returns #
	//		[ <string>,...]: String of field names
	//
	this.get_headers = function() {
		var headers = [];
		for(var i in this.spec) {
			if('disp_name' in this.spec[i]) {
				headers.push(this.spec[i]['disp_name']);
			} else if ('name' in this.spec[i]) {
				headers.push(this.spec[i]['name']);
			} else {
				alert('Could not find "name" or "disp_name" in DBResult.spec '
					+ 'for field:\n' + this.spec[i].toSource());
			}
		}
		return headers;
	}

	this.init();
}
