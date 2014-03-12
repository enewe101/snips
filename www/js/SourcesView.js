function SourcesView(options) {

	this.wrapper = get_opt('wrapper', options, null);

	this.init = function() {

		// Make an anchor for the Source Adder Form
		this.add_source_wrapper = $('<div id="add_source_wrapper" />');
		this.wrapper.append(this.add_source_wrapper);

		// Make an anchor for the  Source List 
		this.source_list_wrapper = $('<div id="source_list_wrapper" />');
		this.wrapper.append(this.source_list_wrapper);

		try {
		this.source_adder = new AddSource(
			this.add_source_wrapper, this.result_spec, {});
		} catch(e) {
			alert(e);
		}

		this.result = new DBResult(this.result_spec, {});
	};


	this.put_sources = function(sources) {
		this.result.set_result(sources);
		var sources_result_list = this.result.get_display_list();

		var num_fields = this.result.get_row_length() //sources_result_list[0].length;
		this.list = new List({
			'wrapper': this.source_list_wrapper,
			'num_cols': num_fields,
			'has_checks': true,
			'has_list_sep': true
		});

			this.list.add_items(sources_result_list);
			this.list.add_item(this.result.get_headers(), true)

	}



	this.result_spec = [
		{
			'name':'id'
			, 'disp_name':'id'
			, 'type': 'string'
			, 'do_show': false
			, 'input_type': null
			, 'is_required': false
			, 'allow_write': false
			, 'form_pos': null
			, 'form_validation': null
			, 'jax': null
			, 'vax': null
			, 'unjax' : null


		}, {
			'name': 'delete_icon'
			, 'disp_name': ''
			, 'type': 'html'
			, 'do_show': true
			, 'allow_write': false
			, 'input_type': null
			, 'is_required': null
			, 'form_pos': null
			, 'form_validation': null
//			, 'data_func': function(row) {
//				try {
//					var kill_button = new KillButton();
//				} catch(e) {
//					alert(e);
//				}

//				var kill_button = $('<div>X</div>');
//				kill_button.click(function(r) {
//					return function(e) {
//						if(!confirm('really delete:\n' + r['title'] + '?')) {
//							return false;
//						}
//						var source_id = r['id'];
//						var passthrough = 3;
//						var callback = function(list, row_id) {
//							return function(reply, passthrough) {
//								list.remove_by_phone_number(row_id);
//							};
//						}($(this).data('list'), $(this).data('list_row_id'));
//
//						delete_source({'id':source_id},callback,passthrough);
//					};
//				}(row));
//				return kill_button;
//			}

			, 'data_func': function(row) {
				try {
					var kill_button = new KillButton();
				} catch(e) {
					alert(e);
				}
				kill_button.click(function(r) {
					return function(e) {
						if(!confirm('really delete:\n' + r['title'] + '?')) {
							return false;
						}
						var source_id = r['id'];
						var passthrough = 3;
						var callback = function(list, row_id) {
							return function(reply, passthrough) {
								list.remove_by_phone_number(row_id);
							};
						}($(this).data('list'), $(this).data('list_row_id'));

						delete_source({'id':source_id},callback,passthrough);
					};
				}(row));
				var icon = kill_button.get();
				return icon;
			}
			, 'jax': null
			, 'vax': null
			, 'unjax' : null

		}, {
			'name': 'path'
			, 'disp_name': ''
			, 'type': 'html'
			, 'do_show': true
			, 'allow_write': false
			, 'input_type': null
			, 'is_required': null
			, 'form_pos': null
			, 'form_validation': null
			, 'data_func': function(row) {

				// build a link to the pdf
				var href = 'index.php?source_id=';
				href +=  row['id'];
				var link = $('<a />');
				var disp_text = row['title'];
				link.attr('href', href);

				// display a pdf icon if there's a file for this record
				var icon;
				if(row['path']) {
					icon = $('<div class="pdf_icon" />');

				} else {
					icon = $('<div class="no_pdf_icon" />');
				}

				link.append(icon);
				return link;
			}
			, 'jax': null
			, 'vax': null
			, 'unjax' : null

		}, {
			'name': 'link_to_reader'
			, 'disp_name': 'title'
			, 'type': 'string'
			, 'do_show': true
			, 'data_func': function(row) {
				
					// build a link to a reading view of the source
					var href = 'index.php?source_id=';
					href +=  row['id'];
					var link = $('<a />');
					var disp_text = row['title'];
					link.attr('href', href);
					link.text(disp_text);

					return link;

				} 

			, 'allow_write': false
			, 'input_type': null
			, 'is_required': null
			, 'form_pos': null
			, 'form_validation': null
			, 'jax': null
			, 'vax': null
			, 'unjax' : null

		}, {
			'name':'pdf'
			, 'disp_name':'upload pdf'
			, 'type': 'string'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'file'
			, 'is_required': false
			, 'form_pos': 'left'
			, 'form_validation': 'text'
			, 'jax': 'pass'
			, 'vax': '_pdf'
			, 'unjax' : null


		}, {
			'name': 'title'
			, 'disp_name': 'title'
			, 'type': 'string'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': true
			, 'form_pos': 'left'
			, 'form_validation': 'req-text'
			, 'jax': 'string'
			, 'vax': 'string'
			, 'unjax' : null

		}, {
			'name': 'authors'
			, 'disp_name': 'authors'
			, 'type': 'string'
			, 'do_show': true
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': true
			, 'form_pos': 'left'
			, 'form_validation': 'req-text'
			, 'jax': 'author_jax'
			, 'vax': 'string'
			, 'data_func' : function(row) {
				var val = row['authors'];
				//val = '[["a1", ""],["a2","a3"]]';

				try {
					val = JSON.parse(val);
					for(x in val) {
						val[x] = val[x].join(', ');
						var length = val[x].length;
						if(val[x].indexOf(', ') == (length - 2)) {
							val[x] = val[x].slice(0,length-2);
						}

								
					}
					val = val.join('; ');
				} catch(e) {
					return val;
				}

//				if($.isArray(val) {
//					for(x in val) {
//						if($.isArray(val[x]) {
//							val[x] = val[x].join(', ');
//						}
//					}
//					val = val.join('; ');
//				}

				return val;
			}

		}, {
			'name': 'pub_date'
			, 'disp_name': 'year'
			, 'type': 'date'
			, 'do_show': true
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': true
			, 'form_pos': 'left'
			, 'form_validation': 'req-year'
			, 'jax': 'number'
			, 'vax': 'year'
			, 'unjax' : null

		}, {
			'name': 'pub_name'
			, 'disp_name': 'publisher'
			, 'type': 'string'
			, 'do_show': true
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'form_pos': 'left'
			, 'form_validation': 'text'
			, 'jax': 'string'
			, 'vax': 'pass'
			, 'unjax' : null

		}, {
			'name': 'vol'
			, 'disp_name': 'vol'
			, 'type': 'string'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'form_pos': 'right'
			, 'form_validation': 'text'
			, 'jax': 'string'
			, 'vax': 'pass'
			, 'unjax' : null

		}, {
			'name': 'issue'
			, 'disp_name': 'issue'
			, 'type': 'int'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'form_pos': 'right'
			, 'form_validation': 'text'
			, 'jax': 'string'
			, 'vax': 'pass'
			, 'unjax' : null

		}, {
			'name': 'start_page'
			, 'disp_name': 'start page'
			, 'type': 'int'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'form_pos': 'right'
			, 'form_validation': 'integer'
			, 'jax': 'number'
			, 'vax': '_int'
			, 'unjax' : null

		}, {
			'name': 'end_page'
			, 'disp_name': 'end page'
			, 'type': 'int'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'form_pos': 'right'
			, 'form_validation': 'integer'
			, 'jax': 'number'
			, 'vax': '_int'
			, 'unjax' : null

		}, {
			'name':'bib_code'
			, 'disp_name': 'ref code'
			, 'type': 'string'
			, 'do_show': true
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'form_pos': 'right'
			, 'form_validation': 'text'
			, 'jax': 'string'
			, 'vax': 'pass'
			, 'unjax' : null

		}, {
			'name': 'create_date'
			, 'disp_name': 'created on'
			, 'type': 'date'
			, 'do_show': false
			, 'allow_write': false
			, 'input_type': null
			, 'is_required': false
			, 'form_pos': null
			, 'form_validation': null
			, 'jax': null
			, 'vax': null
			, 'unjax' : null

		}, {
			'name': 'modify_date'
			, 'disp_name': 'last modified'
			, 'type': 'date'
			, 'do_show': false
			, 'allow_write': false
			, 'input_type': null
			, 'is_required': false
			, 'form_pos': null
			, 'form_validation': null
			, 'jax': null
			, 'vax': null
			, 'unjax' : null

		} 
	];


	this.init();
}

