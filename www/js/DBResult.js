//
// 	Manages a results object, like what might come back from a query to a 
// 	database.  Provides various convenient accessors of the data, for a few
// 	different applications.  
//
// 	For example `this.get_headers()` provides a list of the
// 	column names in the result set.  This would be useful if building some
// 	kind of table view.
//
// 	The contructor argument `options.spec` is where to specify the fields
// 	that will be in the resultset, and how they should be treated.  For
// 	example, if the specification for a given field in this.spec has 
// 	`this.spec[#].do_show=false` then it would be excluded by certain getters
//
//	The structure of this.spec is an array of specifications.  Each 
//	specification is a plain object with some properties that define how the
//	that field should be handled:
//
//	<specification> := {
//		'do_show' : <bool>,		// Whether this field is shown to the user
//		'name': <bool>,			// The field's programmatic name
//		'disp_name' <string>,	// Best name for display purposes
//		'type' : <string>		// The type of the data
//	}
//

function DBResult(options) {

	// Required parameters
	this.spec = get_opt('spec', options, null);
	this.calc_specs = get_opt('calc_specs', options, []);

	// Validation
	if(!$.isArray(this.calc_specs) && debug) {
		alert('In DBResult(options): options.calc_specs should be <array>, '
			+ 'found <' + typeof(this.calc_specs) + '>:\n' + this.calc_specs)
	}
	

	this.init = function() {
	};

	
	//// Makes a convenient array of display-friedly field names
	//
	//	# no params #
	//
	//	# returns #
	//		[ <string>,...]: String of field names
	//
	this.get_headers = function() {
		var headers = [];
		for(var i in this.spec) {

			// don't include non-shown elements
			if(!this.spec[i]['do_show']) {
				continue;
			}

			if('disp_name' in this.spec[i]) {
				headers.push(this.spec[i]['disp_name']);
			} else if ('name' in this.spec[i]) {
				headers.push(this.spec[i]['name']);
			} else {
				alert('Could not find "name" or "disp_name" in DBResult.spec '
					+ 'for field:\n' + this.spec[i].toSource());
			}
		}

		for(var i in this.calc_specs) {
			var spec = this.calc_specs[i];
			if(!spec['do_show']) {
				continue;
			}

			var splice_index = spec['splice_index'];
			if(typeof(splice_index) != 'number') {
				alert('In DBResult.get_headers(): Expected this.calc_specs['
					+ i + '].splice_index to be <number>, but found <'
					+ typeof(splice_index) + '>:\n' + splice_index);
			}


			var disp_name;
			if('disp_name' in spec) {
				disp_name = spec['disp_name'];

			} else if('name' in spec) {
				disp_name = spec['name'];

			} else {
				alert('In DBResult.get_headers(): Expected this.calc_specs['
					+ i + '].disp_name or .name to be <string>s but they were '
					+ '<undefined');
			}

			headers.splice(splice_index, 0, disp_name);
		}

		return headers;
	};


	//// Get the number of actually displayed elements
	//
	// # no params #
	//
	// # returns #
	// 		<integer> : Number of for which this.specs[#]['do_show'] is true
	//
	this.get_row_length = function() {
		var row_length = 0;
		for(var i in this.spec) {
			if(this.spec[i]['do_show']) {
				row_length += 1;
			}
		}
		return row_length;
	};


	//// Set the this result using a database results object
	//
	//	# params #
	//		result <array <obj>>: A list of rows.  Each row is a plain object
	//			having keys equalt to field names and values equal to field
	//			values.
	//
	//	# no return #
	//	
	this.set_result = function(result) {
		if(!$.isArray(result) || 
			(result.length && !$.isPlainObject(result[0]))) {
			alert('DBResult.set_result(result) expects an array of rows, '
				+ 'where rows are json objects like {<colname> : <value>}.')
		}

		this.result = result;
	};


	//// Get a list of row data field values (no field names) but only ones
	// for which this.spec[#]['do_show'] is true.
	//
	// 	# no params #
	//
	// 	# returns #
	// 		<array <array <mixed>>>: The field data is organized as an array
	// 		of rows.  Each row is an array of field data which can be of mixed
	// 		type.  The fields data within rows are sorted as this.specs.
	//
	this.get_display_list = function(calc_specs) {

		calc_specs = this.calc_specs;

		// Validation and normalization
		if(typeof(calc_specs) == 'undefined'){
			calc_specs = [];
		} else if(!$.isArray(calc_specs)){
			alert('In DBResult.get_display_list(calc_specs): \nexpected '
				+ 'calc_specs to be <array>.  Found <' + typeof(calc_specs)
				+ '>:\n' + calc_specs);
		}

		// loop variables
		var return_list = [];

		// Process each row of the results set 
		for(var i in this.result) {

			// loop variables
			var db_row = this.result[i]
			var app_row = [];

			// Process each field, accumulate certain ones
			for(var j in this.spec) {

				// don't include entries for non-displayable entries
				if(!this.spec[j]['do_show']) {
					continue;
				}

				var field_name = this.spec[j]['name'];
				app_row.push(db_row[field_name]);
			}

			for(var j in calc_specs) {
				var spec = calc_specs[j];
				if(typeof(spec['func']) == 'function') {

					var splice_index = spec['splice_index'];

					// validation
					if(typeof(splice_index) != 'number') {
						alert('In DBResult.get_display_list(calc_specs): '
							+ 'The calc_specs are expected to have <number> '
							+ 'at calc_specs[' + i + ']["splice_index"], '
							+ 'found <' + typeof(splice_index)
							+ '>: \n' + splice_index);
					}

					calculated_datum = spec['func'](db_row);
					app_row.splice(splice_index, 0, calculated_datum);
				}
			}

			return_list.push(app_row);
		}

		return return_list;
	};

	this.init();
}
