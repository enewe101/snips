function FormVerifier(inputs, specs) {

	this.cache = {};

	this.verify = function(do_not_handle_errors) {
		do_not_handle_errors = do_not_handle_errors || false;

		var all_ok = true;

		for(var x in specs) {
			var spec = specs[x];

			// only consider fields  displayed in the form
			if(!spec['allow_write']) {
				continue;
			}

			var name = spec['name'];
			var vax = spec['vax'] || 'pass';

			//alert(vax);

			var input = inputs[name]['input'];
			//alert(input.toSource());
			var val = input.val();
			
			// cache the original values
			this.cache[name] = val;
			
			// Verify the values in the form
			if(!this.vax[vax]['checker'](val)) {
				all_ok = false;
				if(do_not_handle_errors) {
					return false;

				} else {
					this.vax[vax]['handler'](input, spec);
				}
			}
		}
		return all_ok;
	};


	this.add_vax = function(vax_name, vax) {
		if(vax_name in this.vax) {
			alert('In JsonifyForm.add_vax(vax_name, vax): This JsonifyForm '
				+ 'already has a vax named "' + vax_name + '".');
		} 
		
		validate('JsonifyForm.add_vax', vax, 'object');

		this.vax[vax_name] = vax;
	};

	this.red = function(input) {
		input.css('border', 'solid red 1px');
	};

	(function(o) {
		o.vax = {
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

					} else if(typeof(val)=='string' && val.length >=5) {
						if(val.substring(val.length-4, val.length)=='.pdf') {
							return true;
						}
					}
					return false;

				}, 'handler' : function(input, spec) {
					input.input_label.css('border', 'solid 1px red');
				}
			}
		}
	})(this);
}


