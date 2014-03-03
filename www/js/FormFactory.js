function FormFactory(field_specs, options) {

	this.field_specs = field_specs;
	this.inputs_assoc = {};
	this.inputs_array = [];
	this.buttons = [];

	// Validation
	if(!$.isArray(field_specs) && debug) {
		alert('In FormFactory(field_specs, options): Expected <plain-obj>'
			+ 'for field_specs, but found <' + typeof(this.field_specs) 
			+ '>:\n\n' + this.field_specs);
	}
	

	this.init = function() {
		// loop variables
		this.inputs_assoc = {};
		this.inputs_array = [];


		// loop over the field specifications.  Build a form element for the
		// ones that have 'allow_write' true.
		for(x in field_specs) {
			var spec = field_specs[x];

			if(spec['allow_write']) {
				this.add_field(spec);
			}

		}
	}

	this.add_field = function(spec) {

		var input_type = spec['input_type'];
		var field_name = spec['name']
		var disp_name = spec['disp_name']

		// Validation
		if(typeof(input_type) != 'string' && debug) {
			alert('In view_utils.make_adder_form(field_specs):\n'
				+ 'Expected <string> in field_specs[' + x + ']'
				+ '.allow_write, but found <' + typeof(input_type)
				+ '>:\n\n' + input_type);
		}
		if(typeof(field_name) != 'string' && debug) {
			alert('In view_utils.make_adder_form(field_specs):\n'
				+ 'Expected <string> in field_specs[' + x + ']'
				+ '.name, but found <' + typeof(field_name)
				+ '>:\n\n' + field_name);
		}

		var input_type = spec['input_type'];

		if(spec['is_required']) {
			var input_label = $('<label class="basic_label">'
				+ '<span class="text_bold">' 
				+ disp_name + '</span>:</label>')
		} else {
			var input_label = $('<label class="basic_label">' 
				+ disp_name + ':</label>')
		}
		var input;

		if(input_type == 'text') {
			input = $('<input type="text" />');
			var input_wrapper = $('<div class="input_wrapper" />');
			input_wrapper.append(input_label);
			input_wrapper.append(input);
			input_wrapper.append($('<div class="clear" />'));


		} else if(input_type == 'file') {
			var input_wrapper = $(
				'<div class="file_input_control_wrapper" />');
			input_label = $(
				'<label for="statement_file">browse for file...</label>');
			var file_kill = $('<div id="file_kill" class="file_kill" />');
			var file_hidden = $('<div class="form_file_hidden" /> ');
			input = $('<input type="file" class="form_file_hidden" />');
			var clear = $('<div class="clear" />');

			file_hidden.append(input);
			input_wrapper.append(input_label);
			input_wrapper.append(file_kill);
			input_wrapper.append(file_hidden);
			input_wrapper.append(clear);


		} else {
			alert('In FormFactory.add_field(field_spec): Unexpected value for '
				+ 'field_spec.input_type: "' + input_type + '".');
		}


		var input_obj = {
			'wrapper': input_wrapper 
			, 'input': input
			, 'label': input_label 
		};

		this.inputs_assoc[field_name] = input_obj;
		this.inputs_array.push(input_obj);
	};


	this.get_vals_array = function() {
		var vals = [];
		for(var i=0; i<this.inputs_array.length; i++) {
			vals.push(this.inputs_array[i]['input'].val());
		}
		return vals;
	}


	this.get_vals_assoc = function() {
		var vals = {};
		for(var field_name in this.inputs_assoc) {
			vals[field_name] = this.inputs_assoc[field_name]['input'].val();
		}
		return vals;
	}


	this.check = function() {
		for(var i in this.field_specs) {
			var spec = this.field_spes[i];
			var field_name = spec['name'];

			if(spec['is_required']) {
				//var input = this.inputs_assoc
			}
		}
	};

	this.get_inputs_array = function() {
		return this.inputs_array;
	}

	this.get_inputs_assoc = function() {
		return this.inputs_assoc;
	}

	this.init();
}

