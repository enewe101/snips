//
// 	Manages a results object, like what might come back from a query to a 
// 	database.  Provides various convenient accessors of the data, for a few
// 	different applications.  
//
// 	For example `this.get_headers()` provides a list of the
// 	column names in the result set.  This would be useful if building some
// 	kind of table view.
//
// 	The contructor argument `options.field_specs` is where to specify the fields
// 	that will be in the resultset, and how they should be treated.  For
// 	example, if the specification for a given field in this.field_specs has 
// 	`this.field_specs[#].do_show=false` then it would be excluded by certain getters
//
//	The structure of this.field_specs is an array of specifications.  Each 
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

function DBResult(field_specs, options) {

	// Required parameters
	this.field_specs = field_specs;

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
		for(var i in this.field_specs) {

			// don't include non-shown elements
			if(!this.field_specs[i]['do_show']) {
				continue;
			}

			if('disp_name' in this.field_specs[i]) {
				headers.push(this.field_specs[i]['disp_name']);
			} else if ('name' in this.field_specs[i]) {
				headers.push(this.field_specs[i]['name']);
			} else {
				alert('Could not find "name" or "disp_name" in DBResult.field_specs '
					+ 'for field:\n' + this.field_specs[i].toSource());
			}
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
		for(var i in this.field_specs) {
			if(this.field_specs[i]['do_show']) {
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
	// for which this.field_specs[#]['do_show'] is true.
	//
	// 	# no params #
	//
	// 	# returns #
	// 		<array <array <mixed>>>: The field data is organized as an array
	// 		of rows.  Each row is an array of field data which can be of mixed
	// 		type.  The fields data within rows are sorted as this.specs.
	//
	this.get_display_list = function(calc_specs) {

		// loop variables
		var return_list = [];

		// Process each row of the results set 
		for(var i in this.result) {

			// loop variables
			var db_row = this.result[i]
			var app_row = [];

			// Process each field, accumulate certain ones
			for(var j in this.field_specs) {

				var field_specs = this.field_specs[j];
				var field_name = field_specs['name'];

				// don't include entries for non-displayable entries
				if(!field_specs['do_show']) {
					continue;
				}

				if('func' in field_specs && field_specs['func'] !== null) {

					// Validation
					if(typeof(field_specs['func']) != 'function' && debug) {
						alert('In DBResult.get_display_list():'
							+ 'Fields should either have <function>, '
							+ '<undefined> '
							+ 'or null in field_specs.func.  Found <' 
							+ typeof(field_specs['func']) + '>:\n\n'
							+ field_specs['func']);
					}

					app_row.push(field_specs['func'](db_row));

				} else {
					app_row.push(db_row[field_name]);
				} 
			}

			return_list.push(app_row);
		}

		return return_list;
	};

	this.init();
}
