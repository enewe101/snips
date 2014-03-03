function FormFactory(field_specs, options) {

	this.field_specs = field_specs;

	// Validation
	if(!$.isPlainObject(field_specs) && debug) {
		alert('In FormFactory(field_specs, options): Expected <plain-obj>'
			+ 'for field_specs, but found <' + typeof(this.field_specs) 
			+ '>:\n\n' + this.field_specs);
	}
	

	this.init = function() {
		// loop variables
		var inputs = [];

		// loop over the field specifications.  Build a form element for the
		// ones that have 'allow_write' true.
		for(x in field_specs) {
			var spec = field_specs[x];
			
			if(spec['allow_write']) {
				var input_type = spec['input_type'];

				// Validation
				if(typeof(input_type) != 'string' && debug) {
					alert('In view_utils.make_adder_form(field_specs):\n'
						+ 'Expected <string> in field_specs[' + x + ']'
						+ '.allow_write, but found <' + typeof(input_type)
						+ '>:\n\n' + input_type);
				}

				var input_type = spec['input_type'];
				var new_input;

				if(input_type == 'text') {
					new_input = $('<input type="text" />');
				} else {
					alert('error');
				}

				inputs.push(new_input);
				alert('added ' + spec['disp_name']);
			}

		}

		return inputs;
	}
}

