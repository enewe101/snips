window.onload = init;

var source_list;
var sources_result;

function init() {
	var source_view_wrapper = $('#source_view_wrapper');

	source_list = new SourcesView({
		'wrapper':source_view_wrapper
	});

	sources_result = new DBResult({'spec':sources_fields});
	get_sources({}, on_get_sources);
}

function on_get_sources(data, passthrough) {
}


sources_fields = [
	{
		'name':'id'
		, 'disp_name':'id'
		, 'type': 'string'

	}, {
		'name':'bib_code'
		, 'disp_name': 'bib code'
		, 'type': 'string'

	}, {
		'name': 'doc_name'
		, 'disp_name': 'bib code',
		, 'type': 'string'

	}, {
		'name': 'authors'
		, 'disp_name': 'authors'
		, 'type': 'string'

	}, {
		'name': 'pub_name'
		, 'disp_name': 'publisher'
		, 'type': 'string'

	}, {
		'name': 'vol'
		, 'disp_name': 'vol'
		, 'type': 'string'

	}, {
		'name': 'issue'
		, 'disp_name': 'issue'
		, 'type': 'int'

	}, {
		'name': 'start_page'
		, 'disp_name': 'start page'
		, 'type': 'int'

	}, {
		'name': 'end_page'
		, 'disp_name': 'end page'
		, 'type': 'int'

	}, {
		'name': 'pub_date'
		, 'disp_name': 'publishing date'
		, 'type': 'date'

	}, {
		'name': 'create_date'
		, 'disp_name': 'created on'
		, 'type': 'date'

	}, {
		'name': 'modify_date'
		, 'disp_name': 'last modified'
		, 'type': 'date'

	}, {
		'name': 'display_name'
		, 'disp_name': 'source name'
		, 'type': 'string'

	} 
];
