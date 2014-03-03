function AddSource(wrapper, field_specs,  options) {

	// Required Parameters
	this.field_specs = field_specs;
	this.wrapper = wrapper;


	// Validation
	if(!(this.wrapper instanceof jQuery)) {
		alert('In SourceAdder(options): A <jQuery> must be passed in '
			+ 'options.wrapper.  Found <' + typeof(this.wrapper) + '>:'
			+ this.wrapper);
	}


	this.init = function() {
		this.add_form = new FormFactory(this.field_specs, {});

		this.form_controls = this.add_form.get_inputs_array();

		for(var i in this.form_controls) {
			this.wrapper.append(this.form_controls[i]['wrapper']);
		}

		alert(this.add_form.get_vals_array().toSource());
	}
	
	this.init();
}
