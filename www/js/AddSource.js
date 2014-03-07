function AddSource(wrapper, field_specs,  options) {

	// EXPORT A GLOBAL :S
	(function (o) {
		GET_REPLY = function() {
			o.on_submission_reply();
		};
	})(this);

	// Required Parameters
	this.field_specs = field_specs;
	this.wrapper = wrapper;


	// Validation
	if(!(this.wrapper instanceof jQuery)) {
		alert('In SourceAdder(options): A <jQuery> must be passed in '
			+ 'options.wrapper.  Found <' + typeof(this.wrapper) + '>:'
			+ this.wrapper);
	}


	this.form_spec = {
		'action': 'php/put_source.php'
		, 'method': 'post'
		, 'enctype': 'multipart/form-data'
		, 'target': 'upload_target'
	}


	this.unjax_authors = function(val) {
		validate(
			'AddSource.unjax_author()', variable, spec, default_val, strict);

		var authors = validate('AddSource.unjax_author()', 
			JSON.parse(val), 'array');

		for(x in authors) {
			validate('AddSource.unjax_authors(val):', authors[x], 'array');
			assert('AddSource.unjax_authors(val):', 
				(authors[x].length == 2));

			for(name in authors[x]) {
				validate('AddSource.unjax_authors(val):', name, 'string');
			}

			authors[x] = authors[x].join(', ');
		}

		return authors.join('; ');
	}

	this.author_jax = function(val) {
		authors = val
		authors = authors.split(';');
		for(var key in authors) {
			authors[key] = authors[key].split(',');
			var fname, lname;
			try {
				lname = authors[key][0].trim();
				try {
					fname = authors[key][1].trim();
				} catch(e) {
					fname = '';
				}
			} catch(e) {
				alert('Parse Error: Please check the format for'
					+ '<authors>.  It should be Last, First; ...');
			}
			authors[key] = '["' + lname + '","' + fname + '"]';
		}
		return '[' + authors.join(',') + ']';
	}

	this.init = function() {

		this.form = $('<form action="php/put_source.php" method="GET" '
			+ 'enctype="multipart/form-data">');

		// Create the form input elements
		this.add_form = new FormFactory(this.field_specs, this.form_spec);
		this.add_form.add_jax('author_jax', this.author_jax);
		this.form_controls = this.add_form.get_inputs_assoc();
		this.form = this.add_form.get_form();

		// Build some formatting html, and anchor the form to the page
		this.notifier = $('<div class="notifier" />');
		this.wrapper.append(this.notifier);
		this.wrapper.append('<h2>Add Source</h2>');
		this.wrapper.append('<div class="vert20" />');
		this.wrapper.append(this.form);
		this.left_col = $('<div class="add_source_left" />');
		this.right_col = $('<div class="add_source_right" />');
		this.form.append(this.left_col);
		this.form.append(this.right_col);
		this.wrapper.append($('<div class="clear" />'));

		// Add an iframe.  This is used to simulate asyncronous file uploads
		this.upload_target = $('<iframe id="upload_target" name="upload_target"src="#" style="height:1px;width:1px;border:none"  />');
		this.upload_target.attr('onload', 'GET_REPLY();');
		this.wrapper.append(this.upload_target);

		for(var i in this.field_specs) {
			var field_spec = this.field_specs[i];
			if(!field_spec['allow_write']) {
				continue;
			}

			var field_name = field_spec['name'];
			var form_pos = field_spec['form_pos']

			if(field_spec['form_pos'] == 'left') {
				this.left_col.append(
					this.form_controls[field_name]['wrapper']);

			} else if(field_spec['form_pos'] == 'right') {
				this.right_col.append(
					this.form_controls[field_name]['wrapper']);

			} else {
				alert('In AddSource.init(): All fields having field_spec.'
					+ 'allow_write set to true should define feld_spec.'
					+ 'form_pos to be <string> equal to either "left" or '
					+ '"right".  Found <' + typeof(form_pos) + '>:\n\n'
					+ form_pos);

			}

		}


		this.submit_button = this.add_form.get_submit();
		//this.arm_after_submit();

		this.form.append(this.submit_button);
	}

	this.success = function() {
		this.notifier.html('<span class="success">source added</span>');
	};

	this.on_submission_reply = function() {
		var ifrm = document.getElementById('upload_target');
		var reply = ifrm.contentWindow.document.documentElement.innerHTML;
		var first_brace = reply.indexOf('{');
		var last_brace = reply.lastIndexOf('}');
		var json_string = reply.substring(first_brace, last_brace+1);
		var parsed = eval('(' + json_string + ')');
		if(!parsed['success']) {
			alert(parsed['error']);
		} else {
			this.success();
		}
	}

	this.arm_after_submit = function(o) {
		return function() {
			this.add_form.after_submit(function() {
				o.form_controls['authors']['input'].val(o.authors_cache);
			});
		};
	}(this);

	this.init();

}
