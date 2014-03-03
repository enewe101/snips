function SourcesView(options) {

	this.wrapper = get_opt('wrapper', options, null);
	this.source_list_wrapper;
	this.list;

	this.init = function() {
		this.add_source_wrapper = $('<div id="add_source_wrapper" />');
		this.wrapper.append(this.add_source_wrapper);

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
			, 'allow_write': false
			, 'input_type': null
			, 'is_required': false
			, 'data_source': 'db'

		}, {
			'name': 'link_to_reader'
			, 'disp_name': 'title'
			, 'type': 'string'
			, 'do_show': true
			, 'func': function(row) {
				
					// build a link to a reading view of the source
					var href = 'http://shpow.com/snips/index.php?source_id=';
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

			, 'splice_index' : 1

		}, {
			'name': 'title'
			, 'disp_name': 'title'
			, 'type': 'string'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': true
			, 'data_source': 'db'

		}, {
			'name': 'authors'
			, 'disp_name': 'authors'
			, 'type': 'string'
			, 'do_show': true
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': true
			, 'data_source': 'db'


		}, {
			'name': 'pub_date'
			, 'disp_name': 'year'
			, 'type': 'date'
			, 'do_show': true
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': true
			, 'data_source': 'db'

		}, {
			'name':'pdf'
			, 'disp_name':'upload pdf'
			, 'type': 'string'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'file'
			, 'is_required': false
			, 'data_source': null

		}, {
			'name': 'pub_name'
			, 'disp_name': 'publisher'
			, 'type': 'string'
			, 'do_show': true
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'data_source': 'db'

		}, {
			'name': 'vol'
			, 'disp_name': 'vol'
			, 'type': 'string'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'data_source': 'db'

		}, {
			'name': 'issue'
			, 'disp_name': 'issue'
			, 'type': 'int'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'data_source': 'db'

		}, {
			'name': 'start_page'
			, 'disp_name': 'start page'
			, 'type': 'int'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'data_source': 'db'

		}, {
			'name': 'end_page'
			, 'disp_name': 'end page'
			, 'type': 'int'
			, 'do_show': false
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'data_source': 'db'

		}, {
			'name': 'create_date'
			, 'disp_name': 'created on'
			, 'type': 'date'
			, 'do_show': false
			, 'allow_write': false
			, 'input_type': null
			, 'is_required': false
			, 'data_source': 'db'

		}, {
			'name': 'modify_date'
			, 'disp_name': 'last modified'
			, 'type': 'date'
			, 'do_show': false
			, 'allow_write': false
			, 'input_type': null
			, 'is_required': false
			, 'data_source': 'db'

		}, {
			'name':'bib_code'
			, 'disp_name': 'ref code'
			, 'type': 'string'
			, 'do_show': true
			, 'allow_write': true
			, 'input_type': 'text'
			, 'is_required': false
			, 'data_source': 'db'

		} 
	];


	this.init();
}
