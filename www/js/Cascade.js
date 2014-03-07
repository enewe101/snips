function Cascader(specs) {

	this.cache = {};

	this.cascade = function(c_name, row) {
		jaxed_row = []
		for(var x in specs) {
			var spec = specs[x];

			// only consider fields  displayed in the form
			spec = validate('Cascader.cascade(jax)', specs[x], 'object', null);

			var name = spec['name'];
			var jax = spec[c_name];

			var val = row[name];
			
			// cache the original values
			this.cache[c_name][name] = val;
			
			// Jsonify the values in the form
			jaxed_row[name] = this['jax'][c_name][jax](val);
		}

		return jaxed_row;
	};

	this.revert = function() {
		for(var x in specs) {

			var spec = specs[x];

			// only consider fields  displayed in the form
			if(!spec['allow_write']) {
				continue;
			}

			var name = spec['name'];
			inputs[name]['input'].val(this.cache[name]);

		}
	}

	this.add_jax = function(jax_name, jax) {
		if(jax_name in this.jax) {
			alert('In JsonifyForm.add_jax(jax_name, jax): This JsonifyForm '
				+ 'already has a jax named "' + jax_name + '".');
		} 
		
		validate('JsonifyForm.add_jax', jax, 'function');

		this.jax[jax_name] = jax;
	};


	this.jax = {
		'pass' : function(val) {
			return val;

		}, 'test' : function(val) {
			return '*' + val.trim() + '*';

		}, 'string' : function(val) {
			return '"' + val.trim() + '"';

		}, 'number': function(val) {
			return val.trim();

		}, 'array': function(val) {
			arr = val.split(',');
			for(var x in arr) {
				arr[x] = this.jax['string'](arr[x]);
			}
			return '[' + arr.join(',') + ']';
		}
	};
}

