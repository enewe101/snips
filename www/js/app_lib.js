function form_def_to_html(form_def, formatting) {
	html_form_elements = [];
	for(var key in form_def) {

		var input_name = form_def[key]['name'];

		field_directives = formatting[input_name] || false;

		// decide whether to build a form field for this table column
		var do_buil = true;
		if(field_directives && 'type' in field_directives) {
			if(field_directives['type'] == 'exclude') {
				continue;
			}
		}

		// figure out what the display name should be
		var display_name = input_name;
		if(input_name in formatting) {
			if('display_name' in formatting[input_name]) {
				display_name = formatting[input_name]['display_name'];
			}
		}
		var new_inputs = [$('<input/>', {'type':'text'})];
		var new_label = $('<label/>', {'html':display_name});

		html_form_elements.push({"label":new_label, "inputs":new_inputs});
	}
	return html_form_elements;
}

function form_factory(form_def) {
	form_html = [];
	for(key in form_def) {
		var field_def = form_def[key];
		var type = field_def['type'];
		switch(type) {
			case 'text':
				var new_input = $('<input/>', {
					'type':field_def['type'],
					'id': field_def['name'],
					'name': field_def['name']
				});
				var new_label = $('<label/>', {
					'html': field_def['display_name'] || field_def['name'],
					'for':field_def['name']
				});
				break;
			default:
				var new_input = $('<input/>', {
					'type':field_def['type'],
					'id': field_def['name'],
					'name': field_def['name']
				});
				var new_label = $('<label/>', {
					'html':field_def['name'],
					'for':field_def['name']
				});
				break;
		}
		form_html.push({'input':new_input, 'label':new_label});
	}
	return form_html;

}
