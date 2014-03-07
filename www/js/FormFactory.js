function FormFactory(field_specs, options) {

	this.field_specs = field_specs;
	this.action = get_opt('action', options, null);
	this.method = get_opt('method', options, 'POST');
	this.target = get_opt('target', options, '');
	this.enctype = get_opt('enctype', options, 'multipart/form-data');

	// State
	this.inputs_assoc = {};
	this.inputs_array = [];
	this.buttons = [];
	this.before_submit_callback = function(){};
	this.after_submit_callback = function(){};

	// Validation
	if(!$.isArray(this.field_specs) && debug) {
		alert('In FormFactory(field_specs, options): Expected <array <obj>> '
			+ 'for field_specs, but found <' + typeof(this.field_specs)
			+ '>:\n\n' + this.field_specs);
	}

	if(this.action !== null && typeof(this.action) != 'string' && debug) {
			alert('In FormFactory(field_specs, options): options.action '
				+ 'should be <string> or null.  Found <' + typeof(this.action)
				+ '>:\n\n' + this.action);
	}

	if(!$.isArray(field_specs) && debug) {
		alert('In FormFactory(field_specs, options): Expected <plain-obj>'
			+ 'for field_specs, but found <' + typeof(this.field_specs) 
			+ '>:\n\n' + this.field_specs);
	}


	this.init = function() {
		// loop variables
		this.inputs_assoc = {};
		this.inputs_array = [];

		// The default action does not create an actual <form />, however, if
		// options.action is defined, then a <form /> element is made, althogh
		// it is up to the caller to actually put the elements into the form
		// (no layout concerns are handled here.
		if(typeof(this.action) == 'string') {
			this.form = $('<form />')
				.attr('action', this.action)
				.attr('method', this.method)
				.attr('target', this.target)
				.attr('enctype', this.enctype);

		} else {
			this.form = null;
		}

		// loop over the field specifications.  Build a form element for the
		// ones that have 'allow_write' true.
		for(x in field_specs) {
			var spec = field_specs[x];

			if(spec['allow_write']) {
				this.add_field(spec);
			}

		}

		this.submit_elm = $('<input type="button" value="add" />');
		this.arm_submit_elm();

		try {
			this.jsonifier = new FormJsonifier(
				this.get_inputs_assoc(), this.field_specs);

			this.verifier = new FormVerifier(
				this.get_inputs_assoc(), this.field_specs);

		} catch(e) {
			alert(e);
		}
	}

	this.clear = function() {
		for(x in field_specs) {
			var spec = field_specs[x];

			if(spec['allow_write']) {
				var name = spec['name'];
				var input = this.inputs_assoc[name]['input'];
				input.val('');
			}
		}
	}

	this.arm_submit_elm = function(o) {
		return function() {
			o.submit_elm.click(function(e){
				o.submit();
			});
		};
	}(this);

	this.before_submit = function(callback) {
		this.before_submit_callback = callback;
	};


	/////  causes the underlying form to submit()
	//
	//	# Params #
	//		callback <func>
	//			A callback function to be fired when the form gets submitted
	//
	//	# No Returns #
	//
	this.submit = function() {
		if(this.form) {
			this.before_submit_callback();
			try {
				if(!this.verifier.verify()) {
					return false;
				}
				this.jsonifier.jsonify();
			} catch(e) {
				alert(e);
			}
			this.form.submit();
			this.jsonifier.revert();
			this.after_submit_callback();

		}else {
			alert('In FormFactory.submit(): Called submit but no form action '
				+ 'was specified to the constructor.');
		}
	};

	this.add_jax = function(jax_name, jax) {
		this.jsonifier.add_jax(jax_name, jax);
	}

	this.after_submit = function(callback) {
		this.after_submit_callback = callback;
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
			var input_label = $('<label class="label_basic">'
				+ '<span class="text_bold">' 
				+ disp_name + '</span>:</label>')
		} else {
			var input_label = $('<label class="label_basic">' 
				+ disp_name + ':</label>')
		}
		var input;

		if(input_type == 'text') {
			input = $('<input type="text" />')
				.attr('class','text_input')
				.attr('name', field_name);

			var input_wrapper = $('<div class="input_wrapper" />');
			input_wrapper.append(input_label);
			input_wrapper.append(input);
			input_wrapper.append($('<div class="clear" />'));

		} else if(input_type == 'file') {
			var input = new FileInput({'name':field_name});
			var input_wrapper = $('<div class="input_wrapper" />');
			input_wrapper.append(input_label);
			input_wrapper.append(input.get_wrapper());

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

	this.get_form = function() {
		return this.form;
	}

	this.get_submit = function() {
		return this.submit_elm;
	}

	this.init();
}

