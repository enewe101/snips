function SourcesView(options) {

	this.wrapper = get_opt('wrapper', options, null);
	this.source_list_wrapper;
	this.list;

	this.init = function() {
		this.source_list_wrapper = $('<div id="source_list_wrapper" />');
		this.wrapper.append(this.source_list_wrapper);


		this.result = new DBResult({
			'spec':this.result_spec
			, 'calc_specs': this.calc_specs
		});
	};


	this.put_sources = function(sources) {
		this.result.set_result(sources);
		var sources_result_list = this.result.get_display_list(
			[ this.link_spec ]);

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


	this.calc_specs = [
		{
			'name': 'link_to_reader'
			, 'disp_name': 'source name'
			, 'type': 'string'

			// makes a link to a reading view of the source
			, 'func': function(row) {
					
					// build the link
					var href = 'http://shpow.com/snips/index.php?source_id=';
					href +=  row['id'];
					var link = $('<a />');
					var disp_text = row['display_name'];
					link.attr('href', href);
					link.text(disp_text);

					return link;
				} 

			, 'splice_index' : 1
			, 'do_show': true
		}
	];


	this.result_spec = [
		{
			'name':'id'
			, 'disp_name':'id'
			, 'type': 'string'
			, 'do_show': false

		}, {
			'name':'bib_code'
			, 'disp_name': 'bib code'
			, 'type': 'string'
			, 'do_show': true

		}, {
			'name': 'display_name'
			, 'disp_name': 'source name'
			, 'type': 'string'
			, 'do_show': false

		}, {
			'name': 'doc_name'
			, 'disp_name': 'doc_name'
			, 'type': 'string'
			, 'do_show': false

		}, {
			'name': 'authors'
			, 'disp_name': 'authors'
			, 'type': 'string'
			, 'do_show': true

		}, {
			'name': 'pub_name'
			, 'disp_name': 'publisher'
			, 'type': 'string'
			, 'do_show': true

		}, {
			'name': 'vol'
			, 'disp_name': 'vol'
			, 'type': 'string'
			, 'do_show': false

		}, {
			'name': 'issue'
			, 'disp_name': 'issue'
			, 'type': 'int'
			, 'do_show': false

		}, {
			'name': 'start_page'
			, 'disp_name': 'start page'
			, 'type': 'int'
			, 'do_show': false

		}, {
			'name': 'end_page'
			, 'disp_name': 'end page'
			, 'type': 'int'
			, 'do_show': false

		}, {
			'name': 'pub_date'
			, 'disp_name': 'publishing date'
			, 'type': 'date'
			, 'do_show': true

		}, {
			'name': 'create_date'
			, 'disp_name': 'created on'
			, 'type': 'date'
			, 'do_show': false

		}, {
			'name': 'modify_date'
			, 'disp_name': 'last modified'
			, 'type': 'date'
			, 'do_show': false

		} 
	];


	this.init();
}
