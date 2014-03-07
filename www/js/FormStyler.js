// Manages the style transitions of the form during interaction with the user
//
//	# Params #
//		inputs <array <input>>
//			This is a bunch of objects that represent the actual form controls
//			such as text inputs, textareas, buttons, and drop-downs.
//
//		specs <array <spec>
//			This is a bunch of specifications, which tells how to handle
//			each of the form controls.  It can specify styling options and
//			behaviors.
//

function FormStyler(inputs, specs) {

	this.cache = {};

	this.error_style = function(do_not_handle_errors) {
		do_not_handle_errors = do_not_handle_errors || false;

		for(var x in specs) {
			var spec = specs[x];

			// only consider fields  displayed in the form
			if(!spec['allow_write']) {
				continue;
			}

			var name = spec['name'];
			var flax = spec['flax'] || 'pass';

			//alert(flax);

			var input = inputs[name]['input'];
			//alert(input.toSource());
			var val = input.val();

			// cache the original values
			this.cache[name] = val;

			// Style the values in the form
			if(!this.flax[flax]['checker'](val)) {
				this.flax[flax]['handler'](input, spec);
			}
		}
		return all_ok;
	};


	this.add_vax = function(vax_name, flax) {
		if(vax_name in this.flax) {
			alert('In JsonifyForm.add_vax(vax_name, flax): This JsonifyForm '
				+ 'already has a flax named "' + vax_name + '".');
		} 
		
		validate('JsonifyForm.add_vax', flax, 'object', 'flax');

		this.flax[vax_name] = flax;
	};

	this.red = function(input) {
		input.css('border', 'solid red 1px');
	};

	(function(o) {
		o.flax = {
			'pass' : {
				'checker' : function(val) {
					return true;

				}, 'handler' : function(input, spec) {
					o.red(input);
				}

			}, 'fail' : {
				'checker' : function(val) {
					return false;

				}, 'handler' : function(input, spec) {
					o.red(input);
				}

			}, 'string' : {
				'checker' : function(val) {
					return val.trim()? true : false;

				}, 'handler' : function(input, spec) {
					o.red(input);
				}

			}, 'number': {
				'checker' : function(val) {
					return isFloat64(val.trim());

				}, 'handler' : function(input, spec) {
					o.red(input);
				}

			}, 'year': {
				'checker' : function(val) {
					val = parseInt(val.trim());
					if(isInt(val) && val > 0 && val < 3000) {
						return true;

					} else {
						return false
					}

				}, 'handler' : function(input, spec) {
					o.red(input);
				}

			}, '_int': {
				'checker' : function(val) {
					return isInt(parseInt(val.trim())) || val.trim()=='';

				}, 'handler' : function(input, spec) {
					o.red(input);
				}

			}, 'int': {
				'checker' : function(val) {
					return isInt(val.trim());

				}, 'handler' : function(input, spec) {
					o.red(input);
				}

			}, '_pdf': {
				'checker' : function(val) {
					if(val.trim()=='') {
						return true;

					} else if(
						typeof(val)=='string' 
						&& val.length >=5 
						&& val.substring(val.length-4, 4)=='.pdf') {
						return true;
					}
					return false;

				}, 'handler' : function(input, spec) {
					input.input_label.css('border', 'solid 1px red');
				}
			}
		}
	})(this);
}


